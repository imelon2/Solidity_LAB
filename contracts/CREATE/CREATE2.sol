// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract TestContract {
    address public owner;
    uint public foo;

    constructor(address _owner, uint _foo) payable {
        owner = _owner;
        foo = _foo;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

contract Create2 {
    function deployByNew(
        address _owner,
        uint _foo,
        bytes32 _salt
    ) public payable returns (address) {

        /// non-payable constructor
        TestContract contractAddress = new TestContract{salt: _salt}(_owner, _foo);
        
        /// payable constructor
        // TestContract contractAddress = new TestContract{salt: _salt,value:msg.value}(_owner, _foo);

        return address(contractAddress);
    }

    function deploy(bytes memory bytecode, uint _salt) public payable returns(address){
        address addr;

        assembly {
            addr := create2(
                callvalue(), // wei sent with current call
                // Actual code starts after skipping the first 32 bytes
                add(bytecode, 0x20),
                mload(bytecode), // Load the size of code contained in the first 32 bytes
                _salt // Salt from function arguments
            )

            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }

        return addr;
    }
}
