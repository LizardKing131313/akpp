import type { BreadcrumbItem } from '#shared/types/layout/breadcrumb'
import type { HeroSlide } from '#shared/types/layout/hero'

export type PageHeaderMeta =
  | {
      kind: 'hero'
      slides: HeroSlide[]
    }
  | {
      kind: 'breadcrumbs'
      title: string
      backgroundSrc: string
      items: BreadcrumbItem[]
    }
  | {
      kind: 'none'
    }
