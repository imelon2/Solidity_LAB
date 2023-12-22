// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/utils/Address.sol";
import "hardhat/console.sol";

contract Multicall {
    function multicall(bytes[] calldata data) external virtual returns (bytes[] memory results) {
      // Logging
      console.log(string(data[0]));
      results = new bytes[](data.length);
      for (uint256 i = 0; i < data.length; i++) {
          results[i] = Address.functionDelegateCall(address(this), data[i]);
      }
      return results;
  }
}