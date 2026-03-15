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
    const normalizedCityId = city_id.trim()

    if (normalizedCityId.length === 0) {
      return []
    }

    const directus = this.getDirectus()

    return await directus.getItems<HeroItem>(this.collection, {
      fields: this.fields,
      sort: this.SORT_FIELD,
      ...this.PUBLISHED_STATUS_QUERY,
      'filter[_or][0][city_id][_eq]': normalizedCityId,
      'filter[_or][1][city_id][_null]': true,
    })
  }

  public override async list(): Promise<readonly HeroItem[]> {
    return this.getAll(this.PUBLISHED_STATUS_QUERY)
  }

  public override async getById(id: string): Promise<HeroItem | null> {
    return this.getOneByField('id', id, this.PUBLISHED_STATUS_QUERY)
  }
}
