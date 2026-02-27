<script setup lang="ts">
type QuizOptionListProps = {
  items: readonly string[]
  emptyText?: string
}

const props = withDefaults(defineProps<QuizOptionListProps>(), {
  emptyText: 'Нет вариантов',
})

const emit = defineEmits<{
  (eventName: 'select', value: string): void
}>()

const handleSelect = (value: string): void => {
  emit('select', value)
}
</script>

<template>
  <div class="scrollbar-thin mt-5 max-h-50 overflow-y-auto">
    <div class="space-y-4">
      <button
        v-for="item in props.items"
        :key="item"
        type="button"
        class="border-brand-grey-light/20 bg-brand-white hover:border-brand-red group flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-colors"
        @click="handleSelect(item)">
        <span class="flex items-center gap-4">
          <span
            class="bg-brand-soft/40 group-hover:bg-brand-red flex h-5 w-5 items-center justify-center rounded-full">
            <span class="bg-brand-grey-light h-2 w-2 rounded-full" />
          </span>

          <span class="text-brand-dark text-sm font-bold">
            {{ item }}
          </span>
        </span>

        <Arrow
          direction="right"
          class="text-brand-dark group-hover:text-brand-red"
          aria-hidden="true" />
      </button>

      <div v-if="props.items.length === 0" class="text-brand-dark mt-5">
        {{ props.emptyText }}
      </div>
    </div>
  </div>
</template>
