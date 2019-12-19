import { EventOptions } from 'web3-eth-contract'
import { EventLog } from 'web3-core'

// Doesn't use ContractEvent on purpose since the mapping of events in typechain is broken
// TODO: Update when typechain fix the issue
import { /* ContractEvent, */ Callback } from './gen/types'
import { Erc20 } from './gen/Erc20'
import { ContractEvent } from './types'

export interface Approval {
  owner: string
  spender: string
  value: string
}

export interface Transfer {
  from: string
  to: string
  value: string
}

export interface Erc20Contract extends Omit<Erc20, 'events' | 'clone'> {
  clone(): Erc20Contract

  // Redefine "events" because it's not correctly generated using typechain
  events: {
    Approval: ContractEvent<Approval>
    Transfer: ContractEvent<Transfer>
    allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => ContractEvent<Approval | Transfer>
  }
}
