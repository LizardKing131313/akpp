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
  const pageHeaderState = usePageHeaderState()

  const routePageHeaderMeta = computed<PageHeaderMeta>(() => {
    const routeMeta = route.meta as RouteMetaWithHeader
    return routeMeta.pageHeader ?? {}
  })

  const runtimeMeta = computed<PageHeaderMeta | null>(() => {
    if (pageHeaderState.value?.path !== route.path) {
      return null
    }

    return pageHeaderState.value.meta
  })

  const activeMeta = computed<PageHeaderMeta>(() => {
    const runtime = runtimeMeta.value
    if (!runtime) {
      return routePageHeaderMeta.value
    }

    return {
      ...routePageHeaderMeta.value,
      ...runtime,
    }
  })

  const breadcrumbTitle = computed<string>(() => {
    if (route.path === '/') {
      return ''
    }

    return normalizeText(activeMeta.value.breadcrumb)
  })

  const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    if (route.path === '/') {
      return []
    }

    const items = activeMeta.value.breadcrumbs
    if (!Array.isArray(items) || items.length === 0) {
      if (breadcrumbTitle.value.length === 0) {
        return []
      }

      return [{ name: breadcrumbTitle.value }]
    }

    return normalizeBreadcrumbs(items)
  })

  const mode = computed<HeaderSectionMode>(() => {
    if (route.path === '/') {
      return activeMeta.value.kind === 'hero' ? 'hero' : 'none'
    }

    const hasBreadcrumbTitle = breadcrumbTitle.value.length > 0
    const hasBreadcrumbItems = breadcrumbItems.value.length > 0

    if (hasBreadcrumbTitle || hasBreadcrumbItems) {
      return 'breadcrumbs'
    }

    if (activeMeta.value.kind === 'breadcrumbs') {
      return 'breadcrumbs'
    }

    return 'none'
  })

  return {
    mode,
    breadcrumbTitle,
    breadcrumbItems,
  }
}
