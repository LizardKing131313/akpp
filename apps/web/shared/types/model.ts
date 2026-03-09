import type { EntityItem, ImageItem, SlugEntityItem } from '#shared/types/entity'

export type ModelItem = SlugEntityItem &
  ImageItem & {
    readonly brand_id?: string
  }

export type ModelVariantItem = EntityItem & {
  readonly model: string
  readonly from: string
  readonly to: string
  readonly engine: string
  readonly drive: string
}
