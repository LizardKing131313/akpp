export class BrandItem {
  public readonly id: string
  public readonly title: string
  public readonly href: string
  public readonly logo: BrandLogo

  constructor(params: { id: string; title: string; href: string; logo: BrandLogo }) {
    this.id = params.id
    this.title = params.title
    this.href = params.href
    this.logo = params.logo
  }
}

export class BrandLogo {
  public readonly source: string
  public readonly alt?: string

  constructor(params: { source: string; alt?: string; width?: number; height?: number }) {
    this.source = params.source
    this.alt = params.alt ?? params.source
  }
}
