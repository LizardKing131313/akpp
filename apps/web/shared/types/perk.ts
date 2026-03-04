import type { EntityItem, ImageItem } from '#shared/types/entity'

export type PerkItem = EntityItem &
  ImageItem & {
    readonly description: string
  }
