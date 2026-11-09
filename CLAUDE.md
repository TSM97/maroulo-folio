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
