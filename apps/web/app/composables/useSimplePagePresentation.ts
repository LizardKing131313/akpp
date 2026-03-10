import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { MaybeRefOrGetter } from 'vue'

import { computed, toValue } from 'vue'

type UseSimplePagePresentationOptions = {
  readonly title: MaybeRefOrGetter<string>
  readonly description?: MaybeRefOrGetter<string | undefined>
  readonly baseItems?: MaybeRefOrGetter<readonly BreadcrumbItem[] | undefined>
}

export const useSimplePagePresentation = (options: UseSimplePagePresentationOptions) => {
  const pageTitle = computed<string>(() => String(toValue(options.title) ?? '').trim())
  const seoDescription = computed<string>(() => String(toValue(options.description) ?? '').trim())
  const baseItems = computed<readonly BreadcrumbItem[]>(() => {
    return toValue(options.baseItems) ?? []
  })

  usePageEntityBreadcrumbs({
    title: pageTitle,
    baseItems,
  })

  useSeoMeta({
    title: () => pageTitle.value,
    description: () => seoDescription.value,
  })

  return {
    pageTitle,
    seoDescription,
  }
}
