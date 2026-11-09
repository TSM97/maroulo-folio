<script setup lang="ts">
const colors = [
  { name: '--color-bg', var: 'var(--color-bg)' },
  { name: '--color-ink', var: 'var(--color-ink)' },
  { name: '--color-stone', var: 'var(--color-stone)' },
  { name: '--color-line', var: 'var(--color-line)' },
  { name: '--color-accent', var: 'var(--color-accent)' },
  { name: '--color-placeholder', var: 'var(--color-placeholder)' },
]

const typeStyles = ['display-xl', 'display-l', 'heading', 'body', 'caption', 'eyebrow']

const spacingSteps = Array.from({ length: 12 }, (_, i) => i + 1)
</script>

<template>
  <main class="container styleguide">
    <h1 class="display-l">Styleguide</h1>

    <section class="stack">
      <h2 class="heading">Colors</h2>
      <div class="swatches">
        <div v-for="color in colors" :key="color.name" class="swatch">
          <div class="swatch-color" :style="{ backgroundColor: color.var }" />
          <p class="caption">{{ color.name }}</p>
        </div>
      </div>
    </section>

    <hr class="hairline" />

    <section class="stack">
      <h2 class="heading">Type styles</h2>
      <div class="stack">
        <p v-for="style in typeStyles" :key="style" :class="style">
          {{ style }} — The quiet gallery
        </p>
      </div>
    </section>

    <hr class="hairline" />

    <section class="stack">
      <h2 class="heading">Spacing scale</h2>
      <div class="stack">
        <div v-for="step in spacingSteps" :key="step" class="space-row">
          <span class="caption">--space-{{ step }}</span>
          <div class="space-bar" :style="{ width: `var(--space-${step})` }" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.styleguide {
  padding-block: var(--space-8);
}

.styleguide > * + * {
  margin-top: var(--space-8);
}

.swatches {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.swatch {
  width: 140px;
}

.swatch-color {
  height: 80px;
  border: 1px solid var(--color-line);
}

.space-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.space-bar {
  height: var(--space-2);
  background-color: var(--color-accent);
}
</style>
