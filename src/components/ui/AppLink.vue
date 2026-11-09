<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** Internal route path. */
  to?: string
  /** External URL, mailto: or tel: */
  href?: string
}>()

const isWebLink = computed(() => !!props.href && /^https?:\/\//.test(props.href))
</script>

<template>
  <RouterLink v-if="to" :to="to" class="app-link">
    <slot />
  </RouterLink>
  <a
    v-else
    :href="href"
    class="app-link"
    :target="isWebLink ? '_blank' : undefined"
    :rel="isWebLink ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </a>
</template>

<style scoped>
.app-link {
  position: relative;
  display: inline-block;
}

.app-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-base) var(--ease-out);
}

.app-link:hover::after,
.app-link:focus-visible::after {
  transform: scaleX(1);
}
</style>
