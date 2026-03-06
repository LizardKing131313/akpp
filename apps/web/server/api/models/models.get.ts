import { ModelsRepository } from '#server/services/repo/entity/models.repo'

export default defineEventHandler(async () => {
  const repo = new ModelsRepository()
  return await repo.list()
})
