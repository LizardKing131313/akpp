import type { FaqApiItem } from '#shared/types/api/faq'
import type { FaqItem } from '#shared/types/faq'

import { createDirectusClient } from '#server/services/directus'
import { ListRepository } from '#server/services/repo/listRepo'
import { mapFaqApiItemToFaqItem } from '#server/services/repo/mappers/faq.mapper'

export class FaqsRepository extends ListRepository<FaqItem> {
  protected readonly collection = 'faqs'

  protected readonly fields = 'id,question,answer,service_id,sort'

  public override async list(): Promise<readonly FaqItem[]> {
    const directus = createDirectusClient()

    const apiItems = await directus.getItems<FaqApiItem>(this.collection, {
      fields: this.fields,
      sort: this.SORT_FIELD,
    })

    return apiItems.map(mapFaqApiItemToFaqItem)
  }

  public async getByService(serviceId: string): Promise<readonly FaqItem[]> {
    const directus = createDirectusClient()

    const apiItems = await directus.getItems<FaqApiItem>(this.collection, {
      fields: this.fields,
      sort: this.SORT_FIELD,
      ...directus.equals('service_id', serviceId),
    })

    return apiItems.map(mapFaqApiItemToFaqItem)
  }
}
