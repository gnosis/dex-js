/**
 * Decodes symbol which is URL encoded.
 * Trims trailing and leading spaces.
 *
 * @param symbol URL encoded symbol
 */
export function decodeSymbol(symbol: string): string {
  return decodeURIComponent(symbol).trim()
}

const dashRegex = /-/g

/**
 * Encodes given symbol into a URL friendly string.
 * Additionally, encodes chars that might be ambiguous in the URL
 * such as a dash `-`
 *
 * @param symbol Symbol to URL encode
 */
export function encodeSymbol(symbol: string): string {
  return encodeURIComponent(symbol.trim()).replace(dashRegex, '%2D')
}

/**
 * Syntactic sugar for encoding Token objects where `symbol` is an optional property.
 * When there's no symbol, uses token address instead.
 *
 * @param token Object containing address and optionally symbol
 */
export function encodeTokenSymbol(token: { symbol?: string; address: string }): string {
  const tokenSymbol = token.symbol || token.address

  return encodeSymbol(tokenSymbol)
}
