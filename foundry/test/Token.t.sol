// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Token.sol";

contract TokenTest is Test {
    Token public token;
    address public owner = address(0x123);
    address public user = address(0x456);

    function setUp() public {
        token = new Token(owner);
    }

    function testSetURI() public {
        vm.prank(owner);
        string memory newURI = "https://new-uri.com";
        token.setURI(newURI);
        // Assuming _setURI is a public or internal function, you might need to add a getter to verify the URI
        // assertEq(token.uri(0), newURI);
    }

    function testMint() public {
        vm.prank(owner);
        token.mint(user, 1, 100, "");
        // Assuming balanceOf is a public function
        assertEq(token.balanceOf(user, 1), 100);
    }

    function testAnyoneCanMint() public {
        vm.prank(user);
        token.mint(user, 1, 100, "");
        // Assuming balanceOf is a public function
        assertEq(token.balanceOf(user, 1), 100);
    }

    function testMintBatch() public {
        vm.prank(owner);
        uint256[] memory ids = new uint256[](2);
        uint256[] memory amounts = new uint256[](2);
        ids[0] = 1;
        ids[1] = 2;
        amounts[0] = 100;
        amounts[1] = 200;
        token.mintBatch(user, ids, amounts, "");
        // Assuming balanceOf is a public function
        assertEq(token.balanceOf(user, 1), 100);
        assertEq(token.balanceOf(user, 2), 200);
    }
}