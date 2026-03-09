import { ModelsRepository } from '#server/services/repo/entity/models.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new ModelsRepository()
  return await repo.list()
})
