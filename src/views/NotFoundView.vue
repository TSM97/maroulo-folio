<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePageMeta } from '@/composables/usePageMeta'

const route = useRoute()

usePageMeta({
  title: 'Page not found',
  description: 'This page does not exist.',
  path: () => route.path,
  noindex: true,
})
</script>

<template>
  <main>
    <h1>Not found</h1>
  </main>
</template>
