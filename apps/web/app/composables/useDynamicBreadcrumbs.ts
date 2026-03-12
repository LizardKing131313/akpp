import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { MaybeRefOrGetter } from 'vue'

import { computed, onBeforeUnmount, ref, toValue, watchEffect } from 'vue'

type UseDynamicBreadcrumbsOptions = {
  readonly title: MaybeRefOrGetter<string>
  readonly baseItems: MaybeRefOrGetter<readonly BreadcrumbItem[]>
}

export const usePageEntityBreadcrumbs = (options: UseDynamicBreadcrumbsOptions): void => {
  const { setPageHeaderState, clearPageHeaderState } = usePageHeaderState()
  const route = useRoute()
  const lastAppliedPath = ref<string | null>(null)

  const normalizedTitle = computed<string>(() => {
    return String(toValue(options.title) ?? '').trim()
  })

  watchEffect(() => {
    const currentPath = route.path
    const title = normalizedTitle.value
    if (title.length === 0) {
      if (lastAppliedPath.value) {
        clearPageHeaderState(lastAppliedPath.value)
        lastAppliedPath.value = null
      }
      return
    }

    const baseItems = toValue(options.baseItems)
    const breadcrumbs: BreadcrumbItem[] = [...baseItems, { name: title, slug: currentPath }]

    if (lastAppliedPath.value && lastAppliedPath.value !== currentPath) {
      clearPageHeaderState(lastAppliedPath.value)
    }

    setPageHeaderState(currentPath, {
      breadcrumb: title,
      breadcrumbs,
    })

    lastAppliedPath.value = currentPath
  })

  onBeforeUnmount(() => {
    if (lastAppliedPath.value) {
      clearPageHeaderState(lastAppliedPath.value)
    }
  })
}

export const useDynamicBreadcrumbs = usePageEntityBreadcrumbs
