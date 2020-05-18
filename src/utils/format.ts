import BN from 'bn.js'
import { TEN, DEFAULT_PRECISION } from 'const'
import { TokenDetails } from 'types'
import BigNumber from 'bignumber.js'
import { toWei, fromWei } from './ethereum'

const DEFAULT_DECIMALS = 4
const ELLIPSIS = '...'

function _getLocaleSymbols(): { thousands: string; decimals: string } {
  // Check number representation in default locale
  const formattedNumber = new Intl.NumberFormat(undefined).format(10000.1)
  return {
    thousands: formattedNumber[2],
    decimals: formattedNumber[6],
  }
}

const { thousands: THOUSANDS_SYMBOL, decimals: DECIMALS_SYMBOL } = _getLocaleSymbols()
const DEFAULT_THOUSANDS_SYMBOL = ','
const DEFAULT_DECIMALS_SYMBOL = '.'

function _formatNumber(num: string, thousandsSymbol: string = THOUSANDS_SYMBOL): string {
  return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1' + thousandsSymbol)
}

function _smartFormat(integer: BN, decimals: BN, decimalSymbol: string, smallLimitAsWei: BN) {
  const formatterFactory = (
    options?: Intl.NumberFormatOptions & { notation?: 'standard' | 'scientific' | 'engineering' | 'compact' },
  ) => new Intl.NumberFormat([], options)

  function _format(options?: Intl.NumberFormatOptions & { notation?: 'standard' | 'scientific' | 'engineering' | 'compact' }): string {
    const formatter = formatterFactory(options)
    const formattedAmount = (formatter.format as (value: number | string) => string)(integer.toString())
    return formattedAmount
  }

  const formatDecimalsForDisplay = (decimalsToConvert: BN = decimals) => decimalSymbol + fromWei(decimalsToConvert).slice(2)

  // Is fraction
  if (integer.isZero()) {
    // if amount < 1 and fraction < smallLimit (both compared as Wei)
    // return `< ${smallLimit}`
    // else return decimals as is
    return decimals.lt(smallLimitAsWei) ? `< 0${formatDecimalsForDisplay(smallLimitAsWei)}` : '0' + formatDecimalsForDisplay()
  }

  // Otherwise if integer exists, format it
  if (integer.lt(new BN('100000000'))) {
    // anything under 1B just return integer
    // e.g ==> 124,034,123
    const integerPostCheck = _format({ maximumFractionDigits: 0 })
    // format decimals to append e.g ==> .012341555
    return decimals.isZero() ? integerPostCheck : integerPostCheck + formatDecimalsForDisplay()
  } else {
  // Billions and trillions - format compaced
  // and include max 3 large number decimals
  // e.g ==> 1.254B
    return _format({ notation: 'compact', maximumFractionDigits: 3 })
  }
}

function _decomposeBn(amount: BN, amountPrecision: number, decimals: number): { integerPart: BN; decimalPart: BN } {
  // Discard the decimals we don't need
  //  i.e. for WETH (precision=18, decimals=4) --> amount / 1e14
  //        16.5*1e18 ---> 165000
  if (decimals > amountPrecision) {
    throw new Error('The decimals cannot be bigger than the precision')
  }
  const amountRaw = amount.divRound(TEN.pow(new BN(amountPrecision - decimals)))
  const integerPart = amountRaw.div(TEN.pow(new BN(decimals))) // 165000 / 10000 = 16
  const decimalPart = amountRaw.mod(TEN.pow(new BN(decimals))) // 165000 % 10000 = 5000
  // Discard the decimals we don't need
  //  i.e. for WETH (precision=18, decimals=4) --> amount / 1e14
  //        1, 18:  16.5*1e18 ---> 165000
  return { integerPart, decimalPart }
}

interface SmartFormatParams<T> extends Exclude<FormatAmountParams<T>, 'thousandSeparator' | 'isLocaleAware'> {
  smallLimit?: number
}

const DEFAULT_SMALL_LIMIT_AS_WEI = new BN(toWei('0.001'))

/**
 * smartFormat
 * @description prettier formatting based on Gnosis Safe - uses same signature as formatAmount
 * @param amount
 * @param amountPrecision
 */
