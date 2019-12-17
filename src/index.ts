import { TokenDetailsConfig } from 'types'

// Types
export * from './types'

// Helper/util functions
export * from './helpers'
export * from './utils'

// Contracts
// TODO: For now the contract definitions are declared in dex-js. But they will be defined in dex-contracts
export * from './contracts/Erc20Contract'
export * from './contracts/BatchExchangeContract'
export * from './contracts/types'

// Json list
export const tokenList: TokenDetailsConfig[] = require('tokenList.json')
