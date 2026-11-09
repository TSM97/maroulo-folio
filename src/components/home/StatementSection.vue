<script setup lang="ts">
import { computed } from 'vue'
import { vReveal } from '@/composables/useReveal'
import { site } from '@/data/site'

const words = computed(() => site.statement.split(' '))
</script>

<template>
  <section class="statement container">
    <div class="grid-12">
      <p v-reveal.children class="display-l text">
        <span class="sr-only">{{ site.statement }}</span>
        <span aria-hidden="true">
          <span v-for="(word, index) in words" :key="index" class="word" :style="{ '--i': index }">
            {{ word }}
          </span>
        </span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.statement {
  padding-block: var(--space-12);
}

.text {
  grid-column: 1 / -1;
}

.word {
  display: inline-block;
  margin-right: 0.25em;
  transition:
    opacity var(--dur-slow) var(--ease-out),
    transform var(--dur-slow) var(--ease-out);
  transition-delay: min(calc(var(--i) * 35ms), 800ms);
}

[data-reveal='pending'] .word {
  opacity: 0;
  transform: translateY(0.4em);
}

@media (min-width: 768px) {
  .text {
    grid-column: 4 / span 8;
  }
}
</style>
