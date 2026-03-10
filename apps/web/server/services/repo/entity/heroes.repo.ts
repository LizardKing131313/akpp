import type { HeroItem } from '#shared/types/hero'

import { ListRepository } from '#server/services/repo/listRepo'

export class HeroesRepository extends ListRepository<HeroItem> {
  protected readonly collection = 'heroes'

  protected readonly fields = `
    id,
    name,
    image_source,
    image_alt,
    title_accent,
    title_main,
    description,
    city_id,
    sort,
  `

  // noinspection JSUnusedGlobalSymbols
  public async getByCity(city_id: string): Promise<readonly HeroItem[]> {
    return this.getManyByField('city_id', city_id)
  }
}
