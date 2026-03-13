<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  basePath: string
  currentPage: number
  totalPages: number
}>()

const visiblePages = computed<number[]>(() => {
  const pages = new Set<number>([
    1,
    props.totalPages,
    props.currentPage - 1,
    props.currentPage,
    props.currentPage + 1,
  ])

  return [...pages]
    .filter((page) => page >= 1 && page <= props.totalPages)
    .sort((left, right) => left - right)
})

const pageLink = (page: number) => ({
  path: props.basePath,
  query: page <= 1 ? {} : { page: String(page) },
})
</script>

<template>
  <div v-if="totalPages > 1" class="mt-12 flex flex-wrap items-center justify-center gap-3">
    <NuxtLink
      :to="pageLink(currentPage - 1)"
      :aria-disabled="currentPage <= 1"
      class="border-brand-soft text-brand-dark hover:border-brand-red hover:text-brand-red rounded-full border px-5 py-3 text-sm font-semibold transition-colors"
      :class="currentPage <= 1 && 'pointer-events-none opacity-40'">
      Назад
    </NuxtLink>

    <NuxtLink
      v-for="page in visiblePages"
      :key="page"
      :to="pageLink(page)"
      class="border-brand-soft text-brand-dark hover:border-brand-red hover:text-brand-red flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold transition-colors"
      :class="
        page === currentPage &&
        'bg-brand-red border-brand-red text-brand-white hover:text-brand-white'
      ">
      {{ page }}
    </NuxtLink>

    <NuxtLink
      :to="pageLink(currentPage + 1)"
      :aria-disabled="currentPage >= totalPages"
      class="border-brand-soft text-brand-dark hover:border-brand-red hover:text-brand-red rounded-full border px-5 py-3 text-sm font-semibold transition-colors"
      :class="currentPage >= totalPages && 'pointer-events-none opacity-40'">
      Далее
    </NuxtLink>
  </div>
</template>
