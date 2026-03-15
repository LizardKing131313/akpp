import type { QuizSymptomItem } from '#shared/types/quiz'

import { ListRepository } from '#server/services/repo/listRepo'

export class QuizSymptomsRepository extends ListRepository<QuizSymptomItem> {
  protected readonly collection = 'quiz_symptoms'

  protected readonly fields = `
    id,
    name,
    problem_id,
    sort,
  `

  public async getByProblem(problemId: string): Promise<readonly QuizSymptomItem[]> {
    const normalizedProblemId = problemId.trim()

    if (normalizedProblemId.length === 0) {
      return []
    }

    const directus = this.getDirectus()

    return await directus.getItems<QuizSymptomItem>(this.collection, {
      fields: this.fields,
      sort: this.SORT_FIELD,
      ...this.PUBLISHED_STATUS_QUERY,
      'filter[_or][0][problem_id][_eq]': normalizedProblemId,
      'filter[_or][1][problem_id][_null]': true,
    })
  }

  public override async list(): Promise<readonly QuizSymptomItem[]> {
    return this.getAll(this.PUBLISHED_STATUS_QUERY)
  }

  public override async getById(id: string): Promise<QuizSymptomItem | null> {
    return this.getOneByField('id', id, this.PUBLISHED_STATUS_QUERY)
  }
}
