import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_PORT || 5173,
    host: true,
  },
  preview: {
    port: 3000,
    host: true,
    strictPort: false,
    cors: true,
    // Agregamos esta línea para autorizar el dominio de Render
    allowedHosts: ['frontend-hotandcold.onrender.com'],
  },
})
