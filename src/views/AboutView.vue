<script setup lang="ts">
import { useHead } from '@unhead/vue'
import ArchImage from '@/components/ui/ArchImage.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { vReveal } from '@/composables/useReveal'
import { about } from '@/data/about'

useHead({
  title: 'About',
  meta: [{ name: 'description', content: about.teaser }],
})

function pad(n: number): string {
  return String(n).padStart(2, '0')
}
</script>

<template>
  <main class="about">
    <section class="opening container">
      <div class="grid-12">
        <div v-reveal class="portrait">
          <ArchImage :image="about.portrait" sizes="(min-width: 768px) 40vw, 100vw" eager />
        </div>
        <div v-reveal="150" class="intro">
          <p class="eyebrow">About</p>
          <h1 class="display-xl">{{ about.name }}</h1>
          <p class="heading role">{{ about.role }}, founder</p>
        </div>
      </div>
    </section>

    <section class="bio container" aria-label="Biography">
      <div class="grid-12">
        <div v-reveal class="bio-text stack">
          <p v-for="(paragraph, i) in about.bio" :key="i" class="body">{{ paragraph }}</p>
        </div>
      </div>
    </section>

    <section class="philosophy container" aria-label="Philosophy">
      <SectionTitle title="Approach" eyebrow="Philosophy" />
      <ol class="principles">
        <li
          v-for="(principle, i) in about.philosophy"
          :key="principle.title"
          v-reveal
          class="principle"
        >
          <span class="eyebrow number">{{ pad(i + 1) }}</span>
          <h3 class="heading">{{ principle.title }}</h3>
          <p class="body">{{ principle.text }}</p>
        </li>
      </ol>
    </section>

    <section class="split container" aria-label="Services">
      <SectionTitle title="Services" eyebrow="Practice" />
      <ul v-reveal class="list services">
        <li v-for="service in about.services" :key="service" class="heading row">
          {{ service }}
        </li>
      </ul>
    </section>

    <section class="split container" aria-label="Recognition">
      <SectionTitle title="Recognition" eyebrow="Awards & publications" />
      <ul v-reveal class="list">
        <li v-for="item in about.recognition" :key="item.title" class="row recognition">
          <span class="caption">{{ item.year }}</span>
          <span class="body">{{ item.title }}</span>
          <span class="caption publisher">{{ item.publisher }}</span>
        </li>
      </ul>
    </section>

    <section class="split container" aria-label="Timeline">
      <SectionTitle title="Timeline" eyebrow="Education & career" />
      <ul v-reveal class="list">
        <li v-for="item in about.timeline" :key="item.year" class="row timeline">
          <span class="caption">{{ item.year }}</span>
          <span class="body">{{ item.entry }}</span>
        </li>
      </ul>
    </section>

    <div v-reveal class="workspace container">
      <ArchImage :image="about.workspaceImage" sizes="100vw" />
    </div>
  </main>
</template>

<style scoped>
.opening {
  padding-block: var(--space-8) var(--space-10);
}

.opening .grid-12 {
  row-gap: var(--space-6);
  align-items: end;
}

.portrait,
.intro {
  grid-column: 1 / -1;
}

.role {
  margin-top: var(--space-2);
  color: var(--color-stone);
}

.bio {
  padding-bottom: var(--space-12);
}

.bio-text {
  grid-column: 1 / -1;
  max-width: 62ch;
}

.philosophy,
.split {
  padding-block: var(--space-8);
}

.principles {
  margin: var(--space-6) 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  border-top: 1px solid var(--color-line);
}

.principle {
  display: grid;
  gap: var(--space-1);
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--color-line);
}

.number {
  color: var(--color-accent);
}

.list {
  margin: var(--space-6) 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--color-line);
}

.row {
  padding-block: var(--space-2);
  border-bottom: 1px solid var(--color-line);
}

.recognition,
.timeline {
  display: grid;
  gap: var(--space-1) var(--space-3);
}

.workspace {
  padding-block: var(--space-8) var(--space-12);
}

@media (min-width: 768px) {
  .portrait {
    grid-column: 1 / span 5;
  }

  .intro {
    grid-column: 7 / span 6;
  }

  .bio-text {
    grid-column: 7 / span 6;
  }

  .principles {
    grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid var(--color-line);
  }

  .principle {
    align-content: start;
    padding: var(--space-4) var(--space-3) var(--space-4) 0;
    border-bottom: 0;
  }

  .principle + .principle {
    padding-left: var(--space-3);
    border-left: 1px solid var(--color-line);
  }

  .split {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--gutter);
  }

  .split > :first-child {
    grid-column: 1 / span 4;
  }

  .split .list {
    grid-column: 6 / span 7;
    margin-top: 0;
  }

  .recognition {
    grid-template-columns: 5rem 1fr auto;
    align-items: baseline;
  }

  .timeline {
    grid-template-columns: 10rem 1fr;
    align-items: baseline;
  }
}
</style>
