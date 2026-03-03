import { onBeforeUnmount, ref, type Ref, watch } from 'vue'

type DebouncedRefOptions = {
  delayMs?: number
}

export const useDebouncedRef = <ValueType>(
  sourceRef: Ref<ValueType>,
  options: DebouncedRefOptions = {}
): Ref<ValueType> => {
  const delayMs = options.delayMs ?? 400
  const debouncedRef = ref<ValueType>(sourceRef.value) as Ref<ValueType>

  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const clearTimer = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  watch(
    sourceRef,
    (nextValue) => {
      clearTimer()
      timeoutId = setTimeout(() => {
        debouncedRef.value = nextValue
      }, delayMs)
    },
    { immediate: true }
  )

  onBeforeUnmount(() => {
    clearTimer()
  })

  return debouncedRef
}
