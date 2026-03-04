import type { TransmissionRangeWithVariants } from '../../../../shared/types/transmission'

import { ListSlugRepository } from '../listSlugRepo'

export class TransmissionRangeModelVariantsRepository extends ListSlugRepository<TransmissionRangeWithVariants> {
  protected readonly collection = 'transmission_range_model_variants'

  protected readonly fields = `
    id,
    slug,
    name,
    content,
    transmission_range_model_variants.model_variants_id.id,
    transmission_range_model_variants.model_variants_id.model,
    transmission_range_model_variants.model_variants_id.from,
    transmission_range_model_variants.model_variants_id.to,
    transmission_range_model_variants.model_variants_id.engine,
    transmission_range_model_variants.model_variants_id.drive
  `
}
