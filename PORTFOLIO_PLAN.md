# Architect Portfolio — Build Plan for Claude Code

A step-by-step plan to build a **minimal, artistic portfolio / landing page for an architect** with **Vue 3 (Composition API, `<script setup>`)**.

**How to use this file**

1. Create an empty folder, put this file in it, and open Claude Code there.
2. Start with **Phase 0** and paste each phase's "Prompt" into Claude Code, **one phase at a time**.
3. After each phase, run the site (`npm run dev`), check the "Done when" list, and commit (`git commit`) before moving on.
4. **Images are placeholders.** Claude Code must not download or generate real photos. You add your own later (see "Adding your images" at the end).

---

## 0. Project brief (Claude Code reads this first)

> Copy this section into a `CLAUDE.md` file at the project root so Claude Code reads it every session.

```md
# CLAUDE.md — Project rules

## What this is

A portfolio + landing page for an independent architect. Her work is artistic and minimal.
The site should feel like a quiet gallery: lots of white space, strong typography,
large images, slow and subtle motion. The work is the hero, not the UI.

## Stack

- Vue 3, Composition API, `<script setup lang="ts">` only (no Options API)
- Vite, TypeScript
- Vue Router (history mode)
- Plain CSS with CSS custom properties (design tokens) + scoped styles. No UI kit, no Tailwind.
- @vueuse/core for utilities (intersection observer, media queries, etc.)
- @unhead/vue for page titles / meta tags
- GSAP (with ScrollTrigger) for animation — used sparingly
- Optional: Lenis for smooth scroll

## Content

- All content lives in typed data files in `src/data/` (no CMS, no backend).
- Never hard-code project text inside components.

## Images — IMPORTANT

- Do NOT download, generate or hotlink real photographs.
- Every image goes through the `<ArchImage>` component. If its `src` is empty or fails to load,
  it renders a neutral placeholder box at the correct aspect ratio, labelled with what
  should go there (e.g. "Hero — 16:9 — exterior at dusk").
- Generic, non-photographic assets are fine to create: SVG icons (arrow, close, menu),
  a simple monogram/wordmark from text, a favicon, a CSS grain texture.

## Design rules

- Palette: warm off-white background, near-black ink, one stone grey, one muted accent. No gradients.
- Typography: one refined serif for display, one clean sans for body/UI. Max 2 families.
- Generous spacing on an 8px scale. Asymmetric, editorial grid layouts are welcome.
- Motion: fades, slow reveals, gentle image scale. Respect `prefers-reduced-motion`.
- Accessibility: semantic HTML, alt text field on every image, visible focus states, AA contrast.
- Mobile-first and fully responsive.

## Code style

- Small single-purpose components. Composables in `src/composables/` named `useX`.
- Props and data fully typed. No `any`.
- Don't add libraries beyond the stack above without asking.
```

---

## Site map

| Route              | Page           | Purpose                                                                      |
| ------------------ | -------------- | ---------------------------------------------------------------------------- |
| `/`                | Home           | Full-screen hero, short statement, selected works, about teaser, contact CTA |
| `/projects`        | Works          | Grid of all projects, filter by category                                     |
| `/projects/:slug`  | Project detail | Large gallery, project facts, description, next project                      |
| `/about`           | Studio / About | Portrait, bio, philosophy, services, recognition, timeline                   |
| `/contact`         | Contact        | Email, phone, address, social, simple form                                   |
| `/:pathMatch(.*)*` | 404            | Minimal "not found" with a link home                                         |

## Folder structure (target)

