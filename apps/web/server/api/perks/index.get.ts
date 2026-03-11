import { PerksRepository } from '#server/services/repo/entity/perks.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new PerksRepository()
  return await repo.list()
})
