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
    sort,
  `

  public override async list(): Promise<readonly TransmissionItem[]> {
    return this.getAll(this.PUBLISHED_STATUS_QUERY)
  }

  public override async getById(id: string): Promise<TransmissionItem | null> {
    return this.getOneByField('id', id, this.PUBLISHED_STATUS_QUERY)
  }
}
