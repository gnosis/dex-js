import { EventOptions } from 'web3-eth-contract'
import { EventLog } from 'web3-core'

// Doesn't use ContractEvent on purpose since the mapping of events in typechain is broken
// TODO: Update when typechain fix the issue
import { /* ContractEvent, */ Callback } from './gen/types'
import { BatchExchange } from './gen/BatchExchange'
import { ContractEvent } from './types'

export interface Order {
  buyToken: string
  sellToken: string
  validFrom: string
  validUntil: string
  priceNumerator: string
  priceDenominator: string
  usedAmount: string
}

export interface SolutionData {
  batchId: string
  solutionSubmitter: string
  feeReward: string
  objectiveValue: string
}

export interface OrderCancelation {
  owner: string
  id: string
}

export interface OrderDeletion {
  owner: string
  id: string
}

export interface Trade {
  owner: string
  orderIds: string
  executedSellAmount: string
  executedBuyAmount: string
}

export interface TradeReversion {
  owner: string
  orderIds: string
  executedSellAmount: string
  executedBuyAmount: string
}

export interface Deposit {
  user: string
  token: string
  amount: string
  stateIndex: string
}

export interface WithdrawRequest {
  user: string
  token: string
  amount: string
  stateIndex: string
}

export interface Withdraw {
  user: string
  token: string
  amount: string
}

export interface OrderPlacement {
  owner: string
  index: string
  buyToken: string
  sellToken: string
  validFrom: string
  validUntil: string
  priceNumerator: string
  priceDenominator: string
}

export interface BatchExchangeContract extends Omit<BatchExchange, 'events' | 'clone'> {
  clone(): BatchExchangeContract

  // Redefine "events" because it's not correctly generated using typechain
  events: {
    OrderPlacement: ContractEvent<OrderPlacement>
    OrderCancelation: ContractEvent<OrderCancelation>
    OrderDeletion: ContractEvent<OrderDeletion>
    Trade: ContractEvent<Trade>
    TradeReversion: ContractEvent<TradeReversion>
    Deposit: ContractEvent<Deposit>
    WithdrawRequest: ContractEvent<WithdrawRequest>
    Withdraw: ContractEvent<Withdraw>

    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>,
    ) => ContractEvent<OrderPlacement | OrderCancelation | Deposit | WithdrawRequest | Withdraw>
  }
}
