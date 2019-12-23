import assert from 'assert'
import { web3 } from 'helpers/web3'
import { BatchExchangeContract } from './BatchExchangeContract'
import { Erc20Contract } from './Erc20Contract'

export function getBatchExchange (): BatchExchangeContract {
  const { STABLE_COIN_CONTRACT_ADDRESS } = process.env
  assert(STABLE_COIN_CONTRACT_ADDRESS, 'STABLE_COIN_CONTRACT_ADDRESS env is required')
  const stableCoinContractAddress = STABLE_COIN_CONTRACT_ADDRESS as string

  // FIXME: There's an issue with this conversion: https://github.com/gnosis/dex-telegram/issues/14
  const abi = require('./abi/BatchExchange.json')
  const unknownContract = new web3.eth.Contract(abi, stableCoinContractAddress) as unknown
  return unknownContract as BatchExchangeContract
}

export function getErc20 (): Erc20Contract {
  // FIXME: There's an issue with this conversion: https://github.com/gnosis/dex-telegram/issues/14
  const abi = require('./abi/Erc20.json')
  const unknownContract = new web3.eth.Contract(abi) as any
  return unknownContract as Erc20Contract
}
