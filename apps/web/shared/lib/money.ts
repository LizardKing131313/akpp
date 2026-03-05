const moneyFormat = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 0,
})

export const getMoney = (
  price: string | number | null | undefined,
  currency: string = 'руб.',
  emptyLabel: string = 'БЕСПЛАТНО'
): string => {
  const numericPrice = Number(price)

  if (!numericPrice) {
    return emptyLabel
  }

  return `${moneyFormat.format(numericPrice)} ${currency}`
}
