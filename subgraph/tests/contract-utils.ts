import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ConfirmationEvent,
  DepositEvent,
  OwnershipTransferred,
  TradeCreated,
  WithdrawEvent
} from "../generated/Contract/Contract"

export function createConfirmationEventEvent(
  tradeId: BigInt,
  tradeStatus: i32,
  completedTimestamp: BigInt
): ConfirmationEvent {
  let confirmationEventEvent = changetype<ConfirmationEvent>(newMockEvent())

  confirmationEventEvent.parameters = new Array()

  confirmationEventEvent.parameters.push(
    new ethereum.EventParam(
      "tradeId",
      ethereum.Value.fromUnsignedBigInt(tradeId)
    )
  )
  confirmationEventEvent.parameters.push(
    new ethereum.EventParam(
      "tradeStatus",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(tradeStatus))
    )
  )
  confirmationEventEvent.parameters.push(
    new ethereum.EventParam(
      "completedTimestamp",
      ethereum.Value.fromUnsignedBigInt(completedTimestamp)
    )
  )

  return confirmationEventEvent
}

export function createDepositEventEvent(
  tradeId: BigInt,
  userAddress: Address,
  user: i32,
  userStatus: i32
): DepositEvent {
  let depositEventEvent = changetype<DepositEvent>(newMockEvent())

  depositEventEvent.parameters = new Array()

  depositEventEvent.parameters.push(
    new ethereum.EventParam(
      "tradeId",
      ethereum.Value.fromUnsignedBigInt(tradeId)
    )
  )
  depositEventEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  depositEventEvent.parameters.push(
    new ethereum.EventParam(
      "user",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(user))
    )
  )
  depositEventEvent.parameters.push(
    new ethereum.EventParam(
      "userStatus",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(userStatus))
    )
  )

  return depositEventEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTradeCreatedEvent(
  tradeId: BigInt,
  seller: Address,
  buyer: Address,
  timestamp: BigInt
): TradeCreated {
  let tradeCreatedEvent = changetype<TradeCreated>(newMockEvent())

  tradeCreatedEvent.parameters = new Array()

  tradeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tradeId",
      ethereum.Value.fromUnsignedBigInt(tradeId)
    )
  )
  tradeCreatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  tradeCreatedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  tradeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return tradeCreatedEvent
}

export function createWithdrawEventEvent(
  tradeId: BigInt,
  userAddress: Address,
  user: i32
): WithdrawEvent {
  let withdrawEventEvent = changetype<WithdrawEvent>(newMockEvent())

  withdrawEventEvent.parameters = new Array()

  withdrawEventEvent.parameters.push(
    new ethereum.EventParam(
      "tradeId",
      ethereum.Value.fromUnsignedBigInt(tradeId)
    )
  )
  withdrawEventEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  withdrawEventEvent.parameters.push(
    new ethereum.EventParam(
      "user",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(user))
    )
  )

  return withdrawEventEvent
}
