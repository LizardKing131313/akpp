import type { FooterSettings } from '#shared/types/footer'

import { createDirectusClient } from '#server/services/directus'

export class FooterRepository {
  public async get(): Promise<FooterSettings> {
    const directus = createDirectusClient()

    return await directus.getSingleton<FooterSettings>('footer_settings', {
      fields: `
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
      `,
    })
  }
}
