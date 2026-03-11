import type { ArticleItem } from '#shared/types/article'

import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

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
    recomended.id,
    recomended.name,
    recomended.slug,
    recomended.image_source,
    recomended.image_alt,
    recomended.date,
    recomended.annotation,
    recomended.sort,
  `
}
