<script setup lang="ts">
type ProductGridItem = {
  id: string
  title: string
  description: string
  price: string
  imageSrc: string
  imageAlt: string
}

interface ProductGridProps {
  title?: string
  items: ProductGridItem[]
}

defineProps<ProductGridProps>()
</script>

<template>
  <section class="w-full">
    <div
      class="grid grid-cols-2 items-stretch gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-16">
      <ShopItem
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :price="item.price"
        :image-src="item.imageSrc"
        :image-alt="item.imageAlt" />
    </div>
  </section>
</template>
