<script setup lang="ts">
import {
  type ColumnDef,
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useVueTable,
} from '@tanstack/vue-table'
import { computed, h, ref, watch } from 'vue'

import { useDebouncedRef } from '~/composables/useDebouncedRef'

export type GearboxRow = {
  brand: string
  model: string
  years: string
  engine: string
  drive: string
  akpp: string
  href: string
}

type GearboxTableProps = {
  rows: GearboxRow[]
  searchPlaceholder?: string
  pageSizeOptions?: number[]
  showEntriesLabel?: string
  emptyText?: string
}

const props = withDefaults(defineProps<GearboxTableProps>(), {
  searchPlaceholder: 'Search:',
  pageSizeOptions: () => [10, 25, 50, 100],
  showEntriesLabel: 'Show',
  emptyText: 'Ничего не найдено',
})

const columns: Array<ColumnDef<GearboxRow, unknown>> = [
  {
    accessorKey: 'brand',
    header: 'МАРКА',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'model',
    header: 'МОДЕЛЬ',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'years',
    header: 'ГОДА',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'engine',
    header: 'ДВИГАТЕЛЬ',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'drive',
    header: 'ПРИВОД',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'akpp',
    header: 'АКПП',
    cell: (info) => {
      const row = info.row.original
      const value = String(info.getValue() ?? '')
      const NuxtLinkComponent = resolveComponent('NuxtLink')

      return h(
        NuxtLinkComponent,
        {
          to: row.href,
          class: 'text-brand-red hover:text-brand-dark font-semibold transition-colors',
        },
        () => value
      )
    },
  },
]

const sortingState = ref<SortingState>([])
const paginationState = ref<PaginationState>({ pageIndex: 0, pageSize: 10 })

const searchValue = ref<string>('')
const debouncedSearchValue = useDebouncedRef(searchValue, { delayMs: 400 })

