import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { ConfirmationEvent } from "../generated/schema"
import { ConfirmationEvent as ConfirmationEventEvent } from "../generated/Contract/Contract"
import { handleConfirmationEvent } from "../src/contract"
import { createConfirmationEventEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let tradeId = BigInt.fromI32(234)
    let tradeStatus = 123
    let completedTimestamp = BigInt.fromI32(234)
    let newConfirmationEventEvent = createConfirmationEventEvent(
      tradeId,
      tradeStatus,
      completedTimestamp
    )
    handleConfirmationEvent(newConfirmationEventEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ConfirmationEvent created and stored", () => {
    assert.entityCount("ConfirmationEvent", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ConfirmationEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tradeId",
      "234"
    )
    assert.fieldEquals(
      "ConfirmationEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tradeStatus",
      "123"
    )
    assert.fieldEquals(
      "ConfirmationEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "completedTimestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
