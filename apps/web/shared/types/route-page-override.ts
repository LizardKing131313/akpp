export type RoutePageOverrideType = 'repair_brand' | 'repair_model' | 'service' | 'service_brand'

export type RoutePageOverrideItem = {
  readonly id: string
  readonly route_type: RoutePageOverrideType
  readonly service_id?: string
  readonly brand_id?: string
  readonly model_id?: string
  readonly h1?: string
  readonly seo_title?: string
  readonly seo_description?: string
  readonly content?: string
}
