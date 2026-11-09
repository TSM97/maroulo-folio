<script setup lang="ts">
import ProjectCard from '@/components/projects/ProjectCard.vue'
import type { Project } from '@/types'

defineProps<{ projects: Project[] }>()

/** Take leaving cards out of the flow (keeping their box) so the rest can FLIP into place. */
function onBeforeLeave(el: Element) {
  const item = el as HTMLElement
  item.style.top = `${item.offsetTop}px`
  item.style.left = `${item.offsetLeft}px`
  item.style.width = `${item.offsetWidth}px`
  item.style.height = `${item.offsetHeight}px`
}
</script>

<template>
  <TransitionGroup tag="ul" name="project" class="grid" @before-leave="onBeforeLeave">
    <li v-for="project in projects" :key="project.slug" class="item">
      <ProjectCard :project="project" />
    </li>
  </TransitionGroup>
</template>

<style scoped>
.grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8) var(--gutter);
}

.project-move,
.project-enter-active,
.project-leave-active {
  transition:
    transform var(--dur-slow) var(--ease-out),
    opacity var(--dur-base) var(--ease-out);
}

.project-leave-active {
  position: absolute;
}

.project-enter-from,
.project-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
