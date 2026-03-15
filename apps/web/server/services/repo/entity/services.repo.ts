import type { ServiceItem } from '#shared/types/service'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

export class ServicesRepository extends ListSlugRepository<ServiceItem> {
  protected readonly collection = 'services'

  protected readonly fields = `
    id,
    slug,
    name,
    colspan,
    image_source,
    image_alt,
    sort,
  `

  public override async list(): Promise<readonly ServiceItem[]> {
    return this.getAll(this.PUBLISHED_STATUS_QUERY)
  }

  public override async getBySlug(slug: string): Promise<ServiceItem | null> {
    return this.getOneByField('slug', slug, this.PUBLISHED_STATUS_QUERY)
  }

  public override async getById(id: string): Promise<ServiceItem | null> {
    return this.getOneByField('id', id, this.PUBLISHED_STATUS_QUERY)
  }
}
