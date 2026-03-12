import type { BreadcrumbItem } from '#shared/types/breadcrumb'

type PageHeaderOverrideState = {
  readonly path: string
  readonly breadcrumb: string
  readonly breadcrumbs: readonly BreadcrumbItem[]
} | null

const pageHeaderStateKey = 'page-header:override'

export const usePageHeaderState = () => {
  const overrideState = useState<PageHeaderOverrideState>(pageHeaderStateKey, () => null)

  const setPageHeaderState = (
    path: string,
    meta: {
      readonly breadcrumb: string
      readonly breadcrumbs: readonly BreadcrumbItem[]
    }
  ): void => {
    overrideState.value = {
      path,
      breadcrumb: meta.breadcrumb,
      breadcrumbs: meta.breadcrumbs,
    }
  }

  const clearPageHeaderState = (path: string): void => {
    if (overrideState.value?.path !== path) {
      return
    }

    overrideState.value = null
  }

  return {
    overrideState,
    setPageHeaderState,
    clearPageHeaderState,
  }
}
