// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// ERC20 token used for unit testing
contract TestTokenWETH is ERC20 {
    constructor(uint256 initialSupply) ERC20("TestTokenWETH", "WETH") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
