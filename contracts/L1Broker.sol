// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;

import "./L2Checkpoint.sol";

import {
    iOVM_BaseCrossDomainMessenger
} from "@eth-optimism/contracts/build/contracts/iOVM/bridge/iOVM_BaseCrossDomainMessenger.sol";

/// @title [L1] Contract that responds to messages from the L2Checkpoint to mint withdrawal NFTs. It also allows uesrs on L2 to redeem them for the L1 tokens after the waiting period is up.
/// @dev You need to deploy a L2Checkpoint contract that will be authorized to send messages to this contract.
contract L1Broker {
    /// @notice The messenger that is authorized to relay messages from L2 -> L1. This messenger should have little to no waiting period.
    iOVM_BaseCrossDomainMessenger public messenger;

    /// @notice The address of the L2Checkpoint contract (deployed on L2) that is authorized to mint tokens via this contract.
    address public l2Checkpoint;

    /// @notice Creates a new L1Broker contract with a CrossDomainMessenger and a L2Checkpoint contract.
    /// @param _messenger The messenger that is authorized to relay messages from L2 -> L1. This messenger should have little to no waiting period.
    /// @param _l2Checkpoint The address of the L2Checkpoint contract (deployed on L2) that is authorized to mint tokens via this contract.
    constructor(iOVM_BaseCrossDomainMessenger _messenger, address _l2Checkpoint)
    {
        messenger = _messenger;
        l2Checkpoint = _l2Checkpoint;
    }

    modifier onlyCrossDomainMessenger {
        require(
            msg.sender == address(messenger),
            "Only the cross domain messenger can call this method."
        );
        _;
    }

    /// @notice Mints a L1OptimismWithdraw ERC1155 subtoken.
    /// @notice Only the `l2Checkpoint` contract is authorized to call this method.
    /// @param recipient The address who should be the recipient of the newly minted NFT.
    /// @param l1ERC20 The address of the token (on L1) the l2ERC20 has told us it will unwrap to (this is not guaranteed which is why we store the l2ERC20 so users can choose if they trust the token).
    /// @param l2ERC20 The address of the token (on L2) that the L2Checkpoint initiated a withdraw on.
    /// @param amount The amount to mint in the decimal scale of the underlying ERC20.
    /// @return The ID number of the newly minted subtoken on the L1OptimismWithdraw ERC1155.
    function mintWithdrawNFT(
        address recipient,
        address l1ERC20,
        address l2ERC20,
        uint256 amount
    ) external onlyCrossDomainMessenger returns (uint256) {
        // The message should come from our L2Checkpoint contract.
        require(l2Checkpoint == messenger.xDomainMessageSender());
    }
}
