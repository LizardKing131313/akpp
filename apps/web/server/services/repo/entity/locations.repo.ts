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

  private normalizeLocation(item: LocationItem): LocationItem {
    return {
      ...item,
      city_id: String(item.city_id),
      metro: item.metro ?? null,
      metro_color: item.metro_color ?? null,
    }
  }

  public override async list(): Promise<readonly LocationItem[]> {
    const items = await this.getAll(this.PUBLISHED_STATUS_QUERY)
    return items.map((item) => this.normalizeLocation(item))
  }

  public override async getById(id: string): Promise<LocationItem | null> {
    const item = await this.getOneByField('id', id, this.PUBLISHED_STATUS_QUERY)
    return item ? this.normalizeLocation(item) : null
  }

  // noinspection JSUnusedGlobalSymbols
  public async getByCity(city_id: string): Promise<readonly LocationItem[]> {
    const items = await this.getManyByField('city_id', city_id, this.PUBLISHED_STATUS_QUERY)
    return items.map((item) => this.normalizeLocation(item))
  }
}
