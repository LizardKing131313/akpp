import type { WhySettings } from '../../../../shared/types/why'

import { createDirectusClient } from '../../directus'

export class WhyRepository {
  public async get(): Promise<WhySettings> {
    const directus = createDirectusClient()

    return await directus.getSingleton<WhySettings>('why_settings', {
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
  }
}
