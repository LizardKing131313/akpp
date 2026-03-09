import type { PerkItem } from '#shared/types/perk'

import { ListRepository } from '#server/services/repo/listRepo'

// noinspection JSUnusedGlobalSymbols
export class PerksRepository extends ListRepository<PerkItem> {
  protected readonly collection = 'perks'

  protected readonly fields = 'id,name,description,sort'
}
