<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { gsap } from 'gsap'
import { site } from '@/data/site'

// Fine pointers only, and never under reduced motion.
const enabled = useMediaQuery(
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
)

const el = ref<HTMLElement | null>(null)
const label = ref('')
const shown = ref(false)
let moveX: ((value: number) => void) | undefined
let moveY: ((value: number) => void) | undefined

function onMove(event: PointerEvent) {
  if (!el.value) return
  if (!shown.value) {
    gsap.set(el.value, { x: event.clientX, y: event.clientY })
    shown.value = true
  }
  moveX?.(event.clientX)
  moveY?.(event.clientY)
  const target = event.target instanceof Element ? event.target.closest('[data-cursor]') : null
  label.value = target?.getAttribute('data-cursor') ?? ''
}

function onLeave() {
  shown.value = false
  label.value = ''
}

onMounted(() => {
  if (!site.effects.customCursor) return
  window.addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
})

// The element only exists once the media query matches, so set up tweens when it appears.
watch(el, (node) => {
  if (!node || moveX) return
  moveX = gsap.quickTo(node, 'x', { duration: 0.4, ease: 'power3.out' })
  moveY = gsap.quickTo(node, 'y', { duration: 0.4, ease: 'power3.out' })
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove)
  document.documentElement.removeEventListener('pointerleave', onLeave)
})
</script>

<template>
  <div
    v-if="enabled && site.effects.customCursor"
    ref="el"
    class="cursor"
    :class="{ shown, active: label }"
    aria-hidden="true"
  >
    <span class="dot"
      ><span class="label">{{ label }}</span></span
    >
  </div>
</template>

<style scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 250;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--dur-fast) var(--ease-out);
}

.cursor.shown {
  opacity: 1;
}

.dot {
  display: grid;
  place-items: center;
  width: 12px;
  height: 12px;
  margin: -6px 0 0 -6px;
  border-radius: 50%;
  background-color: var(--color-ink);
  transition:
    width var(--dur-base) var(--ease-out),
    height var(--dur-base) var(--ease-out),
    margin var(--dur-base) var(--ease-out),
    background-color var(--dur-base) var(--ease-out);
}

.cursor.active .dot {
  width: 72px;
  height: 72px;
  margin: -36px 0 0 -36px;
  background-color: var(--color-bg);
  box-shadow: inset 0 0 0 1px var(--color-ink);
}

.label {
  font-size: var(--step--1);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-ink);
  opacity: 0;
  transition: opacity var(--dur-fast) var(--ease-out);
}

.cursor.active .label {
  opacity: 1;
}
</style>
