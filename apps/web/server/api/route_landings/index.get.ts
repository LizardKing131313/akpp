import type { RouteLandingListFilters } from '#shared/types/route-landing'

import { normalizeRouteLandingQueryValue } from '#server/api/route_landings/query'
import { RouteLandingsRepository } from '#server/services/repo/entity/route_landings.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const filters: RouteLandingListFilters = {
    page_type:
      query.pageType === 'brand' ||
      query.pageType === 'brand_model' ||
      query.pageType === 'service' ||
      query.pageType === 'service_brand'
        ? query.pageType
        : undefined,
    brand_slug: normalizeRouteLandingQueryValue(query.brandSlug),
    model_slug: normalizeRouteLandingQueryValue(query.modelSlug),
    service_slug: normalizeRouteLandingQueryValue(query.serviceSlug),
  }

  const repo = new RouteLandingsRepository()
  return await repo.listPublished(filters)
})
