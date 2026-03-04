import type { FaqItem } from '#shared/types/faq'

import { ListRepository } from '#server/services/repo/listRepo'

export class FaqsRepository extends ListRepository<FaqItem> {
  protected readonly collection = 'faqs'

  protected readonly fields = 'id,name,question,answer,service_id,sort'

  public async getByService(serviceId: string): Promise<readonly FaqItem[]> {
    return this.getManyByField('service_id', serviceId)
  }
}
