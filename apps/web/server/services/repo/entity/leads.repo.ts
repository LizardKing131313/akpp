import { createDirectusClient } from '#server/services/directus'

type LeadDirectusItem = {
  readonly id: string
}

export type LeadDirectusCreatePayload = {
  name?: string
  readonly phone: string
  problem?: string
  symptoms?: string
  comment?: string
}

export class LeadsRepository {
  public async create(payload: LeadDirectusCreatePayload): Promise<LeadDirectusItem> {
    const directus = createDirectusClient()

    return await directus.createItem<LeadDirectusItem, LeadDirectusCreatePayload>('leads', payload)
  }
}
