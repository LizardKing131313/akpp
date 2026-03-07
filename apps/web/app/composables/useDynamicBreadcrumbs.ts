import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { MaybeRefOrGetter } from 'vue'

import { computed, onBeforeUnmount, toValue, watchEffect } from 'vue'

type UseDynamicBreadcrumbsOptions = {
  readonly title: MaybeRefOrGetter<string>
  readonly baseItems: MaybeRefOrGetter<readonly BreadcrumbItem[]>
}

export const useDynamicBreadcrumbs = (options: UseDynamicBreadcrumbsOptions): void => {
  const { setPageHeaderState, clearPageHeaderState } = usePageHeaderState()

  const normalizedTitle = computed<string>(() => {
    return String(toValue(options.title) ?? '').trim()
  })

  watchEffect(() => {
    const title = normalizedTitle.value
    if (title.length === 0) {
      return
    }

    const baseItems = toValue(options.baseItems)
    const breadcrumbs: BreadcrumbItem[] = [...baseItems, { name: title }]

    setPageHeaderState({
      breadcrumb: title,
      breadcrumbs,
    })
  })

  onBeforeUnmount(() => {
    clearPageHeaderState()
  })
}
