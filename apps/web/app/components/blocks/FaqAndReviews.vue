<script setup lang="ts"></script>
<template>
  <CenteredTitle> Полезная информация </CenteredTitle>

  <TwoColumns>
    <div>
      <slot />
    </div>

    <ClientOnly>
      <YandexReviews orgId="241461095271" :height="560" />
    </ClientOnly>
  </TwoColumns>
</template>
