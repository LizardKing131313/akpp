import type { QuizProblemItem } from '#shared/types/quiz'

import { ListRepository } from '#server/services/repo/listRepo'

export class QuizProblemsRepository extends ListRepository<QuizProblemItem> {
  protected readonly collection = 'quiz_problems'

  protected readonly fields = `
    id,
    name,
    brand_id,
    image_source,
    image_alt,
    sort,
  `

  public async getByBrand(brandId: string): Promise<readonly QuizProblemItem[]> {
    const normalizedBrandId = brandId.trim()

    if (normalizedBrandId.length === 0) {
      return []
    }

    const directus = this.getDirectus()

    return await directus.getItems<QuizProblemItem>(this.collection, {
      fields: this.fields,
      sort: this.SORT_FIELD,
      'filter[_or][0][brand_id][_eq]': normalizedBrandId,
      'filter[_or][1][brand_id][_null]': true,
    })
  }
}
