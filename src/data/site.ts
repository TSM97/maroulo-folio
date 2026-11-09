/**
 * Site-wide content. Placeholder text — replace with the real architect details.
 *
 * Images: put files in `public/images/...` and set `src` to the public path
 * (e.g. '/images/hero/hero.webp'). Write a real `alt` and match `ratio` to the photo.
 * While `src` is '' a labelled placeholder is shown.
 */
import type { SiteInfo } from '@/types'

export const site: SiteInfo = {
  name: 'Architect Name',
  tagline: 'Architecture, quietly considered.',
  nav: [
    { label: 'Works', to: '/projects' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  statement:
    'I design spaces that listen first — to light, to material, to the people who will live in them. Each building is an attempt to say less, and mean more.',
  closingLine: 'Space is what remains when everything unnecessary has been removed.',
  contactCta: "Let's design something quiet.",
  email: 'hello@architectname.example',
  phone: '+30 210 000 0000',
  address: '12 Example Street, 100 00 Athens, Greece',
  socials: [
    { label: 'Instagram', url: 'https://instagram.com/' },
    { label: 'LinkedIn', url: 'https://linkedin.com/' },
  ],
  hero: {
    src: '',
    alt: 'Exterior of a house at dusk, seen from a distance',
    ratio: '16/9',
    placeholderLabel: 'Hero — exterior, wide shot',
  },
}
