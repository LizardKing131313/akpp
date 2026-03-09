import { ModelsRepository } from '#server/services/repo/entity/models.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event)
  const repo = new ModelsRepository()
  return await repo.getBySlugOrThrow(slug)
})
