import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    svgr({
      exportAsDefault: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1024,
  },
});
