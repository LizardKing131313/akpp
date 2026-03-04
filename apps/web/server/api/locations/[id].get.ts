import { LocationsRepository } from '#server/services/repo/locations.repo'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const repo = new LocationsRepository()
  return await repo.getByIdOrThrow(id)
})
