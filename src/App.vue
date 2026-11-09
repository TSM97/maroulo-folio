<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import PageTransition from '@/components/layout/PageTransition.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import { site } from '@/data/site'

const route = useRoute()

useHead({
  titleTemplate: (title) => (title ? `${title} — ${site.name}` : site.name),
})
</script>

<template>
  <a href="#main" class="skip-link">Skip to content</a>
  <SiteHeader />
  <div id="main" tabindex="-1" class="content" :class="{ offset: route.name !== 'home' }">
    <PageTransition />
  </div>
  <SiteFooter />
</template>

<style scoped>
.skip-link {
  position: fixed;
  top: var(--space-1);
  left: var(--space-1);
  z-index: 200;
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-ink);
  color: var(--color-bg);
  transform: translateY(-200%);
}

.skip-link:focus {
  transform: none;
}

.content {
  min-height: 60vh;
  outline: none;
}

.content.offset {
  padding-top: var(--header-height);
}
</style>
