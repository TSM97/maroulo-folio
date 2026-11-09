import { defineConfig, globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  pluginVue.configs['flat/recommended'],
  vueTsEslintConfig(),
  skipFormatting,
  {
    rules: {
      // Single-word names (Lightbox, Cursor) are intentional per PORTFOLIO_PLAN.md.
      'vue/multi-word-component-names': 'off',
    },
  },
])
