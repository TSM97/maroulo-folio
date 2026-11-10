<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectFilter from '@/components/projects/ProjectFilter.vue'
import ProjectGrid from '@/components/projects/ProjectGrid.vue'
import ProjectList from '@/components/projects/ProjectList.vue'
import TextToggleGroup from '@/components/ui/TextToggleGroup.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { useProjects } from '@/composables/useProjects'
import type { CategoryFilter, ProjectsViewMode } from '@/types'

usePageMeta({
  title: 'Works',
  description: 'Selected architecture and interior projects: residential, cultural and public work.',
  path: '/projects',
})

const route = useRoute()
const router = useRouter()
const { allProjects, categories } = useProjects()

const viewOptions: { value: ProjectsViewMode; label: string }[] = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
]

function queryValue(key: string): string | undefined {
  const value = route.query[key]
  return typeof value === 'string' ? value : undefined
}

/** `?category=interior` -> 'Interior'; unknown values fall back to 'All'. */
const category = computed<CategoryFilter>({
  get() {
    const raw = queryValue('category')?.toLowerCase()
    return categories.find((c) => c.toLowerCase() === raw) ?? 'All'
  },
  set(value) {
    updateQuery({ category: value === 'All' ? undefined : value.toLowerCase() })
  },
})

const view = computed<ProjectsViewMode>({
  get: () => (queryValue('view') === 'list' ? 'list' : 'grid'),
  set(value) {
    updateQuery({ view: value === 'grid' ? undefined : value })
  },
})

function updateQuery(changes: Record<string, string | undefined>) {
  const query = { ...route.query, ...changes }
  for (const key of Object.keys(query)) {
    if (query[key] === undefined) delete query[key]
  }
  router.replace({ query })
}

const projects = computed(() =>
  category.value === 'All'
    ? allProjects
    : allProjects.filter((project) => project.category === category.value),
)
</script>

<template>
  <main class="works container">
    <header class="heading-row">
      <h1 class="display-xl">Works</h1>
      <p class="caption count" aria-live="polite">
        {{ projects.length }} {{ projects.length === 1 ? 'project' : 'projects' }}
      </p>
    </header>

    <div class="toolbar">
      <ProjectFilter v-model="category" :categories="categories" />
      <TextToggleGroup v-model="view" :options="viewOptions" label="Layout" />
    </div>

    <ProjectGrid v-if="view === 'grid'" :projects="projects" />
    <ProjectList v-else :projects="projects" />
  </main>
</template>

<style scoped>
.works {
  padding-block: var(--space-8) var(--space-6);
}

.heading-row {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2) var(--space-4);
  margin-block: var(--space-6) var(--space-8);
}
</style>
