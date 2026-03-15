<script setup lang="ts">
import type { BrandItem } from '#shared/types/brand'
import type { QuizModalPerkItem, QuizModalSettings } from '#shared/types/modal'
import type { QuizSubmitPayload } from '#shared/types/quiz'

import { cn } from '#shared/lib/cn'
import { computed } from 'vue'

import ModalClose from '~/components/modal/components/ModalClose.vue'
import RepairQuiz from '~/components/quiz/RepairQuiz.vue'
import { useQuizSubmit } from '~/composables/useQuizSubmit'
import { useQuizModalSettings } from '~/composables/useRepoApi'

type QuizModalPayload = {
  readonly activeBrand?: BrandItem | null
}

const emit = defineEmits<{
  (event: 'close'): void
}>()

const emitClose = (): void => {
  emit('close')
}

const { submitQuiz } = useQuizSubmit({
  onSuccess: emitClose,
})

const { data: settingsData } = await useQuizModalSettings()

const settings = computed<QuizModalSettings>(() => settingsData.value ?? { perks: [] })

const perks = computed<readonly QuizModalPerkItem[]>(() => {
  return settings.value.perks ?? []
})

const handleQuizSubmit = (payload: QuizSubmitPayload): void => {
  void submitQuiz(payload)
}

const props = defineProps<{
  payload: QuizModalPayload | null
}>()

const activeBrand = computed<BrandItem | null>(() => {
  return props.payload?.activeBrand ?? null
})
</script>

<template>
  <div
    :class="
      cn(`
        bg-brand-white relative w-full max-w-6xl
        overflow-hidden rounded-2xl shadow-2xl sm:rounded-[28px]
      `)
    ">
    <ModalClose
      @click="emitClose"
      class="text-brand-white hover:bg-brand-red hover:text-brand-white z-20" />

    <div
      class="max-h-[85svh] overflow-y-auto sm:max-h-none lg:grid lg:grid-cols-[minmax(0,1fr)_260px]">
      <div class="min-w-0">
        <RepairQuiz :active-brand="activeBrand" @submit="handleQuizSubmit" />
      </div>

      <aside
        class="relative hidden min-h-full overflow-hidden bg-[#0f1720] lg:flex lg:flex-col lg:justify-end">
        <CmsImage
          v-if="settings.image_source"
          :src="settings.image_source"
          :alt="settings.image_alt"
          class="absolute inset-0 h-full w-full object-cover" />

        <div
          class="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,18,0.55)_0%,rgba(8,12,18,0.76)_34%,rgba(8,12,18,0.92)_65%,rgba(8,12,18,0.97)_100%)]" />
        <div class="absolute inset-0 bg-black/20" />

        <div class="relative z-10 flex h-full flex-col justify-end px-7 pb-8 text-white">
          <div v-if="settings.name" class="max-w-56 text-[32px] leading-8.5 font-extrabold">
            {{ settings.name }}
          </div>

          <div v-if="perks.length > 0" class="mt-8 space-y-5">
            <div v-for="perk in perks" :key="perk.id" class="flex items-start gap-3">
              <span class="text-brand-red flex h-9 w-9 shrink-0 items-center justify-center">
                <CmsImage
                  v-if="perk.image_source"
                  :src="perk.image_source"
                  :alt="perk.image_alt"
                  width="20"
                  height="20"
                  class="h-5 w-5 object-contain" />
                <span v-else class="bg-brand-red block h-2.5 w-2.5 rounded-full" />
              </span>

              <span class="max-w-44 text-[15px] leading-5 font-semibold text-white/92">
                {{ perk.name }}
              </span>
            </div>
          </div>

          <div
            v-if="settings.description"
            class="mt-8 max-w-52 text-sm leading-5 font-medium text-white/72">
            {{ settings.description }}
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
