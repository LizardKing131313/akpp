import type { EntityItem, ImageItem } from '#shared/types/entity'

export type TransmissionItem = EntityItem &
  ImageItem & {
    readonly description: string
    readonly price: number
  }

export type TransmissionRange = SlugEntityItem & {
  readonly content: string
}

export type TransmissionRangeWithVariants = TransmissionRange & {
  transmission_range_model_variants: {
    model_variants_id: ModelVariantItem
  }[]
}
