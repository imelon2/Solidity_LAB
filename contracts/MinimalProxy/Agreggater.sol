// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Agreggater {
    address public minimal;
    constructor(address _minimal) {
        minimal = _minimal;
    }

    function callMinimal(bytes memory data) public returns(bytes memory,bool) {
        (bool success,bytes memory result) = minimal.call(data);
        return (result,success);
    }
}