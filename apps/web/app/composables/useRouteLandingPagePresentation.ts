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

  usePageEntityBreadcrumbs({
    title: pageTitle,
    baseItems: options.baseItems,
  })

  useSeoMeta({
    title: () => resolvedLanding.value?.resolved_seo_title ?? pageTitle.value,
    description: () => resolvedLanding.value?.resolved_seo_description ?? pageContent.value,
  })

  return {
    pageTitle,
    pageContent,
  }
}
