import type { Directive } from 'vue'

/**
 * `v-reveal` — fades + slides an element in once, when it enters the viewport.
 *
 *   <div v-reveal />            default fade-up
 *   <div v-reveal="200" />      with a 200ms delay
 *   <p v-reveal.children />     only flags the element; its children animate themselves
 *                               (style them via `[data-reveal='pending'] .child`)
 *
 * Does nothing under prefers-reduced-motion (content stays visible).
 */
let observer: IntersectionObserver | null = null

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        el.dataset.reveal = 'done'
        observer?.unobserve(el)
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  )
  return observer
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return
    if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    if (binding.modifiers.children) el.dataset.revealChildren = ''
    el.dataset.reveal = 'pending'
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
