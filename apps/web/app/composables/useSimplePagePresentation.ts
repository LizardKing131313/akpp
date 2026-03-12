import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { MaybeRefOrGetter } from 'vue'

import { computed, toValue } from 'vue'

type UseSimplePagePresentationOptions = {
  readonly title: MaybeRefOrGetter<string>
  readonly description?: MaybeRefOrGetter<string | undefined>
  readonly image?: MaybeRefOrGetter<string | undefined>
  readonly type?: MaybeRefOrGetter<'website' | 'article' | undefined>
  readonly robots?: MaybeRefOrGetter<string | undefined>
  readonly baseItems?: MaybeRefOrGetter<readonly BreadcrumbItem[] | undefined>
}

export const useSimplePagePresentation = (options: UseSimplePagePresentationOptions) => {
  const pageTitle = computed<string>(() => String(toValue(options.title) ?? '').trim())
  const pageDescription = computed<string>(() => String(toValue(options.description) ?? '').trim())
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
