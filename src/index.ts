import { AbiItem } from 'web3-utils'
import { TokenDetailsConfig } from 'types'
import tokenListJson from 'tokenList.json'
import { abi } from '@gnosis.pm/dex-contracts/build/contracts/BatchExchange.json'

// Contracts
export * from './contracts'

// Types & constants
export * from './types'
export * from './const'

// Helper/util functions
export * from './helpers'
export * from './utils'

// Json list
export const tokenList: TokenDetailsConfig[] = tokenListJson

// Re-export ABI
export const batchExchangeAbi: AbiItem[] = abi as AbiItem[]
