import { computed, type Ref } from 'vue'
import type { ImageAsset } from '@/types'

export type GalleryRowKind = 'full' | 'pair' | 'offset-start' | 'offset-end'

export interface GalleryRowItem {
  image: ImageAsset
  /** Position in the original gallery array. */
  index: number
}

export interface GalleryRow {
  kind: GalleryRowKind
  items: GalleryRowItem[]
}

const WIDE = new Set<ImageAsset['ratio']>(['16/9', '21/9', '3/2'])

/**
 * Arranges a gallery into an editorial rhythm from each image's ratio:
 * wide images run full width, consecutive narrow images sit in pairs,
 * and a lone narrow image is offset, alternating left and right.
 */
export function useGalleryRows(images: Ref<ImageAsset[]>) {
  return computed<GalleryRow[]>(() => {
    const rows: GalleryRow[] = []
    let offsetToEnd = false
    const list = images.value

    for (let i = 0; i < list.length; i++) {
      const image = list[i]
      if (WIDE.has(image.ratio)) {
        rows.push({ kind: 'full', items: [{ image, index: i }] })
        continue
      }
      const nextImage = list[i + 1]
      if (nextImage && !WIDE.has(nextImage.ratio)) {
        rows.push({
          kind: 'pair',
          items: [
            { image, index: i },
            { image: nextImage, index: i + 1 },
          ],
        })
        i++
        continue
      }
      rows.push({ kind: offsetToEnd ? 'offset-end' : 'offset-start', items: [{ image, index: i }] })
      offsetToEnd = !offsetToEnd
    }
    return rows
  })
}
