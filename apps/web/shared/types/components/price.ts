export class PriceItem {
  public readonly price: string | number
  public readonly currency?: string | undefined
  public readonly priceFromText?: string | undefined
  public readonly priceFreeText?: string | undefined

  constructor(params: {
    price: string | number
    currency?: string | undefined
    priceFromText?: string | undefined
    priceFreeText?: string | undefined
  }) {
    this.price = params.price
    this.currency = params.currency || 'руб.'
    this.priceFromText = params.priceFromText
    this.priceFreeText = params.priceFreeText || 'Бесплатно'
  }

  public isFrom(): boolean {
    return !!this.priceFromText
  }

  public isFree(): boolean {
    if (this.price === undefined) return false
    return Number(this.price) === 0
  }

  public getMoney() {
    const moneyFormat = new Intl.NumberFormat('ru-RU', {
      maximumFractionDigits: 0,
    })
    return moneyFormat.format(Number(this.price))
  }
}
