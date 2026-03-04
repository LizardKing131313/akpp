import type { BrandItem } from '#shared/types/brand'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

export class BrandsRepository extends ListSlugRepository<BrandItem> {
  protected readonly collection = 'brands'

  protected readonly fields = 'id,slug,name,image_source,image_alt,sort'
}
