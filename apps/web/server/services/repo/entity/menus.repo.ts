import type { MenuItem } from '#shared/types/menu'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

export class MenusRepository extends ListSlugRepository<MenuItem> {
  protected readonly collection = 'menus'

  protected readonly fields = 'id,slug,name,children,sort'
}
