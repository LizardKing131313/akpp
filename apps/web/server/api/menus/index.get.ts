import type { MenuPlacement } from '#shared/types/menu'

import { MenusRepository } from '#server/services/repo/entity/menus.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const requestedPlacement = getQuery(event).placement
  const placement: MenuPlacement =
    requestedPlacement === 'header' || requestedPlacement === 'footer'
      ? requestedPlacement
      : 'common'
  const repo = new MenusRepository()
  return await repo.list(placement)
})
