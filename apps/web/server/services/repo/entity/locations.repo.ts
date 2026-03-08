import type { LocationApiItem } from '#shared/types/api/location'
import type { LocationItem } from '#shared/types/location'

import { ListRepository } from '#server/services/repo/listRepo'
import { mapLocationApiItemToLocationItem } from '#server/services/repo/mappers/location.mapper'

export class LocationsRepository extends ListRepository<LocationItem> {
  protected readonly collection = 'locations'

  protected readonly fields =
    'id,name,latitude,longitude,address,worktime,phone,metro,metro_color,images.directus_files_id,city_id,sort'

  private async fetchLocationApiItems(cityId?: string): Promise<readonly LocationApiItem[]> {
    const directus = this.getDirectus()
    const filterByCity = cityId ? directus.equals('city_id', cityId) : undefined

    return await directus.getItems<LocationApiItem>(this.collection, {
      fields: this.fields,
      sort: this.SORT_FIELD,
      ...filterByCity,
    })
  }

  private async fetchLocationApiItemById(id: string): Promise<LocationApiItem | null> {
    const directus = this.getDirectus()

    const apiItems = await directus.getItems<LocationApiItem>(this.collection, {
      limit: 1,
      fields: this.fields,
      ...directus.equals('id', id),
    })

    return apiItems[0] ?? null
  }

  public override async list(): Promise<readonly LocationItem[]> {
    const apiItems = await this.fetchLocationApiItems()
    return apiItems.map(mapLocationApiItemToLocationItem)
  }

  public async getByCity(cityId: string): Promise<readonly LocationItem[]> {
    const apiItems = await this.fetchLocationApiItems(cityId)
    return apiItems.map(mapLocationApiItemToLocationItem)
  }

  public override async getById(id: string): Promise<LocationItem | null> {
    const apiItem = await this.fetchLocationApiItemById(id)
    if (!apiItem) {
      return null
    }

    return mapLocationApiItemToLocationItem(apiItem)
  }
}
