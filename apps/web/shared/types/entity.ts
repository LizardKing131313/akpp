export interface EntityItem {
  readonly id: string
  readonly name?: string
}

export interface NamedEntityItem extends EntityItem {
  readonly name: string
}

export interface SlugEntityItem extends NamedEntityItem {
  readonly slug: string
}

export interface ImageItem {
  readonly image_source: string
  readonly image_alt?: string
}

export type ImageCardItem = SlugEntityItem &
  ImageItem & {
    readonly date: string
  }

export interface MapPoint {
  readonly lat: number
  readonly lng: number
}

export type YandexMapPoint = EntityItem & MapPoint

export type EntityId = string

export type ListParams = Readonly<{
  limit?: number
  offset?: number
  search?: string
}>
