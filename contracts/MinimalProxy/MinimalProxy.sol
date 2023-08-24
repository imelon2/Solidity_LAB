// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/proxy/Clones.sol";

contract MinimalProxy {
    address constant logicContract = "0xbebebebebebebebebebebebebebebebebebebebe";

    function delegate() external returns (bytes memory) {
        (bool success, bytes memory data) = logicContract.delegatecall(msg.data);
        require(success);

        return data;
    }
}


contract LogicContract {
    string public message;
    
    function setMsg(string calldata newMsg) public {
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
