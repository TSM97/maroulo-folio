<script setup lang="ts">
// Wraps <RouterView> in a soft fade + small upward slide.
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
</template>

<style scoped>
.page-enter-active {
  transition:
    opacity var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}

.page-leave-active {
  transition: opacity var(--dur-fast) var(--ease-out);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
}
</style>
