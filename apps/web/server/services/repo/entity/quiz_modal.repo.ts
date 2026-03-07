import type { QuizModalUiSettings } from '#shared/types/modal'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class QuizModalRepository extends SingletonRepository<QuizModalUiSettings> {
  protected readonly collection = 'quiz_modal_settings'

  protected readonly fields = `
    empty_text
  `
}
