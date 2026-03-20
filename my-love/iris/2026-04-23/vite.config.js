import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Vite configuration tailored for a small Vue 3 single-page experience.
export default defineConfig({
  plugins: [vue()],
  base: '/my-love/iris/2026-03-19/dist/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
