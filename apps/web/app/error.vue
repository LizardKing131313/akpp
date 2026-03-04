<script setup lang="ts">
const error = useError()

const status = computed<number>(() => {
  return Number(error.value?.status ?? 404)
})

const handleClearError = (): void => {
  void clearError({ redirect: '/' })
}
</script>

<template>
  <div class="bg-brand-white text-brand-dark flex min-h-dvh flex-col overflow-x-hidden text-xl">
    <HeaderSection />
    <Section>
      <div class="mx-auto max-w-6xl items-center justify-center px-6 text-center">
        <div class="space-y-6">
          <h1 class="text-brand-red text-6xl font-bold">
            {{ status }}
          </h1>

          <h2 class="text-2xl font-bold">Страница не найдена</h2>

          <p class="text-brand-grey">Возможно ссылка устарела или страница была удалена</p>

          <button
            type="button"
            class="bg-brand-red text-brand-white hover:bg-brand-red/90 rounded-full px-8 py-3 font-bold"
            @click="handleClearError">
            На главную
          </button>
        </div>
      </div>
    </Section>
    <FooterSection class="mt-auto" />
  </div>
  <ModalHost />
</template>
