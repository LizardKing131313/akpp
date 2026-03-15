import { QuizContextsRepository } from '#server/services/repo/entity/quiz_contexts.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new QuizContextsRepository()
  return await repo.list()
})
