import BN from 'bn.js'
import { formatSmart, toWei, ZERO, ONE, ALLOWANCE_MAX_VALUE, DEFAULT_PRECISION } from '../../../src'

describe('Integer amounts', () => {
  test('0 wei', async () => {
    expect(formatSmart(new BN('0'), DEFAULT_PRECISION)).toEqual('0')
  })

  test('1 Ether', async () => {
    expect(formatSmart(new BN(toWei(new BN('1'), 'ether')), DEFAULT_PRECISION)).toEqual('1')
  })

  test('12,345 Ether', async () => {
    expect(formatSmart(new BN(toWei(new BN('12345'), 'ether')), DEFAULT_PRECISION)).toEqual('12,345')
  })

  test('0100 Ether', async () => {
    expect(formatSmart(new BN(toWei(new BN('0100'), 'ether')), DEFAULT_PRECISION)).toEqual('100')
  })

  test('123,456,789,012 Ether', async () => {
    expect(formatSmart(new BN(toWei(new BN('123456789012'), 'ether')), DEFAULT_PRECISION)).toEqual('123.456B')
  })
})

describe('Exact decimal amounts', () => {
  test('0.5 Ether', async () => {
    expect(formatSmart(new BN(toWei(new BN('500'), 'milliether')), DEFAULT_PRECISION)).toEqual('0.5')
  })

  test('1.234 Ether', async () => {
    expect(formatSmart(new BN(toWei(new BN('1234'), 'milliether')), DEFAULT_PRECISION)).toEqual('1.234')
  })

  test('1.2345 Ether', async () => {
    expect(formatSmart(new BN(toWei(new BN('1234500'), 'microether')), DEFAULT_PRECISION)).toEqual('1.2345')
  })
})

describe('Rounding amounts', () => {
  test('0', async () => {
    expect(formatSmart(ZERO, DEFAULT_PRECISION)).toEqual('0')
  })

  test('1 wei', async () => {
    expect(formatSmart(ONE, DEFAULT_PRECISION)).toEqual('< 0.001')
  })

  test('1000 wei', async () => {
    expect(formatSmart(new BN('1000'), DEFAULT_PRECISION)).toEqual('< 0.001')
  })

  test('1.23451 Ether, round down', async () => {
    expect(formatSmart(new BN(toWei(new BN('1234510'), 'microether')), DEFAULT_PRECISION)).toEqual('1.2345')
  })

  test('1.23456 Ether, round up', async () => {
    expect(formatSmart(new BN(toWei(new BN('1234560'), 'microether')), DEFAULT_PRECISION)).toEqual('1.2346')
  })

  test('1.234567890123456789 Ether', async () => {
    expect(formatSmart(new BN('1234567890123456789'), DEFAULT_PRECISION)).toEqual('1.2346')
  })
})

describe('Tokens with precision 6', () => {
  test('1 unit', async () => {
    const amount = new BN('1000000')
    expect(formatSmart(amount, 6)).toEqual('1')
  })

  test('12,345 units', async () => {
    const amount = new BN('12345000000')
    expect(formatSmart(amount, 6)).toEqual('12,345')
  })

  test('4,567,890.123444 units, use precision 2', async () => {
    const amount = new BN('4567890123444')
    expect(formatSmart(amount, 6)).toEqual('4,567,890.12')
  })
})

describe('Tokens with precision 0', () => {
  test('1 unit', async () => {
    const amount = new BN('1')
    expect(formatSmart(amount, 0)).toEqual('1')
  })

  test('12,345 units', async () => {
    const amount = new BN('12345')
    expect(formatSmart(amount, 0)).toEqual('12,345')
  })

  test('4,567,890 units', async () => {
    const amount = new BN('4567890')
    expect(formatSmart(amount, 0)).toEqual('4,567,890')
  })
})

describe('Tokens with precision 2', () => {
  test('1 unit', async () => {
    const amount = new BN('100')
    expect(formatSmart(amount, 2)).toEqual('1')
  })

  test('12.34 units', async () => {
    const amount = new BN('1234')
    expect(formatSmart(amount, 2)).toEqual('12.34')
  })

  test('1,234,567.89 units', async () => {
    const amount = new BN('123456789')
    expect(formatSmart(amount, 2)).toEqual('1,234,567.89')
  })

  test('1,234,567.8 units', async () => {
    const amount = new BN('123456780')
    expect(formatSmart(amount, 2)).toEqual('1,234,567.8')
  })
})

describe('2 decimals', () => {
  test('1 unit', async () => {
    const amount = new BN('1000000')
    expect(formatSmart({ amount, precision: 6, decimals: 2 })).toEqual('1')
  })

  test('12.34 units', async () => {
    const amount = new BN('12340000')
    expect(formatSmart({ amount, precision: 6, decimals: 2 })).toEqual('12.34')
  })

  test('4,567,890.123333 units, round down', async () => {
    const amount = new BN('4567890123333')
    expect(formatSmart({ amount, precision: 6, decimals: 2 })).toEqual('4,567,890.12')
  })

  test('4,567,890.125555 units, round up', async () => {
    const amount = new BN('4567890125555')
    expect(formatSmart({ amount, precision: 6, decimals: 2 })).toEqual('4,567,890.13')
  })
})

describe('0 decimals', () => {
  test('1 unit', async () => {
    const amount = new BN('1000000')
    expect(formatSmart({ amount, precision: 6, decimals: 0 })).toEqual('1')
  })

  test('12.34 units', async () => {
    const amount = new BN('12340000')
    expect(formatSmart({ amount, precision: 6, decimals: 0 })).toEqual('12')
  })

  test('4,567,890.123333 units, round down', async () => {
    const amount = new BN('4567890123333')
    expect(formatSmart({ amount, precision: 6, decimals: 0 })).toEqual('4,567,890')
  })

  test('4,567,890.125555 units, round down', async () => {
    const amount = new BN('4567890125555')
    expect(formatSmart({ amount, precision: 6, decimals: 0 })).toEqual('4,567,890')
  })
})

describe('Big amounts', () => {
  test('1B Ether', async () => {
    expect(formatSmart(new BN(toWei(new BN('1000000000'), 'ether')), DEFAULT_PRECISION)).toEqual('1B')
  })

  test('uint max value', async () => {
    const expected = '115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665.64T'
    expect(formatSmart(new BN(new BN(ALLOWANCE_MAX_VALUE)), DEFAULT_PRECISION)).toEqual(expected)
  })
})

describe('Edge cases', () => {
  test('12,345.67 - More decimals, than precision', async () => {
    const amount = new BN('1234567')
    expect(formatSmart({ amount, precision: 2, decimals: 4 })).toEqual('12,345.67')
  })
})

describe('Amount is a string', () => {
  test('12,345.67 - Precision 0 (just adjust formatting)', () => {
    const amount = '12345.67'
    expect(formatSmart(amount, 0)).toEqual('12,345.67')
  })
  test('12,345.6789 - More decimals than precision', () => {
    const amount = '1234567.89'
    expect(formatSmart({ amount, precision: 2, decimals: 4 })).toEqual('12,345.6789')
  })
  test('0 - Zero string', () => {
    const amount = '0.00'
    expect(formatSmart(amount, 2)).toEqual('0')
  })
  test('null - Empty string', () => {
    const amount = ''
    expect(formatSmart(amount, 5)).toEqual(null)
  })
  test('null - Invalid string', () => {
    const amount = 'kfjasf'
    expect(formatSmart(amount, 6)).toEqual(null)
  })
})
