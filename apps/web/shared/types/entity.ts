export interface EntityItem {
  readonly id: string
  readonly name?: string
}

export interface SlugEntityItem extends EntityItem {
  readonly slug: string
}

export interface ImageItem {
  readonly image_source: string
  readonly image_alt?: string
}

export interface MapPoint {
  readonly latitude: number
  readonly longitude: number
}

export type EntityId = string

export type ListParams = Readonly<{
  limit?: number
  offset?: number
  search?: string
}>
