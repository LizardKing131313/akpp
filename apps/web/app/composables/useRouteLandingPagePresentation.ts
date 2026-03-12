import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { ResolvedRouteLandingItem } from '#shared/types/route-landing'
import type { MaybeRefOrGetter } from 'vue'

import { computed, toValue } from 'vue'

type UseRouteLandingPagePresentationOptions = {
  readonly landing: MaybeRefOrGetter<ResolvedRouteLandingItem | null | undefined>
  readonly baseItems: MaybeRefOrGetter<readonly BreadcrumbItem[]>
}

export const useRouteLandingPagePresentation = (
  options: UseRouteLandingPagePresentationOptions
) => {
  const resolvedLanding = computed<ResolvedRouteLandingItem | null>(() => {
    return toValue(options.landing) ?? null
  })

  const pageTitle = computed<string>(() => resolvedLanding.value?.resolved_h1 ?? '')
  const pageContent = computed<string>(() => resolvedLanding.value?.resolved_content ?? '')
  const seoImage = computed<string>(() => {
    return (
      resolvedLanding.value?.model?.image_source ??
      resolvedLanding.value?.brand?.image_source ??
      resolvedLanding.value?.service?.image_source ??
      ''
    )
  })

  usePageEntityBreadcrumbs({
    title: pageTitle,
    baseItems: options.baseItems,
  })

  usePageSeo({
    title: computed(() => resolvedLanding.value?.resolved_seo_title ?? pageTitle.value),
    description: computed(
      () => resolvedLanding.value?.resolved_seo_description ?? pageContent.value
    ),
    image: seoImage,
    type: 'website',
  })

  return {
    pageTitle,
    pageContent,
  }
}
