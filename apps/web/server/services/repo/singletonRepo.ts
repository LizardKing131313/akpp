import { createDirectusClient } from '#server/services/directus'

export abstract class SingletonRepository<ItemType> {
  protected abstract collection: string

  protected abstract readonly fields: string

  protected getDirectus() {
    return createDirectusClient()
  }

  public async get(): Promise<ItemType> {
    const directus = this.getDirectus()

    return await directus.getSingleton<ItemType>(this.collection, {
      fields: this.fields,
    })
  }
}
