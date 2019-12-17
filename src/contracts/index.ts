import assert from 'assert'
import { web3 } from 'helpers/web3'
import { BatchExchangeContract } from './BatchExchangeContract'
import { Erc20Contract } from './Erc20Contract'

function getStableConverterContract (): BatchExchangeContract {
  const { STABLE_COIN_CONTRACT_ADDRESS } = process.env
  assert(STABLE_COIN_CONTRACT_ADDRESS, 'STABLE_COIN_CONTRACT_ADDRESS env is required')

  const stableCoinContractAddress = STABLE_COIN_CONTRACT_ADDRESS as string

  const abi = require('./BatchExchangeAbi.json')

  // FIXME: There's an issue with this conversion: https://github.com/gnosis/dex-telegram/issues/14
  const unknownContract = new web3.eth.Contract(abi, stableCoinContractAddress) as unknown
  return unknownContract as BatchExchangeContract
}

function getErc20Contract (): Erc20Contract {
  // FIXME: There's an issue with this conversion: https://github.com/gnosis/dex-telegram/issues/14
  const abi = require('./Erc20Abi')
  const unknownContract = new web3.eth.Contract(abi) as any
  return unknownContract as Erc20Contract
}

// Create contracts
export const batchExchangeContract: BatchExchangeContract = getStableConverterContract()
export const erc20Contract: Erc20Contract = getErc20Contract()
