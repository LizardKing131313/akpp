import type { WhySettings } from '#shared/types/why'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class WhyRepository extends SingletonRepository<WhySettings> {
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
    calculate_label,
    signup_label,
  `
}
