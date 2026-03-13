<script setup lang="ts">
import type { ArticleItem } from '#shared/types/article'

import { normalizeAppPath } from '#shared/lib/route'

defineProps<{ articleItem: ArticleItem }>()
</script>

<template>
  <article
    class="group border-brand-soft/70 bg-brand-white flex h-full flex-col overflow-hidden rounded-[28px] border shadow-[0_18px_45px_rgba(43,42,41,0.08)] transition-transform duration-300 hover:-translate-y-1">
    <NuxtLink :to="normalizeAppPath(`articles/${articleItem.slug}`)" class="block overflow-hidden">
      <CmsImage
        :src="articleItem.image_source"
        :alt="articleItem.image_alt"
        width="600"
        height="400"
        class="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
    </NuxtLink>

    <div class="flex flex-1 flex-col gap-5 px-6 py-6">
      <NuxtLink
        :to="normalizeAppPath(`articles/${articleItem.slug}`)"
        class="text-brand-dark hover:text-brand-red min-h-24 text-[1.7rem] leading-tight font-bold transition-colors">
        {{ articleItem.name }}
      </NuxtLink>

      <p class="text-brand-grey min-h-28 overflow-hidden text-lg leading-8">
        {{ articleItem.annotation }}
      </p>

      <div class="mt-auto flex items-center justify-between gap-4 pt-2">
        <NuxtLink
          :to="normalizeAppPath(`articles/${articleItem.slug}`)"
          class="bg-brand-red/92 text-brand-white inline-flex min-h-12 items-center justify-center rounded-2xl px-5 text-base font-bold shadow-[0_12px_26px_rgba(230,42,42,0.2)] transition-transform duration-200 hover:scale-[1.01] hover:bg-[#d92525] active:scale-[0.99]">
          Подробнее
        </NuxtLink>

        <div class="text-brand-grey-light flex shrink-0 items-center gap-2 text-sm font-semibold">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            class="h-4 w-4">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 10h18" />
          </svg>
          <span>{{ articleItem.date }}</span>
        </div>
      </div>
    </div>
  </article>
</template>
