import type { ServicePriceItem } from '../../../../shared/types/service'

import { ListRepository } from '../listRepo'

export class ServicePricesRepository extends ListRepository<ServicePriceItem> {
  protected readonly collection = 'service_prices'

  protected readonly fields = 'id,name,isFrom,price,sort'
}
