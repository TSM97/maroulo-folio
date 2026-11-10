import { toValue, type MaybeRefOrGetter } from 'vue'
import { useHead } from '@unhead/vue'
import { site } from '@/data/site'

export interface PageMeta {
  /** Omit on the home page: the title template falls back to the studio name. */
  title?: MaybeRefOrGetter<string | undefined>
  description: MaybeRefOrGetter<string>
  /** Route path, e.g. '/projects/villa-lithos'. Used for the canonical and og:url. */
  path: MaybeRefOrGetter<string>
  /** Public path or absolute URL of the share image; defaults to `site.ogImage`. */
  image?: MaybeRefOrGetter<string | undefined>
  type?: 'website' | 'article'
  noindex?: boolean
}

function absolute(pathOrUrl: string): string {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${site.url}${pathOrUrl}`
}

/** Title, description, canonical URL, Open Graph and Twitter tags for one page. */
export function usePageMeta(meta: PageMeta) {
  const url = () => absolute(toValue(meta.path) === '/' ? '' : toValue(meta.path))
  const image = () => absolute(toValue(meta.image) || site.ogImage)
  const title = () => {
    const t = toValue(meta.title)
    return t ? `${t} — ${site.name}` : site.name
  }

  useHead({
    title: () => toValue(meta.title),
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: () => toValue(meta.description) },
      { name: 'robots', content: meta.noindex ? 'noindex' : 'index, follow' },
      { property: 'og:site_name', content: site.name },
      { property: 'og:type', content: meta.type ?? 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: () => toValue(meta.description) },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: () => toValue(meta.description) },
      { name: 'twitter:image', content: image },
    ],
  })
}
