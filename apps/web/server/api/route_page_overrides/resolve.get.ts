import type { RoutePageOverrideType } from '#shared/types/route-page-override'

import { RoutePageOverridesRepository } from '#server/services/repo/entity/route_page_overrides.repo'
import { badRequest } from '#server/utils/http'

const routeTypes = new Set<RoutePageOverrideType>([
  'repair_brand',
  'repair_model',
  'service',
  'service_brand',
])

const normalizeQueryValue = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined
  }

  const normalized = value.trim()
  return normalized.length > 0 ? normalized : undefined
}

const parseRouteType = (value: unknown): RoutePageOverrideType | null => {
  const routeType = normalizeQueryValue(value)
  if (!routeType) {
    return null
  }

  return routeTypes.has(routeType as RoutePageOverrideType)
    ? (routeType as RoutePageOverrideType)
    : null
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const routeType = parseRouteType(query.routeType)

  if (!routeType) {
    return badRequest('routeType is required and must be valid')
  }

  const repo = new RoutePageOverridesRepository()

  return await repo.resolve({
    routeType,
    serviceId: normalizeQueryValue(query.serviceId),
    brandId: normalizeQueryValue(query.brandId),
    modelId: normalizeQueryValue(query.modelId),
  })
})
