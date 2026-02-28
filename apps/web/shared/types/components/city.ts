export class CityItem {
  public readonly id: string
  public readonly title: string

  constructor(params: { id: string; title: string }) {
    this.id = params.id
    this.title = params.title
  }
}
