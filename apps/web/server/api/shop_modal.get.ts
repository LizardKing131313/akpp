import { ShopModalRepository } from '#server/services/repo/entity/shop_modal.repo'

export default defineEventHandler(async () => {
  const repo = new ShopModalRepository()
  return await repo.get()
})
