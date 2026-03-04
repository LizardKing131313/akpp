import type { PerkItem } from '../../../../shared/types/perk'

import { ListRepository } from '../listRepo'

export class PerksRepository extends ListRepository<PerkItem> {
  protected readonly collection = 'perks'

  protected readonly fields = 'id,name,description,sort'
}
