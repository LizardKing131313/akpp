import type { FooterSettings } from '#shared/types/footer'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class FooterRepository extends SingletonRepository<FooterSettings> {
  protected readonly collection = 'footer_settings'

  protected readonly fields = `
    description,
    offer,
    copyright,
    policy,
    policy_href,
    title_main,
    title_accent,
    menu,
    articles,
    show_all_articles,
    menus.*
  `
}
