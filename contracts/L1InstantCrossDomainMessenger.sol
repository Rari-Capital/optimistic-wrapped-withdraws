// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.8.0;
pragma experimental ABIEncoderV2;

/* Library Imports */
import {
    Lib_OVMCodec
} from "@eth-optimism/contracts/build/contracts/libraries/codec/Lib_OVMCodec.sol";
import {
    Lib_AddressResolver
} from "@eth-optimism/contracts/build/contracts/libraries/resolver/Lib_AddressResolver.sol";
import {
    Lib_AddressManager
} from "@eth-optimism/contracts/build/contracts/libraries/resolver/Lib_AddressManager.sol";
import {
    Lib_SecureMerkleTrie
} from "@eth-optimism/contracts/build/contracts/libraries/trie/Lib_SecureMerkleTrie.sol";
import {
    Lib_ReentrancyGuard
} from "@eth-optimism/contracts/build/contracts/libraries/utils/Lib_ReentrancyGuard.sol";

/* Interface Imports */
import {
    iOVM_L1CrossDomainMessenger
} from "@eth-optimism/contracts/build/contracts/iOVM/bridge/iOVM_L1CrossDomainMessenger.sol";
import {
    iOVM_CanonicalTransactionChain
} from "@eth-optimism/contracts/build/contracts/iOVM/chain/iOVM_CanonicalTransactionChain.sol";
import {
    iOVM_StateCommitmentChain
} from "@eth-optimism/contracts/build/contracts/iOVM/chain/iOVM_StateCommitmentChain.sol";

import {
    OVM_BaseCrossDomainMessenger
} from "@eth-optimism/contracts/build/contracts/OVM/bridge/OVM_BaseCrossDomainMessenger.sol";

