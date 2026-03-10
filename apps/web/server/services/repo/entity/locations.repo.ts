import type { LocationItem } from '#shared/types/location'

import { ListRepository } from '#server/services/repo/listRepo'

export class LocationsRepository extends ListRepository<LocationItem> {
  protected readonly collection = 'locations'

  protected readonly fields = `
    id,
    name,
    lat,
    lng,
    address,
    worktime,
    phone,
    metro,
    metro_color,
    images.id,
    images.directus_files_id,
    city_id,
    sort,
  `

  // noinspection JSUnusedGlobalSymbols
  public async getByCity(city_id: string): Promise<readonly LocationItem[]> {
    return this.getManyByField('city_id', city_id)
  }
}
