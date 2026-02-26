export class BreadcrumbItem {
  public readonly label: string
  public readonly to: string

  constructor(params: { label: string; to: string }) {
    this.label = params.label
    this.to = params.to
  }
}
