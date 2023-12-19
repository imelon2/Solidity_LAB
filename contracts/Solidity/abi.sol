// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Abi {
    function getAbiEncoding1(bytes calldata a) public pure returns(bytes memory) {
        return abi.encode(a);
    }

    function getAbiEncoding2(bytes32 a) public pure returns(bytes memory) {
        return abi.encode(a);
    }

    function getStringAbiEncoding1(string memory a) public pure returns(bytes memory) {
        return abi.encode(a);
    }

    // function getStringAbiEncoding2(bytes32 a) public pure returns(bytes memory) {
    //     // return abi.encode(a);
    // }

    function getStringAbiEncoding2(bytes32 a) public pure returns(bytes memory) {
        // return abi.encode(a);
    }
}