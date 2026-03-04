import { ErrorRepository } from '../services/repo/entity/404.repo'

export default defineEventHandler(async () => {
  const repo = new ErrorRepository()
  return await repo.get()
})
