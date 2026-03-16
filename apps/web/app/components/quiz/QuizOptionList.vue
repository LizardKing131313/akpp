<script setup lang="ts">
type QuizOptionListProps = {
  items: readonly string[]
  emptyText?: string
  fieldName?: string
  fillHeight?: boolean
}

const props = withDefaults(defineProps<QuizOptionListProps>(), {
  emptyText: 'Нет вариантов',
  fieldName: 'quiz_option',
  fillHeight: false,
})

const emit = defineEmits<{
  (eventName: 'select', value: string): void
}>()

const handleSelect = (value: string): void => {
  emit('select', value)
}
</script>

<template>
  <div
    class="scrollbar-thin mt-5 overflow-y-auto [scrollbar-gutter:stable]"
    :class="props.fillHeight ? 'min-h-0 flex-1' : 'max-h-50'">
    <div class="space-y-4">
      <button
        v-for="item in props.items"
        :key="item"
        type="button"
        :data-roistat-field="props.fieldName"
        :data-roistat-value="item"
        class="border-brand-grey-light/20 bg-brand-white hover:border-brand-red group flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-colors"
        @click="handleSelect(item)">
        <span class="text-brand-dark min-w-0 truncate text-sm font-bold">
          {{ item }}
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
