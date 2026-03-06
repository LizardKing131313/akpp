import type { ImageItem, SlugEntityItem } from '#shared/types/entity'

export type ArticleItem = SlugEntityItem &
  ImageItem & {
    readonly content: string
    readonly date: string
  }
