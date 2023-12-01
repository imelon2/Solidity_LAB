// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


contract Caller {
    function callCode(address implement) public view returns(bytes memory result) {
        result = implement.code;
    }

    function callChainId() public view returns(uint256) {
        return block.chainid;
    }
}