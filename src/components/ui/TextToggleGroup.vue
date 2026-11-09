<script setup lang="ts" generic="T extends string">
export interface ToggleOption<V extends string> {
  value: V
  label: string
}

defineProps<{
  options: ToggleOption<T>[]
  /** Accessible name for the group. */
  label: string
}>()

const model = defineModel<T>({ required: true })
</script>

<template>
  <div class="group" role="group" :aria-label="label">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="option"
      :class="{ active: model === option.value }"
      :aria-pressed="model === option.value"
      @click="model = option.value"
    >
      <span class="text">{{ option.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-4);
}

.option {
  padding: var(--space-1) 0;
  background: none;
  border: none;
  color: var(--color-stone);
  font-size: var(--step--1);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color var(--dur-base) var(--ease-out);
}

.option:is(:hover, .active) {
  color: var(--color-ink);
}

.text {
  position: relative;
  display: inline-block;
}

.text::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-base) var(--ease-out);
}

.active .text::after {
  transform: scaleX(1);
}
</style>
