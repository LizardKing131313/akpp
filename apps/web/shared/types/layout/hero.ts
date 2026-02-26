import { type ItemImage } from '#shared/types/components/image'

export class HeroSlide {
  public readonly id: string
  public readonly titleAccent: string
  public readonly titleMain: string
  public readonly description: string
  public readonly buttonLabel: string
  public readonly image: ItemImage

  constructor(params: {
    id: string
    titleAccent: string
    titleMain: string
    description: string
    buttonLabel: string
    image: ItemImage
  }) {
    this.id = params.id
    this.titleAccent = params.titleAccent
    this.titleMain = params.titleMain
    this.description = params.description
    this.buttonLabel = params.buttonLabel
    this.image = params.image
  }
}
