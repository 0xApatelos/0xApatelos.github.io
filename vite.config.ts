/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Allow Arena's proxied previews without opening the host allowlist to everyone.
const previewNetwork = { host: '0.0.0.0', allowedHosts: ['.e2b.app'] };

// https://vitejs.dev/config/
export default defineConfig({
  server: previewNetwork,
  preview: previewNetwork,
  plugins: [react()],
  // Relative base so the site works from any GitHub Pages path.
  base: './',
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
