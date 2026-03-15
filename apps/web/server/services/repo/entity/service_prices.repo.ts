import type { ServicePriceItem } from '#shared/types/service'

import { ListRepository } from '#server/services/repo/listRepo'

export class ServicePricesRepository extends ListRepository<ServicePriceItem> {
  protected readonly collection = 'service_prices'

  protected readonly fields = `
    id,
    name,
    isFrom,
    price,
    sort,
  `

  public override async list(): Promise<readonly ServicePriceItem[]> {
    return this.getAll(this.PUBLISHED_STATUS_QUERY)
  }

  public override async getById(id: string): Promise<ServicePriceItem | null> {
    return this.getOneByField('id', id, this.PUBLISHED_STATUS_QUERY)
  }
}
