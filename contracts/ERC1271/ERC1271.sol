// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";

// contract ERC1271 is IERC1271 {
contract ERC1271 {
    address private _owner;

    constructor(address a) {
        _owner = a;
    }

    function owner() public view returns(address) {
        return _owner;
    }

    function isValidSignature(bytes32 hash, bytes memory signature)
            external
            view
            returns (bool)
        {
            bool isValid = SignatureChecker.isValidSignatureNow(owner(), hash, signature);

            return isValid;
            // if (isValid) {
            //     return IERC1271.isValidSignature.selector;
            // }

            // return "";
        }
}