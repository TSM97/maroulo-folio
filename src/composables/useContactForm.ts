import { computed, reactive, ref } from 'vue'
import { site } from '@/data/site'

export type ContactField = 'name' | 'email' | 'projectType' | 'message'
export type ContactStatus = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

export type ContactValues = Record<ContactField, string>
type ContactErrors = Partial<Record<ContactField, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (!values.name.trim()) errors.name = 'Please tell me your name.'
  if (!values.email.trim()) errors.email = 'Please add your email so I can reply.'
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = 'This email address looks incomplete.'
  if (!values.projectType) errors.projectType = 'Please choose a project type.'
  if (values.message.trim().length < 10)
    errors.message = 'A few more words, please — at least 10 characters.'
  return errors
}

function buildMailto(values: ContactValues): string {
  const subject = `${values.projectType} enquiry from ${values.name.trim()}`
  const body = `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** State, validation and submission for the contact form. */
export function useContactForm() {
  const values = reactive<ContactValues>({ name: '', email: '', projectType: '', message: '' })
  /** Honeypot: real visitors never see or fill this. */
  const trap = ref('')
  const errors = ref<ContactErrors>({})
  const status = ref<ContactStatus>('idle')
  const touched = ref(false)

  const endpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim()
  const errorCount = computed(() => Object.keys(errors.value).length)

  function validateField(field: ContactField) {
    const message = validate(values)[field]
    const next = { ...errors.value }
    if (message) next[field] = message
    else delete next[field]
    errors.value = next
  }

  /** Re-validate on blur/input, but only once the field has been flagged or the form was submitted. */
  function onFieldChange(field: ContactField) {
    if (touched.value || errors.value[field]) validateField(field)
  }

  async function submit(): Promise<ContactField | null> {
    touched.value = true
    errors.value = validate(values)
    const firstInvalid = (Object.keys(errors.value) as ContactField[])[0] ?? null
    if (firstInvalid) return firstInvalid

    if (trap.value) {
      status.value = 'sent' // Looks successful to bots; nothing is sent.
      return null
    }

    if (!endpoint) {
      window.location.href = buildMailto(values)
      status.value = 'mailto'
      return null
    }

    status.value = 'sending'
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          projectType: values.projectType,
          message: values.message.trim(),
        }),
      })
      if (!response.ok) throw new Error(`Form service responded ${response.status}`)
      status.value = 'sent'
    } catch {
      status.value = 'error'
    }
    return null
  }

  function reset() {
    values.name = ''
    values.email = ''
    values.projectType = ''
    values.message = ''
    errors.value = {}
    touched.value = false
    status.value = 'idle'
  }

  return { values, trap, errors, errorCount, status, onFieldChange, submit, reset }
}
