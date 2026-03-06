<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    articles?: ArticleItem[]
    showAllHref?: string
    showAllText?: string
  }>(),
  {
    title: 'Полезные статьи',
    articles: () => [],
    showAllHref: '/articles',
    showAllText: 'показать все статьи',
  }
)
</script>

<template>
  <div class="text-brand-grey-light space-y-12">
    <FooterTitle>{{ title }}</FooterTitle>
    <div>
      <div
        v-for="article in articles"
        :key="article.id"
        class="border-b-brand-grey-light flex items-start border-b">
        <NuxtLink :to="article.slug" class="group hover:text-brand-white block w-full py-4">
          <div class="flex items-start gap-4">
            <div class="h-16 w-20 shrink-0 overflow-hidden rounded-xl">
              <NuxtImg
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

      <GoToLink :href="showAllHref" class="mt-8">{{ showAllText }}</GoToLink>
    </div>
  </div>
</template>
