import { ModelsRepository } from '#server/services/repo/entity/models.repo'

export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event)
  const repo = new ModelsRepository()
  return await repo.getBySlugOrThrow(slug)
})
