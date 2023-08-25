// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.^20;

/**
 * @title Bitmap을 활용한 데이터 레이아웃 최적화
 * TYPE Bool은 1 bytes(8 bits)의 용량을 차지함
 * uint256(256 bits)의 비트 index를 활용하여, 활성화된 index는 true, 비활성화된 index는 false
 * @result 8 bits -> 1 bit 8배 최적화 가능
 */
contract Bitmap {
    uint256 bitmap;

    function set(uint256 index, bool val) external {
        if(val) {
            bitmap = bitmap | ( 1 << index);
        } else {
            bitmap = bitmap & (0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff ^ ( 1 << index));
        }
    }

    function get(uint256 index) external view returns(uint) {
        return bitmap & (1 << index);
    }
}