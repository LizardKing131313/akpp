import type { LocationItem } from 'apps/web/shared/types/location'

import { ListRepository } from 'apps/web/server/services/repo/listRepo'

export class LocationsRepository extends ListRepository<LocationItem> {
  protected readonly collection = 'locations'

  protected readonly fields =
    'id,name,latitude,longitude,address,worktime,phone,metro,metro_color,images,city_id,sort'

  public async getByCity(cityId: string): Promise<readonly LocationItem[]> {
    return this.getManyByField('city_id', cityId)
  }
}
