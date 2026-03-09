import { ServicesRepository } from '#server/services/repo/entity/services.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new ServicesRepository()
  return await repo.list()
})
