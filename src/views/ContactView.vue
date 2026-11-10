<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import AppLink from '@/components/ui/AppLink.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { useContactForm, type ContactField } from '@/composables/useContactForm'
import { vReveal } from '@/composables/useReveal'
import { site } from '@/data/site'

const page = site.contactPage

usePageMeta({ title: 'Contact', description: page.intro, path: '/contact' })

const { values, trap, errors, status, onFieldChange, submit, reset } = useContactForm()

const form = ref<HTMLFormElement | null>(null)
const feedback = ref<HTMLElement | null>(null)
const errorBanner = ref<HTMLElement | null>(null)
const sending = computed(() => status.value === 'sending')
const finished = computed(() => status.value === 'sent' || status.value === 'mailto')

async function onSubmit() {
  const firstInvalid = await submit()
  await nextTick()
  if (firstInvalid) {
    form.value?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
  } else if (status.value === 'error') {
    errorBanner.value?.focus()
  } else if (finished.value) {
    feedback.value?.focus()
  }
}

function describedBy(field: ContactField): string | undefined {
  return errors.value[field] ? `${field}-error` : undefined
}
</script>

<template>
  <main class="contact container">
    <header class="intro">
      <p class="eyebrow">Contact</p>
      <h1 class="display-xl">{{ page.headline }}</h1>
      <p class="body lead">{{ page.intro }}</p>
    </header>

    <div class="grid-12 content">
      <div v-reveal class="details">
        <p class="display-l">
          <AppLink :href="`mailto:${site.email}`">{{ site.email }}</AppLink>
        </p>
        <p class="heading phone">
          <AppLink :href="`tel:${site.phone.replace(/\s/g, '')}`">{{ site.phone }}</AppLink>
        </p>
        <address class="body">{{ site.address }}</address>
        <ul class="socials">
          <li v-for="social in site.socials" :key="social.label" class="body">
            <AppLink :href="social.url">{{ social.label }}</AppLink>
          </li>
        </ul>
      </div>

      <div v-reveal="150" class="form-wrap">
        <div v-if="finished" ref="feedback" class="feedback" tabindex="-1" role="status">
          <h2 class="display-l">{{ page.successTitle }}</h2>
          <p class="body">
            {{ status === 'mailto' ? page.mailtoText : page.successText }}
          </p>
          <button type="button" class="link-button body" @click="reset">
            Write another message
          </button>
        </div>

        <form v-if="!finished" ref="form" class="form" novalidate @submit.prevent="onSubmit">
          <p
            v-if="status === 'error'"
            ref="errorBanner"
            class="error-banner body"
            role="alert"
            tabindex="-1"
          >
            {{ page.errorText }}
          </p>

          <div class="field">
            <label for="contact-name" class="eyebrow">Name</label>
            <input
              id="contact-name"
              v-model="values.name"
              name="name"
              type="text"
              autocomplete="name"
              required
              :aria-invalid="!!errors.name"
              :aria-describedby="describedBy('name')"
              @blur="onFieldChange('name')"
              @input="onFieldChange('name')"
            />
            <p v-if="errors.name" id="name-error" class="error caption">{{ errors.name }}</p>
          </div>

          <div class="field">
            <label for="contact-email" class="eyebrow">Email</label>
            <input
              id="contact-email"
              v-model="values.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              :aria-invalid="!!errors.email"
              :aria-describedby="describedBy('email')"
              @blur="onFieldChange('email')"
              @input="onFieldChange('email')"
            />
            <p v-if="errors.email" id="email-error" class="error caption">{{ errors.email }}</p>
          </div>

          <div class="field">
            <label for="contact-type" class="eyebrow">Project type</label>
            <select
              id="contact-type"
              v-model="values.projectType"
              name="projectType"
              required
              :aria-invalid="!!errors.projectType"
              :aria-describedby="describedBy('projectType')"
              @change="onFieldChange('projectType')"
              @blur="onFieldChange('projectType')"
            >
              <option value="" disabled>Select…</option>
              <option v-for="type in page.projectTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
            <p v-if="errors.projectType" id="projectType-error" class="error caption">
              {{ errors.projectType }}
            </p>
          </div>

          <div class="field">
            <label for="contact-message" class="eyebrow">Message</label>
            <textarea
              id="contact-message"
              v-model="values.message"
              name="message"
              rows="4"
              required
              :aria-invalid="!!errors.message"
              :aria-describedby="describedBy('message')"
              @blur="onFieldChange('message')"
              @input="onFieldChange('message')"
            />
            <p v-if="errors.message" id="message-error" class="error caption">
              {{ errors.message }}
            </p>
          </div>

          <!-- Honeypot: hidden from people and assistive tech, tempting to bots. -->
          <div class="trap" aria-hidden="true">
            <label>
              Leave this empty
              <input v-model="trap" type="text" name="website" tabindex="-1" autocomplete="off" />
            </label>
          </div>

          <button type="submit" class="submit heading" :disabled="sending">
            {{ sending ? 'Sending…' : 'Send message' }}
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contact {
  padding-block: var(--space-8) var(--space-12);
}

.lead {
  max-width: 52ch;
  margin-top: var(--space-3);
  color: var(--color-stone);
}

.content {
  margin-top: var(--space-10);
  row-gap: var(--space-10);
}

.details,
.form-wrap {
  grid-column: 1 / -1;
}

.details {
  display: grid;
  align-content: start;
  gap: var(--space-3);
  overflow-wrap: anywhere;
}

.phone {
  margin-top: calc(var(--space-1) * -1);
}

.socials {
  display: flex;
  gap: var(--space-3);
  list-style: none;
}

.form {
  display: grid;
  gap: var(--space-5);
}

.field {
  display: grid;
  gap: var(--space-1);
}

input,
select,
textarea {
  width: 100%;
  padding: var(--space-1) 0;
  background: none;
  border: 0;
  border-bottom: 1px solid var(--color-ink);
  border-radius: 0;
  font-family: var(--font-body);
  font-size: var(--step-1);
  appearance: none;
  transition: border-color var(--dur-base) var(--ease-out);
}

select {
  cursor: pointer;
}

textarea {
  resize: vertical;
  min-height: 7rem;
}

input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: none;
  border-bottom-color: var(--color-accent);
  box-shadow: 0 1px 0 var(--color-accent);
}

[aria-invalid='true'] {
  border-bottom-color: var(--color-accent);
}

/* Accent #A0674B on bg is ~4.2:1 — error text uses ink for AA, with the accent as a rule. */
.error {
  color: var(--color-ink);
  padding-left: var(--space-1);
  border-left: 2px solid var(--color-accent);
}

.error-banner:focus {
  outline: none;
}

.error-banner {
  padding: var(--space-2);
  border: 1px solid var(--color-accent);
}

.trap {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.submit {
  justify-self: start;
  padding: var(--space-1) 0;
  background: none;
  border: 0;
  border-bottom: 1px solid var(--color-ink);
  cursor: pointer;
  transition: opacity var(--dur-base) var(--ease-out);
}

.submit:disabled {
  opacity: 0.5;
  cursor: progress;
}

.submit:focus-visible,
.link-button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.feedback {
  display: grid;
  gap: var(--space-3);
  justify-items: start;
}

.feedback:focus {
  outline: none;
}

.link-button {
  padding: 0;
  background: none;
  border: 0;
  border-bottom: 1px solid currentColor;
  cursor: pointer;
}

@media (min-width: 768px) {
  .details {
    grid-column: 1 / span 5;
  }

  .form-wrap {
    grid-column: 7 / span 6;
  }
}
</style>
