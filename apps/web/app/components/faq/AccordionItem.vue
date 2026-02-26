<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { ref } from 'vue'

defineProps<{
  title: string
  content?: string
}>()

const isOpen = ref<boolean>(false)

const toggle = (): void => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="ring-brand-dark/5 rounded-xl bg-white shadow-sm ring-1">
    <button
      type="button"
      :class="
        cn(`
          text-brand-dark hover:text-brand-red flex w-full cursor-pointer
          items-center p-4 text-left text-sm font-medium focus:outline-none
        `)
      "
      @click="toggle">
      <span class="min-w-0 flex-1">
        {{ title }}
      </span>

      <Arrow :direction="isOpen ? 'up' : 'down'" />
    </button>

    <div
      :class="
        cn(
          `grid transition-all duration-200 ease-out`,
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )
      ">
      <div class="overflow-hidden">
        <div class="text-brand-grey px-5 pb-5 text-sm leading-6">
          <div v-if="content" v-html="content" />
        </div>
      </div>
    </div>
  </div>
</template>
