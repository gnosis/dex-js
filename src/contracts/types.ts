import { EventOptions } from 'web3-eth-contract'
import { Callback, ContractEventLog, ContractEventEmitter } from './gen/types'

export {
  EstimateGasOptions,
  Callback,
  TransactionObject,
  ContractEventLog,
  ContractEventEmitter,
  Tx,
  BlockType
} from './gen/types'

export { EventOptions }

export type ContractEvent<T> = (options?: EventOptions, cb?: Callback<ContractEventLog<T>>) => ContractEventEmitter<T>