```
src/
  assets/styles/      tokens.css, base.css, typography.css, utilities.css
  components/
    layout/           SiteHeader.vue, SiteFooter.vue, MobileMenu.vue, PageTransition.vue
    ui/               ArchImage.vue, AppLink.vue, SectionTitle.vue, ArrowIcon.vue, Cursor.vue
    home/             HeroSection.vue, StatementSection.vue, SelectedWorks.vue, AboutTeaser.vue, ContactCta.vue
    projects/         ProjectCard.vue, ProjectGrid.vue, ProjectFilter.vue, ProjectGallery.vue, ProjectFacts.vue, NextProject.vue, Lightbox.vue
  composables/        useReveal.ts, useProjects.ts, useSmoothScroll.ts, useLightbox.ts
  data/               site.ts, projects.ts, about.ts
  types/              index.ts
  views/              HomeView.vue, ProjectsView.vue, ProjectDetailView.vue, AboutView.vue, ContactView.vue, NotFoundView.vue
  router/index.ts
  App.vue
  main.ts
public/
  images/             (you fill these in later)
    hero/  projects/<slug>/  about/
```

---

## Phase 1 — Scaffold the project

**Prompt:**

```
Read CLAUDE.md. Scaffold a new Vite + Vue 3 + TypeScript project in the current folder.
Install vue-router, @vueuse/core, @unhead/vue and gsap.
Set up ESLint + Prettier with Vue/TS defaults.
Create the folder structure from PORTFOLIO_PLAN.md (empty files with TODO comments are fine).
Configure path alias "@" -> src.
Set up the router with all routes from the site map, lazy-loading each view,
and scrollBehavior that scrolls to top on navigation (and restores position on back).
Each view should just show its name for now. Initialize git and make the first commit.
```

**Done when:** `npm run dev` runs, every route opens, `npm run build` passes with no type errors.

---

## Phase 2 — Design system (tokens & base styles)

**Prompt:**

```
Create the design system in src/assets/styles/ and import it in main.ts.

tokens.css — CSS custom properties:
- Colors: --color-bg (#F4F2EE warm off-white), --color-ink (#1A1A1A), --color-stone (#8C8780),
  --color-line (rgba(26,26,26,0.12)), --color-accent (a muted clay/terracotta, e.g. #A0674B),
  --color-placeholder (#E4E0D9)
- Fonts: --font-display (a refined serif, e.g. "Cormorant Garamond" or "Fraunces"),
  --font-body (a clean sans, e.g. "Manrope" or "Inter Tight"). Load from Google Fonts
  or Fontsource with font-display: swap. Only the weights we use.
- Fluid type scale with clamp(): --step--1 to --step-6
- Spacing on an 8px scale: --space-1 ... --space-12
- Layout: --container-max (1440px), --gutter (fluid), 12-column grid helper
- Motion: --ease-out (cubic-bezier(0.22, 1, 0.36, 1)), --dur-fast/--dur-base/--dur-slow

base.css — modern reset, body bg/ink, smooth font rendering, ::selection in accent,
visible :focus-visible outline, images block-level, a .sr-only class.
Add a very subtle grain texture overlay on the body using an inline SVG noise filter
(pure CSS/SVG, no image file) at very low opacity.
Disable all transitions/animations under prefers-reduced-motion.

typography.css — classes .display-xl, .display-l, .heading, .body, .caption, .eyebrow
(eyebrow = small uppercase, wide letter-spacing, stone color).

utilities.css — .container, .grid-12, .stack, .hairline (1px line in --color-line).

Make a temporary /styleguide route that shows all colors, type styles and spacing so I can review them.
```

**Done when:** `/styleguide` looks calm and elegant; fonts load; type scales smoothly as you resize the window.

---

## Phase 3 — Content model & placeholder images

**Prompt:**

