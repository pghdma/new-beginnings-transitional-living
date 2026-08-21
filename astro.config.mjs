import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://newbeginningspgh.org',
  output: 'static',
  trailingSlash: 'always',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [icon({ include: { lucide: ['*'] } }), sitemap()],
  build: { format: 'directory', assets: '_astro', inlineStylesheets: 'always' },
  vite: { build: { assetsInlineLimit: 0 } }
});
