export class MenuNode {
  public readonly id: string
  public readonly title: string
  public readonly href?: string | undefined
  public readonly children: MenuNode[]

  constructor(params: {
    id: string
    title: string
    href?: string | undefined
    children?: MenuNode[]
  }) {
    this.id = params.id
    this.title = params.title
    this.href = params.href
    this.children = params.children ?? []
  }

  public hasChildren(): boolean {
    return this.children.length > 0
  }

  public isLink(): boolean {
    return typeof this.href === 'string' && this.href.length > 0
  }
}
