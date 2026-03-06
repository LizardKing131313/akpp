import type { SlugEntityItem } from '#shared/types/entity'

import { SlugRepository } from '#server/services/repo/slugRepo'

export abstract class ListSlugRepository<
  ItemType extends SlugEntityItem,
> extends SlugRepository<ItemType> {
  public async list(): Promise<readonly ItemType[]> {
    return this.getAll()
  }

  public async getBySlug(slug: string): Promise<ItemType | null> {
    return this.getOneByField('slug', slug)
  }
}
