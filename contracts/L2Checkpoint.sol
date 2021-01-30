// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.7.3;

import "./interfaces/IL2WithdrawableERC20.sol";

import {
    iOVM_BaseCrossDomainMessenger
} from "@eth-optimism/contracts/build/contracts/iOVM/bridge/iOVM_BaseCrossDomainMessenger.sol";

// import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title [L2] Contract for withdrawing an ERC20 and minting an ERC1155 as an IOU on L1.
/// @dev You need to deploy a custom CrossDomainMessenger with no/little delay to mint the IOU ERC1155 on L2 quickly.
contract L2Checkpoint is ReentrancyGuard {
    // using SafeERC20 for IL2WithdrawableERC20;

    /// @notice The cross domain messenger used to mint the IOU ERC1155 on L1 quickly.
    iOVM_BaseCrossDomainMessenger public minterMessenger;

    /// @notice The broker contract on L1 this contract will pass a message to for minting the IOU ERC1155.
    address public l1Broker;

    /// @notice Creates a new L2Checkpoint contract.
    /// @param _minterMessenger THe cross domain messenger used to mint the IOU ERC1155 on L1 quickly.
    /// @param _l1Broker The address of the L1Broker contract on L1.
    constructor(
        iOVM_BaseCrossDomainMessenger _minterMessenger,
        address _l1Broker
    ) {
        minterMessenger = _minterMessenger;
        l1Broker = _l1Broker;
    }

    /// @notice Calls the `approvalWithdraw` method on the `l2Token` with `amount` and mints a withdraw ERC1155 subtoken that is sent to the `recipient` on L1 via a custom messenger.
    /// @notice You must approve `amount` of `l2Token` to this contract before calling this method.
    /// @param l2Token The address of the l2 token to call `approvalWithdraw` on.
    /// @param amount The amount (in the decimal scale of the l2/l1 ERC20) to withdraw.
    /// @param recipient The address of the user on L1 that will recieve the ERC1155 subtoken.
    function _withdrawAndMint(
        IL2WithdrawableERC20 l2Token,
        uint256 amount,
        address recipient
    ) public nonReentrant {
        // Take control of their token by transfering it to this contract.
        l2Token.transferFrom(msg.sender, address(this), amount);

        // Call the withdraw method which should burn the token and send a L1 message to approve the underlying tokens to our L1Broker contract!
        address l1Bank =
            l2Token.approvalWithdraw({amount: amount, recipient: l1Broker});

        // Mint an ERC1155 subtoken L1 by passing a message through our minterMessanger which should be configured to have a very low to 0 delay before passing the message to L1.
        minterMessenger.sendMessage(
            l1Broker,
            abi.encodeWithSignature(
                "mintIOU(address,address,address,uint256)",
                recipient,
                l2Token.l1Address(),
                address(l2Token),
                l1Bank,
                amount
            ),
            1000000
        );
    }

    /// @notice Identical functionality to `_withdrawAndMint` but mints the subtokens and sends them to msg.sender on L1.
    /// @notice You must approve `amount` of `l2Token` to this contract before calling this method.
    /// @param l2Token The address of the l2 token to call `approvalWithdraw` on.
    /// @param amount The amount (in the decimal scale of the l2/l1 ERC20) to withdraw.
    function withdrawAndMint(IL2WithdrawableERC20 l2Token, uint256 amount)
        external
    {
        _withdrawAndMint(l2Token, amount, msg.sender);
    }
}
