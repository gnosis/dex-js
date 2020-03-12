import BigNumber from 'bignumber.js'

import { formatPrice } from '../../../src'

describe('No thousands separator', () => {
  test('price without decimals, zero decimals expected', () => {
    const price = new BigNumber('132')

    const actual = formatPrice(price, 0)

    expect(actual).toEqual('132')
  })
  test('price without decimals, 2 decimals expected', () => {
    const price = new BigNumber('132')

    const actual = formatPrice(price, 2)

    expect(actual).toEqual('132.00')
  })

  test('could have decimals separator', () => {
    const price = new BigNumber('1328')

    const actual = formatPrice(price, 2)

    expect(actual).toEqual('1328.00')
  })

  test('decimals rounded', () => {
    const price = new BigNumber('1.666')

    const actual = formatPrice(price, 2)

    expect(actual).toEqual('1.67')
  })

  test('zero', () => {
    const price = new BigNumber('0')

    const actual = formatPrice(price)

    expect(actual).toEqual('0.0000')
  })

  test('infinity price', () => {
    const price = new BigNumber(Infinity)

    const actual = formatPrice(price)

    expect(actual).toEqual('Infinity')
  })

  test('without zero padding, no decimals', () => {
    const price = new BigNumber(1)

    const actual = formatPrice(price, undefined, undefined, false)

    expect(actual).toEqual('1')
  })

  test('without zero padding, with decimals and zeros to remove', () => {
    const price = new BigNumber('0.123000')

    const actual = formatPrice(price, 7, undefined, false)

    expect(actual).toEqual('0.123')
  })

  test('without zero padding, with decimals and no zeros to remove', () => {
    const price = new BigNumber('0.123000')

    const actual = formatPrice(price, 3, undefined, false)

    expect(actual).toEqual('0.123')
  })
})

describe('with thousands separator', () => {
  test('adds separator', () => {
    const price = new BigNumber(9000.1)

    const actual = formatPrice(price, 2, true)

    expect(actual).toEqual('9,000.10')
  })
})
