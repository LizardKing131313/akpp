import type { BrandItem } from '#shared/types/brand'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

export class BrandsRepository extends ListSlugRepository<BrandItem> {
  protected readonly collection = 'brands'

  protected readonly fields = `
    id,
    slug,
    name,
    image_source,
    image_alt,
    sort,
  `

  public override async list(): Promise<readonly BrandItem[]> {
    return this.getAll(this.PUBLISHED_STATUS_QUERY)
  }

  public override async getBySlug(slug: string): Promise<BrandItem | null> {
    return this.getOneByField('slug', slug, this.PUBLISHED_STATUS_QUERY)
  }

  public override async getById(id: string): Promise<BrandItem | null> {
    return this.getOneByField('id', id, this.PUBLISHED_STATUS_QUERY)
  }
}
