<script setup lang="ts">
import type { ArticleItem } from '#shared/types/article'

import { normalizeAppPath } from '#shared/lib/route'
import { computed } from 'vue'

import { useFooterUiSettings } from '~/composables/useFooterUiSettings'
import { useArticles } from '~/composables/useRepoApi'

const settings = useFooterUiSettings()
const { data: articlesData } = useArticles()
const articles = computed<ArticleItem[]>(() => articlesData.value ?? [])
</script>

<template>
  <div class="text-brand-grey-light space-y-12">
    <FooterTitle>{{ settings.articles }}</FooterTitle>
    <div>
      <div
        v-for="article in articles"
        :key="article.id"
        class="border-b-brand-grey-light flex items-start border-b">
        <NuxtLink
          :to="normalizeAppPath(article.slug)"
          :aria-label="`${settings.article_link_aria_label_prefix} ${article.name}`"
          class="group hover:text-brand-white block w-full py-4">
          <div class="flex items-start gap-4">
            <div class="h-16 w-20 shrink-0 overflow-hidden rounded-xl">
              <CmsImage
                :src="article.image_source"
                :alt="article.image_alt"
                sizes="80px"
                class="h-full w-full object-cover" />
            </div>

            <div class="space-y-4">
              <p class="leading-snug font-bold">
                {{ article.name }}
              </p>

              <p class="text-xs">
                {{ article.date }}
              </p>
            </div>

            <Arrow
              direction="right"
              double
              class="ml-auto transition-transform group-hover:translate-x-0.5" />
          </div>
        </NuxtLink>
      </div>

      <GoToLink
        :href="settings.show_all_articles_href"
        :ariaLabel="settings.show_all_articles_aria_label"
        class="mt-8">
        {{ settings.show_all_articles }}
      </GoToLink>
    </div>
  </div>
</template>
