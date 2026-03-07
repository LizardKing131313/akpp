<script setup lang="ts">
definePageMeta({
  pageHeader: {
    kind: 'breadcrumbs',
    breadcrumb: 'Определить АКПП',
    breadcrumbs: [
      { name: 'Главная', slug: '/' },
      { name: 'Определить АКПП', slug: '/opredelit-akpp' },
    ],
  },
})
</script>

<template>
  <TransmissionTable />
</template>
