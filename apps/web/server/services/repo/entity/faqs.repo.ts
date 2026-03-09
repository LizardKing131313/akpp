import type { FaqApiItem } from '#shared/types/api/faq'
import type { FaqItem } from '#shared/types/faq'

import { ListRepository } from '#server/services/repo/listRepo'
import { mapFaqApiItemToFaqItem } from '#server/services/repo/mappers/faq.mapper'

export class FaqsRepository extends ListRepository<FaqItem> {
  protected readonly collection = 'faqs'

  protected readonly fields = 'id,question,answer,service_id,sort'

  private async fetchFaqApiItems(serviceId?: string): Promise<readonly FaqApiItem[]> {
    const directus = this.getDirectus()
    const filterByService = serviceId ? directus.equals('service_id', serviceId) : undefined

    return await directus.getItems<FaqApiItem>(this.collection, {
      fields: this.fields,
      sort: this.SORT_FIELD,
      ...filterByService,
    })
  }

  public override async list(): Promise<readonly FaqItem[]> {
    const apiItems = await this.fetchFaqApiItems()
    return apiItems.map(mapFaqApiItemToFaqItem)
  }

  // noinspection JSUnusedGlobalSymbols
  public async getByService(serviceId: string): Promise<readonly FaqItem[]> {
    const apiItems = await this.fetchFaqApiItems(serviceId)
    return apiItems.map(mapFaqApiItemToFaqItem)
  }
}
