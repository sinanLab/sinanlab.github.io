import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import markdownBasePath from './scripts/markdown-base-path.mjs';

const base = `/${(process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '')}`;

export default defineConfig({
  site: process.env.SITE_URL || 'https://example.github.io',
  base: base === '/' ? '/' : `${base}/`,
  output: 'static',
  outDir: process.env.OUT_DIR || './dist',
  trailingSlash: 'always',
  // Allow a Windows browser to reach the preview through the WSL IP address.
  server: { host: '0.0.0.0', port: 4321 },
  devToolbar: { enabled: false },
  markdown: { processor: satteri({ hastPlugins: [markdownBasePath(base)] }) },
});
