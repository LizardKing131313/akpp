import { CitiesRepository } from '#server/services/repo/cities.repo'

export default defineEventHandler(async () => {
  const repo = new CitiesRepository()
  return await repo.list()
})
