import type { CaseApiItem } from '#shared/types/api/case'
import type { CaseItem } from '#shared/types/case'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'
import { mapCaseApiItemToCaseItem } from '#server/services/repo/mappers/case.mapper'

export class CasesRepository extends ListSlugRepository<CaseItem> {
  protected readonly collection = 'cases'

  protected readonly fields =
    'id,slug,name,image_source,image_alt,case_date,transmission,model_date,' +
    'engine,mileage,reason,works.text,works.sort,part_price,work_price,images.directus_files_id,images.sort,sort,' +
    'brand.id,brand.slug,brand.name,brand.image_source,brand.image_alt'

  private async fetchCaseApiItems(): Promise<readonly CaseApiItem[]> {
    const directus = this.getDirectus()
    return await directus.getItems<CaseApiItem>(this.collection, {
      fields: this.fields,
      sort: this.SORT_FIELD,
    })
  }

  private async fetchCaseApiItemBySlug(slug: string): Promise<CaseApiItem | null> {
    const directus = this.getDirectus()
    const apiItems = await directus.getItems<CaseApiItem>(this.collection, {
      limit: 1,
      fields: this.fields,
      ...directus.equals('slug', slug),
    })

    return apiItems[0] ?? null
  }

  public override async list(): Promise<readonly CaseItem[]> {
    const apiItems = await this.fetchCaseApiItems()
    return apiItems.map(mapCaseApiItemToCaseItem)
  }

  public override async getBySlug(slug: string): Promise<CaseItem | null> {
    const apiItem = await this.fetchCaseApiItemBySlug(slug)
    return apiItem ? mapCaseApiItemToCaseItem(apiItem) : null
  }
}
