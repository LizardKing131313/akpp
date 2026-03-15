import type { TransmissionRangeWithVariants } from '#shared/types/transmission'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

export class TransmissionRangeModelVariantsRepository extends ListSlugRepository<TransmissionRangeWithVariants> {
  protected readonly collection = 'transmission_range_model_variants'

  protected readonly fields = `
    id,
    slug,
    name,
    content,
    transmission_range_model_variants.model_variants_id.id,
    transmission_range_model_variants.model_variants_id.name,
    transmission_range_model_variants.model_variants_id.from,
    transmission_range_model_variants.model_variants_id.to,
    transmission_range_model_variants.model_variants_id.engine,
    transmission_range_model_variants.model_variants_id.drive,
  `

  public override async list(): Promise<readonly TransmissionRangeWithVariants[]> {
    return await this.getAll({
      limit: -1,
      ...this.PUBLISHED_STATUS_QUERY,
      'deep[transmission_range_model_variants][_limit]': -1,
    })
  }

  public override async getBySlug(slug: string): Promise<TransmissionRangeWithVariants | null> {
    return this.getOneByField('slug', slug, this.PUBLISHED_STATUS_QUERY)
  }

  public override async getById(id: string): Promise<TransmissionRangeWithVariants | null> {
    return this.getOneByField('id', id, this.PUBLISHED_STATUS_QUERY)
  }
}
