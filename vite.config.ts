import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-gsap': ['gsap'],
          'vendor-mui': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'vendor-animation': ['framer-motion', 'typed.js', 'split-type'],
        }
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