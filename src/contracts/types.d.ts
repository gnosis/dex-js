import { EventEmitter } from 'events'
import { EventLog } from 'web3-core'
import { EventOptions } from 'web3-eth-contract'
import { Callback, ContractEventLog, ContractEventEmitter } from './gen/types'

export type ContractEvent<T> = (options?: EventOptions, cb?: Callback<ContractEventLog<T>>) => ContractEventEmitter<T>
