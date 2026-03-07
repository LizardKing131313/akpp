import type { LocationApiItem } from '#shared/types/api/location'
import type { LocationItem } from '#shared/types/location'

import { createDirectusClient } from '#server/services/directus'
import { ListRepository } from '#server/services/repo/listRepo'
import { mapLocationApiItemToLocationItem } from '#server/services/repo/mappers/location.mapper'

export class LocationsRepository extends ListRepository<LocationItem> {
  protected readonly collection = 'locations'

  protected readonly fields =
    'id,name,latitude,longitude,address,worktime,phone,metro,metro_color,images,city_id,sort'

  public override async list(): Promise<readonly LocationItem[]> {
    const directus = createDirectusClient()

    const apiItems = await directus.getItems<LocationApiItem>(this.collection, {
      fields: this.fields,
      sort: this.SORT_FIELD,
    })

    return apiItems.map(mapLocationApiItemToLocationItem)
  }

  public async getByCity(cityId: string): Promise<readonly LocationItem[]> {
    const directus = createDirectusClient()

    const apiItems = await directus.getItems<LocationApiItem>(this.collection, {
      fields: this.fields,
      sort: this.SORT_FIELD,
      ...directus.equals('city_id', cityId),
    })

    return apiItems.map(mapLocationApiItemToLocationItem)
  }

  public override async getById(id: string): Promise<LocationItem | null> {
    const directus = createDirectusClient()

    const apiItems = await directus.getItems<LocationApiItem>(this.collection, {
      limit: 1,
      fields: this.fields,
      ...directus.equals('id', id),
    })

    const apiItem = apiItems[0]

    if (!apiItem) {
      return null
    }

    return mapLocationApiItemToLocationItem(apiItem)
  }
}
