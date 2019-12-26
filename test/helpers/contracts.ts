import { getBatchExchangeContract, getErc20Contract } from 'contracts'
import { web3 } from './web3'

export const batchExchangeContract = getBatchExchangeContract(web3)
export const erc20Contract = getErc20Contract(web3)
