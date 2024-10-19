// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Escrow is ReentrancyGuard, ERC1155, Ownable {
    uint256 public tradeCounter;

    constructor(address initialOwner)
        ERC1155("https://sapphire-preferred-bison-599.mypinata.cloud/ipfs/QmWUcknL6WgU1uEozHBYFnxSqVFTangUb1fNHYj5Gc8aEk/")
        Ownable(initialOwner)
    {}

    // Struct to define trade details
    struct Side {
        User user;
        address userAddress;
        TokenDetails[] tokenDetails;
        uint256 depositBalance;
        UserStatus userStatus;
    }

    struct Trade {
        uint256 tradeId;
        Side buyer;
        Side seller;
        TradeStatus status;
        uint256 requestTimestamp;
        uint256 completedTimestamp;
    }

    enum TradeStatus {
        REQUESTED,
        IN_PROGRESS,
        COMPLETE
    }

    enum UserStatus {
        REQUESTED,
        CONFIRMED,
        DEPOSITED,
        WITHDRAWN
    }

    struct TokenDetails {
        uint256 tokenId;
        uint256 amount;
        uint256 price;
    }

    struct UserInteraction {
        uint256 tradeId;
        Side side;
        TradeStatus tradeStatus;
        UserStatus userStatus;
    }

    enum User {
        Buyer,
        Seller
    }

    // Mapping to track trade requests
    mapping(uint256 => Trade) public trades;

    // Events
    event ConfirmationEvent(Trade trade);

    event DepositEvent(UserInteraction userInteraction, bool isUpdate);

    event WithdrawEvent(UserInteraction userInteraction);

    // Modifier to check trade existence
    modifier tradeExists(uint256 tradeId) {
        require(trades[tradeId].seller.userAddress != address(0), "Trade does not exist");
        _;
    }

    // in viem, `buyerDeposit`, `sellerDeposit`
    function deposit(
        uint256[] memory tokenIds,
        uint256[] memory amounts,
        address tokenAddress,
        User user
    ) public payable {
        require(tokenIds.length == amounts.length, "Token IDs and amounts must have the same length");

        if (user == User.Seller) {
            // Seller deposits their NFTs into the escrow contract
            for (uint256 i = 0; i < tokenIds.length; i++) {
                IERC1155(tokenAddress).safeTransferFrom(
                    msg.sender,        // Seller
                    address(this),     // Escrow contract
                    tokenIds[i],       // Token ID
                    amounts[i],        // Amount to transfer
                    ""
                );
            }

            // Emit an event for the deposit (optional)
            emit DepositEvent(UserInteraction({
                tradeId: tradeCounter,
                side: trades[tradeCounter].seller,
                tradeStatus: trades[tradeCounter].status,
                userStatus: trades[tradeCounter].seller.userStatus
            }), false);

        } else if (user == User.Buyer) {
            // Buyer deposits Ether to match the trade price
            require(msg.value > 0, "Buyer must send ETH");

            uint256 totalPrice = 0;
            for (uint256 i = 0; i < trades[tradeCounter].buyer.tokenDetails.length; i++) {
                totalPrice += trades[tradeCounter].buyer.tokenDetails[i].price;
            }
            require(msg.value == totalPrice, "Incorrect ETH amount");

            // Emit event for deposit
            emit DepositEvent(UserInteraction({
                tradeId: tradeCounter,
                side: trades[tradeCounter].buyer,
                tradeStatus: trades[tradeCounter].status,
                userStatus: trades[tradeCounter].buyer.userStatus
            }), false);
        } else {
            revert("Invalid user type");
        }
    }

    // Create a new trade
    function createTrade(
        address buyerAddress,
        address tokenAddress,
        TokenDetails[] memory tokenDetails
    )
        external
        nonReentrant
    {
        require(buyerAddress != address(0), "Buyer address must be valid");
        require(tokenDetails.length > 0, "Invalid token details length");

        // Transfer the NFTs from the seller to the contract
        for (uint256 i = 0; i < tokenDetails.length; i++) {
            IERC1155(tokenAddress).safeTransferFrom(
                msg.sender,
                address(this),
                tokenDetails[i].tokenId,
                tokenDetails[i].amount,
                ""
            );
        }

        tradeCounter++;
        Trade storage newTrade = trades[tradeCounter];  // Initialize a new trade

        newTrade.tradeId = tradeCounter;
        newTrade.buyer.user = User.Buyer;
        newTrade.buyer.userAddress = buyerAddress;
        newTrade.seller.user = User.Seller;
        newTrade.seller.userAddress = msg.sender;
        newTrade.status = TradeStatus.REQUESTED;
        newTrade.requestTimestamp = block.timestamp;
        newTrade.completedTimestamp = 0;

        // Manually copy each element from memory to storage for buyer and seller
        for (uint256 i = 0; i < tokenDetails.length; i++) {
            newTrade.buyer.tokenDetails.push(tokenDetails[i]);
            newTrade.seller.tokenDetails.push(tokenDetails[i]);
        }
    }

    // Confirm trade (either buyer or seller)
    function confirmTrade(uint256 tradeId) external payable tradeExists(tradeId) nonReentrant {
        Trade storage trade = trades[tradeId];
        require(trade.status != TradeStatus.COMPLETE, "Trade already completed");

        if (msg.sender == trade.seller.userAddress) {
            _confirmSeller(trade);
        } else if (msg.sender == trade.buyer.userAddress) {
            _confirmBuyer(trade);
        } else {
            revert("Unauthorized access");
        }

        _finalizeTradeIfConfirmed(tradeId);
    }

    // Get trade details
    function getTradeDetails(uint256 tradeId) external view tradeExists(tradeId) returns (Trade memory) {
        return trades[tradeId];
    }

    // ========== Internal functions for modularization ==========

    // Confirm seller participation in the trade
    function _confirmSeller(Trade storage trade) internal {
        require(trade.seller.userStatus != UserStatus.CONFIRMED, "Seller already confirmed");
        trade.seller.userStatus = UserStatus.CONFIRMED;
    }

    // Confirm buyer participation and deposit ETH
    function _confirmBuyer(Trade storage trade) internal {
        uint256 totalPrice = 0;
        for (uint256 i = 0; i < trade.buyer.tokenDetails.length; i++) {
            totalPrice += trade.buyer.tokenDetails[i].price;
        }
        require(msg.value == totalPrice, "Incorrect ETH amount");
        require(trade.buyer.userStatus != UserStatus.CONFIRMED, "Buyer already confirmed");
        trade.buyer.userStatus = UserStatus.CONFIRMED;

        UserInteraction memory userInteraction = UserInteraction({
            tradeId: trade.tradeId,
            side: trade.buyer,
            tradeStatus: trade.status,
            userStatus: trade.buyer.userStatus
        });
        emit DepositEvent(userInteraction, false);
    }

    // Finalize the trade if both buyer and seller have confirmed
    function _finalizeTradeIfConfirmed(uint256 tradeId) internal {
        Trade storage trade = trades[tradeId];

        if (trade.buyer.userStatus == UserStatus.CONFIRMED && trade.seller.userStatus == UserStatus.CONFIRMED) {
            // Transfer NFTs to the buyer
            for (uint256 i = 0; i < trade.seller.tokenDetails.length; i++) {
                IERC1155(trade.seller.userAddress).safeTransferFrom(
                    address(this),
                    trade.buyer.userAddress,
                    trade.seller.tokenDetails[i].tokenId,
                    trade.seller.tokenDetails[i].amount,
                    ""
                );
            }

            // Transfer ETH to the seller using call
            (bool success,) = payable(trade.seller.userAddress).call{value: msg.value}("");
            require(success, "ETH Transfer failed");

            trade.status = TradeStatus.COMPLETE;
            trade.completedTimestamp = block.timestamp;

            emit ConfirmationEvent(trade);
        }
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}