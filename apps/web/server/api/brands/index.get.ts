import { BrandsRepository } from '#server/services/repo/entity/brands.repo'

export default defineEventHandler(async () => {
  const repo = new BrandsRepository()
  return await repo.list()
})
