/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
    include: [
      './src/**/*.{test,spec}.js',
      './tests/**/*.{test,spec}.js'
    ],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/setup.ts',
      ],
    },
  },
});