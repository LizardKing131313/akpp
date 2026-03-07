import type { WhyApiSettings } from '#shared/types/api/why'
import type { WhySettings } from '#shared/types/why'

import { createDirectusClient } from '#server/services/directus'
import { mapWhyApiSettingsToWhySettings } from '#server/services/repo/mappers/why.mapper'

export class WhyRepository {
  public async get(): Promise<WhySettings> {
    const directus = createDirectusClient()

    const apiSettings = await directus.getSingleton<WhyApiSettings>('why_settings', {
      fields: `
        title,
        description,
        diagnostic,
        diagnostic_image,
        diagnostic_alt,
        tow,
        tow_image,
        tow_alt,
        guarantee,
        guarantee_image,
        guarantee_alt,
      `,
    })

    return mapWhyApiSettingsToWhySettings(apiSettings)
  }
}
