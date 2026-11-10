<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useEventListener, useSwipe } from '@vueuse/core'
import ArchImage from '@/components/ui/ArchImage.vue'
import type { ImageAsset } from '@/types'

const props = defineProps<{
  open: boolean
  image: ImageAsset | undefined
  /** Zero-based position of the current image. */
  index: number
  count: number
}>()

const emit = defineEmits<{ close: []; next: []; prev: [] }>()

const dialog = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)

/** Width cap so the image always fits the viewport, whatever its ratio. */
const frameWidth = computed(() => {
  const [w, h] = (props.image?.ratio ?? '3/2').split('/').map(Number)
  return `min(100%, calc((100vh - 10rem) * ${w / h}))`
})

watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) return
    await nextTick()
    closeButton.value?.focus()
  },
)

function focusables(): HTMLElement[] {
  return Array.from(dialog.value?.querySelectorAll<HTMLElement>('button:not([disabled])') ?? [])
}

useEventListener(document, 'keydown', (event: KeyboardEvent) => {
  if (!props.open) return
  if (event.key === 'Escape') emit('close')
  else if (event.key === 'ArrowRight') emit('next')
  else if (event.key === 'ArrowLeft') emit('prev')
  else if (event.key === 'Tab') {
    const items = focusables()
    if (items.length === 0) return
    const first = items[0]
    const last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
})

useSwipe(stage, {
  threshold: 50,
  passive: true,
  onSwipeEnd(_event, direction) {
    if (direction === 'left') emit('next')
    else if (direction === 'right') emit('prev')
  },
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="open && image"
        ref="dialog"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
      >
        <header class="bar">
          <p class="counter eyebrow" aria-live="polite">{{ index + 1 }} / {{ count }}</p>
          <button ref="closeButton" type="button" class="control eyebrow" @click="emit('close')">
            Close
          </button>
        </header>

        <div ref="stage" class="stage" @click.self="emit('close')">
          <div class="frame" :style="{ width: frameWidth }">
            <ArchImage :key="index" :image="image" sizes="100vw" eager />
          </div>
        </div>

        <nav v-if="count > 1" class="nav" aria-label="Image navigation">
          <button type="button" class="control eyebrow" @click="emit('prev')">Previous</button>
          <button type="button" class="control eyebrow" @click="emit('next')">Next</button>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: var(--color-ink);
  color: var(--color-bg);
}

.bar,
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--gutter);
}

.stage {
  display: grid;
  place-items: center;
  min-height: 0;
  padding-inline: var(--gutter);
  touch-action: pan-y;
}

.frame {
  max-width: 100%;
}

.lightbox :deep(.caption),
.lightbox .eyebrow {
  color: var(--color-bg);
  opacity: 0.7;
}

.control {
  padding: var(--space-1) 0;
  background: none;
  border: 0;
  cursor: pointer;
  transition: opacity var(--dur-fast) var(--ease-out);
}

.lightbox .control:is(:hover, :focus-visible) {
  opacity: 1;
}

.control:focus-visible {
  outline: 2px solid var(--color-bg);
  outline-offset: 4px;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity var(--dur-base) var(--ease-out);
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
