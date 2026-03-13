import type { MenuItem, MenuPlacement } from '#shared/types/menu'
import type { RouteLandingItem } from '#shared/types/route-landing'

import { RouteLandingsRepository } from '#server/services/repo/entity/route_landings.repo'
import { ListSlugRepository } from '#server/services/repo/listSlugRepo'
import { getRouteLandingMenuTitle } from '#shared/lib/route-landing'

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
  readonly placement?: MenuPlacement | null
  readonly source_type?: MenuSourceType | null
  readonly source_options?: string | null
}

type DynamicMenuContext = {
  readonly routeLandings: readonly RouteLandingItem[]
}

export class MenusRepository extends ListSlugRepository<MenuItem> {
  protected readonly collection = 'menus'

  protected readonly fields = 'id,slug,name,parent_id,placement,source_type,source_options,sort'

  private readonly DEFAULT_SOURCE_TYPE: MenuSourceType = 'manual'
  private readonly DEFAULT_PLACEMENT: MenuPlacement = 'common'

  public override async list(
    placement: MenuPlacement = this.DEFAULT_PLACEMENT
  ): Promise<readonly MenuItem[]> {
    const [rawMenus, routeLandings] = await Promise.all([
      this.getAll({
        'filter[status][_eq]': 'published',
      }) as Promise<readonly RawMenuItem[]>,
      new RouteLandingsRepository().listPublished(),
    ])

    const dynamicContext: DynamicMenuContext = { routeLandings }

    const itemsByParentId = new Map<string, RawMenuItem[]>()
    const rootItems: RawMenuItem[] = []

    for (const rawMenuItem of rawMenus) {
      const normalizedPlacement = this.normalizePlacement(rawMenuItem.placement)
      if (!this.matchesPlacement(normalizedPlacement, placement)) {
        continue
      }

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
      placement: this.normalizePlacement(rawMenuItem.placement),
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
      return dynamicContext.routeLandings
        .filter((landing) => landing.page_type === 'service')
        .map((landing) => {
          const serviceSlug = landing.service?.slug
          const children = dynamicContext.routeLandings
            .filter((childLanding) => {
              return (
                childLanding.page_type === 'service_brand' &&
                childLanding.service?.slug === serviceSlug
              )
            })
            .map((childLanding) => ({
              id: `service-brand:${childLanding.id}`,
              slug: childLanding.path,
              name: getRouteLandingMenuTitle(childLanding),
              placement: this.DEFAULT_PLACEMENT,
              children: null,
            }))

          return {
            id: `service:${landing.id}`,
            slug: landing.path,
            name: getRouteLandingMenuTitle(landing),
            placement: this.DEFAULT_PLACEMENT,
            children: children.length > 0 ? children : null,
          }
        })
    }

    if (sourceType === 'brands') {
      return dynamicContext.routeLandings
        .filter((landing) => landing.page_type === 'brand')
        .map((landing) => {
          const brandSlug = landing.brand?.slug
          const children = dynamicContext.routeLandings
            .filter((childLanding) => {
              return (
                childLanding.page_type === 'brand_model' && childLanding.brand?.slug === brandSlug
              )
            })
            .map((childLanding) => ({
              id: `brand-model:${childLanding.id}`,
              slug: childLanding.path,
              name: getRouteLandingMenuTitle(childLanding),
              placement: this.DEFAULT_PLACEMENT,
              children: null,
            }))

          return {
            id: `brand:${landing.id}`,
            slug: landing.path,
            name: getRouteLandingMenuTitle(landing),
            placement: this.DEFAULT_PLACEMENT,
            children: children.length > 0 ? children : null,
          }
        })
    }

    if (sourceType === 'brand_models') {
      const brandSlug = this.resolveBrandSlug(sourceOptions, dynamicContext.routeLandings)
      if (!brandSlug) {
        return []
      }

      return dynamicContext.routeLandings
        .filter(
          (landing) => landing.page_type === 'brand_model' && landing.brand?.slug === brandSlug
        )
        .map((landing) => ({
          id: `brand-model:${landing.id}`,
          slug: landing.path,
          name: getRouteLandingMenuTitle(landing),
          placement: this.DEFAULT_PLACEMENT,
          children: null,
        }))
    }

    return manualChildren
  }

  private resolveBrandSlug(
    sourceOptions: MenuSourceOptions,
    routeLandings: readonly RouteLandingItem[]
  ): string | null {
    const brandSlug = sourceOptions.brand_slug?.trim()
    if (brandSlug && brandSlug.length > 0) {
      return brandSlug
    }

    const brandId = sourceOptions.brand_id?.trim()
    if (brandId && brandId.length > 0) {
      return (
        routeLandings.find((landing) => {
          return landing.page_type === 'brand' && landing.brand?.id === brandId
        })?.brand?.slug ?? null
      )
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

  private normalizePlacement(value: RawMenuItem['placement']): MenuPlacement {
    if (value === 'header' || value === 'footer' || value === 'common') {
      return value
    }

    return this.DEFAULT_PLACEMENT
  }

  private matchesPlacement(
    itemPlacement: MenuPlacement,
    requestedPlacement: MenuPlacement
  ): boolean {
    return itemPlacement === 'common' || itemPlacement === requestedPlacement
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
