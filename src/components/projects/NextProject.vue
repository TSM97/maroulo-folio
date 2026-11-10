<script setup lang="ts">
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import ArchImage from '@/components/ui/ArchImage.vue'
import ArrowIcon from '@/components/ui/ArrowIcon.vue'
import type { ImageAsset, Project } from '@/types'

const props = defineProps<{ project: Project }>()

const isDesktop = useMediaQuery('(min-width: 768px)')
const cover = computed<ImageAsset>(() => ({
  ...props.project.cover,
  ratio: isDesktop.value ? '21/9' : '3/2',
}))
</script>

<template>
  <section class="next" aria-labelledby="next-heading">
    <RouterLink :to="`/projects/${project.slug}`" class="link hover-zoom" data-cursor="View">
      <div class="container">
        <p class="eyebrow">Next project</p>
        <h2 id="next-heading" class="display-xl title">
          <span class="text">{{ project.title }}</span>
          <ArrowIcon />
        </h2>
        <p class="caption meta">{{ project.category }} · {{ project.location }}</p>
      </div>
      <ArchImage :image="cover" sizes="100vw" />
    </RouterLink>
  </section>
</template>

<style scoped>
.next {
  margin-top: var(--space-12);
  border-top: 1px solid var(--color-line);
}

.link {
  display: block;
  padding-block: var(--space-8) 0;
}

.title {
  margin-top: var(--space-2);
}

.text {
  position: relative;
}

.text::after {
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

.link:is(:hover, :focus-visible) .text::after {
  transform: scaleX(1);
}

.meta {
  margin-block: var(--space-2) var(--space-6);
}
</style>
