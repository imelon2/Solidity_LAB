// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/proxy/Clones.sol";

contract LogicContract {
    string public message;
    

    function setMsg(string calldata newMsg) public {
        message = newMsg;
    }
}

contract MinimalProxy {
    address[] public clones;

    function clone(address implement) public {
        address proxy = Clones.clone(implement);
        clones.push(proxy);
    }
}

contract Caller {
    function call(address implement) public view returns(bytes memory result) {
        result = implement.code;
    }
}
