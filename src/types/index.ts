export type Command = () => void
export type AsyncCommand = () => Promise<void>

export interface TokenDetails {
  id: number,
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
