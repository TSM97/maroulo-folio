<script setup lang="ts">
import { ref } from 'vue'
import { site } from '@/data/site'
import { hasSeenIntro, markIntroSeen } from '@/composables/useIntroSeen'

// First visit of the session only; skipped under reduced motion or when switched off.
const active = ref(
  site.effects.intro &&
    !hasSeenIntro() &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
)

if (active.value) markIntroSeen()

function done(event: AnimationEvent) {
  if (event.animationName.includes('intro-out')) active.value = false
}
</script>

<template>
  <div v-if="active" class="intro-loader" aria-hidden="true" @animationend="done">
    <span class="name">{{ site.name }}</span>
  </div>
</template>

<style scoped>
/* Total 1.3s: the name fades in, then the overlay fades out. Fixed, so no layout shift. */
.intro-loader {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: grid;
  place-items: center;
  background-color: var(--color-bg);
  pointer-events: none;
  animation: intro-out 400ms var(--ease-out) 900ms forwards;
}

.name {
  font-family: var(--font-display);
  font-size: var(--step-4);
  letter-spacing: 0.04em;
  animation: intro-name 700ms var(--ease-out) both;
}

@keyframes intro-name {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes intro-out {
  to {
    opacity: 0;
  }
}
</style>
