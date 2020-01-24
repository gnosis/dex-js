import BN from 'bn.js'
import BigNumber from 'bignumber.js'
import { UNLIMITED_ORDER_AMOUNT } from 'const'

function amountToString(amount: BN | BigNumber | string): string {
  if (typeof amount === 'string') {
    return amount
  } else {
    return amount.toString(10)
  }
}

/**
 * Checks whether values for given order qualifies it as an unlimited order.
 * See the corresponding contract code https://github.com/gnosis/dex-contracts/blob/master/contracts/BatchExchange.sol#L631
 *
 * Is this case, order of parameters do not matter.
 * If one of the given amounts == UNLIMITED_ORDER_AMOUNT, order is unlimited.
 *
 * @param amount1 Price numerator
 * @param amount2 Price denominator
 */
export function isOrderUnlimited(amount1: BN | BigNumber | string, amount2: BN | BigNumber | string): boolean {
  // Easier to always compare as string regardless of the type passed in
  const unlimitedAmount = amountToString(UNLIMITED_ORDER_AMOUNT)
  return amountToString(amount1) === unlimitedAmount || amountToString(amount2) === unlimitedAmount
}
