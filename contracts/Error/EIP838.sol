// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// https://github.com/ethereum/EIPs/issues/838
/**
 *  bytes4(keccak256(Error(string))) : 0x08c379a0 + abi.encode(string type of error msg)
 *  bytes4(keccak256(Error(RevertCase2(uint256,string))) : 0xe9f07632 + abi.encode(custome Error`s params1,params2)
*/
contract ExcuteContract {

    error ExternalError(bytes);

    address public implement;
    bytes public a;

    constructor(address _implement) {
        implement = _implement;
    }

    function excute(bytes memory data) public returns(bytes memory result,bool success) {
        // test if accept can accept requests
        (success, result) = implement.call(data);
        a = result;
        // if(!success) revert ExternalError(result);
    }

}

contract ErrorContract {

    error RevertCase2(uint256,string);
    
    uint256 num;
    function ping(uint _case) public {
        if(_case == 0) {
            require(_case != 0,"Require Case 0");
        } else if (_case == 1) {
            revert("Revert Case 1");
        } else if(_case == 2) {
            revert RevertCase2(_case,"Custom Error Case 3");
        }

        num = _case;
    }

    function selector(string memory _name) public pure returns(bytes4) {
        return bytes4(keccak256(abi.encodePacked(_name)));
    }

    function toByteString(string memory data) public pure returns(bytes memory result) {
        return abi.encode(data);
    }

    function toBytesUint(uint256 data) public pure returns(bytes memory result) {
        return abi.encode(data);
    }

}