import assert from 'assert'
import { web3 } from 'helpers/web3'
import { BatchExchangeContract } from './BatchExchangeContract'
import { Erc20Contract } from './Erc20Contract'
import { abi as batchExchangeAbi } from '@gnosis.pm/dex-contracts/build/contracts/BatchExchange.json'
import { AbiItem } from 'web3-utils'

function getBatchExchange (): BatchExchangeContract {
  const { STABLE_COIN_CONTRACT_ADDRESS } = process.env
  assert(STABLE_COIN_CONTRACT_ADDRESS, 'STABLE_COIN_CONTRACT_ADDRESS env is required')
  const stableCoinContractAddress = STABLE_COIN_CONTRACT_ADDRESS as string

  // FIXME: There's an issue with this conversion: https://github.com/gnosis/dex-telegram/issues/14
  const unknownContract = new web3.eth.Contract(batchExchangeAbi as AbiItem[], stableCoinContractAddress) as unknown
  return unknownContract as BatchExchangeContract
}

function getErc20 (): Erc20Contract {
  // FIXME: There's an issue with this conversion: https://github.com/gnosis/dex-telegram/issues/14
  const abi = require('./abi/Erc20.json')
  const unknownContract = new web3.eth.Contract(abi) as any
  return unknownContract as Erc20Contract
}

// Create contracts
export const batchExchangeContract: BatchExchangeContract = getBatchExchange()
export const erc20Contract: Erc20Contract = getErc20()
