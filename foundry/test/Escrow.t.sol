// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Escrow.sol" as EscrowContract;
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract EscrowTest is Test, ERC1155Holder {
    EscrowContract.Escrow private escrow;
    address private owner;
    address private buyer;
    address private seller;

    function setUp() public {
        owner = address(this);
        buyer = vm.addr(1);
        seller = vm.addr(2);
        escrow = new Escrow(owner);

        vm.startPrank(seller);
        vm.stopPrank();
    }

    function testCreateTrade() public {
        // Mint NFT to seller
        vm.startPrank(seller);

        EscrowContract.Escrow.TokenDetails[] memory tokenDetails = new Escrow.TokenDetails[](1);
        tokenDetails[0] = Escrow.TokenDetails({
            tokenId: 1,
            amount: 5,
            price: 1 ether
        });

        escrow.createTrade(buyer, tokenDetails);
        vm.stopPrank();

        EscrowContract.Escrow.Trade memory trade = escrow.getTradeDetails(1);
        assertEq(trade.buyer.userAddress, buyer);
        assertEq(trade.seller.userAddress, seller);
        assertEq(trade.tokenDetails[0].tokenId, 1);
        assertEq(trade.tokenDetails[0].amount, 5);
        assertEq(trade.tokenDetails[0].price, 1 ether);
        assertEq(uint256(trade.status), uint256(EscrowContract.Escrow.TradeStatus.REQUESTED));
    }

    function testDepositSellerTokens() public {
        // Mint NFT to seller
        vm.startPrank(seller);

        Escrow.TokenDetails[] memory tokenDetails = new Escrow.TokenDetails[](1);
        tokenDetails[0] = Escrow.TokenDetails({
            tokenId: 1,
            amount: 5,
            price: 1 ether
        });

        escrow.createTrade(buyer, tokenDetails);
        escrow.deposit(1, _arrayOf(1), _arrayOf(5), address(escrow), EscrowContract.Escrow.User.Seller);
        vm.stopPrank();

        Escrow.Trade memory trade = escrow.getTradeDetails(1);
        assertEq(uint256(trade.seller.userStatus), uint256(EscrowContract.Escrow.UserStatus.DEPOSITED));
    }

    function testDepositBuyerETH() public {
        // Mint NFT to seller
        vm.startPrank(seller);

        Escrow.TokenDetails[] memory tokenDetails = new Escrow.TokenDetails[](1);
        tokenDetails[0] = Escrow.TokenDetails({
            tokenId: 1,
            amount: 5,
            price: 1 ether
        });

        escrow.createTrade(buyer, tokenDetails);
        escrow.deposit(1, _arrayOf(1), _arrayOf(5), address(escrow), Escrow.User.Seller);
        vm.stopPrank();

        vm.deal(buyer, 1 ether);
        vm.startPrank(buyer);
        escrow.deposit{value: 1 ether}(1, new uint256[](0), new uint256 , address(0), Escrow.User.Buyer);
        vm.stopPrank();

        Escrow.Trade memory trade = escrow.getTradeDetails(1);
        assertEq(uint256(trade.buyer.userStatus), uint256(Escrow.UserStatus.DEPOSITED));
        assertEq(trade.buyer.depositBalance, 1 ether);
    }

    function testConfirmTrade() public {
        // Mint NFT to seller
        vm.startPrank(seller);

        Escrow.TokenDetails[] memory tokenDetails = new Escrow.TokenDetails[](1);
        tokenDetails[0] = Escrow.TokenDetails({
            tokenId: 1,
            amount: 5,
            price: 1 ether
        });

        escrow.createTrade(buyer, tokenDetails);
        escrow.deposit(1, _arrayOf(1), _arrayOf(5), address(escrow), Escrow.User.Seller);
        vm.stopPrank();

        vm.deal(buyer, 1 ether);
        vm.startPrank(buyer);
        escrow.deposit{value: 1 ether}(1, new uint256[](0), new uint256 , address(0), Escrow.User.Buyer);
        escrow.confirmTrade(1);
        vm.stopPrank();

        vm.startPrank(seller);
        escrow.confirmTrade(1);
        vm.stopPrank();

        Escrow.Trade memory trade = escrow.getTradeDetails(1);
        assertEq(uint256(trade.status), uint256(Escrow.TradeStatus.COMPLETE));
        assertEq(trade.completedTimestamp > 0, true);
    }

    function _arrayOf(uint256 element) internal pure returns (uint256[] memory) {
        uint256[] memory array = new uint256[](1);
        array[0] = element;
        return array;
    }
}
