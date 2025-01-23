import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import legacy from '@vitejs/plugin-legacy';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [
    tailwindcss(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      renderLegacyChunks: true,
      modernPolyfills: true,
    }),
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
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@icons', replacement: resolve(__dirname, 'node_modules/bootstrap-icons/icons') },
    ],
  },
  build: {
    chunkSizeWarningLimit: 1024,
  },
});
