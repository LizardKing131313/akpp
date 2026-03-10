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
    sort
  `
}
