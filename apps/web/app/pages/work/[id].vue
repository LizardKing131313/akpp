<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const caseSlug = computed<string>(() => String(route.params.id ?? '').trim())

const { data: caseData } = await useCaseBySlug(caseSlug)
</script>

<template>
  <CaseItem v-if="caseData" :caseItem="caseData" />
</template>
