import type { EntityItem, ImageItem } from '#shared/types/entity'

export type HeroItem = EntityItem &
  ImageItem & {
    readonly titleAccent: string
    readonly titleMain: string
    readonly description: string
  }
