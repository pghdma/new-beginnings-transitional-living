import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://newbeginningspgh.org',
  output: 'static',
  trailingSlash: 'always',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [sitemap()],
  build: { format: 'directory', assets: '_astro', inlineStylesheets: 'always' },
  vite: { build: { assetsInlineLimit: 0 } }
});
