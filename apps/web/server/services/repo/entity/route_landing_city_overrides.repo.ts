import type { RouteLandingCityOverrideItem } from '#shared/types/route-landing'

import { ListRepository } from '#server/services/repo/listRepo'

type RawRouteLandingCityOverrideItem = {
  readonly id: string
  readonly landing_id?: string | { readonly id?: string | null } | null
  readonly city_id?: string | { readonly id?: string | null } | null
  readonly h1?: string | null
  readonly seo_title?: string | null
  readonly seo_description?: string | null
  readonly content?: string | null
}

const normalizeText = (value: string | null | undefined): string => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

const normalizeRelationId = (
  value: string | { readonly id?: string | null } | null | undefined
): string => {
  if (typeof value === 'string') {
    return value.trim()
  }

  return normalizeText(value?.id)
}

export class RouteLandingCityOverridesRepository extends ListRepository<RouteLandingCityOverrideItem> {
  protected readonly collection = 'route_landing_city_overrides'

  protected readonly fields = `
    id,
    landing_id,
    city_id,
    h1,
    seo_title,
    seo_description,
    content,
    sort
  `

  public override async list(): Promise<readonly RouteLandingCityOverrideItem[]> {
    const directus = this.getDirectus()
    const items = await directus.getItems<RawRouteLandingCityOverrideItem>(this.collection, {
      fields: this.fields,
      sort: this.SORT_FIELD,
      'filter[status][_eq]': 'published',
    })

    return items.map((item) => ({
      id: item.id,
      landing_id: normalizeRelationId(item.landing_id),
      city_id: normalizeRelationId(item.city_id),
      h1: normalizeText(item.h1),
      seo_title: normalizeText(item.seo_title),
      seo_description: normalizeText(item.seo_description),
      content: normalizeText(item.content),
    }))
  }

  public async getByLandingAndCity(
    landingId: string,
    cityId: string | undefined
  ): Promise<RouteLandingCityOverrideItem | null> {
    const normalizedLandingId = landingId.trim()
    const normalizedCityId = cityId?.trim() ?? ''

    if (normalizedLandingId.length === 0 || normalizedCityId.length === 0) {
      return null
    }

    const directus = this.getDirectus()
    const items = await directus.getItems<RawRouteLandingCityOverrideItem>(this.collection, {
      limit: 1,
      fields: this.fields,
      'filter[status][_eq]': 'published',
      'filter[landing_id][_eq]': normalizedLandingId,
      'filter[city_id][_eq]': normalizedCityId,
    })

    const firstItem = items[0]

    if (!firstItem) {
      return null
    }

    return {
      id: firstItem.id,
      landing_id: normalizeRelationId(firstItem.landing_id),
      city_id: normalizeRelationId(firstItem.city_id),
      h1: normalizeText(firstItem.h1),
      seo_title: normalizeText(firstItem.seo_title),
      seo_description: normalizeText(firstItem.seo_description),
      content: normalizeText(firstItem.content),
    }
  }
}
