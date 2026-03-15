import type { QuizModalSettings } from '#shared/types/modal'

import { SingletonRepository } from '#server/services/repo/singletonRepo'

export class QuizModalRepository extends SingletonRepository<QuizModalSettings> {
  protected readonly collection = 'quiz_modal_settings'

  protected readonly fields = `
    image_source,
    image_alt,
    name,
    description,
    perks.id,
    perks.name,
    perks.image_source,
    perks.image_alt,
    perks.sort,
  `
}
