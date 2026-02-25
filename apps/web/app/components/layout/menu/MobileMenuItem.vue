<script setup lang="ts">
import type { MenuNode } from '#shared/types/layout/menu/menu'

import { cn } from '#shared/lib/cn'
import { computed } from 'vue'

const buttonClass = cn(`
  text-brand-dark flex w-full items-center justify-between py-4
  text-left text-sm font-semibold tracking-wide uppercase
`)

const props = defineProps<{ entry: MenuNode }>()

const emit = defineEmits<{
  (event: 'navigate', entry: MenuNode): void
  (event: 'select', entry: MenuNode): void
}>()

const hasChildren = computed<boolean>(() => props.entry.hasChildren())

const navigate = (): void => {
  emit('navigate', props.entry)
}

const select = (): void => {
  emit('select', props.entry)
}
</script>

<template>
  <div class="px-4">
    <button
      v-if="hasChildren"
      :class="buttonClass"
      type="button"
      :aria-label="`Открыть раздел ${entry.title}`"
      @click="navigate">
      <span>{{ entry.title }}</span>
      <Arrow direction="down" />
    </button>

    <NuxtLink v-else-if="entry.href" :to="entry.href" :class="buttonClass" @click="select">
      <span>{{ entry.title }}</span>
    </NuxtLink>

    <button
      v-else
      :class="buttonClass"
      type="button"
      :aria-label="`Выбрать пункт ${entry.title}`"
      @click="select">
      <span>{{ entry.title }}</span>
    </button>
  </div>
</template>
