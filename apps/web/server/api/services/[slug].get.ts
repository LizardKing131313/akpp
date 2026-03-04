import { ServicesRepository } from '#server/services/repo/entity/services.repo'

export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event)
  const repo = new ServicesRepository()
  return await repo.getBySlugOrThrow(slug)
})
