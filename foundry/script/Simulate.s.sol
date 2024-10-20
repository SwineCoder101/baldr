// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/Escrow.sol";
import "../src/Token.sol";

contract SimulateScript is Script {
    Escrow public escrow = Escrow(0x9F3D6c3ff075c457fbC196d77548d86487C535E9);
    Token public token = Token(0x2E17801201822f5Ef02285D6c002bd819fd9969d);

    address public constant BUYER = 0x5cB8f097eF47d7017346bF91BbC10878e0E3e836; // Updated Buyer Address
    address public constant SELLER = 0x5D117B84b259321630c5bCCDad8d3E221E3ba14E; // Updated Seller Address

    uint256 public TRADE_ID = vm.envUint("TRADE_ID");

    function run() external {
        // 1. Create Trade by Seller
        createTradeBySeller();
        
        // 2. Deposit by Seller
        depositBySeller();
        
        // 3. Deposit by Buyer
        depositByBuyer();
        
        // 4. Confirm Trade by Seller
        confirmBySeller();
        
        // 5. Confirm Trade by Buyer
        confirmByBuyer();
    }

    function createTradeBySeller() internal {
        vm.startBroadcast(vm.envUint("SELLER_PRIVATE_KEY"));
        
        // Mint tokens to the seller before creating trade
        token.mint(SELLER, 1, 100, "");
        token.setApprovalForAll(address(escrow), true);
        console.log("[Approval] Seller approved Escrow contract to handle their tokens.");
        console.log("[Minting] Minted 100 tokens of tokenId 1 to seller address:", SELLER);

        Escrow.TokenDetails[] memory tokenDetails = new Escrow.TokenDetails[](1);
        tokenDetails[0] = Escrow.TokenDetails(1, 100, 100 wei);
        escrow.createTrade(BUYER, tokenDetails);
        console.log("[Trade Creation] Trade created by seller for buyer with trade ID:", TRADE_ID);
        vm.stopBroadcast();
    }

    function depositBySeller() internal {
        vm.startBroadcast(vm.envUint("SELLER_PRIVATE_KEY"));
        uint256[] memory sellerTokenIds = new uint256[](1);
        uint256[] memory sellerAmounts = new uint256[](1);
        sellerTokenIds[0] = 1;
        sellerAmounts[0] = 100;
        escrow.deposit{value: 100 wei}(TRADE_ID, sellerTokenIds, sellerAmounts, Escrow.User.Seller);
        console.log("[Deposit] Seller deposited tokens for trade ID:", TRADE_ID);
        vm.stopBroadcast();
    }

    function depositByBuyer() internal {
        vm.startBroadcast(vm.envUint("BUYER_PRIVATE_KEY"));
        uint256[] memory tokenIds = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);
        tokenIds[0] = 1;
        amounts[0] = 100;
        escrow.deposit{value: 100 wei}(TRADE_ID, tokenIds, amounts, Escrow.User.Buyer);
        console.log("[Deposit] Buyer deposited tokens for trade ID:", TRADE_ID);
        vm.stopBroadcast();
    }

    function confirmBySeller() internal {
        vm.startBroadcast(vm.envUint("SELLER_PRIVATE_KEY"));
        escrow.confirmTrade(TRADE_ID);
        console.log("[Confirmation] Seller confirmed trade ID:", TRADE_ID);
        vm.stopBroadcast();
    }

    function confirmByBuyer() internal {
        vm.startBroadcast(vm.envUint("BUYER_PRIVATE_KEY"));
        escrow.confirmTrade(TRADE_ID);
        console.log("[Confirmation] Buyer confirmed trade ID:", TRADE_ID);
        vm.stopBroadcast();
    }
}

