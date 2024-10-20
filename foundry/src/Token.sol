// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC1155, Ownable {
    constructor(address initialOwner)
        ERC1155("https://sapphire-preferred-bison-599.mypinata.cloud/ipfs/QmeuvRfgqwxUt7NqackekJX1R7pFrP9NAYFiqv7T1AAhgx/")
        Ownable(initialOwner)
    {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(
      address account, 
      uint256 id, 
      uint256 amount, 
      bytes memory data
    ) public {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        
    {
        _mintBatch(to, ids, amounts, data);
    }
}
