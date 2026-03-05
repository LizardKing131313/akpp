<script setup lang="ts">
import type { CaseItem } from '#shared/types/case'

defineProps<{ caseItem: CaseItem }>()
</script>

<template>
  <div>
    <BrandLogo :brand="caseItem.brand" />

    <p class="text-brand-dark line-clamp-1 text-sm leading-snug font-bold group-hover:underline">
      {{ caseItem.name }}
    </p>

    <p class="text-brand-grey-light text-xs">
      {{ caseItem.case_date }}
    </p>
  </div>
</template>
