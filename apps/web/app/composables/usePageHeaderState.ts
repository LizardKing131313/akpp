import type { PageHeaderMeta } from '#shared/types/header'

type PageHeaderOverrideState = {
  readonly path: string
  readonly meta: Partial<PageHeaderMeta>
} | null

const pageHeaderStateKey = 'page-header:override'

export const usePageHeaderState = () => {
  const route = useRoute()
  const overrideState = useState<PageHeaderOverrideState>(pageHeaderStateKey, () => null)

  const setPageHeaderState = (meta: Partial<PageHeaderMeta>): void => {
    overrideState.value = {
      path: route.path,
      meta,
    }
  }

  const clearPageHeaderState = (): void => {
    if (overrideState.value?.path !== route.path) {
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
