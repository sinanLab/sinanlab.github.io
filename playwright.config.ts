import { defineConfig } from '@playwright/test';

const base = process.env.TEST_BASE_PATH || '/';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  timeout: 30_000,
  reporter: 'list',
  use: {
    baseURL: `http://127.0.0.1:4322${base}`,
    browserName: 'chromium',
    viewport: { width: 1440, height: 1000 },
    colorScheme: 'light',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --ignore-lock --host 127.0.0.1 --port 4322',
    url: `http://127.0.0.1:4322${base}`,
    reuseExistingServer: false,
    env: { BASE_PATH: base, OUT_DIR: base === '/' ? './dist' : './dist-subpath' },
  },
});
