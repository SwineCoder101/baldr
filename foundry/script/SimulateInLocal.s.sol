// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/Escrow.sol";
import "../src/Token.sol";

contract IntegrationScript is Script {
    Escrow public escrow;
    Token public token;

    address public constant DEPLOYER = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8; // Anvil Account 1
    address public constant SELLER = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC; // Anvil Account 2
    address public constant BUYER = 0x90F79bf6EB2c4f870365E785982E1f101E93b906; // Anvil Account 3

    uint256 public constant TRADE_ID = 1;

    function run() external {
        uint256 deployerPrivateKey = 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;

        deployContracts(deployerPrivateKey);
        approveEscrow(sellerPrivateKey());
        createTrade(sellerPrivateKey());
        depositSeller(sellerPrivateKey());
        depositBuyer(buyerPrivateKey());
        confirmTrade(sellerPrivateKey());
        confirmTrade(buyerPrivateKey());
    }

    function deployContracts(uint256 deployerPrivateKey) internal {
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy the Token contract
        token = new Token(DEPLOYER);
        console.log("[Deployment] Token contract deployed at address:", address(token));

        // Deploy the Escrow contract with the correct parameters
        escrow = new Escrow(DEPLOYER, address(token));
        console.log("[Deployment] Escrow contract deployed at address:", address(escrow));

        // Mint tokens to the seller to ensure they have enough balance
        token.mint(SELLER, 1, 100, "");
        console.log("[Minting] Minted 100 tokens of tokenId 1 to seller address:", SELLER);
        
        vm.stopBroadcast();
    }

    function approveEscrow(uint256 sellerKey) internal {
        vm.startBroadcast(sellerKey);
        token.setApprovalForAll(address(escrow), true);
        console.log("[Approval] Seller approved Escrow contract to handle their tokens.");
        vm.stopBroadcast();
    }

    function createTrade(uint256 sellerKey) internal {
        vm.startBroadcast(sellerKey);
        Escrow.TokenDetails[] memory tokenDetails = new Escrow.TokenDetails[](1);
        tokenDetails[0] = Escrow.TokenDetails(1, 100, 100 wei);
        escrow.createTrade(BUYER, tokenDetails);
        console.log("[Trade Creation] Trade created by seller for buyer with trade ID:", TRADE_ID);
        vm.stopBroadcast();
    }

    function depositSeller(uint256 sellerKey) internal {
        vm.startBroadcast(sellerKey);
        uint256[] memory sellerTokenIds = new uint256[](1);
        uint256[] memory sellerAmounts = new uint256[](1);
        sellerTokenIds[0] = 1;
        sellerAmounts[0] = 100;
        escrow.deposit(TRADE_ID, sellerTokenIds, sellerAmounts, Escrow.User.Seller);
        console.log("[Deposit] Seller deposited tokens for trade ID:", TRADE_ID);
        vm.stopBroadcast();
    }

    function depositBuyer(uint256 buyerKey) internal {
        vm.startBroadcast(buyerKey);
        uint256[] memory tokenIds = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);
        tokenIds[0] = 1;
        amounts[0] = 100;
        escrow.deposit{value: 100 wei}(TRADE_ID, tokenIds, amounts, Escrow.User.Buyer);
        console.log("[Deposit] Buyer deposited tokens for trade ID:", TRADE_ID);
        vm.stopBroadcast();
    }

    function confirmTrade(uint256 userKey) internal {
        vm.startBroadcast(userKey);
        escrow.confirmTrade(TRADE_ID);
        console.log("[Confirmation] User confirmed trade ID:", TRADE_ID);
        vm.stopBroadcast();
    }

    function sellerPrivateKey() internal pure returns (uint256) {
        return 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;
    }

    function buyerPrivateKey() internal pure returns (uint256) {
        return 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6;
    }
}

