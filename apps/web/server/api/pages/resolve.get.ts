import type { ResolvedPageItem } from '#shared/types/page'

import { PagesRepository } from '#server/services/repo/entity/pages.repo'
import { badRequest } from '#server/utils/http'

const parseSlugsQuery = (rawSlugs: unknown): string[] => {
  if (typeof rawSlugs !== 'string') {
    return []
  }

  return rawSlugs
    .split(',')
    .map((slug) => slug.trim())
    .filter((slug) => slug.length > 0)
}

export default defineEventHandler(async (event): Promise<ResolvedPageItem> => {
  const query = getQuery(event)
  const slugs = parseSlugsQuery(query.slugs)

  if (slugs.length === 0) {
    return badRequest('slugs query is required')
  }

  const repo = new PagesRepository()
  return await repo.resolveBySlugs(slugs)
})
