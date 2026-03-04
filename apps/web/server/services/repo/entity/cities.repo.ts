import type { CityItem } from '#shared/types/city'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

export class CitiesRepository extends ListSlugRepository<CityItem> {
  protected readonly collection = 'cities'

  protected readonly fields =
    'id,slug,name,is_default,work_hours_text,work_hours_subtext,' +
    'phone_number,phone_text,email_value,email_text,sort'
}
