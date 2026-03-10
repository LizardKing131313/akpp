import { QuizProblemsRepository } from '#server/services/repo/entity/quiz_problems.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const repo = new QuizProblemsRepository()
  const query = getQuery(event)
  const rawBrandId = query.brandId
  const brandId = typeof rawBrandId === 'string' ? rawBrandId : undefined

  if (brandId) {
    return await repo.getByBrand(brandId)
  }

  return await repo.list()
})
