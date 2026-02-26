import { type ItemImage } from '#shared/types/components/image'

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
