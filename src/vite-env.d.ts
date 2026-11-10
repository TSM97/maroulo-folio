/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Form service URL (Formspree, Web3Forms, ...). Empty = fall back to a mailto: link. */
  readonly VITE_FORM_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
