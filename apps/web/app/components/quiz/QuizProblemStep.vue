<script setup lang="ts">
withDefaults(
  defineProps<{
    readonly brandTitle: string
    readonly problems: readonly string[]
    readonly title?: string
    readonly brandLabel?: string
    readonly emptyText?: string
  }>(),
  {
    title: 'Что случилось?',
    brandLabel: 'Автомобиль:',
    emptyText: 'Нет вариантов',
  }
)

const emit = defineEmits<{
  (event: 'select', payload: { problemTitle: string }): void
}>()

const handleSelect = (problemTitle: string): void => {
  emit('select', { problemTitle })
}
</script>

<template>
  <div class="w-full">
    <QuizStepTitle :title="title">
      {{ brandLabel }}
      <span
        class="bg-brand-red text-brand-white ml-2 inline-flex items-center rounded-md px-2 py-1 text-sm font-bold">
        {{ brandTitle }}
      </span>
    </QuizStepTitle>

    <QuizOptionList :items="problems" :empty-text="emptyText" @select="handleSelect" />
  </div>
</template>
