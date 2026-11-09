<script setup lang="ts">
// Decorative arrow, inherits the current text color and size.
</script>

<template>
  <svg
    class="arrow"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    stroke-width="1.25"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M3 12h17M14 6l6 6-6 6" />
  </svg>
</template>

<style scoped>
.arrow {
  display: inline-block;
  vertical-align: -0.1em;
  margin-left: 0.35em;
  transition: transform var(--dur-base) var(--ease-out);
}

:global(a:is(:hover, :focus-visible)) .arrow {
  transform: translateX(4px);
}
</style>
