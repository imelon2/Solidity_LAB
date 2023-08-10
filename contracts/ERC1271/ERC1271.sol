// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";

contract ERC1271 is IERC1271 {
    address private _owner;

    constructor(address owner) {
        _owner = owner;
    }

    function owner() public view returns(address) {
        return _owner;
    }

    function isValidSignature(bytes32 hash, bytes memory signature)
            external
            view
            returns (bytes4 magicValue)
        {
            bool isValid = SignatureChecker.isValidSignatureNow(owner(), hash, signature);

            if (isValid) {
                return IERC1271.isValidSignature.selector;
            }

            return "";
        }
}