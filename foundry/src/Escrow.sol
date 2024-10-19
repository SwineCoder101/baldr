// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Escrow is ReentrancyGuard, ERC1155, Ownable {
    uint256 public tradeCounter;

    constructor(address initialOwner)
        ERC1155("https://sapphire-preferred-bison-599.mypinata.cloud/ipfs/QmWUcknL6WgU1uEozHBYFnxSqVFTangUb1fNHYj5Gc8aEk")
        Ownable(initialOwner)
    {
        _transferOwnership(initialOwner);
    }

    // Struct to define trade details
    struct Side {
        User user;
        address userAddress;
        uint256 depositBalance;
        UserStatus userStatus;
    }

    struct Trade {
        uint256 tradeId;
        Side buyer;
        Side seller;
        TokenDetails[] tokenDetails;
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
    event ConfirmationEvent(uint256 tradeId, TradeStatus tradeStatus, uint256 completedTimestamp);
    event TradeCreated(uint256 tradeId, address indexed seller, address indexed buyer, uint256 timestamp);
    event DepositEvent(uint256 tradeId, address userAddress, User user, UserStatus userStatus);
    event WithdrawEvent(uint256 tradeId, address userAddress, User user);

    // Modifier to check trade existence
    modifier tradeExists(uint256 tradeId) {
        require(trades[tradeId].seller.userAddress != address(0), "Trade does not exist");
        _;
    }

    // Deposit function for buyer/seller
    function deposit(
        uint256 tradeId,
        uint256[] memory tokenIds,
        uint256[] memory amounts,
        address tokenAddress,
        User user
    ) public payable tradeExists(tradeId) nonReentrant {
        require(tokenIds.length == amounts.length, "Token IDs and amounts must have the same length");

        Trade storage trade = trades[tradeId];

        if (user == User.Seller) {
            require(msg.sender == trade.seller.userAddress, "Only the seller can deposit tokens");
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

            trade.seller.userStatus = UserStatus.DEPOSITED;
            emit DepositEvent(tradeId, msg.sender, user, trade.seller.userStatus);

        } else if (user == User.Buyer) {
            require(msg.sender == trade.buyer.userAddress, "Only the buyer can deposit ETH");
            // Buyer deposits Ether to match the trade price
            require(msg.value > 0, "Buyer must send ETH");

            uint256 totalPrice = 0;
            for (uint256 i = 0; i < trade.tokenDetails.length; i++) {
                totalPrice += trade.tokenDetails[i].price;
            }
            require(msg.value == totalPrice, "Incorrect ETH amount");

            trade.buyer.depositBalance = msg.value;
            trade.buyer.userStatus = UserStatus.DEPOSITED;
            emit DepositEvent(tradeId, msg.sender, user, trade.buyer.userStatus);
        } else {
            revert("Invalid user type");
        }
    }

    // Create a new trade
    function createTrade(
        address buyerAddress,
        TokenDetails[] memory tokenDetails
    )
        external
        nonReentrant
    {
        require(buyerAddress != address(0), "Buyer address must be valid");
        require(tokenDetails.length > 0, "Invalid token details length");

        tradeCounter++;
        Trade storage newTrade = trades[tradeCounter];
        newTrade.tradeId = tradeCounter;
        newTrade.buyer = Side({
            user: User.Buyer,
            userAddress: buyerAddress,
            depositBalance: 0,
            userStatus: UserStatus.REQUESTED
        });
        newTrade.seller = Side({
            user: User.Seller,
            userAddress: msg.sender,
            depositBalance: 0,
            userStatus: UserStatus.REQUESTED
        });
        newTrade.status = TradeStatus.REQUESTED;
        newTrade.requestTimestamp = block.timestamp;
        newTrade.completedTimestamp = 0;

        for (uint256 i = 0; i < tokenDetails.length; i++) {
            newTrade.tokenDetails.push(tokenDetails[i]);
        }

        // Emit event for new trade creation
        emit TradeCreated(tradeCounter, msg.sender, buyerAddress, block.timestamp);
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
        require(trade.seller.userStatus == UserStatus.DEPOSITED, "Seller must deposit tokens first");
        trade.seller.userStatus = UserStatus.CONFIRMED;
    }

    // Confirm buyer participation and deposit ETH
    function _confirmBuyer(Trade storage trade) internal {
        require(trade.buyer.userStatus == UserStatus.DEPOSITED, "Buyer must deposit ETH first");
        trade.buyer.userStatus = UserStatus.CONFIRMED;
    }

    // Finalize the trade if both buyer and seller have confirmed
    function _finalizeTradeIfConfirmed(uint256 tradeId) internal {
        Trade storage trade = trades[tradeId];

        if (trade.buyer.userStatus == UserStatus.CONFIRMED && trade.seller.userStatus == UserStatus.CONFIRMED) {
            // Transfer NFTs to the buyer
            for (uint256 i = 0; i < trade.tokenDetails.length; i++) {
                IERC1155(address(this)).safeTransferFrom(
                    address(this),
                    trade.buyer.userAddress,
                    trade.tokenDetails[i].tokenId,
                    trade.tokenDetails[i].amount,
                    ""
                );
            }

            // Transfer ETH to the seller using call
            (bool success,) = payable(trade.seller.userAddress).call{value: trade.buyer.depositBalance}("");
            require(success, "ETH Transfer failed");

            trade.status = TradeStatus.COMPLETE;
            trade.completedTimestamp = block.timestamp;

            emit ConfirmationEvent(tradeId, trade.status, trade.completedTimestamp);
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
