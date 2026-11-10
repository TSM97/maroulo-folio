import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { projects } from './src/data/projects'
import { site } from './src/data/site'

/** Emits sitemap.xml (static routes + every project slug) and robots.txt at build time. */
function seoFiles(): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const origin = (process.env.SITE_URL ?? site.url).replace(/\/$/, '')
      const paths = [
        '/',
        '/projects',
        '/about',
        '/contact',
        ...projects.map((project) => `/projects/${project.slug}`),
      ]
      const lastmod = new Date().toISOString().slice(0, 10)
      const urls = paths
        .map(
          (path) =>
            `  <url>\n    <loc>${origin}${path === '/' ? '' : path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
        )
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), seoFiles()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
