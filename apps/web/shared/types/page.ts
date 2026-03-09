import type { SlugEntityItem } from '#shared/types/entity'

export type PageItem = SlugEntityItem & {
  readonly h1?: string
  readonly content?: string
  readonly seo_title?: string
  readonly seo_description?: string
}

export type ResolvedPageItem = {
  readonly matched_slug: string | null
  readonly page: PageItem | null
}
