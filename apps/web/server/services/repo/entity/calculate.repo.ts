import type { CalculateSettings } from '#shared/types/calculate'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class CalculateRepository extends SingletonRepository<CalculateSettings> {
  protected readonly collection = 'calculate_settings'

  protected readonly fields = 'title_main,title_accent,description,perks'
}
