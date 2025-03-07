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
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            if (id.includes('lucide')) {
              return 'vendor-icons';
            }
            return 'vendor';
          }
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000
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
  base: '/REPO/',
});