<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ArchImage from '@/components/ui/ArchImage.vue'
import { site } from '@/data/site'
import type { ImageAsset } from '@/types'

const isDesktop = useMediaQuery('(min-width: 768px)')
const heroImage = computed<ImageAsset>(() => ({
  ...site.hero,
  ratio: isDesktop.value ? '16/9' : '4/5',
}))

const section = ref<HTMLElement | null>(null)
const parallax = ref<HTMLElement | null>(null)
const intro = ref<HTMLElement | null>(null)
let mm: gsap.MatchMedia | undefined

onMounted(() => {
  if (!section.value || !parallax.value || !intro.value) return
  const sectionEl = section.value
  const parallaxEl = parallax.value
  const introEl = intro.value
  gsap.registerPlugin(ScrollTrigger)
  mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.fromTo(introEl, { scale: 1.08 }, { scale: 1, duration: 1.2, ease: 'power2.out' })
    gsap.fromTo(
      parallaxEl,
      { yPercent: 0 },
      {
        yPercent: 13,
        ease: 'none',
        scrollTrigger: { trigger: sectionEl, start: 'top top', end: 'bottom top', scrub: true },
      },
    )
  })
})

onBeforeUnmount(() => mm?.revert())
</script>

<template>
  <section ref="section" class="hero">
    <div ref="parallax" class="media">
      <div ref="intro" class="intro">
        <ArchImage :image="heroImage" eager fill />
      </div>
    </div>

    <div class="container overlay">
      <div class="title">
        <h1 class="display-xl">{{ site.name }}</h1>
        <p class="body tagline">{{ site.tagline }}</p>
      </div>
      <p class="eyebrow scroll" aria-hidden="true">Scroll <span class="line" /></p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100svh;
  min-height: 30rem;
  overflow: hidden;
}

/* Extends above the section so the parallax shift never exposes an edge. */
.media {
  position: absolute;
  inset: -15% 0 0 0;
}

.intro {
  height: 100%;
}

.overlay {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
  height: 100%;
  padding-bottom: var(--space-6);
  pointer-events: none;
}

.tagline {
  margin-top: var(--space-2);
}

.scroll {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-ink);
}

.line {
  display: block;
  width: var(--space-6);
  height: 1px;
  background-color: currentColor;
  transform-origin: left;
  animation: scroll-line 2.8s var(--ease-out) infinite;
}

@keyframes scroll-line {
  0% {
    transform: scaleX(0);
  }
  60%,
  100% {
    transform: scaleX(1);
  }
}
</style>
