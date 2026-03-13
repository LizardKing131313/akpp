import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { MaybeRefOrGetter } from 'vue'
import type { PageSeoBaseOptions } from '~/composables/pageSeo'

import { computed, toValue } from 'vue'

import { normalizePageSeoText } from '~/composables/pageSeo'

type UseSimplePagePresentationOptions = PageSeoBaseOptions & {
  readonly baseItems?: MaybeRefOrGetter<readonly BreadcrumbItem[] | undefined>
}

export const useSimplePagePresentation = (options: UseSimplePagePresentationOptions) => {
  const pageTitle = computed<string>(() => normalizePageSeoText(toValue(options.title)))
  const pageDescription = computed<string>(() => normalizePageSeoText(toValue(options.description)))
  const baseItems = computed<readonly BreadcrumbItem[]>(() => {
    return toValue(options.baseItems) ?? []
  })

  usePageHeader({
    title: pageTitle,
    baseItems,
  })

  const { seoDescription } = usePageSeo({
    title: pageTitle,
    description: pageDescription,
    image: options.image,
    type: options.type,
    robots: options.robots,
  })

  return {
    pageTitle,
    seoDescription,
  }
}
