import type { MenuItem } from '#shared/types/menu'

export type FooterSettings = {
  readonly description: string
  readonly offer: string
  readonly copyright: string
  readonly policy: string
  readonly policy_href: string
  readonly policy_aria_label: string
  readonly title_main: string
  readonly title_accent: string
  readonly menu: string
  readonly menu_link_aria_label_prefix: string
  readonly articles: string
  readonly article_link_aria_label_prefix: string
  readonly show_all_articles: string
  readonly show_all_articles_href: string
  readonly show_all_articles_aria_label: string
  readonly map_height_px: number
  readonly contact_email_icon_source: string
  readonly contact_email_icon_alt: string
  readonly contact_phone_icon_source: string
  readonly contact_phone_icon_alt: string
  readonly contact_time_icon_source: string
  readonly contact_time_icon_alt: string
  readonly contact_button_icon_source: string
  readonly contact_button_icon_alt: string
  readonly contact_button_aria_label: string
  readonly menus: MenuItem[]
}
