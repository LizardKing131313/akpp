import type { FaqItem, FaqListFilters } from '#shared/types/faq'

import { ListRepository } from '#server/services/repo/listRepo'

export class FaqsRepository extends ListRepository<FaqItem> {
  protected readonly collection = 'faqs'

  protected readonly fields = `
    id,
    question,
    answer,
    route_landing_id,
    show_on_homepage,
    sort,
  `

  public override async list(filters: FaqListFilters = {}): Promise<readonly FaqItem[]> {
    const directus = this.getDirectus()

    return await directus.getItems<FaqItem>(this.collection, {
      fields: this.fields,
      sort: this.SORT_FIELD,
      'filter[status][_eq]': 'published',
      ...(typeof filters.show_on_homepage === 'boolean'
        ? { 'filter[show_on_homepage][_eq]': filters.show_on_homepage }
        : {}),
      ...(filters.route_landing_id
        ? { 'filter[route_landing_id][_eq]': filters.route_landing_id }
        : {}),
    })
  }
}
