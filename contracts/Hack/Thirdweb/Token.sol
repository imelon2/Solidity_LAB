// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.9;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
// import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

// contract MyToken is ERC20, Ownable, ERC20Permit, ERC2771Context {
//     constructor(address forwarder) 
//     ERC20("MyToken", "MTK") 
//     ERC20Permit("MyToken")
//     ERC2771Context(forwarder)
//     {
//         _mint(msg.sender, 1000 * 10 ** decimals());
//     }

//     function mint(address to, uint256 amount) public onlyOwner {
//         _mint(to, amount);
//     }

//     function _msgSender() internal view virtual override(Context, ERC2771Context) returns (address sender) {
//         if (isTrustedForwarder(msg.sender)) {
//             assembly {
//                 sender := shr(96, calldataload(sub(calldatasize(), 20)))
//             }
//         } else {
//             return super._msgSender();
//         }
//     }

//     function _msgData() internal view virtual override(Context, ERC2771Context) returns (bytes calldata) {
//         if (isTrustedForwarder(msg.sender)) {
//             return msg.data[:msg.data.length - 20];
//         } else {
//             return super._msgData();
//         }
//     }
// }
