import { LocationsRepository } from '#server/services/repo/entity/locations.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const repo = new LocationsRepository()

  const query = getQuery(event)
  const cityIdRaw = query.cityId

  const cityId = typeof cityIdRaw === 'string' ? cityIdRaw : undefined

  if (cityId) {
    return await repo.getByCity(cityId)
  }

  return await repo.list()
})
