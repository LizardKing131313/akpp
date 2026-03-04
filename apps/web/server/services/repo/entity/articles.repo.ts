import type { ArticleItem } from '../../../../shared/types/article'

import { ListSlugRepository } from '../listSlugRepo'

export class ArticlesRepository extends ListSlugRepository<ArticleItem> {
  protected readonly collection = 'articles'

  protected readonly fields = 'id,slug,name,image_source,image_alt,content,sort'
}
