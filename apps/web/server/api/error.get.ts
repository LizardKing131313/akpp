import { ErrorRepository } from '#server/services/repo/entity/error.repo'

export default defineEventHandler(async () => {
  const repo = new ErrorRepository()
  return await repo.get()
})
