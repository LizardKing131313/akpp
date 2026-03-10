import type { FaqItem } from '#shared/types/faq'

import { ListRepository } from '#server/services/repo/listRepo'

export class FaqsRepository extends ListRepository<FaqItem> {
  protected readonly collection = 'faqs'

  protected readonly fields = 'id,question,answer,service_id,sort'
}
