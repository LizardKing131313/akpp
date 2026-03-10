import type { ArticleItem } from '#shared/types/article'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

export class ArticlesRepository extends ListSlugRepository<ArticleItem> {
  protected readonly collection = 'articles'

  protected readonly fields = 'id,slug,name,image_source,image_alt,content,date,sort'

  public override async list(): Promise<readonly ArticleItem[]> {
    const items = await this.getAll()

    return items.map((item) => ({
      ...item,
      id: String(item.id),
    }))
  }

  public override async getBySlug(slug: string): Promise<ArticleItem | null> {
    const item = await this.getOneByField('slug', slug)

    return item
      ? {
          ...item,
          id: String(item.id),
        }
      : null
  }
}
