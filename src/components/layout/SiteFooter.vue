<script setup lang="ts">
import AppLink from '@/components/ui/AppLink.vue'
import { site } from '@/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <hr class="hairline" />
    <div class="container inner">
      <p class="display-l closing">{{ site.closingLine }}</p>

      <div class="grid-12 columns">
        <address class="col contact body">
          <p class="eyebrow">Contact</p>
          <p>
            <AppLink :href="`mailto:${site.email}`">{{ site.email }}</AppLink>
          </p>
          <p>
            <AppLink :href="`tel:${site.phone.replace(/\s/g, '')}`">{{ site.phone }}</AppLink>
          </p>
          <p>{{ site.address }}</p>
        </address>

        <div class="col socials body">
          <p class="eyebrow">Follow</p>
          <ul>
            <li v-for="social in site.socials" :key="social.url">
              <AppLink :href="social.url">{{ social.label }}</AppLink>
            </li>
          </ul>
        </div>

        <p class="col copyright caption">© {{ year }} {{ site.name }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: var(--space-12);
}

.inner {
  padding-block: var(--space-8) var(--space-6);
}

.closing {
  max-width: 24ch;
  margin-bottom: var(--space-8);
}

.columns {
  row-gap: var(--space-5);
}

.col {
  grid-column: 1 / -1;
  font-style: normal;
}

.contact p + p,
.socials li {
  margin-top: var(--space-1);
}

.eyebrow {
  margin-bottom: var(--space-2);
}

.copyright {
  align-self: end;
}

@media (min-width: 768px) {
  .contact {
    grid-column: 1 / span 5;
  }

  .socials {
    grid-column: 6 / span 4;
  }

  .copyright {
    grid-column: 10 / span 3;
    text-align: right;
  }
}
</style>
