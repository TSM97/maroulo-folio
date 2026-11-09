<script setup lang="ts">
import AppLink from '@/components/ui/AppLink.vue'
import { vReveal } from '@/composables/useReveal'
import { site } from '@/data/site'
</script>

<template>
  <section class="cta container">
    <p v-reveal class="display-xl line">{{ site.contactCta }}</p>
    <p v-reveal="150" class="display-l email">
      <AppLink :href="`mailto:${site.email}`">{{ site.email }}</AppLink>
    </p>
  </section>
</template>

<style scoped>
.cta {
  padding-block: var(--space-12) var(--space-8);
}

.line {
  max-width: 16ch;
}

.email {
  margin-top: var(--space-5);
  color: var(--color-accent);
  overflow-wrap: anywhere;
}
</style>
