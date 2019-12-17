import { TokenDetailsConfig } from 'types'

// TODO: For now the contract definitions are declared in dex-js. But they will be defined in dex-contracts
export * from './contracts'
export * from './helpers'
export const tokenList: TokenDetailsConfig[] = require('tokenList.json')
