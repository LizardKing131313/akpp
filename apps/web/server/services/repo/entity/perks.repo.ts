import type { PerkItem } from '#shared/types/perk'

import { ListRepository } from '#server/services/repo/listRepo'

export class PerksRepository extends ListRepository<PerkItem> {
  protected readonly collection = 'perks'

  protected readonly fields = `
    id,
    name,
    description,
    image_source,
    image_alt,
    sort,
  `

  public override async list(): Promise<readonly PerkItem[]> {
    return this.getAll(this.PUBLISHED_STATUS_QUERY)
  }

  public override async getById(id: string): Promise<PerkItem | null> {
    return this.getOneByField('id', id, this.PUBLISHED_STATUS_QUERY)
  }
}
