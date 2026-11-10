import { computed, ref, watch, type Ref } from 'vue'
import { useScrollLock } from '@vueuse/core'
import type { ImageAsset } from '@/types'

/**
 * State for a full-screen image viewer. Navigation wraps around.
 * Locks page scroll while open and returns focus to the opener on close.
 */
export function useLightbox(images: Ref<ImageAsset[]>) {
  const isOpen = ref(false)
  const index = ref(0)
  const locked = useScrollLock(typeof document !== 'undefined' ? document.body : null)
  let opener: HTMLElement | null = null

  const current = computed<ImageAsset | undefined>(() => images.value[index.value])
  const count = computed(() => images.value.length)

  function open(at: number) {
    if (images.value.length === 0) return
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    index.value = Math.min(Math.max(at, 0), images.value.length - 1)
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    opener?.focus()
    opener = null
  }

  function next() {
    index.value = (index.value + 1) % images.value.length
  }

  function prev() {
    index.value = (index.value - 1 + images.value.length) % images.value.length
  }

  watch(isOpen, (value) => {
    locked.value = value
  })

  return { isOpen, index, current, count, open, close, next, prev }
}
