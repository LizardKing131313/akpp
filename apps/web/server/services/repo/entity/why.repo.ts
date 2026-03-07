import type { WhyApiSettings } from '#shared/types/api/why'
import type { WhySettings } from '#shared/types/why'

import { mapWhyApiSettingsToWhySettings } from '#server/services/repo/mappers/why.mapper'
import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class WhyRepository extends SingletonRepository<WhyApiSettings> {
  protected readonly collection = 'why_settings'

  protected readonly fields = `
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
  `

  public override async get(): Promise<WhySettings> {
    const apiSettings = await super.get()
    return mapWhyApiSettingsToWhySettings(apiSettings)
  }
}
