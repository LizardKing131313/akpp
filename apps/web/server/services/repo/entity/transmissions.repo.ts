import type { TransmissionItem } from '#shared/types/transmission'

import { ListRepository } from '#server/services/repo/listRepo'

export class TransmissionsRepository extends ListRepository<TransmissionItem> {
  protected readonly collection = 'transmissions'

  protected readonly fields = `
    id,
    name,
    description,
    price,
    image_source,
    image_alt,
    sort
  `
}
