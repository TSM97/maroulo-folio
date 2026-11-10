export type ImageRatio = '16/9' | '4/5' | '3/2' | '1/1' | '21/9' | '3/4'

export interface ImageAsset {
  /** Public path, e.g. '/images/projects/slug/cover.webp'. Empty string = show placeholder. */
  src: string
  /** Optional responsive candidates, e.g. '/img/a-800.webp 800w, /img/a-1600.webp 1600w'. */
  srcset?: string
  alt: string
  ratio: ImageRatio
  caption?: string
  /** What should go here, shown on the placeholder, e.g. "Cover — 4:5 — main façade". */
  placeholderLabel: string
}

export type ProjectCategory = 'Residential' | 'Interior' | 'Cultural' | 'Public' | 'Concept'

export type CategoryFilter = ProjectCategory | 'All'

export type ProjectsViewMode = 'grid' | 'list'

export type ProjectStatus = 'Completed' | 'In progress' | 'Concept'

export interface Project {
  slug: string
  title: string
  subtitle?: string
  category: ProjectCategory
  year: number
  location: string
  area?: string
  status: ProjectStatus
  client?: string
  collaborators?: string[]
  photographer?: string
  summary: string
  /** Paragraphs */
  description: string[]
  cover: ImageAsset
  gallery: ImageAsset[]
  featured: boolean
  order: number
}

export interface SocialLink {
  label: string
  url: string
}

export interface NavLink {
  label: string
  to: string
}

export interface ContactPageContent {
  headline: string
  intro: string
  projectTypes: string[]
  successTitle: string
  successText: string
  errorText: string
  mailtoText: string
}

export interface SiteEffects {
  /** Lenis smooth scrolling (off automatically under reduced motion). */
  smoothScroll: boolean
  /** Circle cursor that says "View" over project images (fine pointers only). */
  customCursor: boolean
  /** Studio-name splash on the first visit of a session. */
  intro: boolean
}

export interface SiteInfo {
  name: string
  /** Production origin without trailing slash; used for canonical URLs and the sitemap. */
  url: string
  /** Default social-share image (public path, ideally 1200x630). */
  ogImage: string
  tagline: string
  nav: NavLink[]
  statement: string
  closingLine: string
  contactCta: string
  email: string
  phone: string
  address: string
  socials: SocialLink[]
  contactPage: ContactPageContent
  hero: ImageAsset
  effects: SiteEffects
}

export interface Principle {
  title: string
  text: string
}

export interface RecognitionItem {
  year: number
  title: string
  publisher: string
}

export interface TimelineEntry {
  year: string
  entry: string
}

export interface AboutContent {
  name: string
  role: string
  portrait: ImageAsset
  workspaceImage: ImageAsset
  bio: string[]
  teaser: string
  philosophy: Principle[]
  services: string[]
  recognition: RecognitionItem[]
  timeline: TimelineEntry[]
}
