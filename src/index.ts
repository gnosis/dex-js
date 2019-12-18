import { TokenDetailsConfig } from 'types'
import * as genTypes from './contracts/gen/types'

// Types & constants
export * from './types'
export * from './const'

// Helper/util functions
export * from './helpers'
export * from './utils'

// Contracts
// TODO: For now the contract definitions are declared in dex-js. But they will be defined in dex-contracts
export * from './contracts/Erc20Contract'
export * from './contracts/BatchExchangeContract'
export { EventOptions } from 'web3-eth-contract'
export { ContractEvent } from './contracts/types'
export {
  EstimateGasOptions,
  Callback,
  TransactionObject,
  ContractEventLog,
  ContractEventEmitter,
  Tx,
  BlockType
} from './contracts/gen/types'

// Json list
export const tokenList: TokenDetailsConfig[] = require('tokenList.json')
