<template>
  <div class="bg-brand-white text-brand-dark flex min-h-dvh flex-col overflow-x-hidden text-xl">
    <HeaderSection />
    <Section>
      <NuxtPage />
    </Section>
    <FooterSection class="mt-auto" />
  </div>
  <ModalHost />
</template>
