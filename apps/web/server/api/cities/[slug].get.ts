import { CitiesRepository } from '#server/services/repo/cities.repo'

export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event)
  const repo = new CitiesRepository()
  return await repo.getBySlugOrThrow(slug)
})
