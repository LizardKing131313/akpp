import type { HeroItem } from '#shared/types/hero'

import { ListRepository } from '#server/services/repo/listRepo'

export class HeroesRepository extends ListRepository<HeroItem> {
  protected readonly collection = 'heroes'

  protected readonly fields =
    'id,name,image_source,image_alt,title_accent,title_main,description,sort'
}
