import type { PageItem } from '#shared/types/page'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

const normalizeSlug = (rawSlug: string): string => rawSlug.replace(/^\/+|\/+$/g, '').trim()

export class PagesRepository extends ListSlugRepository<PageItem> {
  protected readonly collection = 'pages'

  protected readonly fields =
    'id,slug,name,h1,content,seo_title,seo_description,sort,date_updated,status'

  public async resolveBySlugs(slugs: readonly string[]): Promise<{
    readonly matched_slug: string | null
    readonly page: PageItem | null
  }> {
    const normalizedSlugs = slugs
      .map((slug) => normalizeSlug(slug))
      .filter((slug) => slug.length > 0)

    if (normalizedSlugs.length === 0) {
      return {
        matched_slug: null,
        page: null,
      }
    }

    const directus = this.getDirectus()
    const items = await directus.getItems<PageItem>(this.collection, {
      limit: normalizedSlugs.length,
      fields: this.fields,
      'filter[status][_eq]': 'published',
      'filter[slug][_in]': normalizedSlugs.join(','),
    })

    const pagesBySlug = new Map<string, PageItem>()
    for (const item of items) {
      pagesBySlug.set(item.slug, item)
    }

    for (const slug of normalizedSlugs) {
      const page = pagesBySlug.get(slug)
      if (page) {
        return {
          matched_slug: slug,
          page,
        }
      }
    }

    return {
      matched_slug: null,
      page: null,
    }
  }
}
