import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    svgr({
      exportAsDefault: true,
    }),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'VDB',
        short_name: 'VDB',
        description:
          'Card search and deck building app for Vampire the Eternal Struggle (VTES).',
        lang: 'en-US',
        start_url: '/crypt',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#404060',
        icons: [
          {
            src: 'icon512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
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
