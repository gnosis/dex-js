import assert from 'assert'
import { web3 } from 'helpers/web3'
import { BatchExchange } from './BatchExchange'
import { Erc20 } from './Erc20'

function getStableConverterContract (): BatchExchange {
  const { STABLE_COIN_CONTRACT_ADDRESS } = process.env
  assert(STABLE_COIN_CONTRACT_ADDRESS, 'STABLE_COIN_CONTRACT_ADDRESS env is required')

  const stableCoinContractAddress = STABLE_COIN_CONTRACT_ADDRESS as string

  const abi = require('./StablecoinConverter.json')

  // FIXME: There's an issue with this conversion: https://github.com/gnosis/dex-telegram/issues/14
  const unknownContract = new web3.eth.Contract(abi, stableCoinContractAddress) as unknown
  return unknownContract as BatchExchange
}

function getErc20Contract (): Erc20 {
  // FIXME: There's an issue with this conversion: https://github.com/gnosis/dex-telegram/issues/14
  const abi = require('./Erc20Abi')
  const unknownContract = new web3.eth.Contract(abi) as any
  return unknownContract as Erc20
}

// Create contracts
export const stableCoinConverterContract: BatchExchange = getStableConverterContract()
export const erc20Contract: Erc20 = getErc20Contract()
