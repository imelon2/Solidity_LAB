// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Context {
    function msgSender() pure public returns(address sender) {
            assembly {
                sender := shr(96, calldataload(sub(calldatasize(), 20)))
            }
    }

    fallback() external {
        msgSender();
     }
}

// 0xd737d0c75B38Da6a701c568545dCfcB03FcB875f56beddC4Ab8483F64d9C6d1EcF9b849Ae677dD3315835cb2