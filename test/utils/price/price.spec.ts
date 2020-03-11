import BigNumber from 'bignumber.js'
import BN from 'bn.js'

import { calculatePrice } from '../../../src/utils/price'

describe('BN', () => {
  test('same amount of decimals', () => {
    const expected = new BigNumber('1.55')
    const params = { buyToken: { amount: new BN(155), decimals: 2 }, sellToken: { amount: new BN(100), decimals: 2 } }

    const actual = calculatePrice(params)

    expect(actual).toEqual(expected)
  })

  test('buy token has more decimals', () => {
    const expected = new BigNumber('1.55')
    const params = { buyToken: { amount: new BN(1550), decimals: 3 }, sellToken: { amount: new BN(100), decimals: 2 } }

    const actual = calculatePrice(params)

    expect(actual).toEqual(expected)
  })

  test('sell token has more decimals', () => {
    const expected = new BigNumber('1.55')
    const params = { buyToken: { amount: new BN(155), decimals: 2 }, sellToken: { amount: new BN(1000), decimals: 3 } }

    const actual = calculatePrice(params)

    expect(actual).toEqual(expected)
  })
})

describe('BigNumber', () => {
  test('same amount of decimals', () => {
    const expected = new BigNumber('1.55')
    const params = {
      buyToken: { amount: new BigNumber(155), decimals: 2 },
      sellToken: { amount: new BigNumber(100), decimals: 2 },
    }

    const actual = calculatePrice(params)

    expect(actual).toEqual(expected)
  })

  test('buy token has more decimals', () => {
    const expected = new BigNumber('1.55')
    const params = {
      buyToken: { amount: new BigNumber(1550), decimals: 3 },
      sellToken: { amount: new BigNumber(100), decimals: 2 },
    }

    const actual = calculatePrice(params)

    expect(actual).toEqual(expected)
  })

  test('sell token has more decimals', () => {
    const expected = new BigNumber('1.55')
    const params = {
      buyToken: { amount: new BigNumber(155), decimals: 2 },
      sellToken: { amount: new BigNumber(1000), decimals: 3 },
    }

    const actual = calculatePrice(params)

    expect(actual).toEqual(expected)
  })
})

describe('string', () => {
  test('decimals not provided', () => {
    const expected = new BigNumber('1.55')
    const params = {
      buyToken: { amount: '1.55' },
      sellToken: { amount: '1' },
    }

    const actual = calculatePrice(params)

    expect(actual).toEqual(expected)
  })
})
