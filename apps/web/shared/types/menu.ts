import type { SlugEntityItem } from '#shared/types/entity'

export type MenuPlacement = 'header' | 'footer' | 'common'

export type MenuItem = SlugEntityItem & {
  readonly placement: MenuPlacement
  readonly children: MenuItem[] | null
}
