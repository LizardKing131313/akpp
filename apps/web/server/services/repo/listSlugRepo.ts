import { SlugRepository } from '#server/services/repo/slugRepo'

export abstract class ListSlugRepository<
  ItemType extends SlugEntityItem,
> extends SlugRepository<ItemType> {
  public async list(): Promise<readonly ItemType[]> {
    return this.getAll()
  }

  public async getById(id: string): Promise<ItemType | null> {
    return this.getOneByField('id', id)
  }

  public async getBySlug(slug: string): Promise<ItemType | null> {
    return this.getOneByField('slug', slug)
  }

  public async create(): Promise<ItemType> {
    throw new Error(this.NOT_IMPLEMENTED)
  }

  public async update(): Promise<ItemType> {
    throw new Error(this.NOT_IMPLEMENTED)
  }

  public async delete(): Promise<void> {
    throw new Error(this.NOT_IMPLEMENTED)
  }
}
