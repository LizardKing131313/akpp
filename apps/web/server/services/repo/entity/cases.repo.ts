import type { CaseItem } from '#shared/types/case'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

export class CasesRepository extends ListSlugRepository<CaseItem> {
  protected readonly collection = 'cases'

  protected readonly fields = `
    id,
    slug,
    name,
    image_source,
    image_alt,
    case_date,
    transmission,
    model_date,
    engine,
    mileage,
    reason,
    problems,
    part_price,
    work_price,
    service,

    works.id,
    works.name,

    images.id,
    images.directus_files_id,

    brand.id,
    brand.slug,
    brand.name,
    brand.image_source,
    brand.image_alt,
  `

  public override async list(): Promise<readonly CaseItem[]> {
    return this.getAll(this.PUBLISHED_STATUS_QUERY)
  }

  public override async getBySlug(slug: string): Promise<CaseItem | null> {
    return this.getOneByField('slug', slug, this.PUBLISHED_STATUS_QUERY)
  }

  public override async getById(id: string): Promise<CaseItem | null> {
    return this.getOneByField('id', id, this.PUBLISHED_STATUS_QUERY)
  }
}
