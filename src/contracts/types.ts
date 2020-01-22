import { EventOptions, Contract } from 'web3-eth-contract'
import { Callback, ContractEventLog, ContractEventEmitter, ContractEvent as TypechainContractEvent } from './gen/types'

export {
  EstimateGasOptions,
  Callback,
  TransactionObject,
  ContractEventLog,
  ContractEventEmitter,
  Tx,
  BlockType,
} from './gen/types'

export { EventOptions }

export type ContractEvent<T> = (options?: EventOptions, cb?: Callback<ContractEventLog<T>>) => ContractEventEmitter<T>

type EventArgs<T> = T extends TypechainContractEvent<infer U> ? U : T
type EventsExceptAllEvents<T extends Contract> = Omit<T['events'], 'allEvents'>

type AllValues<T extends object> = T[keyof T]

type ChangedEvents<T extends Contract> = {
  [E in keyof EventsExceptAllEvents<T>]: ContractEvent<EventArgs<T['events'][E]>>
} & { allEvents: ContractEvent<AllValues<EventsExceptAllEvents<T>>> }

export type ExtendedContract<T extends Contract> = Omit<T, 'events' | 'clone'> & {
  clone(): ExtendedContract<T>

  events: ChangedEvents<T>
}
