import { CalculateRepository } from '#server/services/repo/entity/calculate.repo'

export default defineEventHandler(async () => {
  const repo = new CalculateRepository()
  return await repo.getSettings()
})
