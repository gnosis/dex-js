import BN from 'bn.js'
import { UNLIMITED_ORDER_AMOUNT } from 'const'

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
export function isOrderUnlimited(amount1: BN, amount2: BN): boolean {
  return amount1 === UNLIMITED_ORDER_AMOUNT || amount2 === UNLIMITED_ORDER_AMOUNT
}
