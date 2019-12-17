import { TokenDetailsConfig } from 'types'

// Types
export * from './types'

// Helper functions
export * from './helpers'

// Contracts
// TODO: For now the contract definitions are declared in dex-js. But they will be defined in dex-contracts
export * from './contracts/Erc20'
export * from './contracts/BatchExchange'
export * from './contracts/types'

// Json list
export const tokenList: TokenDetailsConfig[] = require('tokenList.json')
