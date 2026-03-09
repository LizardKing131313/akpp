import { MenusRepository } from '#server/services/repo/entity/menus.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new MenusRepository()
  return await repo.list()
})
