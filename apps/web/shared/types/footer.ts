import type { MenuItem } from '#shared/types/menu'

export type FooterSettings = {
  readonly description: string
  readonly offer: string
  readonly copyright: string
  readonly policy: string
  readonly policy_href: string
  readonly title_main: string
  readonly title_accent: string
  readonly menu: string
  readonly articles: string
  readonly show_all_articles: string
  readonly menus: MenuItem[]
}
