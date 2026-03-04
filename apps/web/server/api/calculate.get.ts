import { CalculateRepository } from '../services/repo/entity/calculate.repo'

export default defineEventHandler(async () => {
  const repo = new CalculateRepository()
  return await repo.get()
})
