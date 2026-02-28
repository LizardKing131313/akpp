import type { ItemImage } from '#shared/types/components/image'

export class MetroInfo {
  public readonly title: string
  public readonly lineColorHex: string

  constructor(params: { title: string; lineColorHex: string }) {
    this.title = params.title
    this.lineColorHex = params.lineColorHex
  }
}

export class ContactLocation {
  public readonly id: string
  public readonly cityId: string
  public readonly title: string
  public readonly address: string
  public readonly worktime: string
  public readonly phone: string
  public readonly href: string
  public readonly lat: number
  public readonly lng: number
  public readonly metro?: MetroInfo | undefined
  public readonly images?: ItemImage[] | undefined

  constructor(params: {
    id: string
    cityId: string
    title: string
    address: string
    worktime: string
    phone: string
    href: string
    lat: number
    lng: number
    metro?: MetroInfo
    images?: ItemImage[]
  }) {
    this.id = params.id
    this.cityId = params.cityId
    this.title = params.title
    this.address = params.address
    this.worktime = params.worktime
    this.phone = params.phone
    this.href = params.href
    this.lat = params.lat
    this.lng = params.lng
    this.metro = params.metro
    this.images = params.images
  }
}
