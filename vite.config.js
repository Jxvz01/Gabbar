import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    chunkSizeWarningLimit: 1000, // 🦇 Increase limit for GABBAR's cinematic UI
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 📦 Optimize manual chunks for better caching and performance
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'framer'
            if (id.includes('lucide-react')) return 'icons'
            if (id.includes('@supabase')) return 'supabase'
            return 'vendor' // Other libraries
          }
        }
      }
    }
  }
})
