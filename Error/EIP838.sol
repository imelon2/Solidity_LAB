// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// https://github.com/ethereum/EIPs/issues/838
/**
    * bytes4(keccak256(Error(string))) : 0x08c379a0 + abi.encode(string type of error msg)
    * bytes4(keccak256(Error(RevertCase2(uint256))) : 0xe97c80a4 + abi.encode(custome Error`s params)
*/
contract SourceContract {

    address public targetContract;

    constructor(address _targetContract) {
        targetContract = _targetContract;
    }

    function pingMessage(bytes memory data) public returns(bytes memory result,bool success) {
        // test if accept can accept requests
        (success, result) = targetContract.call(data);

    }

}

contract TargetContract {

    error RevertCase2(uint256);
    
    function ping(uint _case) public pure {
        if(_case == 0) {
            require(_case != 0,"Require Case 0");
        } else if (_case == 1) {
            revert("Revert Case 1");
        } else {
            revert RevertCase2(_case);
        }
    }

    function selector(string memory _name) public pure returns(bytes4) {
        return bytes4(keccak256(abi.encodePacked(_name)));
    }

    function toBytes(string memory data) public pure returns(bytes memory result) {
        return abi.encode(data);
    }

    function toBytes2(uint256 data) public pure returns(bytes memory result) {
        return abi.encode(data);
    }

}