import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { PageHeaderMeta } from '#shared/types/header'
import type { MaybeRefOrGetter } from 'vue'

import { computed, onBeforeUnmount, ref, toValue, watch } from 'vue'

import { normalizePageHeaderMeta, normalizePageHeaderText } from '~/composables/pageHeader'

type RuntimePageHeaderState = {
  readonly path: string
  readonly meta: PageHeaderMeta
} | null

type UsePageHeaderOptions = {
  readonly title?: MaybeRefOrGetter<string | undefined>
  readonly baseItems?: MaybeRefOrGetter<readonly BreadcrumbItem[] | undefined>
  readonly breadcrumb?: MaybeRefOrGetter<string | undefined>
  readonly breadcrumbs?: MaybeRefOrGetter<readonly BreadcrumbItem[] | undefined>
}

const pageHeaderStateKey = 'page-header:runtime'

export const usePageHeaderState = () => {
  return useState<RuntimePageHeaderState>(pageHeaderStateKey, () => null)
}

export const usePageHeader = (options: UsePageHeaderOptions): void => {
  const route = useRoute()
  const pageHeaderState = usePageHeaderState()
  const lastAppliedPath = ref<string | null>(null)
  const normalizedTitle = computed<string>(() => normalizePageHeaderText(toValue(options.title)))
  const normalizedBaseItems = computed<readonly BreadcrumbItem[]>(() => {
    return toValue(options.baseItems) ?? []
  })

  const runtimeMeta = computed<PageHeaderMeta>(() => {
    const explicitBreadcrumb = toValue(options.breadcrumb)
    const explicitBreadcrumbs = toValue(options.breadcrumbs)
    const breadcrumb =
      typeof explicitBreadcrumb !== 'undefined' ? explicitBreadcrumb : normalizedTitle.value
    const breadcrumbs =
      typeof explicitBreadcrumbs !== 'undefined'
        ? [...explicitBreadcrumbs]
        : normalizedTitle.value.length > 0
          ? [...normalizedBaseItems.value, { name: normalizedTitle.value }]
          : normalizedBaseItems.value.length > 0
            ? [...normalizedBaseItems.value]
            : undefined

    return normalizePageHeaderMeta({
      ...(typeof breadcrumb !== 'undefined' ? { breadcrumb } : {}),
      ...(typeof breadcrumbs !== 'undefined' ? { breadcrumbs } : {}),
    })
  })

  const syncPageHeader = (): void => {
    const path = route.path
    const meta = runtimeMeta.value
    const hasMeta =
      typeof meta.breadcrumb !== 'undefined' || typeof meta.breadcrumbs !== 'undefined'

    if (!hasMeta) {
      if (lastAppliedPath.value === path) {
        pageHeaderState.value = null
        lastAppliedPath.value = null
      }

      return
    }

    if (
      lastAppliedPath.value &&
      lastAppliedPath.value !== path &&
      pageHeaderState.value?.path === lastAppliedPath.value
    ) {
      pageHeaderState.value = null
    }

    pageHeaderState.value = {
      path,
      meta,
    }
    lastAppliedPath.value = path
  }

  syncPageHeader()

  watch([() => route.path, runtimeMeta], syncPageHeader, { deep: true })

  onBeforeUnmount(() => {
    if (pageHeaderState.value?.path === lastAppliedPath.value) {
      pageHeaderState.value = null
    }
  })
}
