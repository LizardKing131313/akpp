import type { QuizApiResponse } from '#shared/types/api/quiz'

import { QuizRepository } from '#server/services/repo/entity/quiz.repo'

export default defineEventHandler<Promise<QuizApiResponse>>(async () => {
  const repo = new QuizRepository()
  return await repo.get()
})
