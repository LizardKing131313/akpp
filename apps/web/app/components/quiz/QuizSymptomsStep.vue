<script setup lang="ts">
withDefaults(
  defineProps<{
    readonly problemTitle: string
    readonly symptoms: readonly string[]
    readonly title?: string
    readonly problemLabel?: string
    readonly emptyText?: string
  }>(),
  {
    title: 'Уточните симптомы',
    problemLabel: 'Проблема:',
    emptyText: 'Нет вариантов',
  }
)

const emit = defineEmits<{
  (event: 'select', payload: { symptomTitle: string }): void
}>()

const handleSelect = (symptomTitle: string): void => {
  emit('select', { symptomTitle })
}
</script>

<template>
  <div class="w-full">
    <QuizStepTitle :title="title">
      {{ problemLabel }}
      <span class="text-brand-dark ml-2 font-semibold">{{ problemTitle }}</span>
    </QuizStepTitle>

    <QuizOptionList :items="symptoms" :empty-text="emptyText" @select="handleSelect" />
  </div>
</template>
