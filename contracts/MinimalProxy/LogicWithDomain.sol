// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

contract LogicWithDomain is EIP712 {
    constructor() EIP712("Escrow","1") {}
}