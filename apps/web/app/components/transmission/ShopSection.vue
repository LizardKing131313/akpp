<script setup lang="ts">
defineProps<{ items: TransmissionItem[] }>()
</script>

<template>
  <section class="w-full">
    <div
      class="grid grid-cols-2 items-stretch gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-16">
      <ShopItem v-for="item in items" :key="item.id" :transmissionItem="item" />
    </div>
  </section>
</template>
