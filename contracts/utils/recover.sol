// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract recover {
    function recoverFunc(
        bytes32 hash,
        bytes32 r,
        bytes32 s,
        uint8 v) public pure returns(address) {
            return ecrecover(hash, v, r, s);
        }
}