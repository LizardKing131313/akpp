<script setup lang="ts">
import { useHead, useHeaderUiSettings, useRequestURL, useRoute } from '#imports'
import { cn } from '#shared/lib/cn'
import { computed } from 'vue'

import { usePageHeaderMeta } from '~/composables/usePageHeaderMeta'

const route = useRoute()
const requestUrl = useRequestURL()
const { breadcrumbTitle, breadcrumbItems } = usePageHeaderMeta()

const currentOrigin = computed<string>(() => {
  if (import.meta.client) {
    return window.location.origin
  }

  return requestUrl.origin
})

const normalizedItems = computed(() =>
  breadcrumbItems.value.filter((item) => {
    if (!item.name) return false
    return item.name.trim().length > 0
  })
)

const resolvedCurrentAbsoluteUrl = computed<string>(() => {
  return new URL(route.fullPath, currentOrigin.value).toString()
})

const jsonLd = computed<Record<string, unknown> | null>(() => {
  const items = normalizedItems.value
  if (items.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item:
        item.slug && item.slug.length > 0
          ? new URL(item.slug, currentOrigin.value).toString()
          : resolvedCurrentAbsoluteUrl.value,
    })),
  }
})

useHead(() => {
  if (jsonLd.value === null) return {}
  return {
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(jsonLd.value),
      },
    ],
  }
})

const isLastIndex = (index: number): boolean => index === normalizedItems.value.length - 1

const setting = useHeaderUiSettings()
</script>

<template>
  <section class="group relative w-full overflow-hidden">
    <NuxtImg
      :src="setting.breadcrumbs_background_source"
      :alt="setting.breadcrumbs_background_alt"
      class="absolute inset-0 h-full w-full object-cover" />

    <div class="bg-brand-dark/80 absolute inset-0"></div>

    <div
      :class="
        cn(`
          relative z-10 flex h-full w-full flex-col
          items-center justify-center px-1 py-4 text-center sm:px-4 sm:py-8
        `)
      ">
      <h1
        :class="
          cn(`
            text-brand-white text-1xl font-bold tracking-wide
            uppercase sm:text-4xl sm:font-extrabold
          `)
        ">
        {{ breadcrumbTitle }}
      </h1>

      <nav aria-label="Breadcrumbs" class="mt-4">
        <ol
          :class="
            cn(`
              text-brand-white flex flex-wrap items-center
              justify-center text-xs font-medium tracking-widest uppercase
            `)
          ">
          <li
            v-for="(crumb, index) in normalizedItems"
            :key="`${crumb.name}-${index}`"
            class="flex items-center">
            <NuxtLink
              v-if="crumb.slug && !isLastIndex(index)"
              :to="crumb.slug"
              class="hover:text-brand-red uppercase transition-colors duration-200">
              {{ crumb.name }}
            </NuxtLink>

            <span v-else aria-current="page" class="uppercase">
              {{ crumb.name }}
            </span>

            <span v-if="index < normalizedItems.length - 1" class="text-brand-white px-2">
              &gt;
            </span>
          </li>
        </ol>

        <div class="mt-4 flex flex-col items-center gap-2">
          <div class="bg-brand-red h-px w-14 transition-all duration-300 group-hover:w-28"></div>
          <div class="bg-brand-red h-px w-28 transition-all duration-300 group-hover:w-14"></div>
        </div>
      </nav>
    </div>
  </section>
</template>
