<script setup lang="ts">
import AppLink from '@/components/ui/AppLink.vue'
import ArchImage from '@/components/ui/ArchImage.vue'
import ArrowIcon from '@/components/ui/ArrowIcon.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useProjects } from '@/composables/useProjects'
import { vReveal } from '@/composables/useReveal'

const { featured } = useProjects()

function indexLabel(index: number): string {
  return String(index + 1).padStart(2, '0')
}
</script>

<template>
  <section class="works container">
    <SectionTitle eyebrow="Selected works" title="Recent projects" />

    <ul class="grid-12 list">
      <li
        v-for="(project, index) in featured"
        :key="project.slug"
        v-reveal
        class="item"
        :class="`pos-${index % 4}`"
      >
        <RouterLink :to="`/projects/${project.slug}`" class="link hover-zoom">
          <ArchImage :image="project.cover" sizes="(min-width: 768px) 50vw, 100vw" />
          <div class="meta">
            <span class="caption number">{{ indexLabel(index) }}</span>
            <div>
              <h3 class="heading">
                <span class="title-text">{{ project.title }}</span>
              </h3>
              <p class="caption">{{ project.category }} · {{ project.year }}</p>
            </div>
          </div>
        </RouterLink>
      </li>
    </ul>

    <p class="all">
      <AppLink to="/projects" class="body">All works <ArrowIcon /></AppLink>
    </p>
  </section>
</template>

<style scoped>
.works {
  padding-block: var(--space-8) var(--space-12);
}

.list {
  margin-top: var(--space-8);
  row-gap: var(--space-10);
}

.item {
  grid-column: 1 / -1;
}

/* Mobile: single column, every other item indented. */
.item:nth-child(even) {
  margin-left: 15%;
}

.link {
  display: block;
}

.meta {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.number {
  padding-top: 0.35em;
  font-variant-numeric: tabular-nums;
}

.title-text {
  position: relative;
  display: inline-block;
}

.title-text::after {
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

.link:is(:hover, :focus-visible) .title-text::after {
  transform: scaleX(1);
}

.all {
  margin-top: var(--space-10);
  text-align: right;
}

@media (min-width: 768px) {
  .item:nth-child(even) {
    margin-left: 0;
  }

  /* Large / small alternation, with the small ones dropped for an editorial offset. */
  .pos-0 {
    grid-column: 1 / span 7;
  }

  .pos-1 {
    grid-column: 9 / span 4;
    margin-top: var(--space-12);
  }

  .pos-2 {
    grid-column: 2 / span 4;
  }

  .pos-3 {
    grid-column: 7 / span 6;
    margin-top: var(--space-8);
  }
}
</style>
