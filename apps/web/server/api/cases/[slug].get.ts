import { CasesRepository } from '#server/services/repo/entity/cases.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event)
  const repo = new CasesRepository()
  return await repo.getBySlugOrThrow(slug)
})
