import type { HeaderSettings } from '../../../../shared/types/header'

import { createDirectusClient } from '../../directus'

export class HeaderRepository {
  public async get(): Promise<HeaderSettings> {
    const directus = createDirectusClient()

    return await directus.getSingleton<HeaderSettings>('header_settings', {
      fields: 'search',
    })
  }
}
