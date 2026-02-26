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
  <NuxtLink
    :to="work.href"
    class="group bg-brand-dark/0 hover:bg-brand-dark/5 block cursor-pointer! rounded-xl transition-colors">
    <template v-if="variant === 'tile'">
      <div class="bg-surface-base/50 cursor-pointer! rounded-xl">
        <div class="bg-brand-dark/10 cursor-pointer! overflow-hidden rounded-t-xl">
          <NuxtImg
            :src="work.image.source"
            :alt="work.image.alt"
            sizes="(max-width: 640px) 50vw, 260px"
            class="aspect-16/10 w-full cursor-pointer! object-cover" />
        </div>

        <div class="cursor-pointer! p-3">
          <div
            class="text-brand-grey/70 flex cursor-pointer! items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
            <NuxtImg
              :src="work.brand.logo.source"
              :alt="work.brand.logo.alt"
              sizes="20px"
              class="bg-brand-dark/10 h-5 w-5 cursor-pointer! rounded-full object-contain p-0.5" />
            <span class="cursor-pointer! truncate">
              {{ work.brand.title }}
            </span>
          </div>

          <p
            class="text-brand-dark mt-1 line-clamp-2 cursor-pointer! text-sm leading-snug font-semibold">
            {{ work.title }}
          </p>

          <p class="text-brand-grey/70 mt-1 cursor-pointer! text-xs">
            {{ work.date }}
          </p>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex cursor-pointer! items-center gap-4">
        <div class="bg-brand-dark/10 h-16 w-20 shrink-0 cursor-pointer! overflow-hidden rounded-lg">
          <NuxtImg
            :src="work.image.source"
            :alt="work.image.alt"
            sizes="80px"
            class="h-full w-full cursor-pointer! object-cover" />
        </div>

        <div class="min-w-0 flex-1 cursor-pointer!">
          <div
            class="text-brand-grey/70 flex cursor-pointer! items-center gap-3 text-[11px] font-semibold tracking-wide">
            <NuxtImg
              :src="work.brand.logo.source"
              :alt="work.brand.logo.alt"
              sizes="28px"
              class="bg-brand-dark/10 h-7 w-7 shrink-0 cursor-pointer! rounded-full object-contain p-1" />

            <span class="cursor-pointer! truncate">
              {{ work.brand.title }}
            </span>
          </div>

          <p
            class="text-brand-dark mt-1 line-clamp-2 cursor-pointer! text-base leading-snug font-semibold">
            {{ work.title }}
          </p>

          <p class="text-brand-grey/70 mt-1 cursor-pointer! text-xs">
            {{ work.date }}
          </p>
        </div>

        <Arrow
          direction="right"
          double
          class="cursor-pointer! text-2xl leading-none transition-transform group-hover:translate-x-0.5" />
      </div>
    </template>
  </NuxtLink>
</template>
