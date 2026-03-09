import type {
  RoutePageOverrideItem,
  RoutePageOverrideType,
} from '#shared/types/route-page-override'

import { ListRepository } from '#server/services/repo/listRepo'

type ResolveRoutePageOverrideParams = {
  readonly routeType: RoutePageOverrideType
  readonly serviceId?: string | undefined
  readonly brandId?: string | undefined
  readonly modelId?: string | undefined
}

const normalizeId = (value: string | undefined): string | undefined => {
  if (!value) {
    return undefined
  }

  const normalized = value.trim()
  return normalized.length > 0 ? normalized : undefined
}

export class RoutePageOverridesRepository extends ListRepository<RoutePageOverrideItem> {
  protected readonly collection = 'route_page_overrides'

  protected readonly fields =
    'id,route_type,service_id,brand_id,model_id,h1,seo_title,seo_description,content,sort,status'

  public async resolve(
    params: ResolveRoutePageOverrideParams
  ): Promise<RoutePageOverrideItem | null> {
    const serviceId = normalizeId(params.serviceId)
    const brandId = normalizeId(params.brandId)
    const modelId = normalizeId(params.modelId)

    const directus = this.getDirectus()
    const query: Record<string, string | number | boolean> = {
      limit: 1,
      fields: this.fields,
      'filter[status][_eq]': 'published',
      'filter[route_type][_eq]': params.routeType,
      ...(serviceId
        ? { 'filter[service_id][_eq]': serviceId }
        : { 'filter[service_id][_null]': true }),
      ...(brandId ? { 'filter[brand_id][_eq]': brandId } : { 'filter[brand_id][_null]': true }),
      ...(modelId ? { 'filter[model_id][_eq]': modelId } : { 'filter[model_id][_null]': true }),
    }

    const items = await directus.getItems<RoutePageOverrideItem>(this.collection, query)
    return items[0] ?? null
  }
}
