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

  // noinspection JSUnusedGlobalSymbols
  public async getByBrand(brand_id: string): Promise<readonly ModelItem[]> {
    return this.getManyByField('brand_id', brand_id)
  }
}
