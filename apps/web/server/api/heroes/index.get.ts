import { HeroesRepository } from '#server/services/repo/entity/heroes.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new HeroesRepository()
  return await repo.list()
})
