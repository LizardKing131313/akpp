import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { MaybeRefOrGetter } from 'vue'

import { computed, onBeforeUnmount, toValue, watchEffect } from 'vue'

type UseDynamicBreadcrumbsOptions = {
  readonly title: MaybeRefOrGetter<string>
  readonly baseItems: MaybeRefOrGetter<readonly BreadcrumbItem[]>
}

export const usePageEntityBreadcrumbs = (options: UseDynamicBreadcrumbsOptions): void => {
  const { setPageHeaderState, clearPageHeaderState } = usePageHeaderState()
  const route = useRoute()

  const normalizedTitle = computed<string>(() => {
    return String(toValue(options.title) ?? '').trim()
  })

  watchEffect(() => {
    const title = normalizedTitle.value
    if (title.length === 0) {
      return
    }

    const baseItems = toValue(options.baseItems)
    const breadcrumbs: BreadcrumbItem[] = [...baseItems, { name: title, slug: route.path }]

    setPageHeaderState({
      breadcrumb: title,
      breadcrumbs,
    })
  })

  onBeforeUnmount(() => {
    clearPageHeaderState()
  })
}

export const useDynamicBreadcrumbs = usePageEntityBreadcrumbs
