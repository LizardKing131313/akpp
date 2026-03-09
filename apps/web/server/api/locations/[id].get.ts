import { LocationsRepository } from '#server/services/repo/entity/locations.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const repo = new LocationsRepository()
  return await repo.getByIdOrThrow(id)
})
