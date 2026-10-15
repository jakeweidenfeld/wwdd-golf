import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // In development the API runs separately (npm run dev:api); the proxy keeps everything on one origin.
  server: { proxy: { '/api': 'http://localhost:3001' } },
})
