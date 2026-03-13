import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { PageHeaderMeta } from '#shared/types/header'

export const normalizePageHeaderText = (value: unknown): string => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

export const normalizePageHeaderBreadcrumbs = (
  items: readonly BreadcrumbItem[] | undefined
): BreadcrumbItem[] | undefined => {
  if (!Array.isArray(items)) {
    return undefined
  }

  const normalizedItems = items
    .map((item) => {
      const name = normalizePageHeaderText(item.name)
      const slug = normalizePageHeaderText(item.slug)

      if (name.length === 0) {
        return null
      }

      if (slug.length === 0) {
        return { name }
      }

      return { name, slug }
    })
    .filter((item): item is BreadcrumbItem => item !== null)

  return normalizedItems.length > 0 ? normalizedItems : undefined
}

export const normalizePageHeaderMeta = (meta: PageHeaderMeta): PageHeaderMeta => {
  const breadcrumb = normalizePageHeaderText(meta.breadcrumb)
  const breadcrumbs = normalizePageHeaderBreadcrumbs(meta.breadcrumbs)

  return {
    ...(breadcrumb.length > 0 ? { breadcrumb } : {}),
    ...(breadcrumbs ? { breadcrumbs } : {}),
  }
}
