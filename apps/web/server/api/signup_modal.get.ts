import { SignupModalRepository } from '#server/services/repo/entity/signup_modal.repo'

export default defineEventHandler(async () => {
  const repo = new SignupModalRepository()
  return await repo.get()
})
