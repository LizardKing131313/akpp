import type { BreadcrumbItem } from '#shared/types/breadcrumb'

export type HeaderSettings = {
  readonly logo_source: string
  readonly logo_source_mobile: string
  readonly logo_alt: string
  readonly logo_href: string
  readonly location_icon_source: string
  readonly location_icon_alt: string
  readonly location_button_aria_label: string
  readonly search_icon_source: string
  readonly search_icon_alt: string
  readonly search_placeholder: string
  readonly search_input_aria_label: string
  readonly time_icon_source: string
  readonly time_icon_alt: string
  readonly phone_icon_source: string
  readonly phone_icon_alt: string
  readonly hero_button_label: string
  readonly hero_prev_slide_aria_label: string
  readonly hero_next_slide_aria_label: string
  readonly breadcrumbs_background_source: string
  readonly breadcrumbs_background_alt: string
  readonly menu_open_aria_label: string
  readonly mobile_menu_aria_label: string
  readonly mobile_menu_back_aria_label: string
  readonly menu_mobile_logo_source: string
  readonly menu_mobile_logo_alt: string
}

export type HeaderSectionMode = 'none' | 'hero' | 'breadcrumbs'

export type PageHeaderMeta = {
  readonly kind?: HeaderSectionMode
  readonly breadcrumb?: string
  readonly breadcrumbs?: BreadcrumbItem[]
}
