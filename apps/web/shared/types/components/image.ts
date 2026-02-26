export class ItemImage {
  public readonly source: string
  public readonly alt?: string

  constructor(params: { source: string; alt?: string }) {
    this.source = params.source
    this.alt = params.alt ?? params.source
  }
}
