import { type BrandItem } from '#shared/types/components/brand'
import { type ItemImage } from '#shared/types/components/image'

export class WorkExample {
  public readonly id: string
  public readonly brand: BrandItem
  public readonly title: string
  public readonly date: string
  public readonly href: string
  public readonly image: ItemImage

  constructor(params: {
    id: string
    brand: BrandItem
    title: string
    date: string
    href: string
    image: ItemImage
  }) {
    this.id = params.id
    this.brand = params.brand
    this.title = params.title
    this.date = params.date
    this.href = params.href
    this.image = params.image
  }
}
