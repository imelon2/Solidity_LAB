// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract convert {
    function stringToBytes32(string memory _msg) public pure returns(bytes32) {
        return bytes32(abi.encodePacked(_msg));
    }
    
    function keccak256ByString(string memory _msg) public pure returns(bytes32) {
        return keccak256(abi.encodePacked(_msg));
    }

    function concatSig(uint8 v, bytes32 r, bytes32 s) public pure returns(bytes memory signature) {
        return abi.encodePacked(r,s,v);
    }
}