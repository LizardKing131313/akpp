import { defineVitestProject } from '@nuxt/test-utils/config'
import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig } from 'vitest/config'

const appRootDir = fileURLToPath(new URL('./', import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '#server': fileURLToPath(new URL('./server', import.meta.url)),
      '#shared': fileURLToPath(new URL('./shared', import.meta.url)),
      '~': fileURLToPath(new URL('./app', import.meta.url)),
      '@': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      include: [
        'app/composables/pageHeader.ts',
        'app/composables/pageSeo.ts',
        'server/routes/**/*.ts',
        'server/utils/**/*.ts',
        'shared/lib/**/*.ts',
      ],
    },
    exclude: [...configDefaults.exclude, 'test/e2e/**'],
    projects: [
      {
        test: {
          environment: 'node',
          include: ['test/unit/**/*.spec.ts'],
          name: 'unit',
        },
      },
      {
        test: {
          environment: 'node',
          include: ['test/e2e/**/*.spec.ts'],
          name: 'e2e',
        },
      },
      await defineVitestProject({
        test: {
          environment: 'nuxt',
          environmentOptions: {
            nuxt: {
              rootDir: appRootDir,
            },
          },
          include: ['test/nuxt/**/*.spec.ts'],
          name: 'nuxt',
        },
      }),
    ],
  },
})
