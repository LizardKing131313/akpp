import type { CaseSettings } from '#shared/types/case'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class CaseSettingsRepository extends SingletonRepository<CaseSettings> {
  protected readonly collection = 'case_settings'

  protected readonly fields = `
    reason_label,
    transmission_label,
    model_date_label,
    engine_label,
    mileage_label,
    problems_label,
    works_label,
    part_price_label,
    work_price_label,
    total_label,

    part_price_image,
    part_price_image_alt,

    work_price_image,
    work_price_image_alt,

    total_image,
    total_image_alt,

    calculate_label,
    signup_label,

    page_title,
    show_all_button,
    show_all_link,
  `
}
