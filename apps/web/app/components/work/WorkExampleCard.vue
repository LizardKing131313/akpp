<script setup lang="ts">
import type { WorkExample } from '#shared/types/components/work_example'

withDefaults(
  defineProps<{
    work: WorkExample
    variant?: 'list' | 'tile'
  }>(),
  { variant: 'list' }
)
</script>

<template>
  <NuxtLink :to="work.href" class="group block transition-colors">
    <template v-if="variant === 'tile'">
      <div class="overflow-hidden rounded-t-xl">
        <NuxtImg
          :src="work.image.source"
          :alt="work.image.alt"
          sizes="(max-width: 640px) 50vw, 260px"
          class="aspect-16/10 w-full object-cover" />
      </div>

      <WorkExampleCardContent :work class="space-y-4 p-3" />
    </template>

    <template v-else>
      <div class="flex items-center gap-4">
        <div class="h-16 w-20 shrink-0 overflow-hidden rounded-xl">
          <NuxtImg
            :src="work.image.source"
            :alt="work.image.alt"
            sizes="80px"
            class="h-full w-full object-cover" />
        </div>

        <WorkExampleCardContent :work class="min-w-0 flex-1 space-y-1" />

        <Arrow direction="right" double class="transition-transform group-hover:translate-x-0.5" />
      </div>
    </template>
  </NuxtLink>
</template>
