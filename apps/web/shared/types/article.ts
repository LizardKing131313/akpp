import type { ImageItem, SlugEntityItem } from '#shared/types/entity'

export type ArticleItem = SlugEntityItem &
  ImageItem & {
    readonly content: string
    readonly date: string
    readonly annotation: string
    readonly recomended: RecomendedArticleItem[]
  }

export type RecomendedArticleItem = SlugEntityItem &
  ImageItem & {
    readonly date: string
    readonly annotation: string
  }
