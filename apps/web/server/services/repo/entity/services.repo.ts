import type { ServiceItem } from '../../../../shared/types/service'

import { ListSlugRepository } from '../listSlugRepo'

export class ServicesRepository extends ListSlugRepository<ServiceItem> {
  protected readonly collection = 'services'

  protected readonly fields = 'id,slug,name,image_source,image_alt,sort'
}
