import { CasesRepository } from '#server/services/repo/entity/cases.repo'

export default defineEventHandler(async () => {
  const repo = new CasesRepository()
  return await repo.list()
})
