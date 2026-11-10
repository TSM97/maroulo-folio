<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ImageAsset } from '@/types'

const props = defineProps<{
  image: ImageAsset
  sizes?: string
  eager?: boolean
  /** Fill the parent's height instead of reserving space by aspect ratio. */
  fill?: boolean
}>()

const failed = ref(false)
const loaded = ref(false)

watch(
  () => props.image.src,
  () => {
    failed.value = false
    loaded.value = false
  },
)

const showPlaceholder = computed(() => !props.image.src || failed.value)
const ratioCss = computed(() => props.image.ratio.replace('/', ' / '))
const ratioLabel = computed(() => props.image.ratio.replace('/', ':'))
</script>

<template>
  <figure class="arch-image" :class="{ fill }">
    <div class="frame" :style="fill ? undefined : { aspectRatio: ratioCss }">
      <div v-if="showPlaceholder" class="placeholder" role="img" :aria-label="image.alt">
        <svg class="cross" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
          <line x1="0" y1="0" x2="100" y2="100" vector-effect="non-scaling-stroke" />
          <line x1="100" y1="0" x2="0" y2="100" vector-effect="non-scaling-stroke" />
        </svg>
        <p class="caption label">
          {{ image.placeholderLabel }}
          <span class="ratio">{{ ratioLabel }}</span>
        </p>
      </div>
      <img
        v-else
        :class="{ loaded }"
        :src="image.src"
        :alt="image.alt"
        :sizes="sizes"
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
        @load="loaded = true"
        @error="failed = true"
      />
    </div>
    <figcaption v-if="image.caption" class="caption">{{ image.caption }}</figcaption>
  </figure>
</template>

<style scoped>
.arch-image {
  margin: 0;
}

.arch-image.fill,
.arch-image.fill .frame {
  height: 100%;
}

.frame {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: var(--color-placeholder);
}

.placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: var(--space-2);
  text-align: center;
}

.cross {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.cross line {
  stroke: var(--color-line);
  stroke-width: 1;
}

.label {
  position: relative;
  max-width: 28ch;
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-placeholder);
}

.ratio {
  display: block;
  margin-top: 0.25rem;
  letter-spacing: 0.08em;
}

/* Opt-in hover/focus zoom: put `hover-zoom` on an ancestor link. */
:global(.hover-zoom:is(:hover, :focus-visible, :has(:focus-visible))) .frame > * {
  transform: scale(1.04);
}

.placeholder {
  transition: transform 1.2s var(--ease-out);
}

img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition:
    opacity var(--dur-slow) var(--ease-out),
    transform 1.2s var(--ease-out);
}

img.loaded {
  opacity: 1;
}

figcaption {
  margin-top: var(--space-1);
}
</style>
