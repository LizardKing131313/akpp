export type BreadcrumbItem = {
  readonly name: string
  readonly slug?: string
}

export type RouteBreadcrumbItem = {
  readonly label: string
  readonly to?: string
}
