// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://sjdinterior.com',
  output: 'server',
  adapter: node({ mode: 'middleware' }),
  integrations: [preact(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: true
    }
  }
});