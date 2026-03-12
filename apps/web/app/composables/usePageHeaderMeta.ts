import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { HeaderSectionMode, PageHeaderMeta } from '#shared/types/header'

import { computed } from 'vue'

type RouteMetaWithHeader = {
  readonly pageHeader?: PageHeaderMeta
}

const normalizeText = (value: unknown): string => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

const normalizeBreadcrumbs = (items: readonly BreadcrumbItem[]): BreadcrumbItem[] => {
  return items
    .map((item) => {
      const name = normalizeText(item.name)
      const slug = normalizeText(item.slug)

      if (name.length === 0) {
        return null
      }

      if (slug.length === 0) {
        return { name }
      }

      return { name, slug }
    })
    .filter((item): item is BreadcrumbItem => item !== null)
}

export const usePageHeaderMeta = () => {
  const route = useRoute()
  const { overrideState } = usePageHeaderState()

  const routePageHeaderMeta = computed<PageHeaderMeta>(() => {
    const routeMeta = route.meta as RouteMetaWithHeader
    return routeMeta.pageHeader ?? {}
  })

  const mode = computed<HeaderSectionMode>(() => {
    if (route.path === '/') {
      return routePageHeaderMeta.value.kind === 'hero' ? 'hero' : 'none'
    }

    const override = overrideState.value
    const hasBreadcrumbTitle = normalizeText(override?.breadcrumb).length > 0
    const hasBreadcrumbItems = Array.isArray(override?.breadcrumbs)
      ? override.breadcrumbs.length > 0
      : false

    if (hasBreadcrumbTitle || hasBreadcrumbItems) {
      return 'breadcrumbs'
    }

    return 'none'
  })

  const breadcrumbTitle = computed<string>(() => {
    if (route.path === '/') {
      return ''
    }

    const override = overrideState.value
    if (!override) {
      return ''
    }

    return normalizeText(override.breadcrumb)
  })

  const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    if (route.path === '/') {
      return []
    }

    const override = overrideState.value
    if (!override) {
      return []
    }

    if (Array.isArray(override.breadcrumbs) && override.breadcrumbs.length > 0) {
      return normalizeBreadcrumbs(override.breadcrumbs)
    }

    return []
  })

  return {
    mode,
    breadcrumbTitle,
    breadcrumbItems,
  }
}
