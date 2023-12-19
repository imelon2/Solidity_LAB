// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Max {
    function getMax() public pure returns(uint) {
        return type(uint24).max;
    }

    function getMaxByBytes() public pure returns(bytes memory) {
        return abi.encode(type(uint64).max);
    }
}

//16777215
//1048575