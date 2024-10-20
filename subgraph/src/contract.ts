import {
  ConfirmationEvent as ConfirmationEventEvent,
  DepositEvent as DepositEventEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TradeCreated as TradeCreatedEvent,
  WithdrawEvent as WithdrawEventEvent
} from "../generated/Contract/Contract"
import {
  ConfirmationEvent,
  DepositEvent,
  OwnershipTransferred,
  TradeCreated,
  WithdrawEvent
} from "../generated/schema"

export function handleConfirmationEvent(event: ConfirmationEventEvent): void {
  let entity = new ConfirmationEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.tradeStatus = event.params.tradeStatus
  entity.completedTimestamp = event.params.completedTimestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDepositEvent(event: DepositEventEvent): void {
  let entity = new DepositEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.userAddress = event.params.userAddress
  entity.user = event.params.user
  entity.userStatus = event.params.userStatus

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTradeCreated(event: TradeCreatedEvent): void {
  let entity = new TradeCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.seller = event.params.seller
  entity.buyer = event.params.buyer
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawEvent(event: WithdrawEventEvent): void {
  let entity = new WithdrawEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.userAddress = event.params.userAddress
  entity.user = event.params.user

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
