import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Proxy API + uploaded files to the Express server during development,
// so the browser sees everything on one origin (no CORS setup needed).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
});
