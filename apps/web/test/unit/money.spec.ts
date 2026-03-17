import { describe, expect, it } from 'vitest'

import { getMoneyView } from '../../shared/lib/money'

const NBSP = '\u00A0'

describe('getMoneyView', () => {
  it('returns free state for empty or invalid price', () => {
    expect(getMoneyView(null)).toEqual({
      isFree: true,
      isFrom: false,
      amountText: 'БЕСПЛАТНО',
      currencyText: '',
      fromText: '',
      value: 'БЕСПЛАТНО',
    })

    expect(getMoneyView('not-a-number')).toEqual({
      isFree: true,
      isFrom: false,
      amountText: 'БЕСПЛАТНО',
      currencyText: '',
      fromText: '',
      value: 'БЕСПЛАТНО',
    })
  })

  it('formats positive price with defaults', () => {
    expect(getMoneyView(123456)).toEqual({
      isFree: false,
      isFrom: false,
      amountText: `123${NBSP}456`,
      currencyText: 'руб.',
      fromText: 'от',
      value: `123${NBSP}456 руб.`,
    })
  })

  it('supports "from" price and custom labels', () => {
    expect(
      getMoneyView('50000', true, {
        currency: 'RUB',
        emptyLabel: 'FREE',
        fromLabel: 'starting at',
      })
    ).toEqual({
      isFree: false,
      isFrom: true,
      amountText: `50${NBSP}000`,
      currencyText: 'RUB',
      fromText: 'starting at',
      value: `starting at 50${NBSP}000 RUB`,
    })
  })
})
