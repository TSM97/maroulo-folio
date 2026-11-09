<script setup lang="ts">
import { computed } from 'vue'
import TextToggleGroup from '@/components/ui/TextToggleGroup.vue'
import type { CategoryFilter, ProjectCategory } from '@/types'

const props = defineProps<{ categories: ProjectCategory[] }>()

const model = defineModel<CategoryFilter>({ required: true })

const options = computed(() => [
  { value: 'All' as CategoryFilter, label: 'All' },
  ...props.categories.map((category) => ({ value: category as CategoryFilter, label: category })),
])
</script>

<template>
  <TextToggleGroup v-model="model" :options="options" label="Filter by category" />
</template>
