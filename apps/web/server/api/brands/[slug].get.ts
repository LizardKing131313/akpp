import { BrandsRepository } from '#server/services/repo/entity/brands.repo'

export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event)
  const repo = new BrandsRepository()
  return await repo.getBySlugOrThrow(slug)
})
