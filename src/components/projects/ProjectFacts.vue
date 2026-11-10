<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '@/types'

const props = defineProps<{ project: Project }>()

const facts = computed(() => {
  const p = props.project
  const rows: { label: string; value: string | undefined }[] = [
    { label: 'Location', value: p.location },
    { label: 'Year', value: String(p.year) },
    { label: 'Area', value: p.area },
    { label: 'Status', value: p.status },
    { label: 'Client', value: p.client },
    { label: 'Collaborators', value: p.collaborators?.join(', ') },
    { label: 'Photography', value: p.photographer },
  ]
  return rows.filter((row): row is { label: string; value: string } => !!row.value)
})
</script>

<template>
  <dl class="facts">
    <div v-for="fact in facts" :key="fact.label" class="row">
      <dt class="eyebrow">{{ fact.label }}</dt>
      <dd class="body">{{ fact.value }}</dd>
    </div>
  </dl>
</template>

<style scoped>
.facts {
  margin: 0;
}

.row {
  display: grid;
  grid-template-columns: minmax(7rem, 2fr) 3fr;
  gap: var(--space-2);
  align-items: baseline;
  padding-block: var(--space-2);
  border-top: 1px solid var(--color-line);
}

.row:last-child {
  border-bottom: 1px solid var(--color-line);
}

dd {
  margin: 0;
}
</style>
