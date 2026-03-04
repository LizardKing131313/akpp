import { HeaderRepository } from '../services/repo/entity/header.repo'

export default defineEventHandler(async () => {
  const repo = new HeaderRepository()
  return await repo.get()
})
