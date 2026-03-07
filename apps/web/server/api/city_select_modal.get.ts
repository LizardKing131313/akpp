import { CitySelectModalRepository } from '#server/services/repo/entity/city_select_modal.repo'

export default defineEventHandler(async () => {
  const repo = new CitySelectModalRepository()
  return await repo.get()
})
