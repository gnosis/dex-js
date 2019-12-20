// Doesn't use ContractEvent on purpose since the mapping of events in typechain is broken
// TODO: Update when typechain fix the issue
import { BatchExchange } from './gen/BatchExchange'
import { ExtendedContract } from './types'

export type BatchExchangeContract = ExtendedContract<BatchExchange>
