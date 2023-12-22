// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
// import "@openzeppelin/contracts/utils/Multicall.sol";
import {Multicall} from "./Multicall.sol";
import "hardhat/console.sol";

contract MyToken is ERC2771Context, ERC20, Ownable, ERC20Permit, Multicall {

    constructor(address forwarder) 
    ERC20("MyToken", "MTK") 
    ERC20Permit("MyToken")
    ERC2771Context(forwarder)
    {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        // Logging
        console.log( _msgSender());
        
        return super.transfer(to,amount);
    }

    function _msgSender() internal view virtual override(Context, ERC2771Context) returns (address sender) {
        return super._msgSender();
    }

    function _msgData() internal view virtual override(Context, ERC2771Context) returns (bytes calldata) {
        return super._msgData();
    }

    function _contextSuffixLength() internal view virtual override(Context,ERC2771Context) returns (uint256) {
        return 20;
    }
}
