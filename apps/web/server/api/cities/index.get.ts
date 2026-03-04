import { CitiesRepository } from '#server/services/repo/entity/cities.repo'

export default defineEventHandler(async () => {
  const repo = new CitiesRepository()
  return await repo.list()
})

export const getCities = () => [
  { id: 'moscow', title: 'Москва' },
  { id: 'spb', title: 'Санкт-Петербург' },
]
