import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    proxy: {
      // Avoid CORS in local dev by proxying API requests through Vite.
      // Frontend should call `/api/v1/...` (same-origin) instead of the absolute host.
      '/api/v1': {
        target: 'https://white-seahorse-266682.hostingersite.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
