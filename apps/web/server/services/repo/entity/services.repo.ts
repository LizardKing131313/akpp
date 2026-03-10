import type { ServiceItem } from '#shared/types/service'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

export class ServicesRepository extends ListSlugRepository<ServiceItem> {
  protected readonly collection = 'services'

  protected readonly fields = `
    id,
    slug,
    name,
    colspan,
    image_source,
    image_alt,
    sort
  `
}
