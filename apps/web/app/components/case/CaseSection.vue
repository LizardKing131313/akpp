<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { computed } from 'vue'

withDefaults(defineProps<{ href?: string }>(), { href: '/work' })

const { data: casesData } = await useCases()

const cases = computed<CaseItem[]>(() => {
  return (casesData.value ?? []).slice(0, 3)
})

const { data: settingsData } = await useCaseSettings()

const settings = computed<CaseSettings>(() => settingsData.value ?? ({} as CaseSettings))
</script>

<template>
  <div class="space-y-8 lg:max-h-105.75 lg:space-y-12">
    <CenteredTitle class="text-left">{{ settings.page_title }}</CenteredTitle>

    <div class="grid grid-cols-2 gap-4 lg:hidden">
      <CaseExampleCard
        v-for="(caseItem, index) in cases"
        :key="caseItem.id"
        :caseItem
        variant="tile"
        :class="index === 2 ? 'col-span-2' : ''" />
    </div>

    <div class="hidden space-y-8 lg:block">
      <CaseExampleCard v-for="caseItem in cases" :key="caseItem.id" :caseItem variant="list" />
    </div>

    <div>
      <NuxtLink :to="href" class="group w-full transition-colors lg:hidden">
        <div
          :class="
            cn(`
              bg-brand-red hover:bg-brand-red/90 text-brand-soft mx-auto
              flex w-fit items-center justify-center rounded-full
              px-12 py-4 font-bold transition-colors
            `)
          ">
          {{ settings.show_all_button }}
        </div>
      </NuxtLink>

      <GoToLink :href="href" class="hover:text-brand-dark! hidden lg:block">
        {{ settings.show_all_link }}
      </GoToLink>
    </div>
  </div>
</template>
