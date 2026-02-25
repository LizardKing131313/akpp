<script setup lang="ts">
import { cn } from '#shared/lib/cn'

type Article = {
  title: string
  href: string
  date: string
  image: string
  alt: string
}

interface FooterArticlesProps {
  title?: string
  articles?: Article[]
  showAllHref?: string
  showAllText?: string
}

withDefaults(defineProps<FooterArticlesProps>(), {
  title: 'Полезные статьи',
  articles: () => [
    {
      title: 'Как менять масло в АКПП: полная или частичная замена',
      href: '/',
      date: '27.01.2026',
      image: '/images/articles/article1.png',
      alt: 'Масло',
    },
    {
      title: 'Сброс, калибровка и адаптация АКПП',
      href: '/',
      date: '20.01.2026',
      image: '/images/articles/article2.png',
      alt: 'Сброс',
    },
  ],
  showAllHref: '/',
  showAllText: 'показать все статьи',
})
</script>

<template>
  <div class="md:pl-12">
    <h4 class="text-surface-soft mb-2 text-2xl font-bold">{{ title }}</h4>
    <HorizontalDivider />
    <div class="space-y-0">
      <div
        v-for="article in articles"
        :key="article.title"
        class="border-brand-grey mb-2 flex items-start border-b">
        <NuxtImg
          :src="article.image"
          :alt="article.alt"
          class="mr-2 mb-2 h-16 w-24 rounded object-cover" />
        <div class="mb-2 min-w-0 flex-1">
          <div class="flex items-start justify-between gap-4">
            <NuxtLink
              :to="article.href"
              :class="
                cn(`
                  text-brand-grey-light hover:text-surface-soft
                  line-clamp-2 text-sm transition
                `)
              ">
              {{ article.title }}
            </NuxtLink>
            <Arrow direction="right" double />
          </div>

          <div class="text-brand-grey-light text-xs">
            {{ article.date }}
          </div>
        </div>
      </div>
    </div>

    <div class="text-brand-grey-light text-sm">
      <NuxtLink
        :to="showAllHref"
        :class="
          cn(`
            text-brand-grey-light hover:text-surface-soft
            inline-flex items-center gap-2 transition
          `)
        ">
        {{ showAllText }} <Arrow direction="right" double />
      </NuxtLink>
    </div>
  </div>
</template>
