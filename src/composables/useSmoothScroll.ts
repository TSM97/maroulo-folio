import { onBeforeUnmount, onMounted } from 'vue'
import { site } from '@/data/site'

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Disabled via `site.effects.smoothScroll` or under prefers-reduced-motion.
 * Lenis and GSAP are loaded lazily so they stay out of the initial bundle.
 */
export function useSmoothScroll() {
  let cleanup: (() => void) | undefined
  let unmounted = false

  onMounted(async () => {
    if (!site.effects.smoothScroll) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ])
    if (unmounted) return

    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({
      duration: 1.1,
      // Scroll-locked states (lightbox, mobile menu) set body overflow to hidden.
      virtualScroll: () => getComputedStyle(document.body).overflow !== 'hidden',
    })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    cleanup = () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  })

  onBeforeUnmount(() => {
    unmounted = true
    cleanup?.()
  })
}
