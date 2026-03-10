import type {
  RouteLandingEntityItem,
  RouteLandingItem,
  RouteLandingPageType,
} from '#shared/types/route-landing'

type RouteLandingPathParts = {
  readonly page_type: RouteLandingPageType
  readonly brand?: Pick<RouteLandingEntityItem, 'slug'> | null
  readonly model?: Pick<RouteLandingEntityItem, 'slug'> | null
  readonly service?: Pick<RouteLandingEntityItem, 'slug'> | null
}

const normalizeSlug = (value: string | undefined | null): string => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().replace(/^\/+|\/+$/g, '')
}

export const buildRouteLandingPath = (parts: RouteLandingPathParts): string => {
  const brandSlug = normalizeSlug(parts.brand?.slug)
  const modelSlug = normalizeSlug(parts.model?.slug)
  const serviceSlug = normalizeSlug(parts.service?.slug)

  if (parts.page_type === 'brand' && brandSlug.length > 0) {
    return `/remont-akpp-${brandSlug}`
  }

  if (parts.page_type === 'brand_model' && brandSlug.length > 0 && modelSlug.length > 0) {
    return `/remont-akpp-${brandSlug}/${modelSlug}`
  }

  if (parts.page_type === 'service' && serviceSlug.length > 0) {
    return `/uslugi/${serviceSlug}`
  }

  if (parts.page_type === 'service_brand' && serviceSlug.length > 0 && brandSlug.length > 0) {
    return `/uslugi/${serviceSlug}/${brandSlug}`
  }

  return '/'
}

export const getRouteLandingDisplayTitle = (landing: RouteLandingItem): string => {
  const breadcrumbTitle = landing.breadcrumb_title.trim()
  if (breadcrumbTitle.length > 0) {
    return breadcrumbTitle
  }

  const h1 = landing.h1.trim()
  if (h1.length > 0) {
    return h1
  }

  const title = landing.title.trim()
  if (title.length > 0) {
    return title
  }

  if (landing.page_type === 'brand_model') {
    return landing.model?.name ?? ''
  }

  if (landing.page_type === 'service_brand') {
    return landing.brand?.name ?? ''
  }

  return landing.brand?.name ?? landing.service?.name ?? ''
}

export const getRouteLandingMenuTitle = (landing: RouteLandingItem): string => {
  const menuTitle = landing.menu_title.trim()
  if (menuTitle.length > 0) {
    return menuTitle
  }

  return getRouteLandingDisplayTitle(landing) || landing.title
}
