import type { ImageItem, NamedEntityItem, SlugEntityItem } from '#shared/types/entity'
import type { ModelVariantItem } from '#shared/types/model'

export type TransmissionItem = NamedEntityItem &
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
