// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Escrow.sol";
import "../src/Token.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract EscrowTest is Test, ERC1155Holder {
    Escrow private escrow;
    Token private token;
    address private owner;
    address private buyer;
    address private seller;

    function setUp() public {
        owner = address(this);
        buyer = vm.addr(1);
        seller = vm.addr(2);
        token = new Token(owner);
        escrow = new Escrow(owner, address(token),0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD);

        // Mint tokens to the seller
        token.mint(seller, 1, 5, "");

        vm.startPrank(seller);
        // Approve the escrow contract to handle seller's tokens
        token.setApprovalForAll(address(escrow), true);
        vm.stopPrank();
    }

    function testCreateTrade() public {
        vm.startPrank(seller);

        Escrow.TokenDetails[] memory tokenDetails = new Escrow.TokenDetails[](1);
        tokenDetails[0] = Escrow.TokenDetails({tokenId: 1, amount: 5, price: 1 ether});

        escrow.createTrade(buyer, tokenDetails);
        vm.stopPrank();

        Escrow.Trade memory trade = escrow.getTradeDetails(1);
        assertEq(trade.buyer.userAddress, buyer);
        assertEq(trade.seller.userAddress, seller);
        assertEq(trade.tokenDetails[0].tokenId, 1);
        assertEq(trade.tokenDetails[0].amount, 5);
        assertEq(trade.tokenDetails[0].price, 1 ether);
        assertEq(uint256(trade.status), uint256(Escrow.TradeStatus.REQUESTED));
    }

    function testDepositSellerTokens() public {
        vm.startPrank(seller);

        Escrow.TokenDetails[] memory tokenDetails = new Escrow.TokenDetails[](1);
        tokenDetails[0] = Escrow.TokenDetails({tokenId: 1, amount: 5, price: 1 ether});

        escrow.createTrade(buyer, tokenDetails);
        escrow.deposit(1, _arrayOf(1), _arrayOf(5), Escrow.User.Seller);
        vm.stopPrank();

        Escrow.Trade memory trade = escrow.getTradeDetails(1);
        assertEq(uint256(trade.seller.userStatus), uint256(Escrow.UserStatus.DEPOSITED));
    }

    function testDepositBuyerETH() public {
        vm.startPrank(seller);

        Escrow.TokenDetails[] memory tokenDetails = new Escrow.TokenDetails[](1);
        tokenDetails[0] = Escrow.TokenDetails({tokenId: 1, amount: 5, price: 1 ether});

        escrow.createTrade(buyer, tokenDetails);
        escrow.deposit(1, _arrayOf(1), _arrayOf(5), Escrow.User.Seller);
        vm.stopPrank();

        vm.deal(buyer, 1 ether);
        vm.startPrank(buyer);
        escrow.deposit{value: 1 ether}(1, _arrayOf(0), _arrayOf(0), Escrow.User.Buyer);
        vm.stopPrank();

        Escrow.Trade memory trade = escrow.getTradeDetails(1);
        assertEq(uint256(trade.buyer.userStatus), uint256(Escrow.UserStatus.DEPOSITED));
        assertEq(trade.buyer.depositBalance, 1 ether);
    }

    function testConfirmTrade() public {
        vm.startPrank(seller);

        Escrow.TokenDetails[] memory tokenDetails = new Escrow.TokenDetails[](1);
        tokenDetails[0] = Escrow.TokenDetails({tokenId: 1, amount: 5, price: 1 ether});

        escrow.createTrade(buyer, tokenDetails);
        escrow.deposit(1, _arrayOf(1), _arrayOf(5), Escrow.User.Seller);
        vm.stopPrank();

        // Check escrow contract's token balance
        uint256 escrowBalance = token.balanceOf(address(escrow), 1);
        assertEq(escrowBalance, 5, "Escrow should have received the tokens");

        vm.deal(buyer, 1 ether);
        vm.startPrank(buyer);
        escrow.deposit{value: 1 ether}(1, _arrayOf(0), _arrayOf(0), Escrow.User.Buyer);
        escrow.confirmTrade(1);
        vm.stopPrank();

        vm.startPrank(seller);
        escrow.confirmTrade(1);
        vm.stopPrank();

        Escrow.Trade memory trade = escrow.getTradeDetails(1);
        assertEq(uint256(trade.status), uint256(Escrow.TradeStatus.COMPLETE));
        assertGt(trade.completedTimestamp, 0);
    }

    function _arrayOf(uint256 element) internal pure returns (uint256[] memory) {
        uint256[] memory array = new uint256[](1);
        array[0] = element;
        return array;
    }
}

