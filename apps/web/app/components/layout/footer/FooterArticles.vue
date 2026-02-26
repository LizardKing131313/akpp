<script setup lang="ts">
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
  <div class="text-brand-grey-light space-y-12">
    <FooterTitle>{{ title }}</FooterTitle>
    <div>
      <div
        v-for="article in articles"
        :key="article.title"
        class="border-b-brand-grey-light flex items-start border-b">
        <NuxtLink :to="article.href" class="group hover:text-brand-white block w-full py-4">
          <div class="flex items-start gap-4">
            <div class="h-16 w-20 shrink-0 overflow-hidden rounded-xl">
              <NuxtImg
                :src="article.image"
                :alt="article.alt"
                sizes="80px"
                class="h-full w-full object-cover" />
            </div>

            <div class="space-y-4">
              <p class="leading-snug font-bold">
                {{ article.title }}
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

      <GoToLink :href="showAllHref" class="mt-8">{{ showAllText }}</GoToLink>
    </div>
  </div>
</template>
