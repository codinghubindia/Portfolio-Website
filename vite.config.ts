import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      fastRefresh: true,
      include: "**/*.{jsx,tsx}",
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: ['lucide-react'],
    force: true
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          animations: ['gsap', 'typed.js'],
          ui: ['@mui/material', '@emotion/react', '@emotion/styled'],
        },
      },
    },
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    copyPublicDir: true
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173,
      host: 'localhost',
    },
    watch: {
      usePolling: true,
      interval: 100
    },
    base: '/Portfolio-Website/',
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
  css: {
    devSourcemap: true,
  },
  base: '/Portfolio-Website/',
  define: {
    'process.env': process.env,
  },
});