import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  plugins: [
    tailwindcss(),
    svgr({
      exportAsDefault: true,
    }),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'VDB',
        short_name: 'VDB',
        description: 'Card search and deck building app for Vampire the Eternal Struggle (VTES).',
        lang: 'en-US',
        start_url: '/decks',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#404060',
        icons: [
          {
            src: 'icon192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icon192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'icon512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
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
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@icons', replacement: resolve(__dirname, 'node_modules/bootstrap-icons/icons') },
    ],
  },
  build: {
    chunkSizeWarningLimit: 1024,
  },
});
