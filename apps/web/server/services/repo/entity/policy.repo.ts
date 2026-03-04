import type { PolicySettings } from '#shared/types/policy'

import { createDirectusClient } from '#server/services/directus'

export class PolicyRepository {
  public async get(): Promise<PolicySettings> {
    const directus = createDirectusClient()

    return await directus.getSingleton<PolicySettings>('policy_settings', {
      fields: 'title,article',
    })
  }
}
