import { HeroesRepository } from '#server/services/repo/entity/heroes.repo'

export default defineEventHandler(async () => {
  const repo = new HeroesRepository()
  return await repo.list()
})
