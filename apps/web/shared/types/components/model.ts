import { type ItemImage } from '#shared/types/components/image'

export class ModelItem {
  public readonly id: string
  public readonly title: string
  public readonly href: string
  public readonly logo: ItemImage

  constructor(params: { id: string; title: string; href: string; logo: ItemImage }) {
    this.id = params.id
    this.title = params.title
    this.href = params.href
    this.logo = params.logo
  }
}