```
Create types in src/types/index.ts:
- ImageAsset { src: string; alt: string; ratio: '16/9' | '4/5' | '3/2' | '1/1' | '21/9' | '3/4'; caption?: string; placeholderLabel: string }
- Project { slug; title; subtitle?; category: 'Residential' | 'Interior' | 'Cultural' | 'Public' | 'Concept';
  year: number; location: string; area?: string; status: 'Completed' | 'In progress' | 'Concept';
  client?: string; collaborators?: string[]; photographer?: string;
  summary: string; description: string[] (paragraphs);
  cover: ImageAsset; gallery: ImageAsset[]; featured: boolean; order: number }
- SiteInfo (name, tagline, statement, email, phone, address, socials[])
- AboutContent (portrait: ImageAsset, bio paragraphs, philosophy, services[], recognition[], timeline[])

Create src/data/site.ts, about.ts and projects.ts with realistic but clearly fake
placeholder text (name: "Studio Name", 6 sample projects across different categories,
each with a cover and 5–8 gallery images using mixed ratios).
ALL image src values must be empty strings "". Fill placeholderLabel with a helpful
description of the intended shot, e.g. "Cover — 4:5 — main façade, morning light".
Add a comment at the top of each data file explaining how to replace content and images.

Build src/components/ui/ArchImage.vue:
- props: image: ImageAsset, sizes?: string, eager?: boolean
- reserves space using aspect-ratio (no layout shift)
- if src is empty or the image fails to load -> render a placeholder: --color-placeholder background,
  a thin 1px diagonal cross line in --color-line, and the placeholderLabel + ratio in .caption text, centered
- if src exists -> <img> with loading="lazy" (unless eager), decoding="async", alt,
  and a slow fade-in when loaded
- optional <figcaption> when caption is set

Create src/composables/useProjects.ts: allProjects (sorted by order), featured,
categories, getBySlug(slug), getNext(slug) (wraps around).
Show all placeholders on /styleguide.
```

**Done when:** placeholders look intentional (like an architectural drawing sheet), not "broken."

---

## Phase 4 — Layout: header, menu, footer

**Prompt:**

```
Build the layout components and use them in App.vue.

SiteHeader.vue:
- Left: studio name as a text wordmark (display font). Right: nav links Works / Studio / Contact.
- Transparent over the home hero, solid bg after scrolling; hides on scroll down and
  reappears on scroll up (useScroll from VueUse).
- Active link gets a thin underline that draws in from the left.

MobileMenu.vue (below 768px):
- A minimal "Menu" / "Close" text button (no hamburger icon).
- Full-screen overlay in --color-bg, links in large display type, staggered fade-in.
- Locks body scroll, closes on route change and on Escape, traps focus.

SiteFooter.vue:
- Hairline on top; three columns: contact info, socials, small copyright line with the current year.
- A large, quiet closing line of text (from site.ts) like an epigraph.

PageTransition.vue: wrap <RouterView> in a <Transition> with a soft fade + small translateY.

Add a "Skip to content" link. Use @unhead/vue for default title template "%s — Studio Name".
```

**Done when:** navigation feels smooth on desktop and mobile; the menu works with keyboard only.

---

## Phase 5 — Home page

**Prompt:**

```
Build HomeView from these sections in src/components/home/:

1. HeroSection — full viewport height. One large image (ArchImage, 16/9 on desktop,
   4/5 on mobile; placeholder label "Hero — exterior, wide shot"). Studio name / tagline
   overlaid bottom-left in display type, small "Scroll" indicator bottom-right.
   Very slow scale from 1.08 to 1 on load. Subtle parallax on scroll (GSAP ScrollTrigger).

2. StatementSection — a short philosophy statement in large serif type, set in
   an asymmetric column (start at column 4 of the 12-col grid). Words/lines reveal on scroll.

3. SelectedWorks — the featured projects in an editorial, asymmetric layout:
   alternate large and small images, offset vertically, not a uniform grid.
   Each item: image, index number (01, 02...), title, category · year.
   Hover: image scales slightly inside its frame, title gets an underline. Link to project page.
   End with an "All works →" link.

4. AboutTeaser — portrait image (4/5) beside 2–3 lines of bio and a "The studio →" link.

5. ContactCta — big line "Let's design something quiet." (from site.ts) with the email
   as a large link underneath.

Create src/composables/useReveal.ts: a reusable directive/composable that fades + slides
elements in when they enter the viewport (IntersectionObserver), runs once,
and does nothing under prefers-reduced-motion. Use it across sections.
```

