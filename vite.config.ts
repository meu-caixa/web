/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@routes': '/src/routes',
      '@pages': '/src/pages',
      '@hooks': '/src/hooks',
      '@api': '/src/api',
    },
  },
})
