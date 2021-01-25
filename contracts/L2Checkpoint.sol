// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;

import "./interfaces/IL2WithdrawableERC20.sol";

import {
    iOVM_BaseCrossDomainMessenger
} from "@eth-optimism/contracts/build/contracts/iOVM/bridge/iOVM_BaseCrossDomainMessenger.sol";

import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

/// @title [L2] Contract for withdrawing an ERC20 and minting an ERC1155 as an IOU on L1.
/// @dev You need to deploy a custom CrossDomainMessenger with no/little delay to mint the IOU ERC1155 on L2 quickly.
contract L2Checkpoint {
    using SafeERC20 for IL2WithdrawableERC20;

    /// @notice A custom cross domain messenger with no/little delay to mint the IOU ERC1155 on L2 quickly.
    iOVM_BaseCrossDomainMessenger public minterMessenger;

    /// @notice The broker contract on L1 this contract will pass a message to for minting the IOU ERC1155.
    address public l1Broker;

    /// @notice Creates a new L2Checkpoint contract.
    /// @param _minterMessenger The cross domain messanger to send the mint NFT call to the L1Broker contract. It should be configured to have little to no delay.
    /// @param _l1Broker The address of the L1Broker contract on L1.
    constructor(
        iOVM_BaseCrossDomainMessenger _minterMessenger,
        address _l1Broker
    ) {
        minterMessenger = _minterMessenger;
        l1Broker = _l1Broker;
    }

    /// @notice Calls the `approvalWithdraw` method on the `l2Token` with `amount` and mints a withdraw NFT on L1 via a custom messenger.
    /// @param l2Token The address of the l2 token to call `approvalWithdraw` on.
    /// @param amount The amount (in the decimal scale of the l2/l1 ERC20) to withdraw.
    function withdrawAndMint(IL2WithdrawableERC20 l2Token, uint256 amount)
        external
    {
        // Take control of their token by transfering it to this contract.
        l2Token.safeTransferFrom(msg.sender, address(this), amount);
        // Call the withdraw method which should burn the token and send a L1 message to approve the underlying tokens to our L1Broker contract!
        l2Token.approvalWithdraw({amount: amount, recipient: l1Broker});

        // Mint an NFT on L1 by passing a message through our minterMessanger which should be configured to have a very low to 0 delay before passing the message to L1.
        minterMessenger.sendMessage(
            l1Broker,
            abi.encodeWithSignature(
                "mintWithdrawNFT(address,address,address,uint256)",
                msg.sender,
                l2Token.l1Address(),
                address(l2Token),
                amount
            ),
            1000000
        );
    }
}
