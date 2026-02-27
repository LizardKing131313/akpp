<script setup lang="ts">
defineProps<{
  problemTitle: string
  symptoms: readonly string[]
}>()

const emit = defineEmits<{
  (event: 'select', payload: { symptomTitle: string }): void
}>()

const handleSelect = (symptomTitle: string): void => {
  emit('select', { symptomTitle })
}
</script>

<template>
  <div class="w-full">
    <QuizStepTitle title="Уточните симптомы">
      Проблема:
      <span class="text-brand-dark ml-2 font-semibold">{{ problemTitle }}</span>
    </QuizStepTitle>

    <QuizOptionList :items="symptoms" @select="handleSelect" />
  </div>
</template>
