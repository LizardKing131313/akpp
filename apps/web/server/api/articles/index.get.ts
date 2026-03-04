import { ArticlesRepository } from '#server/services/repo/entity/articles.repo'

export default defineEventHandler(async () => {
  const repo = new ArticlesRepository()
  return await repo.list()
})
