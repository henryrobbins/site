import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://henryrobbins.com',
  vite: {
    plugins: [tailwind()],
    server: {
      allowedHosts: ['.ngrok-free.app'],
    },
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@content': '/src/content',
      }
    }
  },

  integrations: [react(), mdx()]
});
