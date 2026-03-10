<script setup lang="ts">
import { PAGE_LABELS } from '#shared/constants/page-labels'
import { computed } from 'vue'

const pageTitle = computed<string>(() => PAGE_LABELS.determineTransmission)
const pageContent = computed<string>(() => pageTitle.value)
</script>

<template>
  <SimpleContentPage :title="pageTitle" :content="pageContent" :show-heading="false" />
</template>
