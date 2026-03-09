import { QuizSettingsRepository } from '#server/services/repo/entity/quiz_settings.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async () => {
  const repo = new QuizSettingsRepository()
  return await repo.getSettings()
})
