// We cannot have a dash in the symbol because:
// 1. We use a `-` to separate token symbols in the URL
// 2. Tokens can have dashes in their symbols
// 3. Even if we encode dashes to `%2D`, browsers auto convert them back to `-`
// For these reasons, we are picking a symbol that is not ambiguous with a dash
// and it have very little chance to be used as part of a token symbol.
// Meet, the question mark symbol https://www.fileformat.info/info/unicode/char/fffd/index.htm
const encodedDashSymbol = '�'

const dashRegex = /-/g
const encodedDashRegex = new RegExp(encodedDashSymbol, 'g')

/**
 * Decodes symbol which is URL encoded.
 * Trims trailing and leading spaces.
 *
 * @param symbol URL encoded symbol
 */
export function decodeSymbol(symbol: string): string {
  return decodeURIComponent(symbol)
    .replace(encodedDashRegex, '-')
    .trim()
}

/**
 * Encodes given symbol into a URL friendly string.
 * Additionally, encodes chars that might be ambiguous in the URL
 * such as a dash `-`
 *
 * @param symbol Symbol to URL encode
 */
export function encodeSymbol(symbol: string): string {
  return encodeURIComponent(symbol.trim().replace(dashRegex, encodedDashSymbol))
}

/**
 * Syntactic sugar for encoding Token objects where `symbol` is an optional property.
 * When there's no symbol, uses token address instead.
 *
 * @param token Object containing address and optionally symbol
 */
export function encodeTokenSymbol(token: { symbol?: string; address: string }): string {
  return token.symbol ? encodeSymbol(token.symbol) : token.address
}
