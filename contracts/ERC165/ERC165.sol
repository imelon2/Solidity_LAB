    // SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @dev ERC
 */
contract MyToken is ERC20, ERC165 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function supportsInterface(bytes4 interfaceId) override public view returns (bool) {
        /**
         * @dev type(I).interfaceId : Solidity/interfaceId.sol 참고
         */
        return interfaceId == type(IERC20).interfaceId || super.supportsInterface(interfaceId);
    }
}
