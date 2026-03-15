import type { QuizContextItem } from '#shared/types/quiz'

import { ListRepository } from '#server/services/repo/listRepo'

export class QuizContextsRepository extends ListRepository<QuizContextItem> {
  protected readonly collection = 'quiz_contexts'

  protected readonly fields = `
    id,
    name,
    sort,
  `
}
