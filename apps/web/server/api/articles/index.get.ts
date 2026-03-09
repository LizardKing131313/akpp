import { ArticlesRepository } from '#server/services/repo/entity/articles.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new ArticlesRepository()
  return await repo.list()
})
