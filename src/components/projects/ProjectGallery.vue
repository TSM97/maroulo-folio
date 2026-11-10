<script setup lang="ts">
import { toRef } from 'vue'
import ArchImage from '@/components/ui/ArchImage.vue'
import { useGalleryRows } from '@/composables/useGalleryRows'
import { vReveal } from '@/composables/useReveal'
import type { ImageAsset } from '@/types'

const props = defineProps<{ images: ImageAsset[] }>()
const emit = defineEmits<{ open: [index: number] }>()

const rows = useGalleryRows(toRef(props, 'images'))

function sizesFor(kind: string): string {
  return kind === 'pair' ? '(min-width: 768px) 45vw, 100vw' : '(min-width: 768px) 70vw, 100vw'
}
</script>

<template>
  <div class="gallery">
    <div v-for="row in rows" :key="row.items[0].index" class="row" :class="row.kind">
      <div
        v-for="item in row.items"
        :key="item.index"
        v-reveal
        class="item hover-zoom"
        :class="{ lower: row.kind === 'pair' && item !== row.items[0] }"
      >
        <ArchImage :image="item.image" :sizes="sizesFor(row.kind)" />
        <button
          type="button"
          class="open"
          :aria-label="`View image ${item.index + 1} of ${images.length} larger`"
          @click="emit('open', item.index)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.item {
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

/* Keyboard focus gets the same gentle zoom as hover. */
.item:has(.open:focus-visible) :deep(.frame > *) {
  transform: scale(1.04);
}

.row {
  display: grid;
  gap: var(--space-4) var(--gutter);
}

@media (min-width: 768px) {
  .gallery {
    gap: var(--space-12);
  }

  .pair {
    grid-template-columns: repeat(2, 1fr);
    align-items: start;
  }

  .lower {
    margin-top: var(--space-10);
  }

  .offset-start .item {
    width: 58%;
  }

  .offset-end .item {
    width: 58%;
    margin-left: auto;
  }
}
</style>
