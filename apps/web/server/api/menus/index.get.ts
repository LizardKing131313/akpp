import { MenusRepository } from '#server/services/repo/entity/menus.repo'

export default defineEventHandler(async () => {
  const repo = new MenusRepository()
  return await repo.list()
})
