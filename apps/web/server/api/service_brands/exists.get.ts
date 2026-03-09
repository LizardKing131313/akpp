import { ServiceBrandsRepository } from '#server/services/repo/entity/service_brands.repo'
import { badRequest } from '#server/utils/http'

const normalizeQueryValue = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined
  }

  const normalized = value.trim()
  return normalized.length > 0 ? normalized : undefined
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const serviceId = normalizeQueryValue(query.serviceId)
  const brandId = normalizeQueryValue(query.brandId)

  if (!serviceId || !brandId) {
    return badRequest('serviceId and brandId are required')
  }

  const repo = new ServiceBrandsRepository()
  const exists = await repo.existsByServiceAndBrand(serviceId, brandId)
  return { exists }
})
