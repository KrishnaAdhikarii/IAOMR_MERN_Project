import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // For development: proxy API calls to backend
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist', // Vite build output
  },
});