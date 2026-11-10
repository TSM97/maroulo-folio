/**
 * Project content. All text below is fake placeholder copy — replace it with the real projects.
 *
 * Add a project: copy an entry, give it a unique `slug` (used in the URL) and `order`.
 * Replace images: put files in `public/images/projects/<slug>/` and set the `src` of each
 * image to its public path, e.g. '/images/projects/villa-lithos/cover.webp'.
 * Write a real `alt` and set `ratio` to match the photo. While `src` is '' a labelled
 * placeholder is shown, so the site never looks broken.
 */
import type { ImageAsset, ImageRatio, Project } from '../types'

/** Builds an empty-src image; `label` describes the intended shot. */
function img(ratio: ImageRatio, label: string, alt: string, caption?: string): ImageAsset {
  return {
    src: '',
    alt,
    ratio,
    caption,
    placeholderLabel: label,
  }
}

export const projects: Project[] = [
  {
    slug: 'villa-lithos',
    title: 'Villa Lithos',
    subtitle: 'A house of stone and shade',
    category: 'Residential',
    year: 2023,
    location: 'Paros, Greece',
    area: '240 m²',
    status: 'Completed',
    client: 'Private',
    collaborators: ['Example Engineering', 'Example Landscape'],
    photographer: 'Photographer Name',
    summary: 'A low stone house folded into a terraced hillside above the sea.',
    description: [
      'Villa Lithos sits within an existing terrace system, reusing the dry-stone walls as the spine of the plan. The house steps down the slope in three quiet volumes.',
      'Deep reveals and a pergola of untreated timber filter the strong summer light, so that rooms stay cool without mechanical help.',
    ],
    cover: img('4/5', 'Cover', 'Villa Lithos main façade in morning light'),
    gallery: [
      img('16/9', 'Gallery 01 — wide view from the sea', 'Villa Lithos seen from below'),
      img('4/5', 'Gallery 02 — entrance threshold', 'Entrance in stone and timber'),
      img('4/5', 'Gallery 03 — shaded terrace', 'The pergola-shaded terrace'),
      img('3/2', 'Gallery 04 — living room', 'Living room opening to the terrace', 'Living room'),
      img('1/1', 'Gallery 05 — stone detail', 'Detail of dry-stone wall'),
      img('16/9', 'Gallery 06 — dusk exterior', 'The house at dusk'),
    ],
    featured: true,
    order: 1,
  },
  {
    slug: 'house-in-the-olive-grove',
    title: 'House in the Olive Grove',
    category: 'Residential',
    year: 2022,
    location: 'Messinia, Greece',
    area: '180 m²',
    status: 'Completed',
    client: 'Private',
    photographer: 'Photographer Name',
    summary: 'A single-storey house arranged around a courtyard of old olive trees.',
    description: [
      'The house wraps three sides of a courtyard, leaving the oldest trees untouched. Every room has a view of the grove and a door into it.',
      'Lime-washed walls and a clay-tile roof keep the palette close to the surrounding farm buildings.',
    ],
    cover: img('3/4', 'Cover', 'House wrapping around the olive courtyard'),
    gallery: [
      img('21/9', 'Gallery 01 — panoramic courtyard', 'Courtyard and olive trees'),
      img('4/5', 'Gallery 02 — corridor light', 'Corridor with dappled light'),
      img('4/5', 'Gallery 03 — kitchen', 'Kitchen with lime-washed walls'),
      img('3/2', 'Gallery 04 — bedroom', 'Bedroom opening to the grove'),
      img('16/9', 'Gallery 05 — roofline', 'Clay-tile roofline against sky'),
    ],
    featured: true,
    order: 2,
  },
  {
    slug: 'atelier-nord',
    title: 'Atelier Nord',
    subtitle: 'Interior for a ceramicist',
    category: 'Interior',
    year: 2022,
    location: 'Athens, Greece',
    area: '95 m²',
    status: 'Completed',
    client: 'Atelier Nord',
    collaborators: ['Example Joinery'],
    photographer: 'Photographer Name',
    summary: 'A north-lit workshop and living space for a ceramic artist.',
    description: [
      'A former print shop becomes a workshop, gallery and home. A single long table organises the plan, serving as workbench, dining table and display.',
      'Fittings are made from oak and plaster, left unvarnished so that clay dust and daily use become part of the finish.',
    ],
    cover: img('4/5', 'Cover', 'Long oak table in the north-lit workshop'),
    gallery: [
      img('3/2', 'Gallery 01 — workshop overview', 'Workshop with long table'),
      img('4/5', 'Gallery 02 — shelving', 'Shelving with ceramic pieces'),
      img('4/5', 'Gallery 03 — kiln corner', 'Kiln corner'),
      img('1/1', 'Gallery 04 — material detail', 'Oak and plaster detail'),
      img('16/9', 'Gallery 05 — living area', 'Living area beyond the workshop'),
      img('3/4', 'Gallery 06 — window seat', 'Window seat in north light'),
    ],
    featured: true,
    order: 3,
  },
  {
    slug: 'pavilion-for-silence',
    title: 'Pavilion for Silence',
    category: 'Cultural',
    year: 2024,
    location: 'Delphi, Greece',
    area: '120 m²',
    status: 'In progress',
    client: 'Example Foundation',
    collaborators: ['Example Engineering'],
    summary: 'A small timber and concrete pavilion for contemplation near an archaeological site.',
    description: [
      'The pavilion is a single room with one opening, framing the valley below. Its thick concrete roof hovers on slender timber posts.',
      'Visitors enter through a low passage that compresses, then releases, the view.',
    ],
    cover: img('16/9', 'Cover', 'Pavilion roof over the valley'),
    gallery: [
      img('21/9', 'Gallery 01 — site view', 'Pavilion in its landscape'),
      img('4/5', 'Gallery 02 — entrance passage', 'The low entrance passage'),
      img('3/2', 'Gallery 03 — interior', 'Interior and framed view'),
      img('1/1', 'Gallery 04 — structure detail', 'Timber post and concrete roof'),
      img('3/4', 'Gallery 05 — model', 'Physical model of the pavilion'),
    ],
    featured: true,
    order: 4,
  },
  {
    slug: 'harbour-steps',
    title: 'Harbour Steps',
    subtitle: 'A public stair and seating edge',
    category: 'Public',
    year: 2021,
    location: 'Syros, Greece',
    status: 'Completed',
    client: 'Municipality of Example',
    photographer: 'Photographer Name',
    summary: 'A stepped public waterfront connecting the old town to the harbour.',
    description: [
      'Local marble steps double as seating, leading gently from the town square to the water. The design widens and narrows to create places to pause.',
      'Lighting is limited to low fixtures embedded in the risers, keeping the night view of the bay undisturbed.',
    ],
    cover: img('3/2', 'Cover', 'Marble steps descending to the harbour'),
    gallery: [
      img('16/9', 'Gallery 01 — from the water', 'Harbour steps from the water'),
      img('3/2', 'Gallery 02 — people seated', 'People sitting on the steps'),
      img('4/5', 'Gallery 03 — marble detail', 'Marble step edge'),
      img('4/5', 'Gallery 04 — night lighting', 'Steps lit at night'),
      img('1/1', 'Gallery 05 — plan drawing', 'Plan drawing of the steps'),
      img('21/9', 'Gallery 06 — wide dusk view', 'Wide view of the harbour at dusk'),
    ],
    featured: false,
    order: 5,
  },
  {
    slug: 'a-room-for-light',
    title: 'A Room for Light',
    category: 'Concept',
    year: 2020,
    location: 'Unbuilt',
    status: 'Concept',
    summary: 'A speculative study of a single room shaped entirely by daylight.',
    description: [
      'Conceived as a research piece, the room has no windows in the conventional sense. Light enters through a series of angled slots that trace the sun across the day.',
      'The study was exhibited as a full-scale timber model and a set of drawings.',
    ],
    cover: img('1/1', 'Cover', 'Model of the room with angled light slots'),
    gallery: [
      img('3/2', 'Gallery 01 — model overview', 'Full-scale timber model'),
      img('4/5', 'Gallery 02 — morning light', 'Light slot in the morning'),
      img('4/5', 'Gallery 03 — afternoon light', 'Light slot in the afternoon'),
      img('16/9', 'Gallery 04 — section drawing', 'Section drawing of the room'),
      img('3/4', 'Gallery 05 — exhibition view', 'Installation view'),
    ],
    featured: false,
    order: 6,
  },
]
