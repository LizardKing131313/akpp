import type { BrandItem } from '#shared/types/brand'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

export class BrandsRepository extends ListSlugRepository<BrandItem> {
  protected readonly collection = 'brands'

  protected readonly fields = 'id,slug,name,image_source,image_alt,sort'

  public override async list(): Promise<readonly BrandItem[]> {
    const items = await this.getAll()

    return items.map((item) => ({
      ...item,
      id: String(item.id),
    }))
  }

  public override async getBySlug(slug: string): Promise<BrandItem | null> {
    const item = await this.getOneByField('slug', slug)

    return item
      ? {
          ...item,
          id: String(item.id),
        }
      : null
  }
}
