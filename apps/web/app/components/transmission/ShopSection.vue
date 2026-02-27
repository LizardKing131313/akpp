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
    <div class="grid items-stretch gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
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
