<script setup lang="ts">
defineProps<{
  brandTitle: string
  problems: readonly string[]
}>()

const emit = defineEmits<{
  (event: 'select', payload: { problemTitle: string }): void
}>()

const handleSelect = (problemTitle: string): void => {
  emit('select', { problemTitle })
}
</script>

<template>
  <div class="w-full">
    <QuizStepTitle title="Что случилось?">
      Автомобиль:
      <span
        class="bg-brand-red text-brand-white ml-2 inline-flex items-center rounded-md px-2 py-1 text-sm font-bold">
        {{ brandTitle }}
      </span>
    </QuizStepTitle>

    <QuizOptionList :items="problems" @select="handleSelect" />
  </div>
</template>