**Done when:** the homepage reads like a magazine spread and works on mobile.

---

## Phase 6 — Works (projects index)

**Prompt:**

```
Build ProjectsView:
- Page title "Works" in display type + count of projects.
- ProjectFilter: text-only category buttons (All, Residential, Interior, ...) with a thin
  underline on the active one. Sync the selected filter to the URL query (?category=interior)
  so it's shareable and survives refresh.
- ProjectGrid: responsive grid (1 col mobile, 2 tablet, 3 desktop) of ProjectCard.
  Use a FLIP-style animated reorder when filtering (Vue <TransitionGroup>).
- ProjectCard: cover image (4/5), title, location · year. Hover behaviour as on the home page.
- Optional toggle between "Grid" and "List" view. The list view is a table-like list
  (index, title, category, location, year) where hovering a row shows a floating
  preview of the cover image that follows the cursor (desktop only).
```

**Done when:** filtering is instant, the URL updates, and the list-view hover preview feels smooth.

---

## Phase 7 — Project detail page

**Prompt:**

```
Build ProjectDetailView using the :slug param and useProjects().getBySlug.
If the slug doesn't exist, redirect to the 404 view.

Layout:
1. Header: eyebrow (category), large title, subtitle.
2. Full-width cover image (21/9 desktop, 4/5 mobile).
3. Two columns: left = ProjectFacts (definition list: Location, Year, Area, Status, Client,
   Collaborators, Photography — hide empty rows), right = description paragraphs.
4. ProjectGallery: lay out gallery images in a rhythmic editorial pattern based on each
   image's ratio (e.g. wide images full width, portrait images in pairs, occasional single
   image offset to one side). Captions in small caption style.
5. Clicking any image opens Lightbox: full-screen, dark-ink background, image centered,
   prev/next with arrow keys and swipe on mobile, Escape to close, counter "3 / 8".
   Logic in src/composables/useLightbox.ts.
6. NextProject: full-width band with the next project's title and cover; links to it.

Set the page title and meta description from the project with useHead.
Add Open Graph tags (og:title, og:description, og:image from cover if src exists).
```

**Done when:** every sample project page works, the lightbox works with keyboard and touch, and "next" loops through all projects.

---

## Phase 8 — About / Studio page

**Prompt:**

```
Build AboutView from src/data/about.ts:
- Opening: large portrait (ArchImage 3/4, placeholder "Portrait — natural light, studio")
  beside her name and a one-line role ("Architect, founder").
- Bio paragraphs in a narrow, readable column (max ~62ch).
- Philosophy: 3–4 short principles, each with a number and a short paragraph,
  in a clean horizontal layout separated by hairlines.
- Services: simple list (Architecture, Interior design, Renovation, Consulting...).
- Recognition: awards/publications as a minimal year | title | publisher list.
- Timeline: education & career, year on the left, entry on the right.
- One wide studio/workspace image placeholder near the end.
```

**Done when:** it feels personal and calm, never like a CV dump.

---

## Phase 9 — Contact page

**Prompt:**

```
Build ContactView:
- Big headline, then email (mailto) and phone (tel) as large links, address, and socials.
- A minimal form: name, email, project type (select), message. Inputs are underline-only
  (no boxes), labels float or sit above in caption style.
- Client-side validation with clear inline error messages and aria-live feedback.
- Submit to a form service via fetch (make the endpoint a VITE_FORM_ENDPOINT env variable,
  works with Formspree/Web3Forms/Netlify Forms). If the variable is missing,
  fall back to opening a pre-filled mailto: link.
- Success and error states that match the site's tone.
- Add .env.example documenting VITE_FORM_ENDPOINT.
```

**Done when:** validation works, and the form either sends or falls back to email.

---

## Phase 10 — Motion & details polish

