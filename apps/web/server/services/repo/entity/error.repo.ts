import type { ErrorSettings } from '#shared/types/error'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class ErrorRepository extends SingletonRepository<ErrorSettings> {
  protected readonly collection = 'error_settings'

  protected readonly fields = `
    title,
    description,
    buttonText,
  `
}
