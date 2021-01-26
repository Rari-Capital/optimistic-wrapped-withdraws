// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;

import "./L2Checkpoint.sol";
import "./L1OptimismWithdraw.sol";
import "./interfaces/IL2WithdrawableERC20.sol";

import {
    iOVM_BaseCrossDomainMessenger
} from "@eth-optimism/contracts/build/contracts/iOVM/bridge/iOVM_BaseCrossDomainMessenger.sol";

/// @title [L1] Contract that responds to messages from the L2Checkpoint to mint withdrawal NFTs. It also allows uesrs on L2 to redeem them for the L1 tokens after the waiting period is up.
/// @dev You need to deploy a L2Checkpoint contract that will be authorized to send messages to this contract.
contract L1Broker {
    using SafeERC20 for IL2WithdrawableERC20;

    /// @notice The messenger that is authorized to relay messages from L2 -> L1. This messenger should have little to no waiting period.
    iOVM_BaseCrossDomainMessenger public messenger;

    /// @notice The ERC1155 contract this contract will use to mint IOU withdraw tokens.
    L1OptimismWithdraw public token;

    /// @notice The address of the L2Checkpoint contract (deployed on L2) that is authorized to mint tokens via this contract.
    address public l2Checkpoint;

    /// @dev The next ID to be used as an ERC1155 subtoken ID.
    uint256 internal nextID = 0;

    /// @notice Creates a new L1Broker contract with a CrossDomainMessenger and a L2Checkpoint contract.
    /// @param _messenger The messenger that is authorized to relay messages from L2 -> L1. This messenger should have little to no waiting period.
    /// @param _l2Checkpoint The address of the L2Checkpoint contract (deployed on L2) that is authorized to mint tokens via this contract.
    ///@param _token The ERC1155 contract this contract will use to mint IOU withdraw tokens.
    constructor(
        iOVM_BaseCrossDomainMessenger _messenger,
        address _l2Checkpoint,
        L1OptimismWithdraw _token
    ) {
        messenger = _messenger;
        l2Checkpoint = _l2Checkpoint;
        token = _token;
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
    /// @param l1Bank The address that will approve `amount` of their `l1ERC20` tokens to `recipient` on L1.
    /// @param amount The amount to mint in the decimal scale of the underlying ERC20.
    /// @return The ID number of the newly minted subtoken on the L1OptimismWithdraw ERC1155.
    function mintIOU(
        address recipient,
        address l1ERC20,
        address l2ERC20,
        address l1Bank,
        uint256 amount
    ) external onlyCrossDomainMessenger returns (uint256) {
        // The message should come from our L2Checkpoint contract.
        require(l2Checkpoint == messenger.xDomainMessageSender());

        // Store a copy of the nxtID before we increment it.
        uint256 id = nextID;

        // Increment the nextID.
        nextID += 1;

        // Mint the subtoken.
        token.mint(id, recipient, l1ERC20, l2ERC20, l1Bank, amount);

        // Return the ID of the newly minted subtoken.
        return id;
    }

    /// @notice Redeems a L1OptimismWithdraw ERC1155 subtoken by: burning the `amount` of IOU token and transfers the `amount` of the underlying ERC20 token to the sender.
    /// @param id The ID of the subtoken to redeem.
    /// @param amount The amount to redeem in the decimal scale of the underlying ERC20.
    function redeemIOU(uint256 id, uint256 amount) external {
        // Burn the IOU tokens.
        token.burn(msg.sender, amount, id);

        // Get the metadata we need to redeem.
        (address l1ERC20, , address l1Bank) = token.metadata(id);

        // Redeem underlying
        IL2WithdrawableERC20(l1ERC20).safeTransferFrom(
            l1Bank,
            msg.sender,
            amount
        );
    }
}
