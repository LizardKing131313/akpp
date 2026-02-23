<script setup lang="ts">
type Block = {
  id: number
  name: string
  sort: number | null
  content: unknown
}

type PageBlockLink = {
  id: number
  sort: number | null
  blocks_id: Block
}

type Page = {
  id: number
  title: string
  slug: string
  blocks_on_pages: PageBlockLink[]
}

const config = useRuntimeConfig()

const { data, error } = await useFetch<{ data: Page[] }>(
  `${config.public.directusUrl}/items/pages?filter[slug][_eq]=home&deep[blocks_on_pages][*]=*&fields=*,blocks_on_pages.*,blocks_on_pages.blocks_id.*`,
  {
    headers: {
      Authorization: `Bearer ${config.directusSecret}`,
    },
  }
)

const page = computed(() => data.value?.data?.[0])

const blocks = computed(() => {
  const links = page.value?.blocks_on_pages ?? []
  return [...links]
    .sort((left, right) => {
      const leftSort = left.sort ?? left.blocks_id.sort ?? 0
      const rightSort = right.sort ?? right.blocks_id.sort ?? 0
      return leftSort - rightSort
    })
    .map((link) => link.blocks_id)
})
</script>

<template>
  <div class="p-10">
    <h1 class="text-4xl font-bold">{{ page?.title }}</h1>

    <div class="mt-8 space-y-6">
      <section v-for="block in blocks" :key="block.id" class="rounded-xl border p-6">
        <div class="text-xl font-semibold">
          {{ block.name }}
        </div>

        <pre class="mt-3 text-sm">{{ block.content }}</pre>
      </section>
    </div>

    <pre v-if="error" class="mt-6">{{ error }}</pre>
  </div>
</template>
