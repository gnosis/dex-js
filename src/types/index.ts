export type Command = () => void
export type AsyncCommand = () => Promise<void>

export interface WithAddressMainnetOpt {
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
export type Token = TokenErc20 & WithAddressMainnetOpt & Partial<WithId>
export type TokenDex = TokenErc20 & WithAddressMainnetOpt & WithId

export interface TokenDetailsConfig extends Omit<TokenDex, 'address' | 'id'> {
  addressByNetwork: {
      [networkId: string]: string | undefined;
  };
}
