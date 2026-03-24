import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**/*.ts'],
    },
    // exclude: ['dist', 'node_modules', 'tmp'],
    include: ['src/test/**/*.test.ts'],
  },
})
