import { TransmissionsRepository } from '#server/services/repo/entity/transmissions.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new TransmissionsRepository()
  return await repo.list()
})
