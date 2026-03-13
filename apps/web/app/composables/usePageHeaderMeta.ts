import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { PageHeaderMeta } from '#shared/types/header'

import { computed } from 'vue'

import { normalizePageHeaderBreadcrumbs, normalizePageHeaderText } from '~/composables/pageHeader'

type RouteMetaWithHeader = {
  readonly pageHeader?: PageHeaderMeta
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

    return normalizePageHeaderText(activeMeta.value.breadcrumb)
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

    return normalizePageHeaderBreadcrumbs(items) ?? []
  })

  return {
    breadcrumbTitle,
    breadcrumbItems,
  }
}
