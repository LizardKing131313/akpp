import type { ModelItem } from '#shared/types/model'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

export class ModelsRepository extends ListSlugRepository<ModelItem> {
  protected readonly collection = 'models'

  protected readonly fields = `
    id,
    name,
    slug,
    image_source,
    image_alt,
    brand_id,
    sort,
  `

  public override async list(): Promise<readonly ModelItem[]> {
    return this.getAll(this.PUBLISHED_STATUS_QUERY)
  }

  public override async getBySlug(slug: string): Promise<ModelItem | null> {
    return this.getOneByField('slug', slug, this.PUBLISHED_STATUS_QUERY)
  }

  public override async getById(id: string): Promise<ModelItem | null> {
    return this.getOneByField('id', id, this.PUBLISHED_STATUS_QUERY)
  }

  // noinspection JSUnusedGlobalSymbols
  public async getByBrand(brand_id: string): Promise<readonly ModelItem[]> {
    return this.getManyByField('brand_id', brand_id, this.PUBLISHED_STATUS_QUERY)
  }
}
