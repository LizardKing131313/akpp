import type { BreadcrumbItem } from '#shared/types/breadcrumb'
import type { HeroItem } from '#shared/types/hero'

export type PageHeaderMeta =
  | {
      kind: 'hero'
      slides: HeroItem[]
    }
  | {
      kind: 'breadcrumbs'
      title: string
      items: BreadcrumbItem[]
    }
  | {
      kind: 'none'
    }
