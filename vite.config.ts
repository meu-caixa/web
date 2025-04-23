/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      exclude: ['src/test/**', 'src/main.tsx'],
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
