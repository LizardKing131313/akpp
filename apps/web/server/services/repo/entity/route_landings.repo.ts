import type {
  ResolvedRouteLandingItem,
  RouteLandingCityOverrideItem,
  RouteLandingEntityItem,
  RouteLandingItem,
  RouteLandingListFilters,
  RouteLandingPageType,
  RouteLandingResolveInput,
} from '#shared/types/route-landing'

import { ListRepository } from '#server/services/repo/listRepo'
import { buildRouteLandingPath } from '#shared/lib/route-landing'

type RawRouteLandingRelation = {
  readonly id?: string | null
  readonly slug?: string | null
  readonly name?: string | null
  readonly image_source?: string | null
  readonly image_alt?: string | null
}

type RawRouteLandingItem = {
  readonly id: string
  readonly page_type: RouteLandingPageType
  readonly title?: string | null
  readonly h1?: string | null
  readonly seo_title?: string | null
  readonly seo_description?: string | null
  readonly content?: string | null
  readonly menu_title?: string | null
  readonly breadcrumb_title?: string | null
  readonly is_active?: boolean | null
  readonly date_updated?: string | null
  readonly brand_id?: RawRouteLandingRelation | null
  readonly model_id?: RawRouteLandingRelation | null
  readonly service_id?: RawRouteLandingRelation | null
}

const normalizeText = (value: string | null | undefined): string => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

const mapRelation = (
  relation: RawRouteLandingRelation | null | undefined
): RouteLandingEntityItem | null => {
  const id = normalizeText(relation?.id)
  const slug = normalizeText(relation?.slug)
  const name = normalizeText(relation?.name)
  const imageSource = normalizeText(relation?.image_source)
  const imageAlt = normalizeText(relation?.image_alt)

  if (id.length === 0 || slug.length === 0 || name.length === 0 || imageSource.length === 0) {
    return null
  }

  return {
    id,
    slug,
    name,
    image_source: imageSource,
    image_alt: imageAlt.length > 0 ? imageAlt : undefined,
  }
}

const mapLanding = (rawLanding: RawRouteLandingItem): RouteLandingItem => {
  const brand = mapRelation(rawLanding.brand_id)
  const model = mapRelation(rawLanding.model_id)
  const service = mapRelation(rawLanding.service_id)

  return {
    id: rawLanding.id,
    page_type: rawLanding.page_type,
    title: normalizeText(rawLanding.title),
    h1: normalizeText(rawLanding.h1),
    seo_title: normalizeText(rawLanding.seo_title),
    seo_description: normalizeText(rawLanding.seo_description),
    content: normalizeText(rawLanding.content),
    menu_title: normalizeText(rawLanding.menu_title),
    breadcrumb_title: normalizeText(rawLanding.breadcrumb_title),
    is_active: rawLanding.is_active !== false,
    date_updated: normalizeText(rawLanding.date_updated) || undefined,
    path: buildRouteLandingPath({
      page_type: rawLanding.page_type,
      brand,
      model,
      service,
    }),
    brand,
    model,
    service,
  }
}

const applyCityOverride = (
  landing: RouteLandingItem,
  cityOverride: RouteLandingCityOverrideItem | null
): ResolvedRouteLandingItem => {
  const fallbackTitle =
    landing.page_type === 'brand_model'
      ? (landing.model?.name ?? landing.brand?.name ?? '')
      : (landing.service?.name ?? landing.brand?.name ?? '')

  const resolvedH1 = cityOverride?.h1.trim() || landing.h1 || landing.title || fallbackTitle
  const resolvedSeoTitle = cityOverride?.seo_title.trim() || landing.seo_title || resolvedH1
  const resolvedSeoDescription =
    cityOverride?.seo_description.trim() || landing.seo_description || landing.content || resolvedH1
  const resolvedContent = cityOverride?.content.trim() || landing.content || resolvedH1

  return {
    ...landing,
    resolved_h1: resolvedH1,
    resolved_seo_title: resolvedSeoTitle,
    resolved_seo_description: resolvedSeoDescription,
    resolved_content: resolvedContent,
  }
}

export class RouteLandingsRepository extends ListRepository<RouteLandingItem> {
  protected readonly collection = 'route_landings'

  protected readonly fields = `
    id,
    page_type,
    title,
    h1,
    seo_title,
    seo_description,
    content,
    menu_title,
    breadcrumb_title,
    is_active,
    date_updated,
    brand_id.id,
    brand_id.slug,
    brand_id.name,
    brand_id.image_source,
    brand_id.image_alt,
    model_id.id,
    model_id.slug,
    model_id.name,
    model_id.image_source,
    model_id.image_alt,
    service_id.id,
    service_id.slug,
    service_id.name,
    service_id.image_source,
    service_id.image_alt,
    sort
  `

  public override async list(): Promise<readonly RouteLandingItem[]> {
    return await this.listPublished()
  }

  public async listPublished(
    filters: RouteLandingListFilters = {}
  ): Promise<readonly RouteLandingItem[]> {
    const directus = this.getDirectus()
    const items = await directus.getItems<RawRouteLandingItem>(this.collection, {
      limit: -1,
      fields: this.fields,
      sort: this.SORT_FIELD,
      'filter[status][_eq]': 'published',
      'filter[is_active][_neq]': false,
      ...(filters.page_type ? { 'filter[page_type][_eq]': filters.page_type } : {}),
      ...(filters.brand_slug
        ? { 'filter[brand_id][slug][_eq]': normalizeText(filters.brand_slug) }
        : {}),
      ...(filters.model_slug
        ? { 'filter[model_id][slug][_eq]': normalizeText(filters.model_slug) }
        : {}),
      ...(filters.service_slug
        ? { 'filter[service_id][slug][_eq]': normalizeText(filters.service_slug) }
        : {}),
    })

    return items.map(mapLanding).filter((landing) => landing.path !== '/')
  }

  public async resolve(
    input: RouteLandingResolveInput,
    cityOverrideRepo?: {
      getByLandingAndCity: (
        landingId: string,
        cityId: string | undefined
      ) => Promise<RouteLandingCityOverrideItem | null>
    }
  ): Promise<ResolvedRouteLandingItem | null> {
    const matchingLandings = await this.listPublished(input)
    const landing = matchingLandings[0]

    if (!landing) {
      return null
    }

    const cityOverride = cityOverrideRepo
      ? await cityOverrideRepo.getByLandingAndCity(landing.id, input.city_id)
      : null

    return applyCityOverride(landing, cityOverride)
  }
}
