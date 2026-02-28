export class MapPoint {
  public readonly id: string
  public readonly title: string
  public readonly lng: number
  public readonly lat: number

  constructor(params: { id: string; title: string; lng: number; lat: number }) {
    this.id = params.id
    this.title = params.title
    this.lng = params.lng
    this.lat = params.lat
  }
}
