// Doesn't use ContractEvent on purpose since the mapping of events in typechain is broken
// TODO: Update when typechain fix the issue
import { Erc20 } from './gen/Erc20.d'
import { ExtendedContract } from './types'

export type Erc20Contract = ExtendedContract<Erc20>
