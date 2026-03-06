import type { EntityItem } from '#shared/types/entity'

import { Repository } from '#server/services/repo/repo'

export abstract class ListRepository<ItemType extends EntityItem> extends Repository<ItemType> {
  public async list(): Promise<readonly ItemType[]> {
    return this.getAll()
  }
}
