import { toPlaceValidFromOrdersParams, OrderParams } from '../../../src/utils/orders'

describe('toPlaceValidFromOrdersParams', () => {
  test('Empty array returns an empty array too', () => {
    const given: OrderParams[] = []
    const expected = {
      buyAmounts: [],
      buyTokens: [],
      sellAmounts: [],
      sellTokens: [],
      validFroms: [],
      validUntils: [],
    }
    expect(toPlaceValidFromOrdersParams(given)).toEqual(expected)
  })

  test('One order', () => {
    const given: OrderParams[] = [
      { sellToken: 1, buyToken: 2, sellAmount: '3', buyAmount: '4', validFrom: 5, validUntil: 6 },
    ]
    const expected = {
      sellTokens: [1],
      buyTokens: [2],
      sellAmounts: ['3'],
      buyAmounts: ['4'],
      validFroms: [5],
      validUntils: [6],
    }
    expect(toPlaceValidFromOrdersParams(given)).toEqual(expected)
  })

  test('Three order', () => {
    const given: OrderParams[] = [
      { sellToken: 1, buyToken: 2, sellAmount: '3', buyAmount: '4', validFrom: 5, validUntil: 6 },
      { sellToken: 11, buyToken: 12, sellAmount: '13', buyAmount: '14', validFrom: 15, validUntil: 16 },
      { sellToken: 21, buyToken: 22, sellAmount: '23', buyAmount: '24', validFrom: 25, validUntil: 26 },
    ]
    const expected = {
      sellTokens: [1, 11, 21],
      buyTokens: [2, 12, 22],
      sellAmounts: ['3', '13', '23'],
      buyAmounts: ['4', '14', '24'],
      validFroms: [5, 15, 25],
      validUntils: [6, 16, 26],
    }
    expect(toPlaceValidFromOrdersParams(given)).toEqual(expected)
  })
})
