import BigNumber from 'bignumber.js'

import { formatPrice } from '../../../src'

describe('No thousands separator', () => {
  test('price without decimals, zero decimals expected', () => {
    const price = new BigNumber('132')

    const actual = formatPrice({ price, decimals: 0 })

    expect(actual).toEqual('132')
  })
  test('price without decimals, 2 decimals expected', () => {
    const price = new BigNumber('132')

    const actual = formatPrice({ price, decimals: 2 })

    expect(actual).toEqual('132.00')
  })

  test('could have decimals separator', () => {
    const price = new BigNumber('1328')

    const actual = formatPrice({ price, decimals: 2 })

    expect(actual).toEqual('1328.00')
  })

  test('decimals rounded', () => {
    const price = new BigNumber('1.666')

    const actual = formatPrice({ price, decimals: 2 })

    expect(actual).toEqual('1.67')
  })

  test('zero', () => {
    const price = new BigNumber('0')

    const actual = formatPrice({ price })

    expect(actual).toEqual('0.0000')
  })

  test('infinity price', () => {
    const price = new BigNumber(Infinity)

    const actual = formatPrice({ price })

    expect(actual).toEqual('Infinity')
  })

  test('without zero padding, no decimals', () => {
    const price = new BigNumber(1)

    const actual = formatPrice({ price, zeroPadding: false })

    expect(actual).toEqual('1')
  })

  test('without zero padding, with decimals and zeros to remove', () => {
    const price = new BigNumber('0.123000')

    const actual = formatPrice({ price, decimals: 7, zeroPadding: false })

    expect(actual).toEqual('0.123')
  })

  test('without zero padding, with decimals and no zeros to remove', () => {
    const price = new BigNumber('0.123000')

    const actual = formatPrice({ price, decimals: 3, zeroPadding: false })

    expect(actual).toEqual('0.123')
  })

  test('zeros after decimal separator', () => {
    const price = new BigNumber('0.00737')

    const actual = formatPrice({ price, decimals: 6 })

    expect(actual).toEqual('0.007370')
  })
})

describe('with thousands separator', () => {
  test('adds separator', () => {
    const price = new BigNumber(9000.1)

    const actual = formatPrice({ price, decimals: 2, thousands: true })

    expect(actual).toEqual('9,000.10')
  })
})

describe('with single parameter', () => {
  test('formats with all defaults', () => {
    const price = new BigNumber(9000.10601)

    const actual = formatPrice(price)

    expect(actual).toEqual('9000.1060')
  })

  test('zeros after decimal separator', () => {
    const price = new BigNumber('0.00737')

    const actual = formatPrice(price)

    expect(actual).toEqual('0.0074')
  })
})
