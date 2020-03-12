import BigNumber from 'bignumber.js'
import BN from 'bn.js'
import { ONE_BIG_NUMBER } from 'const'

interface Token {
  amount: BN | BigNumber | string
  decimals?: number
}

interface CalculatePriceParams {
  buyToken: Token
  sellToken: Token
}

/**
 * Calculates price from either BN, BigNumber or string amounts
 * based on decimal precision of each token.
 *
 * Decimals defaults to 0.
 * Use case is to calculate the price when values already in the same unit
 * and no adjustment is required.
 *
 * Returns price in BigNumber and leave formatting up to the caller
 */
export function calculatePrice({
  buyToken: { amount: buyAmount, decimals: buyDecimals = 0 },
  sellToken: { amount: sellAmount, decimals: sellDecimals = 0 },
}: CalculatePriceParams): BigNumber {
  // convert to BigNumber
  const numerator = new BigNumber(buyAmount.toString())
  const denominator = new BigNumber(sellAmount.toString())

  if (buyDecimals >= sellDecimals) {
    const precisionFactor = 10 ** (buyDecimals - sellDecimals)
    return numerator.dividedBy(denominator.multipliedBy(precisionFactor))
  } else {
    const precisionFactor = 10 ** (sellDecimals - buyDecimals)
    return numerator.multipliedBy(precisionFactor).dividedBy(denominator)
  }
}

/**
 * Convenience function to invert price
 *
 * @param price Price to be inverted as BigNumber
 */
export function invertPrice(price: BigNumber): BigNumber {
  return ONE_BIG_NUMBER.div(price)
}
