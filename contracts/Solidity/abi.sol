// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Abi {
    function getAbiEncoding1(bytes calldata a) public pure returns(bytes memory) {
        return abi.encode(a);
    }

    function getAbiEncoding2(bytes32 a) public pure returns(bytes memory) {
        return abi.encode(a);
    }

    /**
     * @param funcName : : "funcName"
     * @param arg : 1
     * @return 0x44df19690000000000000000000000000000000000000000000000000000000000000001
     */
    function abiEncodeWithSignature(string calldata funcName,uint256 arg) public pure returns(bytes memory) {
        return abi.encodeWithSignature(funcName, arg);
    }

    /**
     * @param funcSelector : : 0x44df1969
     * @param arg : 1
     * @return 0x44df19690000000000000000000000000000000000000000000000000000000000000001
     */
    function abiEncodeWithSelector(bytes4 funcSelector,uint256 arg) public pure returns(bytes memory) {
        return abi.encodeWithSelector(funcSelector, arg);
    }
    /**
     * 
     * @param funcSelector : 0x44df1969
     * @param arg : 1
     * @return 0x44df19690000000000000000000000000000000000000000000000000000000000000001
     */
    function abiEncodePacked(bytes4 funcSelector,uint256 arg) public pure returns(bytes memory) {
        return abi.encodePacked(funcSelector,arg);
    }

    struct PermitSigData {
        address owner;
        address spender;
        uint256 value;
        uint256 nonce;
        uint256 deadline;
    }

    // calldata : 0xb82226e50000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc40000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001
    function permit(PermitSigData memory _permitSigData) public pure returns(bytes4) {
        return bytes4(msg.data);
    }

    // calldata : 0xb82226e50000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc40000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001
    function abiEncodeWithSignatureFuncpermit(PermitSigData memory _permitSigData) public pure returns(bytes memory) {
        return abi.encodeWithSignature("permit((address,address,uint256,uint256,uint256))", _permitSigData);
    }
}