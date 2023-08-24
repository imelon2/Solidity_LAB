// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract abiUtil {

    function abiEncode(
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 salt
    ) public pure returns(bytes memory) {
        return abi.encode(salt, chainId, tokenContract, tokenId);
    }
}
