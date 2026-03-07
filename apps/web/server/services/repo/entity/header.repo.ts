import type { HeaderSettings } from '#shared/types/header'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class HeaderRepository extends SingletonRepository<HeaderSettings> {
  protected readonly collection = 'header_settings'

  protected readonly fields = 'search'
}
