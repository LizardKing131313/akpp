import { QuizSymptomsRepository } from '#server/services/repo/entity/quiz_symptoms.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const repo = new QuizSymptomsRepository()
  const query = getQuery(event)
  const rawProblemId = query.problemId
  const problemId = typeof rawProblemId === 'string' ? rawProblemId : undefined

  if (problemId) {
    return await repo.getByProblem(problemId)
  }

  return await repo.list()
})
