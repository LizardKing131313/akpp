import type { ErrorSettings } from '#shared/types/404'

import { createDirectusClient } from '#server/services/directus'

export class ErrorRepository {
  public async get(): Promise<ErrorSettings> {
    const directus = createDirectusClient()

    return await directus.getSingleton<ErrorSettings>('error_settings', {
      fields: 'title,description,buttonText',
    })
  }
}
