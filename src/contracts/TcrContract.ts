// Doesn't use ContractEvent on purpose since the mapping of events in typechain is broken
// TODO: Update when typechain fix the issue
import { Tcr } from './gen/Tcr'
import { ExtendedContract } from './types'

export type TcrContract = ExtendedContract<Tcr>
