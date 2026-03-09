import type { QuizApiResponse } from '#shared/types/api/quiz'

import { QuizRepository } from '#server/services/repo/entity/quiz.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler<Promise<QuizApiResponse>>(async (event) => {
  const query = getQuery(event)
  const rawBrandId = query.brandId
  const brandId = typeof rawBrandId === 'string' ? rawBrandId : undefined

  const repo = new QuizRepository()
  return await repo.get(brandId)
})
