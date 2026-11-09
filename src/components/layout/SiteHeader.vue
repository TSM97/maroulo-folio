<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useScroll } from '@vueuse/core'
import MobileMenu from '@/components/layout/MobileMenu.vue'
import { site } from '@/data/site'

const HIDE_AFTER = 120

const route = useRoute()
const menuOpen = ref(false)
const hidden = ref(false)
const solid = ref(false)

const { y } = useScroll(typeof window !== 'undefined' ? window : null)

function updateSolid() {
  solid.value = route.name !== 'home' || y.value > 8
}

watch(
  y,
  (current, previous) => {
    updateSolid()
    if (menuOpen.value) return
    hidden.value = current > previous && current > HIDE_AFTER
  },
  { flush: 'sync' },
)

watch(
  () => route.fullPath,
  () => {
    hidden.value = false
    updateSolid()
  },
  { immediate: true },
)
</script>

<template>
  <header class="site-header" :class="{ solid, hidden: hidden && !menuOpen, open: menuOpen }">
    <div class="container bar">
      <RouterLink to="/" class="brand">{{ site.name }}</RouterLink>

      <nav class="desktop-nav" aria-label="Primary">
        <ul>
          <li v-for="link in site.nav" :key="link.to">
            <RouterLink :to="link.to" class="nav-link">{{ link.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <MobileMenu v-model:open="menuOpen" :links="site.nav" />
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  height: var(--header-height);
  border-bottom: 1px solid transparent;
  transition:
    transform var(--dur-base) var(--ease-out),
    background-color var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out);
}

.site-header.solid {
  background-color: var(--color-bg);
  border-bottom-color: var(--color-line);
}

.site-header.open {
  background-color: transparent;
  border-bottom-color: transparent;
}

/* Never `transform: translateY(0)` while visible: it would trap the fixed menu overlay. */
.site-header.hidden {
  transform: translateY(-100%);
}

.site-header.hidden:focus-within {
  transform: none;
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.brand {
  position: relative;
  z-index: 1;
  font-family: var(--font-display);
  font-size: var(--step-2);
  font-weight: 500;
  letter-spacing: -0.005em;
}

.desktop-nav {
  display: none;
}

.desktop-nav ul {
  display: flex;
  gap: var(--space-5);
}

.nav-link {
  position: relative;
  display: inline-block;
  padding-block: var(--space-1);
  font-size: var(--step--1);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-base) var(--ease-out);
}

.nav-link.router-link-active::after,
.nav-link:hover::after {
  transform: scaleX(1);
}

@media (min-width: 768px) {
  .desktop-nav {
    display: block;
  }
}
</style>
