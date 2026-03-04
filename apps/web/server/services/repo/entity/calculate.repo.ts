import type { CalculateSettings } from '#shared/types/calculate'

import { createDirectusClient } from '#server/services/directus'

export class CalculateRepository {
  public async get(): Promise<CalculateSettings> {
    const directus = createDirectusClient()

    return await directus.getSingleton<CalculateSettings>('calculate_settings', {
      fields: 'title_main,title_accent,description,perks',
    })
  }
}
