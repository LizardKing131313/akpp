<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { computed } from 'vue'

const props = withDefaults(
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

const { data: casesData } = await useCases()

const resolvedCases = computed<CaseItem[]>(() => {
  if (props.cases.length > 0) {
    return props.cases
  }

  return casesData.value ?? []
})
</script>

<template>
  <div class="space-y-8 lg:max-h-105.75 lg:space-y-12">
    <CenteredTitle class="text-left">{{ props.title }}</CenteredTitle>

    <div class="grid grid-cols-2 gap-4 lg:hidden">
      <CaseExampleCard
        v-for="(caseItem, index) in resolvedCases.slice(0, 3)"
        :key="caseItem.id"
        :caseItem="caseItem"
        variant="tile"
        :class="index === 2 ? 'col-span-2' : ''" />
    </div>

    <div class="hidden space-y-8 lg:block">
      <CaseExampleCard
        v-for="caseItem in resolvedCases.slice(0, 3)"
        :key="caseItem.id"
        :caseItem="caseItem"
        variant="list" />
    </div>

    <div>
      <NuxtLink :to="props.href" class="group w-full transition-colors lg:hidden">
        <div
          :class="
            cn(`
              bg-brand-red hover:bg-brand-red/90 text-brand-soft mx-auto
              flex w-fit items-center justify-center rounded-full
              px-12 py-4 font-bold transition-colors
            `)
          ">
          {{ props.showAllButton }}
        </div>
      </NuxtLink>

      <GoToLink :href="props.href" class="hover:text-brand-dark! hidden lg:block">
        {{ props.showAllLink }}
      </GoToLink>
    </div>
  </div>
</template>
