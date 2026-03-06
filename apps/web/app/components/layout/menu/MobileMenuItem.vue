<script setup lang="ts">
import { cn } from '#shared/lib/cn'
import { computed } from 'vue'

const buttonClass = cn(`
  text-brand-dark flex w-full items-center justify-between py-4
  text-left text-sm font-semibold tracking-wide uppercase
`)

const props = defineProps<{ entry: MenuItem }>()

const emit = defineEmits<{
  (event: 'navigate', entry: MenuItem): void
  (event: 'select', entry: MenuItem): void
}>()

const hasChildren = computed<boolean>(() => props.entry.children != null)

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
      :aria-label="`Открыть раздел ${entry.name}`"
      @click="navigate">
      <span>{{ entry.name }}</span>
      <Arrow direction="down" />
    </button>

    <NuxtLink v-else-if="entry.slug" :to="entry.slug" :class="buttonClass" @click="select">
      <span>{{ entry.name }}</span>
    </NuxtLink>

    <button
      v-else
      :class="buttonClass"
      type="button"
      :aria-label="`Выбрать пункт ${entry.name}`"
      @click="select">
      <span>{{ entry.name }}</span>
    </button>
  </div>
</template>
