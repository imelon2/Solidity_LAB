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

// 0x01ef92fed5619c42d57f82539dc0fd45d8e4a7885c1f09264901979eda7714b6

//0xd9145CCE52D386f254917e481eB44e9943F39138
//3d602d80600a3d3981f3
//363d3d373d3d3d363d73bebebebebebebebebebebebebebebebebebebebe5af43d82803e903d91602b57fd5bf3
//363d3d373d3d3d363d73d9145cce52d386f254917e481eb44e9943f391385af43d82803e903d91602b57fd5bf3