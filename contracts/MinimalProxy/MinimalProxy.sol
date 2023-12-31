// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/proxy/Clones.sol";

contract MinimalProxy {
    address immutable logicContract;
    constructor(address _logicContract) {
        logicContract = _logicContract;
    }

    function delegate() external returns (bytes memory) {
        (bool success, bytes memory data) = logicContract.delegatecall(msg.data);
        require(success);

        return data;
    }
}


contract LogicContract {
    string public message;
    
    function setMsg(string calldata newMsg,bool _is) public {
        require(_is,"ERROR");
        message = newMsg;
    }
}

contract MinimalProxyFactory {
    address[] public clones;

    function clone(address implement) public {
        address proxy = Clones.clone(implement);
        clones.push(proxy);
    }
}