const tableInstance = useVueTable({
  get data() {
    return props.rows
  },
  get columns() {
    return columns
  },
  state: {
    get sorting() {
      return sortingState.value
    },
    get pagination() {
      return paginationState.value
    },
    get globalFilter() {
      return debouncedSearchValue.value
    },
  },
  onSortingChange: (updater) => {
    sortingState.value = typeof updater === 'function' ? updater(sortingState.value) : updater
  },
  onPaginationChange: (updater) => {
    paginationState.value = typeof updater === 'function' ? updater(paginationState.value) : updater
  },
  globalFilterFn: (row, _columnId, filterValue) => {
    const normalizedFilter = String(filterValue ?? '')
      .trim()
      .toLowerCase()
    if (normalizedFilter.length === 0) return true

    const values = Object.values(row.original) as unknown[]
    for (const value of values) {
      if (value === null || value === undefined) continue
      if (String(value).toLowerCase().includes(normalizedFilter)) return true
    }

    return false
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})

watch(
  () => debouncedSearchValue.value,
  () => {
    tableInstance.setPageIndex(0)
  }
)

const totalFilteredRowsCount = computed(() => tableInstance.getFilteredRowModel().rows.length)
const pageIndex = computed(() => tableInstance.getState().pagination.pageIndex)
const pageSize = computed(() => tableInstance.getState().pagination.pageSize)

const pageStartNumber = computed(() => {
  if (totalFilteredRowsCount.value === 0) return 0
  return pageIndex.value * pageSize.value + 1
})

const pageEndNumber = computed(() => {
  if (totalFilteredRowsCount.value === 0) return 0
  return Math.min((pageIndex.value + 1) * pageSize.value, totalFilteredRowsCount.value)
})

type PaginationItem =
  | { kind: 'page'; pageIndex: number; isCurrent: boolean }
  | { kind: 'ellipsis'; key: string }

const buildPaginationItems = (pagesCount: number, currentIndex: number): PaginationItem[] => {
  if (pagesCount <= 1) return [{ kind: 'page', pageIndex: 0, isCurrent: true }]

  const firstIndex = 0
  const lastIndex = pagesCount - 1

  const indicesToShow = new Set<number>([
    firstIndex,
    lastIndex,
    currentIndex,
    Math.max(firstIndex, currentIndex - 1),
    Math.min(lastIndex, currentIndex + 1),
  ])

  const sortedIndices = Array.from(indicesToShow).sort((left, right) => left - right)

  const items: PaginationItem[] = []
  let previousIndex: number | null = null

  for (const index of sortedIndices) {
    if (previousIndex !== null && index - previousIndex > 1) {
      items.push({ kind: 'ellipsis', key: `ellipsis-${previousIndex}-${index}` })
    }

    items.push({ kind: 'page', pageIndex: index, isCurrent: index === currentIndex })
    previousIndex = index
  }

  return items
}

const pagesCount = computed(() => tableInstance.getPageCount())
const paginationItems = computed(() => buildPaginationItems(pagesCount.value, pageIndex.value))

const handlePageSizeChange = (event: Event): void => {
  const targetElement = event.target as HTMLSelectElement | null
  const defaultSize = props.pageSizeOptions[0] ?? 10
  const nextValue = targetElement?.value ? Number(targetElement.value) : defaultSize
  tableInstance.setPageSize(Number.isFinite(nextValue) && nextValue > 0 ? nextValue : defaultSize)
  tableInstance.setPageIndex(0)
}

const handleSearchInput = (event: Event): void => {
  const targetElement = event.target as HTMLInputElement | null
  searchValue.value = targetElement?.value ?? ''
}

const handlePrevClick = (): void => {
  tableInstance.previousPage()
}

const handleNextClick = (): void => {
  tableInstance.nextPage()
}

const handlePageClick = (nextIndex: number): void => {
  tableInstance.setPageIndex(nextIndex)
}

const sortIndicator = (columnId: string): string => {
  const sortedState = tableInstance.getState().sorting
  const entry = sortedState.find((item) => item.id === columnId)
  if (!entry) return ''
  return entry.desc ? '▼' : '▲'
}
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <div class="text-brand-grey flex items-center gap-2 text-sm">
        <span class="select-none">{{ showEntriesLabel }}</span>
        <select
          class="border-brand-soft bg-brand-white text-brand-dark focus:border-brand-red focus:ring-brand-red/30 cursor-pointer rounded-md border px-2 py-1 outline-none focus:ring-2"
          :value="pageSize"
          @change="handlePageSizeChange">
          <option v-for="sizeOption in pageSizeOptions" :key="sizeOption" :value="sizeOption">
            {{ sizeOption }}
          </option>
        </select>
        <span class="select-none">entries</span>
      </div>

      <label class="text-brand-grey flex items-center gap-2 text-sm">
        <span class="select-none">{{ searchPlaceholder }}</span>
        <input
          class="border-brand-soft bg-brand-white text-brand-dark placeholder:text-brand-grey-light focus:border-brand-red focus:ring-brand-red/30 h-9 w-60 rounded-md border px-3 outline-none focus:ring-2"
          :value="searchValue"
          type="search"
          @input="handleSearchInput" />
      </label>
    </div>

    <div class="mt-4 overflow-x-auto">
      <table class="min-w-full border-collapse">
        <thead>
          <tr class="border-brand-soft border-b">
            <th
              v-for="header in tableInstance.getHeaderGroups()[0]?.headers ?? []"
              :key="header.id"
              class="text-brand-dark px-4 py-3 text-left text-xs font-semibold tracking-wide uppercase">
              <button
                v-if="!header.isPlaceholder"
                class="hover:text-brand-grey inline-flex cursor-pointer items-center gap-2 select-none"
                type="button"
                @click="header.column.getToggleSortingHandler()?.($event)">
                <span>
                  <FlexRender
                    :render="header.column.columnDef.header"
                    :props="header.getContext()" />
                </span>
                <span class="text-brand-grey-light text-[11px]">
                  {{ sortIndicator(header.column.id) }}
                </span>
              </button>

              <span v-else>&nbsp;</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="row in tableInstance.getRowModel().rows"
            :key="row.id"
            class="border-brand-soft hover:bg-brand-soft/20 border-b">
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="text-brand-dark px-4 py-3 text-sm">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>

          <tr v-if="tableInstance.getRowModel().rows.length === 0">
            <td
              class="text-brand-grey-light px-4 py-10 text-center text-sm"
              :colspan="tableInstance.getAllLeafColumns().length">
              {{ emptyText }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="text-brand-grey mt-4 flex flex-col items-center gap-4 text-sm sm:flex-row sm:justify-between">
      <div class="select-none">
        Showing {{ pageStartNumber }} to {{ pageEndNumber }} of {{ totalFilteredRowsCount }} entries
      </div>

      <div class="flex items-center gap-2">
        <button
          class="border-brand-soft bg-brand-white text-brand-dark cursor-pointer rounded-md border px-3 py-1.5 disabled:opacity-50"
          type="button"
          :disabled="!tableInstance.getCanPreviousPage()"
          @click="handlePrevClick">
          Previous
        </button>

        <div class="flex items-center gap-1">
          <template
            v-for="item in paginationItems"
            :key="item.kind === 'page' ? item.pageIndex : item.key">
            <button
              v-if="item.kind === 'page'"
              class="min-w-9 cursor-pointer rounded-md border px-3 py-1.5"
              :class="
                item.isCurrent
                  ? 'border-brand-red bg-brand-red text-brand-white'
                  : 'border-brand-soft bg-brand-white text-brand-dark hover:border-brand-grey-light'
              "
              type="button"
              @click="handlePageClick(item.pageIndex)">
              {{ item.pageIndex + 1 }}
            </button>

            <span v-else class="text-brand-grey-light px-2 select-none">...</span>
          </template>
        </div>

        <button
          class="border-brand-soft bg-brand-white text-brand-dark cursor-pointer rounded-md border px-3 py-1.5 disabled:opacity-50"
          type="button"
          :disabled="!tableInstance.getCanNextPage()"
          @click="handleNextClick">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
