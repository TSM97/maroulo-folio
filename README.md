# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Images: recommended export sizes

Export WebP (or AVIF) at quality ~80. Put files in `public/images/...` and set `src` in `src/data/`.
For responsive loading, add an optional `srcset` to any `ImageAsset`, e.g.
`'/images/projects/villa-lithos/cover-800.webp 800w, /images/projects/villa-lithos/cover-1600.webp 1600w, /images/projects/villa-lithos/cover-2400.webp 2400w'`.

| Use                      | Widths to export      |
| ------------------------ | --------------------- |
| Hero, project cover      | 1200 / 1920 / 2560 px |
| Gallery images           | 800 / 1600 / 2400 px  |
| Cards, about portrait    | 600 / 1200 px         |
| Social share (`ogImage`) | 1200 × 630 px (JPG)   |

Only the hero, the project cover and the about portrait (the first image on their pages) load eagerly; everything else is lazy.

## SEO

Set the real domain in `site.url` (or the `SITE_URL` env var at build time). `sitemap.xml` and `robots.txt`
are generated at build from the routes plus every project slug in `src/data/projects.ts`.
Add `public/images/og-default.jpg` for the default share image.
