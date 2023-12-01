// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
/**
 * @dev 
 * 
 * type(I).interfaceId는 ERC165에서 제안된 인터페이스 식별자(interface identifier)이다.
 * EIP 또는 ERC는 주로 인터페이스에 함수명, 파라미터 등을 정의하여 표준화 시킨다. 
 * 이때, 해당 컨트렉트가 표준에서 제시한 인터페이스를 사용하고 있는지 검사하기 위해 인터페이스 식별자가 사용된다.
 * 
 * type(I).interfaceId는 인터페이스에 정의된 모든 함수의 함수 선택자(function selector)를 XOR연산한 값(bytes4)을 리턴한다.
 * 
 * [ Reference ]
 * Solidity 0.8.23 docs : 
 *      https://docs.soliditylang.org/en/v0.8.23/units-and-global-variables.html#type-information
 * 
 */
interface IMyInterface {
    function func1() external view returns (bytes32);
    function func2() external;
}

contract MyContract {
    bytes4 public _interfaceId;

    function getInterfaceId() public pure returns(bytes4) {
        return type(IMyInterface).interfaceId; // 0xc5beb58f
    }

    function getFunc1Selector() public pure returns(bytes4) {
        return IMyInterface.func1.selector; // 0x74135154
    }

    function getFunc2Selector() public pure returns(bytes4) {
        return IMyInterface.func2.selector; // 0xb1ade4db
    }

    function createInterfaceId() public pure returns(bytes4) {
        return getFunc1Selector() ^ getFunc2Selector(); // 0xc5beb58f
    }

}