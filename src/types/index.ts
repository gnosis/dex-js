export type Command = () => void
export type AsyncCommand = () => Promise<void>

export interface WithAddressMainnet {
  addressMainnet?: string
}

export interface WithId {
  id: string
}

export interface WithSymbolAndName {
  symbol?: string
  name?: string
}

export interface WithAddress {
  address: string
}

export interface WithDecimals {
  decimals: number
}

export type TokenErc20 = WithSymbolAndName & WithAddress & WithDecimals
export type Token = TokenErc20 & WithAddressMainnet & Partial<WithId>
export type TokenDex = TokenErc20 & WithAddressMainnet & WithId

export interface TokenDetailsConfig extends Omit<TokenDex, 'address'> {
  addressByNetwork: { [networkId: string]?: string }
}
