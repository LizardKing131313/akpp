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
    policy_aria_label,
    title_main,
    title_accent,
    menu,
    menu_link_aria_label_prefix,
    articles,
    article_link_aria_label_prefix,
    show_all_articles,
    show_all_articles_href,
    show_all_articles_aria_label,
    map_height_px,
    contact_email_icon_source,
    contact_email_icon_alt,
    contact_phone_icon_source,
    contact_phone_icon_alt,
    contact_time_icon_source,
    contact_time_icon_alt,
    contact_button_icon_source,
    contact_button_icon_alt,
    contact_button_aria_label,
  `
}
