import BN from 'bn.js'
import BigNumber from 'bignumber.js'

// Some convenient numeric constant
export const ZERO = new BN(0)
export const ONE = new BN(1)
export const TWO = new BN(2)
export const TEN = new BN(10)
export const ONE_BIG_NUMBER = new BigNumber(1)
export const TEN_BIG_NUMBER = new BigNumber(10)

// Max allowance value for ERC20 approve
export const ALLOWANCE_MAX_VALUE = TWO.pow(new BN(256)).sub(ONE) // 115792089237316195423570985008687907853269984665640564039457584007913129639935
// Arbitrarily big number for checking if the token is enabled
export const ALLOWANCE_FOR_ENABLED_TOKEN = TWO.pow(new BN(128)) // 340282366920938463463374607431768211456

// Default formatting constants
export const DEFAULT_DECIMALS = 4
export const DEFAULT_PRECISION = 18

// Model constants
export const FEE_DENOMINATOR = 1000 // Fee is 1/fee_denominator i.e. 1/1000 = 0.1%
export const BATCH_TIME = 300
export const DEFAULT_ORDER_DURATION = 6 // every batch takes 5min, we want it to be valid for 30min, ∴ 30/5 == 6
export const FEE_PERCENTAGE = (1 / FEE_DENOMINATOR) * 100 // syntatic sugar for displaying purposes

// Amount for an order to be considered unlimited, from contract's point of view: https://github.com/gnosis/dex-contracts/blob/master/contracts/BatchExchange.sol#L35
export const UNLIMITED_ORDER_AMOUNT = TWO.pow(new BN(128)).sub(ONE)

// Furthest batch id possible (uint32), must be a js Number
export const MAX_BATCH_ID = 2 ** 32 - 1
