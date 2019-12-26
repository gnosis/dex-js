import assert from 'assert'
import { web3 } from 'helpers/web3'
import { BatchExchangeContract } from './BatchExchangeContract'
import { Erc20Contract } from './Erc20Contract'
import { abi as batchExchangeAbi } from '@gnosis.pm/dex-contracts/build/contracts/BatchExchange.json'
import erc20Abi from './abi/Erc20.json'
import { AbiItem } from 'web3-utils'

export * from './types'
export * from './BatchExchangeContract'
export * from './Erc20Contract'
export { erc20Abi, batchExchangeAbi }

export function getBatchExchangeContract (address?: string): BatchExchangeContract {
  const batchExchangeAddress = address || process.env.STABLE_COIN_CONTRACT_ADDRESS

  assert(batchExchangeAddress, 'address param, or STABLE_COIN_CONTRACT_ADDRESS env is required')
  // FIXME: There's an issue with this conversion: https://github.com/gnosis/dex-telegram/issues/14
  const unknownContract = new web3.eth.Contract(
    batchExchangeAbi as AbiItem[],
    batchExchangeAddress as string,
  ) as unknown
  return unknownContract as BatchExchangeContract
}

export function getErc20Contract (): Erc20Contract {
  // FIXME: There's an issue with this conversion: https://github.com/gnosis/dex-telegram/issues/14
  const unknownContract = new web3.eth.Contract(erc20Abi as AbiItem[]) as any
  return unknownContract as Erc20Contract
}
