import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [react(), compression()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          animations: ['gsap', 'typed.js'],
        },
      }
    },
    minify: 'esbuild',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    copyPublicDir: true
  },
  server: {
    open: true,
    hmr: {
      overlay: true,
    },
  },
  css: {
    devSourcemap: true,
  },
  base: '/Portfolio-Website/',
});