// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Constant {
    bytes32 private immutable _hashedName;
    bytes32 private immutable _hashedVersion;

    constructor(string memory name, string memory version) {
        _hashedName = keccak256(bytes(name));
        _hashedVersion = keccak256(bytes(version));

    }

    function getHashedName() public view returns(bytes32) {
        return _hashedName;
    }
}

contract test {
    function getHashCode(address addr) public view returns(bytes32) {
        return addr.codehash;
    }

    function getCode(address addr) public view returns(bytes memory) {
        return addr.code;
    }
}