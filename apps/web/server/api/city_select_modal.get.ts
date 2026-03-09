import { CitySelectModalRepository } from '#server/services/repo/entity/city_select_modal.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new CitySelectModalRepository()
  return await repo.get()
})
