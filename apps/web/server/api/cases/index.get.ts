import { CasesRepository } from '#server/services/repo/entity/cases.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new CasesRepository()
  return await repo.list()
})