/// @title [L1] Fork of the OVM_L1CrossDomainMessenger that replaces the _verifyStateRootProof method with one that does not have a timelock check.
contract L1InstantCrossDomainMessenger is
    iOVM_L1CrossDomainMessenger,
    OVM_BaseCrossDomainMessenger,
    Lib_AddressResolver
{
    //**************************************************************** */
    //**************************************************************** */
    //**************************************************************** */

    /******************
     * UNIQUE CHANGES *
     ******************/

    /**
     * Verifies that the state root within an inclusion proof is valid.
     * @dev DOES NOT VALIDATE THE TIMELOCK!
     * @param _proof Message inclusion proof.
     * @return Whether or not the provided proof is valid.
     */
    function _verifyStateRootProof(L2MessageInclusionProof memory _proof)
        internal
        view
        returns (bool)
    {
        iOVM_StateCommitmentChain ovmStateCommitmentChain =
            iOVM_StateCommitmentChain(resolve("OVM_StateCommitmentChain"));

        return
            ovmStateCommitmentChain.verifyStateCommitment(
                _proof.stateRoot,
                _proof.stateRootBatchHeader,
                _proof.stateRootProof
            );
    }

    //**************************************************************** */
    //**************************************************************** */
    //**************************************************************** */

    /***************
     * Constructor *
     ***************/

    /**
     * Pass a default zero address to the address resolver. This will be updated when initialized.
     */
    constructor() Lib_AddressResolver(address(0)) {}

    /**
     * @param _libAddressManager Address of the Address Manager.
     */
    function initialize(address _libAddressManager) public {
        require(
            address(libAddressManager) == address(0),
            "L1CrossDomainMessenger already intialized."
        );
        libAddressManager = Lib_AddressManager(_libAddressManager);
    }

    /**********************
     * Function Modifiers *
     **********************/

    /**
     * Modifier to enforce that, if configured, only the OVM_L2MessageRelayer contract may successfully call a method.
     */
    modifier onlyRelayer() {
        address relayer = resolve("OVM_L2MessageRelayer");
        if (relayer != address(0)) {
            require(
                msg.sender == relayer,
                "Only OVM_L2MessageRelayer can relay L2-to-L1 messages."
            );
        }
        _;
    }

    /********************
     * Public Functions *
     ********************/

    /**
     * Relays a cross domain message to a contract.
     * @inheritdoc iOVM_L1CrossDomainMessenger
     */
    function relayMessage(
        address _target,
        address _sender,
        bytes memory _message,
        uint256 _messageNonce,
        L2MessageInclusionProof memory _proof
    ) public override nonReentrant onlyRelayer() {
        bytes memory xDomainCalldata =
            _getXDomainCalldata(_target, _sender, _message, _messageNonce);

        require(
            _verifyXDomainMessage(xDomainCalldata, _proof) == true,
            "Provided message could not be verified."
        );

        bytes32 xDomainCalldataHash = keccak256(xDomainCalldata);

        require(
            successfulMessages[xDomainCalldataHash] == false,
            "Provided message has already been received."
        );

        xDomainMessageSender = _sender;
        (bool success, ) = _target.call(_message);

        // Mark the message as received if the call was successful. Ensures that a message can be
        // relayed multiple times in the case that the call reverted.
        if (success == true) {
            successfulMessages[xDomainCalldataHash] = true;
            emit RelayedMessage(xDomainCalldataHash);
        }

        // Store an identifier that can be used to prove that the given message was relayed by some
        // user. Gives us an easy way to pay relayers for their work.
        bytes32 relayId =
            keccak256(
                abi.encodePacked(xDomainCalldata, msg.sender, block.number)
            );
        relayedMessages[relayId] = true;
    }

    /**
     * Replays a cross domain message to the target messenger.
     * @inheritdoc iOVM_L1CrossDomainMessenger
     */
    function replayMessage(
        address _target,
        address _sender,
        bytes memory _message,
        uint256 _messageNonce,
        uint32 _gasLimit
    ) public override {
        bytes memory xDomainCalldata =
            _getXDomainCalldata(_target, _sender, _message, _messageNonce);

        require(
            sentMessages[keccak256(xDomainCalldata)] == true,
            "Provided message has not already been sent."
        );

        _sendXDomainMessage(xDomainCalldata, _gasLimit);
    }

    /**********************
     * Internal Functions *
     **********************/

    /**
     * Verifies that the given message is valid.
     * @param _xDomainCalldata Calldata to verify.
     * @param _proof Inclusion proof for the message.
     * @return Whether or not the provided message is valid.
     */
    function _verifyXDomainMessage(
        bytes memory _xDomainCalldata,
        L2MessageInclusionProof memory _proof
    ) internal view returns (bool) {
        return (_verifyStateRootProof(_proof) &&
            _verifyStorageProof(_xDomainCalldata, _proof));
    }

    /**
     * Verifies that the storage proof within an inclusion proof is valid.
     * @param _xDomainCalldata Encoded message calldata.
     * @param _proof Message inclusion proof.
     * @return Whether or not the provided proof is valid.
     */
    function _verifyStorageProof(
        bytes memory _xDomainCalldata,
        L2MessageInclusionProof memory _proof
    ) internal view returns (bool) {
        bytes32 storageKey =
            keccak256(
                abi.encodePacked(
                    keccak256(
                        abi.encodePacked(
                            _xDomainCalldata,
                            resolve("OVM_L2CrossDomainMessenger")
                        )
                    ),
                    uint256(0)
                )
            );

        (bool exists, bytes memory encodedMessagePassingAccount) =
            Lib_SecureMerkleTrie.get(
                abi.encodePacked(0x4200000000000000000000000000000000000000),
                _proof.stateTrieWitness,
                _proof.stateRoot
            );

        require(
            exists == true,
            "Message passing precompile has not been initialized or invalid proof provided."
        );

        Lib_OVMCodec.EVMAccount memory account =
            Lib_OVMCodec.decodeEVMAccount(encodedMessagePassingAccount);

        return
            Lib_SecureMerkleTrie.verifyInclusionProof(
                abi.encodePacked(storageKey),
                abi.encodePacked(uint8(1)),
                _proof.storageTrieWitness,
                account.storageRoot
            );
    }

    /**
     * Sends a cross domain message.
     * @param _message Message to send.
     * @param _gasLimit OVM gas limit for the message.
     */
    function _sendXDomainMessage(bytes memory _message, uint256 _gasLimit)
        internal
        override
    {
        iOVM_CanonicalTransactionChain(resolve("OVM_CanonicalTransactionChain"))
            .enqueue(
            resolve("OVM_L2CrossDomainMessenger"),
            _gasLimit,
            _message
        );
    }
}
