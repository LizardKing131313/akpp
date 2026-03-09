import { RoutePageSettingsRepository } from '#server/services/repo/entity/route_page_settings.repo'

export default defineEventHandler(async () => {
  const repo = new RoutePageSettingsRepository()
  return await repo.get()
})
