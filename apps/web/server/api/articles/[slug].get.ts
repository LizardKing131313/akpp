import { ArticlesRepository } from '#server/services/repo/entity/articles.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event)
  const repo = new ArticlesRepository()
  return await repo.getBySlugOrThrow(slug)
})
