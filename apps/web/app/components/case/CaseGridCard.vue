<script setup lang="ts">
import type { CaseItem } from '#shared/types/case'

import { cn } from '#shared/lib/cn'
import { normalizeAppPath } from '#shared/lib/route'

const props = defineProps<{ caseItem: CaseItem }>()

const { settings, partMoney, workMoney, totalMoney } = await useCasePresentation(
  () => props.caseItem
)
</script>

<template>
  <article
    :class="
      cn(`
        group border-brand-soft/70 bg-brand-white flex h-full flex-col overflow-hidden
        rounded-[28px] border shadow-[0_18px_45px_rgba(43,42,41,0.08)] transition-transform
        duration-300 hover:-translate-y-1
      `)
    ">
    <div class="border-brand-soft/70 flex items-center border-b px-5 py-4">
      <BrandLogo :brand="caseItem.brand" />
    </div>

    <div class="bg-brand-dark/3 overflow-hidden">
      <CmsImage
        :src="caseItem.image_source"
        :alt="caseItem.image_alt"
        width="600"
        height="400"
        class="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
    </div>

    <div class="flex flex-1 flex-col gap-5 px-7 py-6">
      <h3
        class="text-brand-dark min-h-0 max-w-full text-[1.3rem] leading-[1.1] font-bold tracking-[-0.02em] [text-wrap:balance] break-words hyphens-auto sm:min-h-20 sm:text-[1.55rem] lg:text-[1.85rem]">
        {{ caseItem.name }}
      </h3>

      <div>
        <span
          class="bg-brand-red/12 text-brand-red inline-flex rounded-lg px-3 py-1 text-sm font-semibold">
          {{ caseItem.service }}
        </span>
      </div>

      <dl class="border-brand-soft/70 text-brand-grey space-y-3 border-t pt-2 text-base">
        <div class="border-brand-soft/60 flex items-center justify-between gap-4 border-b pb-3">
          <dt>{{ settings.part_price_label }}</dt>
          <dd class="text-brand-dark text-right text-[1.1rem] font-semibold">{{ partMoney }}</dd>
        </div>

        <div class="border-brand-soft/60 flex items-center justify-between gap-4 border-b pb-3">
          <dt>{{ settings.work_price_label }}</dt>
          <dd class="text-brand-dark text-right text-[1.1rem] font-semibold">{{ workMoney }}</dd>
        </div>

        <div class="flex items-center justify-between gap-4 pt-1">
          <dt class="text-brand-dark font-bold">{{ settings.total_label }}</dt>
          <dd class="text-brand-red text-right text-[1.35rem] font-bold">{{ totalMoney }}</dd>
        </div>
      </dl>

      <NuxtLink
        :href="normalizeAppPath(`work/${caseItem.slug}`)"
        :class="
          cn(`
            bg-brand-red/92 text-brand-white mt-auto inline-flex min-h-14 items-center
            justify-center rounded-full px-6 text-lg font-bold
            shadow-[0_14px_30px_rgba(230,42,42,0.22)] transition-transform duration-200
            hover:scale-[1.01] hover:bg-[#d92525] active:scale-[0.99]
          `)
        ">
        {{ settings.show_button }}
      </NuxtLink>
    </div>
  </article>
</template>
