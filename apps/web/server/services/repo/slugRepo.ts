import type { SlugEntityItem } from '#shared/types/entity'

import { Repository } from '#server/services/repo/repo'
import { badRequest, notFound } from '#server/utils/http'

export abstract class SlugRepository<ItemType extends SlugEntityItem> extends Repository<ItemType> {
  public abstract getBySlug(slug: string): Promise<ItemType | null>

  public async getBySlugOrThrow(slug: string | undefined): Promise<ItemType> {
    if (!slug) {
      return badRequest('Slug is required')
    }

    const entity = await this.getBySlug(slug)

    if (!entity) {
      return notFound(`Entity not found: ${slug}`)
    }

    return entity
  }
}
