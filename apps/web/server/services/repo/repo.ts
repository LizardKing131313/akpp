import type { EntityId, EntityItem, ListParams } from '#shared/types/entity'

import { createDirectusClient, type DirectusQuery } from '#server/services/directus'
import { badRequest, notFound } from '#server/utils/http'

export abstract class Repository<ItemType extends EntityItem> {
  protected abstract collection: string

  protected abstract readonly fields: string

  protected readonly SORT_FIELD: string = 'sort'

  protected readonly NOT_IMPLEMENTED: string = 'Not implemented'

  public abstract list(params?: ListParams): Promise<readonly ItemType[]>

  public async getById(id: string): Promise<ItemType | null> {
    return this.getOneByField('id', id)
  }

  public async create(_params: Omit<ItemType, 'id'>): Promise<ItemType> {
    throw new Error(this.NOT_IMPLEMENTED)
  }

  public async update(_id: EntityId, _patch: Partial<Omit<ItemType, 'id'>>): Promise<ItemType> {
    throw new Error(this.NOT_IMPLEMENTED)
  }

  public async delete(_id: EntityId): Promise<void> {
    throw new Error(this.NOT_IMPLEMENTED)
  }

  public async exists(id: EntityId): Promise<boolean> {
    return (await this.getById(id)) !== null
  }

  public async getByIdOrThrow(id: string | undefined): Promise<ItemType> {
    if (!id) {
      return badRequest('ID is required')
    }

    const entity = await this.getById(id)

    if (!entity) {
      return notFound(`Entity not found: ${id}`)
    }

    return entity
  }

  protected async getAll(query?: DirectusQuery): Promise<readonly ItemType[]> {
    const directus = createDirectusClient()

    return await directus.getItems<ItemType>(this.collection, {
      fields: this.fields,
      sort: this.SORT_FIELD,
      ...query,
    })
  }

  protected async getOneByField(
    field: string,
    value: string | number | boolean
  ): Promise<ItemType | null> {
    const directus = createDirectusClient()

    const items = await directus.getItems<ItemType>(this.collection, {
      limit: 1,
      fields: this.fields,
      ...directus.equals(field, value),
    })

    return items[0] ?? null
  }

  protected async getManyByField(
    field: string,
    value: string | number | boolean
  ): Promise<readonly ItemType[]> {
    const directus = createDirectusClient()

    return await directus.getItems<ItemType>(this.collection, {
      fields: this.fields,
      sort: this.SORT_FIELD,
      ...directus.equals(field, value),
    })
  }
}
