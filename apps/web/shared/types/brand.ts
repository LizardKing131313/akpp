import type { ImageItem, SlugEntityItem } from '#shared/types/entity'

export type BrandItem = SlugEntityItem & ImageItem

export type BrandItemRepair = SlugEntityItem & {
  readonly article: string
}

export type BrandItemModelRepair = SlugEntityItem & {
  readonly article: string
}
