<script setup lang="ts">
defineProps<{ title: string; eyebrow?: string }>()
</script>

<template>
  <div class="section-title">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 class="display-l">{{ title }}</h2>
  </div>
</template>

<style scoped>
.eyebrow {
  margin-bottom: var(--space-2);
}
</style>
