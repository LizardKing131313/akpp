<script setup lang="ts">
import type { ModelVariantItem } from '#shared/types/model'
import type { TransmissionRangeWithVariants } from '#shared/types/transmission'

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
import { computed, h, ref, resolveComponent, watch } from 'vue'

import { useDebouncedRef } from '~/composables/useDebouncedRef'

type GearboxTableProps = {
  rows: TransmissionRangeWithVariants[]
  readonly baseHref?: string

  readonly searchPlaceholder?: string

  readonly pageSizeOptions?: readonly number[]
  readonly defaultPageSize?: number

  readonly showEntriesLabel?: string
  readonly entriesLabel?: string

  readonly emptyText?: string

  readonly previousLabel?: string
  readonly nextLabel?: string

  readonly showingLabel?: string
  readonly toLabel?: string
  readonly ofLabel?: string

  readonly pageLabel?: string
  readonly pageOfLabel?: string
}

const props = withDefaults(defineProps<GearboxTableProps>(), {
  baseHref: '/transmissions',

  searchPlaceholder: 'Search',

  pageSizeOptions: () => [10, 25, 50, 100],
  defaultPageSize: 10,

  showEntriesLabel: 'Show',
  entriesLabel: 'entries',

  emptyText: 'Ничего не найдено',

  previousLabel: 'Previous',
  nextLabel: 'Next',

  showingLabel: 'Showing',
  toLabel: 'to',
  ofLabel: 'of',

  pageLabel: 'Page',
  pageOfLabel: 'of',
})

type TableRow = ModelVariantItem & {
  readonly akpp: string
  readonly href: string
}

const tableRows = computed<TableRow[]>(() => {
  return props.rows.flatMap((rangeItem) => {
    const rangeHref = `${props.baseHref}/${rangeItem.slug}`
    const akppTitle = rangeItem.name ?? rangeItem.slug

    return rangeItem.transmission_range_model_variants.map((relationItem) => {
      return {
        ...relationItem.model_variants_id,
        akpp: akppTitle,
        href: rangeHref,
      }
    })
  }) as TableRow[]
})

const columns: Array<ColumnDef<TableRow>> = [
  {
    accessorKey: 'model',
    header: 'МОДЕЛЬ',
    cell: (info) => info.getValue(),
  },
  {
    id: 'years',
    header: 'ГОДА',
    cell: (info) => {
      const rowOriginal = info.row.original
      return `${rowOriginal.from} - ${rowOriginal.to}`
    },
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
      const rowOriginal = info.row.original
      const cellValue = String(info.getValue() ?? '')
      const NuxtLinkComponent = resolveComponent('NuxtLink')

      return h(
        NuxtLinkComponent,
        {
          to: rowOriginal.href,
          class: 'text-brand-red hover:text-brand-dark font-semibold transition-colors',
        },
        () => cellValue
      )
    },
  },
]

const sortingState = ref<SortingState>([])
const paginationState = ref<PaginationState>({
  pageIndex: 0,
  pageSize: props.defaultPageSize,
})

const searchValue = ref<string>('')
const debouncedSearchValue = useDebouncedRef(searchValue, { delayMs: 400 })

// noinspection JSUnusedGlobalSymbols
const tableInstance = useVueTable({
  get data() {
    return tableRows.value
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
const pagesCount = computed(() => tableInstance.getPageCount())

const pageStartNumber = computed(() => {
  if (totalFilteredRowsCount.value === 0) return 0
  return pageIndex.value * pageSize.value + 1
})

const pageEndNumber = computed(() => {
  if (totalFilteredRowsCount.value === 0) return 0
  return Math.min((pageIndex.value + 1) * pageSize.value, totalFilteredRowsCount.value)
})

const handlePageSizeChange = (event: Event): void => {
  const targetElement = event.target as HTMLSelectElement | null
  const defaultSize = props.pageSizeOptions[0] ?? props.defaultPageSize
  const nextValue = Number(targetElement?.value ?? defaultSize)

  tableInstance.setPageSize(nextValue > 0 ? nextValue : defaultSize)
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
        <span class="select-none">{{ entriesLabel }}</span>
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
        {{ showingLabel }} {{ pageStartNumber }} {{ toLabel }} {{ pageEndNumber }} {{ ofLabel }}
        {{ totalFilteredRowsCount }} {{ entriesLabel }}
      </div>

      <div class="flex items-center gap-3">
        <button
          class="border-brand-soft bg-brand-white text-brand-dark cursor-pointer rounded-md border px-3 py-1.5 disabled:opacity-50"
          type="button"
          :disabled="!tableInstance.getCanPreviousPage()"
          @click="handlePrevClick">
          {{ previousLabel }}
        </button>

        <div class="text-brand-grey-light select-none">
          {{ pageLabel }} {{ pageIndex + 1 }} {{ pageOfLabel }} {{ pagesCount }}
        </div>

        <button
          class="border-brand-soft bg-brand-white text-brand-dark cursor-pointer rounded-md border px-3 py-1.5 disabled:opacity-50"
          type="button"
          :disabled="!tableInstance.getCanNextPage()"
          @click="handleNextClick">
          {{ nextLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
