import { ListRepository } from '#server/services/repo/listRepo'

type ServiceBrandLinkItem = {
  readonly id: string
}

export class ServiceBrandsRepository extends ListRepository<ServiceBrandLinkItem> {
  protected readonly collection = 'service_brands'

  protected readonly fields = 'id,service_id,brand_id,status,sort'

  public async existsByServiceAndBrand(
    serviceId: string | undefined,
    brandId: string | undefined
  ): Promise<boolean> {
    if (!serviceId || !brandId) {
      return false
    }

    const normalizedServiceId = serviceId.trim()
    const normalizedBrandId = brandId.trim()

    if (normalizedServiceId.length === 0 || normalizedBrandId.length === 0) {
      return false
    }

    const directus = this.getDirectus()
    const items = await directus.getItems<ServiceBrandLinkItem>(this.collection, {
      limit: 1,
      fields: 'id',
      'filter[status][_eq]': 'published',
      'filter[service_id][_eq]': normalizedServiceId,
      'filter[brand_id][_eq]': normalizedBrandId,
    })

    return items.length > 0
  }
}
