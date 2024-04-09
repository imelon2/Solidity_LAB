// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract mloadBytes {

    struct Name {
        uint256 a;
        uint256 b;
    }

    function asem_add(bytes memory bytescode,bytes32 a) pure public returns(bytes32) {
        bytes32 result;
        assembly {
            result := add(bytescode, a)
        }

        return result;
    }

    function asem_add1(bytes32 a,bytes32 b) pure public returns(bytes32) {
        bytes32 result;
        assembly {
            result := add(a, b)
        }

        return result;
    }

    function asem_add2(bytes memory a,bytes memory b) pure public returns(bytes32) {
        bytes32 result;
        assembly {
            result := add(a, b)
        }

        return result;
    }

    function asem_mload(bytes memory a,bytes memory b,bytes memory c) pure public returns(bytes32) {
        // bytes32 result;
        // assembly {
        //     result := mload(b)
        // }

        // return result;
    }

    function asem_mload1(bytes32 a) pure public returns(bytes32) {
        bytes32 result;
        assembly {
            result := mload(a)
        }

        return result;
    }

    function bytesLength1(bytes memory a) pure public returns(uint256) {
        return a.length;
    }

    function bytesLength2(bytes32 a) pure public returns(uint256) {
        return a.length;
    }

    function mload(bytes memory a) pure public returns(bytes memory) {
        bytes memory result;
        assembly {
            result := mload(a)
        }

        return result;
    }
}