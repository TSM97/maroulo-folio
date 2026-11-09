<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { gsap } from 'gsap'
import ArchImage from '@/components/ui/ArchImage.vue'
import type { ImageAsset, Project } from '@/types'

defineProps<{ projects: Project[] }>()

// The cursor-following preview is a desktop, mouse-only nicety.
const canPreview = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 768px)')
const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

const preview = ref<HTMLElement | null>(null)
const shown = shallowRef<ImageAsset | null>(null)
const visible = ref(false)

let moveX: ((value: number) => void) | undefined
let moveY: ((value: number) => void) | undefined

onMounted(() => {
  if (!preview.value) return
  gsap.set(preview.value, { yPercent: -50 })
  moveX = gsap.quickTo(preview.value, 'x', { duration: 0.6, ease: 'power3.out' })
  moveY = gsap.quickTo(preview.value, 'y', { duration: 0.6, ease: 'power3.out' })
})

function target(event: PointerEvent): { x: number; y: number } {
  const width = preview.value?.offsetWidth ?? 0
  const x = Math.min(event.clientX + 32, window.innerWidth - width - 16)
  return { x, y: event.clientY }
}

function show(project: Project, event: PointerEvent) {
  if (!canPreview.value || !preview.value) return
  const { x, y } = target(event)
  shown.value = { ...project.cover, ratio: '4/5' }
  if (!visible.value) gsap.set(preview.value, { x, y })
  visible.value = true
}

function move(event: PointerEvent) {
  if (!visible.value || !preview.value) return
  const { x, y } = target(event)
  if (reducedMotion.value) {
    gsap.set(preview.value, { x, y })
  } else {
    moveX?.(x)
    moveY?.(y)
  }
}
</script>

<template>
  <div>
    <ul class="list" @pointermove="move" @pointerleave="visible = false">
      <li class="row head caption" aria-hidden="true">
        <span>No.</span>
        <span>Project</span>
        <span>Category</span>
        <span>Location</span>
        <span class="year">Year</span>
      </li>
      <li v-for="(project, index) in projects" :key="project.slug">
        <RouterLink
          :to="`/projects/${project.slug}`"
          class="row link"
          @pointerenter="show(project, $event)"
        >
          <span class="caption number">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="heading title">{{ project.title }}</span>
          <span class="caption category">{{ project.category }}</span>
          <span class="caption location">{{ project.location }}</span>
          <span class="caption year">{{ project.year }}</span>
        </RouterLink>
      </li>
    </ul>

    <div ref="preview" class="preview" :class="{ visible }" aria-hidden="true">
      <ArchImage v-if="shown" :image="shown" />
    </div>
  </div>
</template>

<style scoped>
.list {
  border-top: 1px solid var(--color-line);
}

.list li {
  border-bottom: 1px solid var(--color-line);
}

.row {
  display: grid;
  grid-template-columns: 2.5rem 1fr auto;
  grid-template-areas:
    'number title year'
    '. meta meta';
  column-gap: var(--space-2);
  align-items: baseline;
  padding-block: var(--space-3);
}

.head {
  display: none;
}

.link {
  transition: opacity var(--dur-base) var(--ease-out);
}

.number {
  grid-area: number;
  font-variant-numeric: tabular-nums;
}

.title {
  grid-area: title;
}

.category,
.location {
  display: none;
}

.year {
  grid-area: year;
  text-align: right;
}

.title {
  transition: transform var(--dur-base) var(--ease-out);
}

.link:is(:hover, :focus-visible) .title {
  transform: translateX(var(--space-1));
}

.preview {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  display: none;
  width: 16rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--dur-base) var(--ease-out);
}

.preview.visible {
  opacity: 1;
}

@media (min-width: 768px) {
  .row {
    grid-template-columns: 4rem 2fr 1.2fr 1.5fr 5rem;
    grid-template-areas: none;
  }

  .head {
    display: grid;
    padding-block: var(--space-2);
  }

  .number,
  .title,
  .year {
    grid-area: auto;
  }

  .category,
  .location {
    display: block;
  }

  /* Dim the other rows while one is hovered or focused. */
  .list:has(.link:is(:hover, :focus-visible)) .link:not(:is(:hover, :focus-visible)) {
    opacity: 0.4;
  }
}

@media (hover: hover) and (pointer: fine) and (min-width: 768px) {
  .preview {
    display: block;
  }
}
</style>
