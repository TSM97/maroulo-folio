<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import { site } from '@/data/site'
import AboutTeaser from '@/components/home/AboutTeaser.vue'
import ContactCta from '@/components/home/ContactCta.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import SelectedWorks from '@/components/home/SelectedWorks.vue'
import StatementSection from '@/components/home/StatementSection.vue'

usePageMeta({ description: site.tagline, path: '/' })
</script>

<template>
  <main>
    <HeroSection />
    <StatementSection />
    <SelectedWorks />
    <AboutTeaser />
    <ContactCta />
  </main>
</template>
