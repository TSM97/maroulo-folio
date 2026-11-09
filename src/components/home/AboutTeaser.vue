<script setup lang="ts">
import AppLink from '@/components/ui/AppLink.vue'
import ArchImage from '@/components/ui/ArchImage.vue'
import ArrowIcon from '@/components/ui/ArrowIcon.vue'
import { vReveal } from '@/composables/useReveal'
import { about } from '@/data/about'
import type { ImageAsset } from '@/types'

const portrait: ImageAsset = { ...about.portrait, ratio: '4/5' }
</script>

<template>
  <section class="teaser container">
    <div class="grid-12">
      <div v-reveal class="portrait">
        <ArchImage :image="portrait" sizes="(min-width: 768px) 40vw, 100vw" />
      </div>
      <div v-reveal="150" class="text stack">
        <p class="eyebrow">About</p>
        <p class="display-l">{{ about.teaser }}</p>
        <p class="body">
          <AppLink to="/about">More about me <ArrowIcon /></AppLink>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.teaser {
  padding-block: var(--space-12);
}

.grid-12 {
  row-gap: var(--space-6);
  align-items: center;
}

.portrait,
.text {
  grid-column: 1 / -1;
}

@media (min-width: 768px) {
  .portrait {
    grid-column: 1 / span 5;
  }

  .text {
    grid-column: 7 / span 5;
  }
}
</style>
