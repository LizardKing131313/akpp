import type { TransmissionItem } from '../../../../shared/types/transmission'

import { ListRepository } from '../listRepo'

export class TransmissionsRepository extends ListRepository<TransmissionItem> {
  protected readonly collection = 'transmissions'

  protected readonly fields = 'id,name,price,image_source,image_alt,sort'
}
