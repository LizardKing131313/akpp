<script setup lang="ts">
import type { CaseItem } from '#shared/types/case'

import { normalizeAppPath } from '#shared/lib/route'

withDefaults(
  defineProps<{
    caseItem: CaseItem
    variant?: 'list' | 'tile'
  }>(),
  {
    variant: 'list',
  }
)
</script>

<template>
  <NuxtLink :to="normalizeAppPath(caseItem.slug)" class="group block transition-colors">
    <template v-if="variant === 'tile'">
      <div class="overflow-hidden rounded-t-xl">
        <CmsImage
          :src="caseItem.image_source"
          :alt="caseItem.image_alt"
          sizes="(max-width: 640px) 50vw, 260px"
          class="aspect-16/10 w-full object-cover" />
      </div>

      <CaseExampleCardContent :caseItem="caseItem" class="space-y-4 p-3" />
    </template>

    <template v-else>
      <div class="flex items-center gap-4">
        <div class="h-16 w-20 shrink-0 overflow-hidden rounded-xl">
          <CmsImage
            :src="caseItem.image_source"
            :alt="caseItem.image_alt"
            sizes="80px"
            class="h-full w-full object-cover" />
        </div>

        <CaseExampleCardContent :caseItem="caseItem" class="min-w-0 flex-1 space-y-1" />

        <Arrow direction="right" double class="transition-transform group-hover:translate-x-0.5" />
      </div>
    </template>
  </NuxtLink>
</template>
