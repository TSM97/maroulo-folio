/**
 * About content. Placeholder text — replace with the real biography.
 *
 * Images: put files in `public/images/about/` and set `src` (e.g. '/images/about/portrait.webp').
 * Write a real `alt` and match `ratio` to the photo. Empty `src` shows a labelled placeholder.
 */
import type { AboutContent } from '@/types'

export const about: AboutContent = {
  name: 'Architect Name',
  role: 'Architect',
  portrait: {
    src: '',
    alt: 'Portrait of the architect at work',
    ratio: '3/4',
    placeholderLabel: 'Portrait — natural light, at work',
  },
  workspaceImage: {
    src: '',
    alt: 'The workspace with models and drawings on a long table',
    ratio: '21/9',
    placeholderLabel: 'Workspace — desk, models and drawings',
  },
  teaser:
    'An independent practice working across houses, interiors and small public buildings. Slow, material-led, and attentive to the quiet details.',
  bio: [
    'I started my independent practice in 2014 after a decade of working between Athens and Lisbon. I keep it deliberately small, so that every project receives direct, sustained attention.',
    'My work begins with a site and its light. Drawings and physical models are made side by side, and materials are chosen for how they age as much as for how they look on the day of completion.',
    'I collaborate closely with craftspeople, engineers and landscape designers, treating each building as a shared, patient effort.',
  ],
  philosophy: [
    {
      title: 'Listen first',
      text: 'Every site has a character before a building arrives. I begin by observing it for as long as it takes.',
    },
    {
      title: 'Less, but better',
      text: 'Restraint is not absence. I remove until what remains is necessary and sufficient.',
    },
    {
      title: 'Honest materials',
      text: 'Stone, timber, lime and glass — used plainly, left to age with grace.',
    },
    {
      title: 'Light as structure',
      text: 'Daylight shapes rooms as much as walls do. I design the hour of the day into each space.',
    },
  ],
  services: ['Architecture', 'Interior design', 'Renovation', 'Consulting'],
  recognition: [
    { year: 2024, title: 'Emerging Practice Award', publisher: 'Example Architecture Awards' },
    { year: 2023, title: 'House in the Olive Grove', publisher: 'Example Magazine' },
    { year: 2021, title: 'Selected Young Architects', publisher: 'Example Biennale' },
  ],
  timeline: [
    { year: '2014 — now', entry: 'Independent practice, Athens' },
    { year: '2008 — 2014', entry: 'Associate architect, Example Office, Lisbon' },
    { year: '2005 — 2008', entry: 'Junior architect, Example Studio, Athens' },
    { year: '2004', entry: 'Diploma in Architecture, Example University' },
  ],
}
