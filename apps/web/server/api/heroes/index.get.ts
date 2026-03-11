import { HeroesRepository } from '#server/services/repo/entity/heroes.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const repo = new HeroesRepository()

  const query = getQuery(event)
  const cityIdRaw = query.cityId
  const cityId = typeof cityIdRaw === 'string' ? cityIdRaw : undefined

  if (cityId) {
    return await repo.getByCity(cityId)
  }

  return await repo.list()
})
