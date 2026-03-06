const moneyFormat = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 0,
})

export type MoneyView = Readonly<{
  isFree: boolean
  isFrom: boolean
  amountText: string
  currencyText: string
  fromText: string
  value: string
}>

export type GetMoneyViewOptions = Readonly<{
  currency?: string
  emptyLabel?: string
  fromLabel?: string
}>

export const getMoneyView = (
  price: string | number | null | undefined,
  isFrom: boolean | undefined = false,
  options: GetMoneyViewOptions = {}
): MoneyView => {
  const currency = options.currency ?? 'руб.'
  const emptyLabel = options.emptyLabel ?? 'БЕСПЛАТНО'
  const fromLabel = options.fromLabel ?? 'от'

  const numericPrice = typeof price === 'number' ? price : Number(price)

  const isValidNumber = Number.isFinite(numericPrice)
  const isFree = !isValidNumber || numericPrice <= 0

  if (isFree) {
    return {
      isFree: true,
      isFrom: false,
      amountText: emptyLabel,
      currencyText: '',
      fromText: '',
      value: emptyLabel,
    }
  }

  const amountText = moneyFormat.format(numericPrice)

  const value = isFrom ? `${fromLabel} ${amountText} ${currency}` : `${amountText} ${currency}`

  return {
    isFree: false,
    isFrom,
    amountText,
    currencyText: currency,
    fromText: fromLabel,
    value,
  }
}
