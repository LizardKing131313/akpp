import type { CalculateApiSettings } from '#shared/types/api/calculate'
import type { CalculateSettings } from '#shared/types/calculate'

import { mapCalculateApiSettingsToCalculateSettings } from '#server/services/repo/mappers/calculate.mapper'
import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class CalculateRepository extends SingletonRepository<CalculateApiSettings> {
  protected readonly collection = 'calculate_settings'

  protected readonly fields = 'title_main,title_accent,description,perks.text,perks.sort'

  public async getSettings(): Promise<CalculateSettings> {
    const apiSettings = await super.get()
    return mapCalculateApiSettingsToCalculateSettings(apiSettings)
  }
}
