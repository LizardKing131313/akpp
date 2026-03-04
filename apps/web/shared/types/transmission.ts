import type { EntityItem, ImageItem } from '#shared/types/entity'

export type TransmissionItem = EntityItem &
  ImageItem & {
    readonly price: number
  }

export type TransmissionRange = EntityItem
