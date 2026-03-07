import { QuizModalRepository } from '#server/services/repo/entity/quiz_modal.repo'

export default defineEventHandler(async () => {
  const repo = new QuizModalRepository()
  return await repo.get()
})
