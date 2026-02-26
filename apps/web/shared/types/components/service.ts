import { type ItemImage } from '#shared/types/components/image'
import { PriceItem } from '#shared/types/components/price'

export class ServiceItem {
  public readonly id: string
  public readonly title: string
  public readonly href: string
  public readonly colspan: 1 | 2
  public readonly logo: ItemImage

  constructor(params: {
    id: string
    title: string
    href: string
    colspan: 1 | 2
    logo: ItemImage
  }) {
    this.id = params.id
    this.title = params.title
    this.href = params.href
    this.colspan = params.colspan
    this.logo = params.logo
  }
}

export class ServicePriceItem {
  public readonly id: string
  public readonly title: string
  public readonly price: PriceItem

  constructor(params: { id: string; title: string; price?: PriceItem | undefined }) {
    this.id = params.id
    this.title = params.title
    this.price = params.price ?? new PriceItem({ price: 0 })
  }
}
