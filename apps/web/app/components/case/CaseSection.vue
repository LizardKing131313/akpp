<script setup lang="ts">
import { cn } from '#shared/lib/cn'

withDefaults(
  defineProps<{
    title?: string
    cases?: CaseItem[]
    href?: string
    showAllButton?: string
    showAllLink?: string
  }>(),
  {
    title: 'Выполненные работы',
    cases: () => [],
    href: '/work',
    showAllButton: 'Показать ещё',
    showAllLink: 'Показать все работы',
  }
)
</script>

<template>
  <div class="space-y-8 lg:max-h-105.75 lg:space-y-12">
    <CenteredTitle class="text-left">{{ title }}</CenteredTitle>

    <div class="grid grid-cols-2 gap-4 lg:hidden">
      <WorkExampleCard
        v-for="(caseItem, index) in cases.slice(0, 3)"
        :key="caseItem.id"
        :caseItem="caseItem"
        variant="tile"
        :class="index === 2 ? 'col-span-2' : ''" />
    </div>

    <div class="hidden space-y-8 lg:block">
      <WorkExampleCard
        v-for="caseItem in cases.slice(0, 3)"
        :key="caseItem.id"
        :caseItem="caseItem"
        variant="list" />
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
          {{ showAllButton }}
        </div>
      </NuxtLink>

      <GoToLink :href="href" class="hover:text-brand-dark! hidden lg:block">
        {{ showAllLink }}
      </GoToLink>
    </div>
  </div>
</template>
