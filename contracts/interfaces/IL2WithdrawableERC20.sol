// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.7.3;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IL2WithdrawableERC20 is IERC20 {
    /// @notice Approves `amount` of the underlying ERC20 on L1 to the `recipient` on L1.
    /// @notice Burns the `amount` on L2.
    /// @return l1Bank The address that will approve `amount` of their `l1Address` tokens to `recipient` on L1.
    function approvalWithdraw(uint256 amount, address recipient)
        external
        returns (address l1Bank);

    /// @notice Returns the address of the underying ERC20 on L1.
    function l1Address() external returns (address);
}
