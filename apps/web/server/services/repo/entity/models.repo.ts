import type { ModelItem } from '../../../../shared/types/model'

import { ListSlugRepository } from '../listSlugRepo'

export class ModelsRepository extends ListSlugRepository<ModelItem> {
  protected readonly collection = 'models'

  protected readonly fields = 'id,slug,name,image_source,image_alt,brand_id,sort'

  public async getByBrand(brand_id: string): Promise<readonly ModelItem[]> {
    return this.getManyByField('brand_id', brand_id)
  }
}
