import type { FaqListFilters } from '#shared/types/faq'

import { FaqsRepository } from '#server/services/repo/entity/faqs.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const routeLandingId =
    typeof query.routeLandingId === 'string' && query.routeLandingId.trim().length > 0
      ? query.routeLandingId.trim()
      : undefined
  const showOnHomepage =
    query.showOnHomepage === 'true' ? true : query.showOnHomepage === 'false' ? false : undefined

  const filters: FaqListFilters = {
    route_landing_id: routeLandingId,
    show_on_homepage: showOnHomepage,
  }

  const repo = new FaqsRepository()
  return await repo.list(filters)
})
