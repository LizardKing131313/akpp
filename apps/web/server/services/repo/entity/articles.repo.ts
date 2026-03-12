import type { ArticleItem } from '#shared/types/article'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

type RawArticleRelationItem = {
  readonly sort?: number
  readonly recomended_articles_id?: ArticleItem | null
}

type RawArticleItem = Omit<ArticleItem, 'recomended'> & {
  readonly recomended?: RawArticleRelationItem[]
}

export class ArticlesRepository extends ListSlugRepository<ArticleItem> {
  protected readonly collection = 'articles'

  protected readonly fields = `
    id,
    slug,
    name,
    image_source,
    image_alt,
    content,
    date,
    annotation,
    sort,
    recomended.recomended_articles_id.id,
    recomended.recomended_articles_id.name,
    recomended.recomended_articles_id.slug,
    recomended.recomended_articles_id.image_source,
    recomended.recomended_articles_id.image_alt,
    recomended.recomended_articles_id.date,
    recomended.recomended_articles_id.annotation,
    recomended.sort,
  `

  private mapArticle(raw: RawArticleItem): ArticleItem {
    const relationItems = raw.recomended ?? []
    const recomended = relationItems
      .map((relationItem) => relationItem.recomended_articles_id)
      .filter((item): item is NonNullable<RawArticleRelationItem['recomended_articles_id']> => {
        return Boolean(item?.id && item.slug && item.name)
      })

    return {
      ...raw,
      recomended,
    }
  }

  public override async list(): Promise<readonly ArticleItem[]> {
    const items = await this.getAll({
      limit: -1,
      'deep[recomended][_limit]': -1,
      'deep[recomended][_sort]': 'sort',
    })
    return items.map((item) => this.mapArticle(item as RawArticleItem))
  }

  public override async getBySlug(slug: string): Promise<ArticleItem | null> {
    const rawItem = await this.getOneByField('slug', slug)
    if (!rawItem) return null
    return this.mapArticle(rawItem as RawArticleItem)
  }
}
