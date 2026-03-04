import type { CaseItem } from '#shared/types/case'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

export class CasesRepository extends ListSlugRepository<CaseItem> {
  protected readonly collection = 'cases'

  protected readonly fields =
    'id,slug,name,description,case_date,transmission,model_date,' +
    'engine,mileage,works,part_price,work_price,total,images,sort'
}
