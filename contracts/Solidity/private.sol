// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract Parent {
    bytes32 private immutable _hashedName;
    bytes32 private immutable _hashedVersion;

    constructor(string memory name, string memory version) {
        _hashedName = keccak256(bytes(name));
        _hashedVersion = keccak256(bytes(version));

    }

    function getParentHashedName() public view returns(bytes32) {
        return _hashedName;
    }

    function getParentHashedVersion() public view returns(bytes32) {
        return _hashedVersion;
    }
}

// contract Child is Parent{
//     bytes32 public immutable _hashedName;
//     bytes32 public immutable _hashedVersion;
    
//     constructor() Parent("Escrow","1") {

//     }
// }