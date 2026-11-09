<script setup lang="ts">
import { computed } from 'vue'
import ArchImage from '@/components/ui/ArchImage.vue'
import type { ImageAsset, Project } from '@/types'

const props = defineProps<{ project: Project }>()

// Cards share one 4:5 frame so the grid stays even.
const cover = computed<ImageAsset>(() => ({ ...props.project.cover, ratio: '4/5' }))
</script>

<template>
  <RouterLink :to="`/projects/${project.slug}`" class="card hover-zoom">
    <ArchImage :image="cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
    <h3 class="heading">
      <span class="title">{{ project.title }}</span>
    </h3>
    <p class="caption">{{ project.location }} · {{ project.year }}</p>
  </RouterLink>
</template>

<style scoped>
.card {
  display: block;
}

.heading {
  margin-top: var(--space-2);
}

.title {
  position: relative;
  display: inline-block;
}

.title::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-base) var(--ease-out);
}

.card:is(:hover, :focus-visible) .title::after {
  transform: scaleX(1);
}
</style>