export function smartFormat(amount: BN, amountPrecision: number): string
export function smartFormat(amount: null | undefined, amountPrecision: number): null
export function smartFormat(params: SmartFormatParams<BN>): string
export function smartFormat(params: SmartFormatParams<null | undefined>): null
export function smartFormat(
  params: SmartFormatParams<BN | null | undefined> | BN | null | undefined,
  _amountPrecision?: number,
): string | null {
  /*
    1. integer part in Billion or Trillion becomes abbreviated w/4 fraction digits + decimals are DROPPED
        ==> e.g 1.2546T
    2. everything under is shown as is, with local thousands separator and 4 decimal points
        ==> e.g 125,456,777.8888
    3. anything under "smallLimit" is shown as < ${smallLimit}
        ==> < 0.0001
  */
  let amount: BN
  let precision: number

  let decimals = DEFAULT_DECIMALS
  const smallLimit = DEFAULT_SMALL_LIMIT_AS_WEI

  if (!params || ('amount' in params && !params.amount)) {
    return null
  } else if (BN.isBN(params)) {
    amount = params
    precision = _amountPrecision as number
  } else {
    amount = params.amount as BN
    precision = params.precision
    decimals = params.decimals ?? decimals
  }

  // amount is already zero
  if (amount.isZero()) return amount.toString()

  // const thousandSymbol = THOUSANDS_SYMBOL
  const decimalSymbol = DECIMALS_SYMBOL

  const actualDecimals = Math.min(precision, decimals)
  const { integerPart, decimalPart } = _decomposeBn(amount, precision, actualDecimals)

  const decimalFmt = '0.' + decimalPart
    .toString()
    .padStart(actualDecimals, '0') // Pad the decimal part with leading zeros
    .replace(/0+$/, '')

  return _smartFormat(integerPart, new BN(toWei(decimalFmt)), decimalSymbol, smallLimit)
}

interface FormatAmountParams<T> {
  amount: T
  precision: number
  decimals?: number
  thousandSeparator?: boolean
  isLocaleAware?: boolean
}

// For backward compatibility, keep form with required params only
export function formatAmount(amount: BN, amountPrecision: number): string
export function formatAmount(amount: null | undefined, amountPrecision: number): null
export function formatAmount(params: FormatAmountParams<BN>): string
export function formatAmount(params: FormatAmountParams<null | undefined>): null
export function formatAmount(
  params: FormatAmountParams<BN | null | undefined> | BN | null | undefined,
  _amountPrecision?: number,
): string | null {
  let amount: BN
  let precision: number

  let decimals = DEFAULT_DECIMALS
  let thousandSeparator = true
  let isLocaleAware = true

  if (!params || ('amount' in params && !params.amount)) {
    return null
  } else if (BN.isBN(params)) {
    amount = params
    precision = _amountPrecision as number
  } else {
    amount = params.amount as BN
    precision = params.precision
    decimals = params.decimals ?? decimals
    thousandSeparator = params.thousandSeparator ?? thousandSeparator
    isLocaleAware = params.isLocaleAware ?? isLocaleAware
  }

  let thousandSymbol: string
  let decimalSymbol: string
  if (isLocaleAware) {
    thousandSymbol = THOUSANDS_SYMBOL
    decimalSymbol = DECIMALS_SYMBOL
  } else {
    thousandSymbol = DEFAULT_THOUSANDS_SYMBOL
    decimalSymbol = DEFAULT_DECIMALS_SYMBOL
  }

  const actualDecimals = Math.min(precision, decimals)
  const { integerPart, decimalPart } = _decomposeBn(amount, precision, actualDecimals)
  const integerPartFmt = thousandSeparator
    ? _formatNumber(integerPart.toString(), thousandSymbol)
    : integerPart.toString()
  if (decimalPart.isZero()) {
    // Return just the integer part
    return integerPartFmt
  } else {
    const decimalFmt = decimalPart
      .toString()
      .padStart(actualDecimals, '0') // Pad the decimal part with leading zeros
      .replace(/0+$/, '') // Remove the right zeros
    // Return the formatted integer plus the decimal
    return integerPartFmt + decimalSymbol + decimalFmt
  }
}

interface FormatAmountFullParams<T> extends Omit<FormatAmountParams<T>, 'decimals'> {}

export function formatAmountFull(amount: BN): string
export function formatAmountFull(amount?: undefined | null): null
export function formatAmountFull(params: FormatAmountFullParams<BN>): string
export function formatAmountFull(params: FormatAmountFullParams<null | undefined>): null
export function formatAmountFull(
  params?: BN | null | undefined | FormatAmountFullParams<BN | null | undefined>,
): string | null {
  let amount: BN
  let precision = DEFAULT_PRECISION
  let thousandSeparator = true
  let isLocaleAware = true

  if (!params || ('amount' in params && !params.amount)) {
    return null
  } else if (BN.isBN(params)) {
    amount = params
  } else {
    amount = params.amount as BN
    precision = params.precision ?? precision
    thousandSeparator = params.thousandSeparator ?? thousandSeparator
    isLocaleAware = params.isLocaleAware ?? isLocaleAware
  }

  return formatAmount({ amount, precision, decimals: precision, thousandSeparator, isLocaleAware })
}

/**
 * Adjust the decimal precision of the given decimal value, without converting to/from BN or Number
 * Takes in a string and returns a string
 *
 * E.g.:
 * adjustPrecision('1.2657', 3) === '1.265'
 *
 * @param value The decimal value to be adjusted as a string
 * @param precision How many decimals should be kept
 */
export function adjustPrecision(value: string | undefined | null, precision: number): string {
  if (!value) {
    return ''
  }
  const regexp = new RegExp(`(\\.\\d{${precision}})\\d+$`)
  return value.replace(regexp, '$1')
}

