import type { CitySelectModalSettings } from '#shared/types/modal'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class CitySelectModalRepository extends SingletonRepository<CitySelectModalSettings> {
  protected readonly collection = 'city_select_modal_settings'

  protected readonly fields = `
    title,
    search_placeholder,
    empty_text,
  `
}
