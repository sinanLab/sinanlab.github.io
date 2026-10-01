import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync } from 'node:fs';

const base = process.env.TEST_BASE_PATH || '/';
const buildDir = base === '/' ? 'dist' : 'dist-subpath';
const routes = readdirSync(buildDir, { recursive: true }).map(String).filter(path => path.endsWith('index.html')).map(path => path.replaceAll('\\', '/').replace(/index\.html$/, '')).sort();

test('every page, internal link, and asset resolves under the configured base', async ({ page, request, baseURL }) => {
  const urls = new Set<string>();
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const route of routes) {
    const response = await page.goto(route || './');
    expect(response?.ok(), route).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(new URL(canonical!).pathname).toBe(`${base}${route}`);
    const resources = await page.locator('a[href], img[src], script[src], link[rel="stylesheet"], link[rel="icon"]').evaluateAll(elements => elements.map(element => element.getAttribute('href') || element.getAttribute('src')).filter(Boolean));
    for (const resource of resources) {
      if (/^(https?:|mailto:|tel:)/.test(resource!) || resource!.startsWith('#')) continue;
      const url = new URL(resource!, page.url());
      expect(url.pathname.startsWith(base), `${route}: ${resource}`).toBeTruthy();
      urls.add(url.href);
    }
    for (const href of await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!))) {
      expect(await page.evaluate(id => !!document.getElementById(id), decodeURIComponent(href.slice(1))), `${route}: ${href}`).toBeTruthy();
    }
    const social = await page.locator('meta[property="og:image"]').getAttribute('content');
    urls.add(new URL(new URL(social!).pathname, baseURL).href);
  }
  for (const url of urls) expect((await request.get(url)).ok(), url).toBeTruthy();
  expect(errors).toEqual([]);
});

test('desktop navigation identifies the active page', async ({ page }) => {
  await page.goto('./');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  for (const label of ['Research', 'Publications', 'Projects', 'Blog', 'CV', 'Contact', 'Home']) {
    await nav.getByRole('link', { name: label, exact: true }).click();
    await expect(nav.getByRole('link', { name: label, exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
  }
});

test('theme follows the system, persists, and can be overridden', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await page.goto('research/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('theme remains usable when local storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage unavailable'); } }); });
  await page.goto('./');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('publication search, combined filters, empty state, and reset', async ({ page }) => {
  await page.goto('publications/');
  const entries = page.locator('[data-publication]:visible');
  const count = await entries.count();
  test.skip(count === 0, 'No publications to filter yet.');
  const initialStatus = await page.locator('#results-count').textContent();
  const first = entries.first();
  const title = await first.locator('h3').innerText();
  const year = await first.getAttribute('data-year');
  const type = await first.getAttribute('data-type');
  await page.getByRole('searchbox').fill(title.toUpperCase());
  await page.getByLabel('Year', { exact: true }).selectOption(year!);
  await page.getByLabel('Publication type', { exact: true }).selectOption(type!);
  expect(await entries.count()).toBeGreaterThan(0);
  await page.getByRole('searchbox').fill('no-such-paper');
  await expect(entries).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'No matching publications' })).toBeVisible();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(entries).toHaveCount(count);
  await expect(page.getByRole('searchbox')).toHaveValue('');
  await expect(page.locator('#results-count')).toHaveText(initialStatus!);
});

test('abstract disclosure and BibTeX copying work', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('publications/');
  const entry = page.locator('[data-publication]').first();
  test.skip(await entry.count() === 0, 'No publications yet.');
  await entry.locator('summary').filter({ hasText: /^Abstract$/ }).click();
  await expect(entry.locator('details').first().locator('p')).toBeVisible();
  await entry.locator('summary').filter({ hasText: /^BibTeX$/ }).click();
  await entry.getByRole('button', { name: 'Copy BibTeX' }).click();
  await expect(entry.getByText('Citation copied.')).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(await entry.locator('pre').textContent());
});

test('clipboard failure leaves a usable selected citation', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => { throw new Error('Denied'); } } }));
  await page.goto('publications/');
  const entry = page.locator('[data-publication]').first();
  test.skip(await entry.count() === 0, 'No publications yet.');
  await entry.locator('summary').filter({ hasText: /^BibTeX$/ }).click();
  await entry.getByRole('button', { name: 'Copy BibTeX' }).click();
  await expect(entry.getByText('Copy unavailable.', { exact: false })).toBeVisible();
  expect(await page.evaluate(() => getSelection()?.toString())).toBe(await entry.locator('pre').textContent());
});

test('mobile navigation is keyboard accessible and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).not.toBeVisible();
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Research', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${base}research/$`));
});

test('all pages fit phone, tablet, and desktop widths', async ({ page }) => {
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route || './');
      const sizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: window.innerWidth }));
      expect(sizes.scroll, `${route} at ${width}px`).toBeLessThanOrEqual(sizes.viewport);
    }
  }
});

test('pages pass automated WCAG checks in light and dark themes', async ({ page }) => {
  test.setTimeout(90_000);
  for (const scheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: scheme });
    for (const route of routes) {
      await page.goto(route || './');
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(result.violations, `${route} (${scheme})`).toEqual([]);
    }
  }
});

test('content, mobile navigation, and abstracts work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${baseURL}publications/`);
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(page.locator('.filter-bar')).not.toBeVisible();
  const entry = page.locator('[data-publication]').first();
  if (await entry.count()) {
    await entry.locator('summary').filter({ hasText: /^Abstract$/ }).click();
    await expect(entry.locator('details').first().locator('p')).toBeVisible();
  }
  await context.close();
});

test('skip link works and reduced motion disables transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  expect(await page.locator('.button-primary').evaluate(element => getComputedStyle(element).transitionDuration)).toBe('0s');
});

test('capture desktop, mobile, and dark previews', async ({ page }, testInfo) => {
  await page.goto('./');
  await page.screenshot({ path: testInfo.outputPath('home-desktop.png'), fullPage: true, animations: 'disabled' });
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await page.screenshot({ path: testInfo.outputPath('home-dark.png'), fullPage: true, animations: 'disabled' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await page.screenshot({ path: testInfo.outputPath('home-mobile.png'), fullPage: true, animations: 'disabled' });
});
