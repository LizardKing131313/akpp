import { CaseSettingsRepository } from '#server/services/repo/entity/case_settings.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new CaseSettingsRepository()
  return await repo.get()
})
