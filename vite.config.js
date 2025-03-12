import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Generate a timestamp for cache busting
const timestamp = new Date().getTime();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    strictPort: false,
    open: true
  },
  preview: {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.jpg') || assetInfo.name.endsWith('.png') || assetInfo.name.endsWith('.svg')) {
            return 'assets/images/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
        chunkFileNames: `assets/[name].[hash].js`,
        entryFileNames: `assets/[name].[hash].js`
      }
    }
  }
})
