import { CitiesRepository } from '#server/services/repo/entity/cities.repo'

export default defineEventHandler(async () => {
  const repo = new CitiesRepository()
  return await repo.list()
})
