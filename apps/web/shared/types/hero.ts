import type { EntityItem, ImageItem } from '#shared/types/entity'

export type HeroItem = EntityItem &
  ImageItem & {
    readonly title_accent: string
    readonly title_main: string
    readonly description: string
    readonly city_id?: string
  }
