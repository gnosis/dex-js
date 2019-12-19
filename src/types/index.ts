export * from 'contracts/types'
export * from 'contracts/BatchExchangeContract'
export * from 'contracts/Erc20Contract'

export type Command = () => void
export type AsyncCommand = () => Promise<void>

export interface TokenDetails {
  name?: string
  symbol?: string
  decimals?: number
  address: string
  addressMainnet?: string
  image?: string
}

export interface TokenDetailsConfig extends TokenDetails {
  addressByNetwork: { [networkId: string]: string }
}
