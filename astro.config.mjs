import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://henryrobbins.com',
  vite: {
    server: {
      allowedHosts: ['.ngrok-free.app'],
    },
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@content': '/src/content',
      }
    }
  },
});
