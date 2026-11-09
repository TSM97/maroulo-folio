<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useEventListener, useMediaQuery, useScrollLock } from '@vueuse/core'
import type { NavLink } from '@/types'

defineProps<{ links: NavLink[] }>()

const open = defineModel<boolean>('open', { default: false })

const route = useRoute()
const toggleButton = ref<HTMLButtonElement | null>(null)
const overlay = ref<HTMLElement | null>(null)
const isDesktop = useMediaQuery('(min-width: 768px)')
const locked = useScrollLock(typeof document !== 'undefined' ? document.body : null)

function close(returnFocus = false) {
  if (!open.value) return
  open.value = false
  if (returnFocus) toggleButton.value?.focus()
}

watch(open, async (isOpen) => {
  locked.value = isOpen
  if (isOpen) {
    await nextTick()
    overlay.value?.querySelector<HTMLElement>('a')?.focus()
  }
})

watch(
  () => route.fullPath,
  () => close(),
)
watch(isDesktop, (desktop) => desktop && close())

/** Focusable, visible elements inside the whole header (brand + toggle + overlay links). */
function focusables(): HTMLElement[] {
  const header = toggleButton.value?.closest('header')
  if (!header) return []
  return Array.from(header.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter(
    (el) => el.getClientRects().length > 0,
  )
}

useEventListener(document, 'keydown', (event: KeyboardEvent) => {
  if (!open.value) return
  if (event.key === 'Escape') {
    close(true)
    return
  }
  if (event.key !== 'Tab') return
  const items = focusables()
  if (items.length === 0) return
  const first = items[0]
  const last = items[items.length - 1]
  const active = document.activeElement
  if (event.shiftKey && active === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
})
</script>

<template>
  <button
    ref="toggleButton"
    type="button"
    class="toggle eyebrow"
    :aria-expanded="open"
    aria-controls="mobile-menu"
    @click="open = !open"
  >
    {{ open ? 'Close' : 'Menu' }}
  </button>

  <Transition name="menu">
    <div v-if="open" id="mobile-menu" ref="overlay" class="overlay">
      <nav aria-label="Mobile">
        <ul>
          <li v-for="(link, index) in links" :key="link.to" :style="{ '--i': index }">
            <RouterLink :to="link.to" class="item display-l" @click="close()">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </Transition>
</template>

<style scoped>
.toggle {
  position: relative;
  z-index: 1;
  padding: var(--space-1) 0;
  background: none;
  border: none;
  color: var(--color-ink);
  cursor: pointer;
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  padding: var(--header-height) var(--gutter) var(--space-6);
  background-color: var(--color-bg);
}

.item {
  display: inline-block;
  padding-block: var(--space-1);
}

.item.router-link-active {
  color: var(--color-accent);
}

.overlay li {
  opacity: 0;
  transform: translateY(12px);
  animation: menu-item var(--dur-slow) var(--ease-out) forwards;
  animation-delay: calc(150ms + var(--i) * 90ms);
}

@keyframes menu-item {
  to {
    opacity: 1;
    transform: none;
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity var(--dur-base) var(--ease-out);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

@media (min-width: 768px) {
  .toggle,
  .overlay {
    display: none;
  }
}
</style>
