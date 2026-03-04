import type { EntityItem, ImageItem, SlugEntityItem } from '#shared/types/entity'

export type ServiceItem = SlugEntityItem & ImageItem

export type ServicePriceItem = EntityItem & {
  readonly isFrom: boolean
  readonly price: number
}

export type ServiceBrandItem = SlugEntityItem & {
  readonly article: string
}
