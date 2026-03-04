import type { EntityItem } from '#shared/types/entity'

import { Repository } from '#server/services/repo/repo'

export abstract class ListRepository<ItemType extends EntityItem> extends Repository<ItemType> {
  public async list(): Promise<readonly ItemType[]> {
    return this.getAll()
  }

  public async getById(id: string): Promise<ItemType | null> {
    return this.getOneByField('id', id)
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