export function parseAmount(amountFmt: string, amountPrecision: number): BN | null {
  if (!amountFmt) {
    return null
  }
  const adjustedAmount = adjustPrecision(amountFmt, amountPrecision)
  const groups = /^(\d+)(?:\.(\d+))?$/.exec(adjustedAmount)
  if (groups) {
    const [, integerPart, decimalPart = ''] = groups
    const decimalBN = new BN(decimalPart.padEnd(amountPrecision, '0'))
    const factor = TEN.pow(new BN(amountPrecision))
    return new BN(integerPart).mul(factor).add(decimalBN)
  } else {
    return null
  }
}

export function abbreviateString(inputString: string, prefixLength: number, suffixLength = 0): string {
  // abbreviate only if it makes sense, and make sure ellipsis fits into word
  // 1. always add ellipsis
  // 2. do not shorten words in case ellipsis will make the word longer
  // 3. min prefix == 1
  // 4. add suffix if requested
  const _prefixLength = Math.max(1, prefixLength)
  if (inputString.length < _prefixLength + ELLIPSIS.length + suffixLength) {
    return inputString
  }
  const prefix = inputString.slice(0, _prefixLength)
  const suffix = suffixLength > 0 ? inputString.slice(-suffixLength) : ''
  return prefix + ELLIPSIS + suffix
}

export function safeTokenName(token: TokenDetails): string {
  return token.symbol || token.name || abbreviateString(token.address, 6, 4)
}

export function safeFilledToken<T extends TokenDetails>(token: T): T {
  return {
    ...token,
    name: token.name || token.symbol || abbreviateString(token.address, 6, 4),
    symbol: token.symbol || token.name || abbreviateString(token.address, 6, 4),
  }
}

interface FormatPriceParams {
  price: BigNumber
  decimals?: number
  thousands?: boolean
  zeroPadding?: boolean
}

/**
 * Formats given BigNumber price to a locale aware string.
 *
 * Rounds price if price decimals > decimals parameter.
 * Pads right zeros if price decimals < decimals parameter if zeroPadding is set. Removes otherwise.
 * Returns no decimals if decimals paramter == 0.
 * Adds thousands separator if price >= 1000 and thousands parameter is set.
 *
 * Accepts either a single price BigNumber parameter and uses the defaults,
 * or an object containing all parameters, also using defaults if any is omitted.
 *
 * @param price Price as BigNumber
 * @param decimals Optional amount of decimals to show the price. Defaults to `4`
 * @param thousands Whether thousands separator should be included. Defaults to `false`
 * @param zeroPadding Whether formatted value should be zero padded to the right. Defaults to `true`
 */
export function formatPrice(params: FormatPriceParams | BigNumber): string {
  let price: BigNumber

  // defaults
  let decimals = DEFAULT_DECIMALS
  let thousands = false
  let zeroPadding = true

  if (params instanceof BigNumber) {
    price = params
  } else {
    price = params.price
    decimals = params.decimals ?? decimals
    thousands = params.thousands ?? thousands
    zeroPadding = params.zeroPadding ?? zeroPadding
  }

  // No much to be done regarding an infinite number
  if (!price.isFinite()) {
    return price.toString()
  }

  // truncate all decimals away: 5.516 => 5
  const integerPart = price.integerValue(BigNumber.ROUND_FLOOR)

  const decimalPart = price
    // adjust decimal precision: 5.516; decimals 2 => 5.52
    // keep in mind there's rounding
    .decimalPlaces(decimals, BigNumber.ROUND_HALF_CEIL)
    // remove integer part: 5.52 => 0.52
    .minus(integerPart)
    // turn decimals into integer: 0.52 -> 52
    .shiftedBy(decimals)

  // add thousand separator, if set
  const integerPartFmt = thousands ? _formatNumber(integerPart.toString()) : integerPart.toString()

  if (decimals <= 0 || (!zeroPadding && decimalPart.isZero())) {
    // decimals == 0 or no zeroPadding and decimal part is 0, ignore decimal part
    return integerPartFmt
  } else {
    let decimalPartFmt = decimalPart
      .toString()
      // Why padStart, you might ask? Funny story.
      // If the price has zeros at the start of the decimal places, they need to be added back!
      // Price 1.0003457, decimals 4: to precision => 1.0003
      // Decomposing: integer part '1', decimal part '0003' == 3
      // Putting it back: '1' + '.' + <add zeros back, if any> + '3'
      .padStart(decimals, '0')

    if (!zeroPadding) {
      // no zero padding, remove if any
      decimalPartFmt = decimalPartFmt.replace(/0+$/, '')
    } else if (decimalPartFmt.length < decimals) {
      // less decimals than what was asked for, pad right: 5.5; decimals 2 => 5.50
      decimalPartFmt = decimalPartFmt.padEnd(decimals, '0')
    }

    return integerPartFmt + DECIMALS_SYMBOL + decimalPartFmt
  }
}
