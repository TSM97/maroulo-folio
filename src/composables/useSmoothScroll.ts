import { onBeforeUnmount, onMounted } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site } from '@/data/site'

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Disabled via `site.effects.smoothScroll` or under prefers-reduced-motion.
 */
export function useSmoothScroll() {
  let lenis: Lenis | undefined
  let tick: ((time: number) => void) | undefined

  onMounted(() => {
    if (!site.effects.smoothScroll) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)
    const instance = new Lenis({
      duration: 1.1,
      // Scroll-locked states (lightbox, mobile menu) set body overflow to hidden.
      virtualScroll: () => getComputedStyle(document.body).overflow !== 'hidden',
    })
    lenis = instance
    instance.on('scroll', ScrollTrigger.update)
    tick = (time) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
  })

  onBeforeUnmount(() => {
    if (tick) gsap.ticker.remove(tick)
    lenis?.destroy()
  })
}
