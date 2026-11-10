<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'
import Lightbox from '@/components/projects/Lightbox.vue'
import NextProject from '@/components/projects/NextProject.vue'
import ProjectFacts from '@/components/projects/ProjectFacts.vue'
import ProjectGallery from '@/components/projects/ProjectGallery.vue'
import ArchImage from '@/components/ui/ArchImage.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { useLightbox } from '@/composables/useLightbox'
import { useProjects } from '@/composables/useProjects'
import { vReveal } from '@/composables/useReveal'
import type { ImageAsset, Project } from '@/types'

const route = useRoute()
const { getBySlug, getNext } = useProjects()

// The router guard sends unknown slugs to the 404 view, so this always resolves.
const project = computed<Project>(() => getBySlug(String(route.params.slug)) as Project)
const next = computed(() => getNext(project.value.slug))

const isDesktop = useMediaQuery('(min-width: 768px)')
const cover = computed<ImageAsset>(() => ({
  ...project.value.cover,
  ratio: isDesktop.value ? '21/9' : '4/5',
}))

// Cover is image 0 in the viewer; the gallery follows.
const viewerImages = computed<ImageAsset[]>(() => [project.value.cover, ...project.value.gallery])
const lightbox = useLightbox(viewerImages)

usePageMeta({
  title: () => project.value.title,
  description: () => project.value.summary,
  path: () => `/projects/${project.value.slug}`,
  image: () => project.value.cover.src,
  type: 'article',
})
</script>

<template>
  <main class="project">
    <header class="intro container">
      <p class="eyebrow">{{ project.category }}</p>
      <h1 class="display-xl">{{ project.title }}</h1>
      <p v-if="project.subtitle" class="heading subtitle">{{ project.subtitle }}</p>
    </header>

    <div class="cover container">
      <div class="hover-zoom cover-frame" data-cursor="View">
        <ArchImage :image="cover" sizes="100vw" eager />
        <button
          type="button"
          class="open"
          aria-label="View cover image larger"
          @click="lightbox.open(0)"
        />
      </div>
    </div>

    <section class="details container" aria-label="About this project">
      <div class="grid-12">
        <div v-reveal class="facts">
          <ProjectFacts :project="project" />
        </div>
        <div v-reveal="150" class="description stack">
          <p v-for="(paragraph, i) in project.description" :key="i" class="body">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </section>

    <section class="gallery container" aria-label="Gallery">
      <ProjectGallery :images="project.gallery" @open="(i) => lightbox.open(i + 1)" />
    </section>

    <NextProject v-if="next" :project="next" />

    <Lightbox
      :open="lightbox.isOpen.value"
      :image="lightbox.current.value"
      :index="lightbox.index.value"
      :count="lightbox.count.value"
      @close="lightbox.close"
      @next="lightbox.next"
      @prev="lightbox.prev"
    />
  </main>
</template>

<style scoped>
.intro {
  padding-block: var(--space-8) var(--space-6);
}

.subtitle {
  margin-top: var(--space-2);
  color: var(--color-stone);
}

.cover-frame {
  position: relative;
}

.open {
  position: absolute;
  inset: 0;
  width: 100%;
  background: none;
  border: 0;
  padding: 0;
  cursor: zoom-in;
}

.open:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.details {
  padding-block: var(--space-10);
}

.details .grid-12 {
  row-gap: var(--space-6);
}

.facts,
.description {
  grid-column: 1 / -1;
}

.description {
  max-width: 62ch;
}

.gallery {
  padding-bottom: var(--space-4);
}

@media (min-width: 768px) {
  .facts {
    grid-column: 1 / span 4;
  }

  .description {
    grid-column: 6 / span 7;
  }
}
</style>
