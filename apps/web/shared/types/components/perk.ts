import { type ItemImage } from '#shared/types/components/image'

export class PerkItem {
  public readonly id: string
  public readonly title?: string | undefined
  public readonly description: string
  public readonly logo: ItemImage

  constructor(params: {
    id: string
    title?: string | undefined
    description: string
    logo: ItemImage
  }) {
    this.id = params.id
    this.title = params.title
    this.description = params.description
    this.logo = params.logo
  }
}
