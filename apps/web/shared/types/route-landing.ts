import type { BrandItem } from '#shared/types/brand'
import type { ModelItem } from '#shared/types/model'
import type { ServiceItem } from '#shared/types/service'

export type RouteLandingPageType = 'brand' | 'brand_model' | 'service' | 'service_brand'

export type RouteLandingEntityItem = {
  readonly id: string
  readonly slug: string
  readonly name: string
  readonly image_source: string
  readonly image_alt?: string | undefined
}

export type RouteLandingItem = {
  readonly id: string
  readonly page_type: RouteLandingPageType
  readonly title: string
  readonly h1: string
  readonly seo_title: string
  readonly seo_description: string
  readonly content: string
  readonly menu_title: string
  readonly breadcrumb_title: string
  readonly is_active: boolean
  readonly date_updated?: string | undefined
  readonly path: string
  readonly brand: RouteLandingEntityItem | null
  readonly model: RouteLandingEntityItem | null
  readonly service: RouteLandingEntityItem | null
}

export type RouteLandingCityOverrideItem = {
  readonly id: string
  readonly landing_id: string
  readonly city_id: string
  readonly h1: string
  readonly seo_title: string
  readonly seo_description: string
  readonly content: string
}

export type ResolvedRouteLandingItem = RouteLandingItem & {
  readonly resolved_h1: string
  readonly resolved_seo_title: string
  readonly resolved_seo_description: string
  readonly resolved_content: string
}

export type RouteLandingListFilters = {
  readonly page_type?: RouteLandingPageType | undefined
  readonly brand_slug?: string | undefined
  readonly model_slug?: string | undefined
  readonly service_slug?: string | undefined
}

export type RouteLandingResolveInput = RouteLandingListFilters & {
  readonly city_id?: string | undefined
}

export type RouteLandingBrandItem = Pick<
  BrandItem,
  'id' | 'slug' | 'name' | 'image_source' | 'image_alt'
>

export type RouteLandingModelItem = Pick<
  ModelItem,
  'id' | 'slug' | 'name' | 'image_source' | 'image_alt'
>

export type RouteLandingServiceItem = Pick<
  ServiceItem,
  'id' | 'slug' | 'name' | 'image_source' | 'image_alt'
>
