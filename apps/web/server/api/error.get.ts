import { ErrorRepository } from '#server/services/repo/entity/error.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new ErrorRepository()
  return await repo.get()
})
