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

  const pageHeaderMeta = computed<PageHeaderMeta>(() => {
    const routeMeta = routePageHeaderMeta.value
    const override = overrideState.value

    if (!override || override.path !== route.path) {
      return routeMeta
    }

    return {
      ...routeMeta,
      ...override.meta,
    }
  })

  const mode = computed<HeaderSectionMode>(() => {
    const metaKind = pageHeaderMeta.value.kind
    if (metaKind === 'hero' || metaKind === 'breadcrumbs') {
      return metaKind
    }

    return 'none'
  })

  const breadcrumbTitle = computed<string>(() => {
    return normalizeText(pageHeaderMeta.value.breadcrumb)
  })

  const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    const rawBreadcrumbs = pageHeaderMeta.value.breadcrumbs
    if (Array.isArray(rawBreadcrumbs) && rawBreadcrumbs.length > 0) {
      return normalizeBreadcrumbs(rawBreadcrumbs)
    }
    return []
  })

  return {
    mode,
    breadcrumbTitle,
    breadcrumbItems,
  }
}
