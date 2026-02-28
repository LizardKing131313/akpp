import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import nPlugin from 'eslint-plugin-n'
import perfectionist from 'eslint-plugin-perfectionist'
import promise from 'eslint-plugin-promise'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

const nuxtAutoImports = {
  $fetch: 'readonly',
  abortNavigation: 'readonly',
  addRouteMiddleware: 'readonly',
  clearError: 'readonly',
  createError: 'readonly',
  defineNuxtComponent: 'readonly',
  defineNuxtPlugin: 'readonly',
  defineNuxtRouteMiddleware: 'readonly',
  definePageMeta: 'readonly',
  navigateTo: 'readonly',
  onBeforeRouteLeave: 'readonly',
  onBeforeRouteUpdate: 'readonly',
  prefetchComponents: 'readonly',
  preloadComponents: 'readonly',
  refreshNuxtData: 'readonly',
  setPageLayout: 'readonly',
  showError: 'readonly',
  updateAppConfig: 'readonly',
  useAppConfig: 'readonly',
  useAsyncData: 'readonly',
  useCookie: 'readonly',
  useError: 'readonly',
  useFetch: 'readonly',
  useHead: 'readonly',
  useLazyAsyncData: 'readonly',
  useLazyFetch: 'readonly',
  useNuxtApp: 'readonly',
  useNuxtData: 'readonly',
  useRequestEvent: 'readonly',
  useRequestHeaders: 'readonly',
  useRoute: 'readonly',
  useRouter: 'readonly',
  useRuntimeConfig: 'readonly',
  useSeoMeta: 'readonly',
  useState: 'readonly',
}

export default [
  {
    ignores: ['**/.nuxt/**', '**/.output/**', '**/dist/**', '**/node_modules/**', '**/coverage/**'],
  },
  {
    files: ['apps/web/**/*.{ts,tsx,js,jsx,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        project: ['apps/web/tsconfig.eslint.json'],
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...nuxtAutoImports,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      n: nPlugin,
      perfectionist,
      promise,
      sonarjs,
      unicorn,
      vue: vuePlugin,
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      'import/no-unresolved': 'off',
      'import/order': 'off',

      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          newlinesBetween: 1,
          groups: [
            'type',
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index'],
            'side-effect',
            'unknown',
          ],
        },
      ],
      'perfectionist/sort-named-imports': ['error', { type: 'natural', order: 'asc' }],

      'promise/catch-or-return': 'error',
      'promise/no-nesting': 'warn',
      'promise/no-return-wrap': 'error',

      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-ternary': 'warn',
      'unicorn/no-null': 'off',

      'vue/no-mutating-props': 'error',
      'vue/no-unused-components': 'error',
      'vue/no-unused-vars': 'error',
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'off',

      'sonarjs/no-duplicate-string': ['warn', { threshold: 3 }],
      'sonarjs/no-identical-functions': 'warn',
      'sonarjs/no-redundant-boolean': 'warn',
      'sonarjs/cognitive-complexity': ['warn', 20],
    },
  },
]
