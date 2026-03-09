import type { BrandItem } from '#shared/types/brand'
import type { MenuItem } from '#shared/types/menu'
import type { ModelItem } from '#shared/types/model'
import type { ServiceItem } from '#shared/types/service'

import { BrandsRepository } from '#server/services/repo/entity/brands.repo'
import { ModelsRepository } from '#server/services/repo/entity/models.repo'
import { ServicesRepository } from '#server/services/repo/entity/services.repo'
import { ListSlugRepository } from '#server/services/repo/listSlugRepo'

type MenuSourceType = 'manual' | 'brands' | 'services' | 'brand_models'

type MenuSourceOptions = {
  readonly brand_id?: string
  readonly brand_slug?: string
}

type RawMenuItem = {
  readonly id: string
  readonly slug: string
  readonly name: string
  readonly parent_id?: string | number | null
  readonly source_type?: MenuSourceType | null
  readonly source_options?: string | null
}

type DynamicMenuContext = {
  readonly brands: readonly BrandItem[]
  readonly models: readonly ModelItem[]
  readonly services: readonly ServiceItem[]
}

export class MenusRepository extends ListSlugRepository<MenuItem> {
  protected readonly collection = 'menus'

  protected readonly fields = 'id,slug,name,parent_id,source_type,source_options,sort'

  private readonly DEFAULT_SOURCE_TYPE: MenuSourceType = 'manual'

  public override async list(): Promise<readonly MenuItem[]> {
    const [rawMenus, brands, models, services] = await Promise.all([
      this.getAll({
        'filter[status][_eq]': 'published',
      }) as Promise<readonly RawMenuItem[]>,
      new BrandsRepository().list(),
      new ModelsRepository().list(),
      new ServicesRepository().list(),
    ])

    const dynamicContext: DynamicMenuContext = { brands, models, services }

    const itemsByParentId = new Map<string, RawMenuItem[]>()
    const rootItems: RawMenuItem[] = []

    for (const rawMenuItem of rawMenus) {
      const parentId = this.normalizeParentId(rawMenuItem.parent_id)
      if (!parentId) {
        rootItems.push(rawMenuItem)
        continue
      }

      const children = itemsByParentId.get(parentId) ?? []
      children.push(rawMenuItem)
      itemsByParentId.set(parentId, children)
    }

    return rootItems.map((rawMenuItem) =>
      this.buildMenuNode(rawMenuItem, itemsByParentId, dynamicContext)
    )
  }

  private buildMenuNode(
    rawMenuItem: RawMenuItem,
    itemsByParentId: ReadonlyMap<string, RawMenuItem[]>,
    dynamicContext: DynamicMenuContext
  ): MenuItem {
    const sourceType = this.normalizeSourceType(rawMenuItem.source_type)
    const sourceOptions = this.parseSourceOptions(rawMenuItem.source_options)
    const manualChildren = (itemsByParentId.get(rawMenuItem.id) ?? []).map((childItem) =>
      this.buildMenuNode(childItem, itemsByParentId, dynamicContext)
    )

    const dynamicChildren = this.buildDynamicChildren(
      sourceType,
      sourceOptions,
      dynamicContext,
      manualChildren
    )

    return {
      id: rawMenuItem.id,
      slug: rawMenuItem.slug,
      name: rawMenuItem.name,
      children: dynamicChildren.length > 0 ? [...dynamicChildren] : null,
    }
  }

  private buildDynamicChildren(
    sourceType: MenuSourceType,
    sourceOptions: MenuSourceOptions,
    dynamicContext: DynamicMenuContext,
    manualChildren: readonly MenuItem[]
  ): readonly MenuItem[] {
    if (sourceType === 'manual') {
      return manualChildren
    }

    if (sourceType === 'services') {
      return dynamicContext.services.map((serviceItem) => ({
        id: `service:${serviceItem.id}`,
        slug: `/uslugi/${serviceItem.slug}`,
        name: serviceItem.name,
        children: null,
      }))
    }

    if (sourceType === 'brands') {
      return dynamicContext.brands.map((brandItem) => {
        const brandModels = dynamicContext.models
          .filter((modelItem) => modelItem.brand_id === brandItem.id)
          .map((modelItem) => ({
            id: `model:${brandItem.id}:${modelItem.id}`,
            slug: `/remont-akpp-${brandItem.slug}/${modelItem.slug}`,
            name: modelItem.name,
            children: null,
          }))

        return {
          id: `brand:${brandItem.id}`,
          slug: `/remont-akpp-${brandItem.slug}`,
          name: brandItem.name,
          children: brandModels.length > 0 ? brandModels : null,
        }
      })
    }

    if (sourceType === 'brand_models') {
      const brandItem = this.resolveBrandFromOptions(dynamicContext.brands, sourceOptions)
      if (!brandItem) {
        return []
      }

      return dynamicContext.models
        .filter((modelItem) => modelItem.brand_id === brandItem.id)
        .map((modelItem) => ({
          id: `model:${brandItem.id}:${modelItem.id}`,
          slug: `/remont-akpp-${brandItem.slug}/${modelItem.slug}`,
          name: modelItem.name,
          children: null,
        }))
    }

    return manualChildren
  }

  private resolveBrandFromOptions(
    brands: readonly BrandItem[],
    sourceOptions: MenuSourceOptions
  ): BrandItem | null {
    const brandId = sourceOptions.brand_id?.trim()
    if (brandId && brandId.length > 0) {
      return brands.find((brandItem) => brandItem.id === brandId) ?? null
    }

    const brandSlug = sourceOptions.brand_slug?.trim()
    if (brandSlug && brandSlug.length > 0) {
      return brands.find((brandItem) => brandItem.slug === brandSlug) ?? null
    }

    return null
  }

  private normalizeParentId(value: RawMenuItem['parent_id']): string | null {
    if (value === null || value === undefined) {
      return null
    }

    const normalized = String(value).trim()
    return normalized.length > 0 ? normalized : null
  }

  private normalizeSourceType(value: RawMenuItem['source_type']): MenuSourceType {
    if (value === 'brands' || value === 'services' || value === 'brand_models') {
      return value
    }

    return this.DEFAULT_SOURCE_TYPE
  }

  private parseSourceOptions(value: RawMenuItem['source_options']): MenuSourceOptions {
    if (!value || value.trim().length === 0) {
      return {}
    }

    try {
      const parsed = JSON.parse(value) as MenuSourceOptions
      if (typeof parsed !== 'object' || parsed === null) {
        return {}
      }

      return parsed
    } catch {
      return {}
    }
  }
}
