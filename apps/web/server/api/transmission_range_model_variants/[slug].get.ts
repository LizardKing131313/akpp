import { TransmissionRangeModelVariantsRepository } from '#server/services/repo/entity/transmission_range_model_variants.repo'

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event)
  const repo = new TransmissionRangeModelVariantsRepository()
  return await repo.getBySlugOrThrow(slug)
})