**Prompt:**

```
Polish pass, keep everything subtle:
- Optional custom cursor (desktop, pointer:fine only): a small circle that grows and shows
  "View" when hovering project images. Hide it on touch devices and under reduced motion.
- Optional smooth scrolling with Lenis, integrated with GSAP ScrollTrigger; easy to turn off
  with one flag in site.ts.
- A brief intro/loader on first visit only (studio name fades in and out, < 1.5s),
  skipped on subsequent navigations and under reduced motion.
- Make sure all hover effects have keyboard focus equivalents.
- Check that nothing causes layout shift and no animation runs longer than ~1.2s.
- Remove the /styleguide route from production builds (keep it in dev).
```

---

## Phase 11 — SEO, performance, accessibility

**Prompt:**

```
Production readiness:
- useHead on every view: unique title + description. Add canonical URLs and default OG image
  placeholder path in site.ts.
- Generate a text-based SVG favicon (monogram of the studio initials) + apple-touch-icon.
- Add robots.txt and a sitemap.xml generated at build time from routes + project slugs.
- Add JSON-LD structured data (Organization / Person, ProfessionalService).
- Images: support optional responsive `srcset` in ImageAsset (add `srcset?: string`),
  eager-load only the hero, lazy-load the rest. Document recommended export sizes.
- Preload the display font. Check bundle size; code-split GSAP so it isn't in the initial chunk if possible.
- Run an accessibility review: headings order, alt texts, contrast, focus order, lightbox focus trap.
- Make sure Lighthouse scores are 90+ on all categories (report what you checked).
```

---

## Phase 12 (optional) — Greek / English

**Prompt:**

```
Add bilingual support (English + Greek) with vue-i18n (Composition API mode):
- UI strings in src/locales/en.json and el.json.
- Content data gets per-language fields (e.g. title: { en, el }).
- Language switch "EN / ΕΛ" in the header, remembered in localStorage, reflected in <html lang>.
- Make sure the chosen fonts support Greek glyphs (pick alternatives if not).
- Routes stay the same; optionally prefix with /el later.
```

---

## Phase 13 — Deploy

**Prompt:**

```
Prepare for deployment on Netlify (or Vercel):
- Add netlify.toml (or vercel.json) with SPA fallback to index.html so deep links
  like /projects/some-slug work on refresh.
- Add cache headers for hashed assets.
- Write a README.md with: how to run locally, how to edit content in src/data,
  how to add images, how to set the form endpoint, and how to deploy.
```

---

## Adding your images (after the build)

1. Export photos as **WebP or AVIF** (JPEG is fine as backup).
   Suggested widths: hero **2400px**, covers **1600px**, gallery **1600–2000px**, portrait **1200px**. Try to keep each file under ~400 KB.
2. Put them in `public/images/…`, for example:
   - `public/images/hero/hero.webp`
   - `public/images/projects/villa-lithos/cover.webp`
   - `public/images/projects/villa-lithos/01.webp`, `02.webp`…
   - `public/images/about/portrait.webp`
3. Open `src/data/projects.ts` (or `site.ts` / `about.ts`) and fill in the empty `src` with the path, e.g.
   `src: '/images/projects/villa-lithos/cover.webp'`.
   Write a real `alt` description and set `ratio` to match the photo.
4. Any image you haven't added yet keeps showing its labelled placeholder, so the site never looks broken.

---

## Tips for working with Claude Code

- **One phase per session or prompt.** Review, then commit before you continue.
- If something looks wrong, describe what you **see** ("the hero text overlaps the header on iPhone size") rather than how to fix it.
- To change the look, ask Claude Code to edit **`tokens.css`** first. Most of the design follows from it.
- Ask for screenshots of your references (sites she likes) to be described in words and added to `CLAUDE.md` under "Design rules". This keeps the style consistent.
- Ask regularly: _"Review the code you wrote in this phase for type errors, unused code and accessibility issues."_
