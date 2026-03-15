import type { QuizContextItem } from '#shared/types/quiz'

import { ListRepository } from '#server/services/repo/listRepo'

export class QuizContextsRepository extends ListRepository<QuizContextItem> {
  protected readonly collection = 'quiz_contexts'

  protected readonly fields = `
    id,
    name,
    sort,
  `

  public override async list(): Promise<readonly QuizContextItem[]> {
    return this.getAll(this.PUBLISHED_STATUS_QUERY)
  }

  public override async getById(id: string): Promise<QuizContextItem | null> {
    return this.getOneByField('id', id, this.PUBLISHED_STATUS_QUERY)
  }
}
