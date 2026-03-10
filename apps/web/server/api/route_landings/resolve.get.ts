import type { RouteLandingResolveInput } from '#shared/types/route-landing'

import { normalizeRouteLandingQueryValue } from '#server/api/route_landings/query'
import { RouteLandingCityOverridesRepository } from '#server/services/repo/entity/route_landing_city_overrides.repo'
import { RouteLandingsRepository } from '#server/services/repo/entity/route_landings.repo'
import { badRequest, notFound } from '#server/utils/http'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const pageType = normalizeRouteLandingQueryValue(query.pageType)

  if (
    pageType !== 'brand' &&
    pageType !== 'brand_model' &&
    pageType !== 'service' &&
    pageType !== 'service_brand'
  ) {
    return badRequest('pageType is required')
  }

  const input: RouteLandingResolveInput = {
    page_type: pageType,
    brand_slug: normalizeRouteLandingQueryValue(query.brandSlug),
    model_slug: normalizeRouteLandingQueryValue(query.modelSlug),
    service_slug: normalizeRouteLandingQueryValue(query.serviceSlug),
    city_id: normalizeRouteLandingQueryValue(query.cityId),
  }

  const routeLandingsRepo = new RouteLandingsRepository()
  const cityOverridesRepo = new RouteLandingCityOverridesRepository()
  const landing = await routeLandingsRepo.resolve(input, cityOverridesRepo)

  if (!landing) {
    return notFound('Route landing not found')
  }

  return landing
})
