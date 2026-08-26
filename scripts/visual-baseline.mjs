// Full-page screenshots of every sitemap route at desktop and phone widths, for before/after diffs.
// Usage: node scripts/visual-baseline.mjs <outDir> [baseUrl]
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const out = process.argv[2]; const base = (process.argv[3] || 'http://127.0.0.1:4399').replace(/\/$/, '');
fs.mkdirSync(out, { recursive: true });
const sitemap = fs.readdirSync('dist').filter((f) => /^sitemap-\d+\.xml$/.test(f)).map((f) => fs.readFileSync(`dist/${f}`, 'utf8')).join('\n');
const routes = [...sitemap.matchAll(/<loc>https:\/\/newbeginningspgh\.org([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/chromium', args: ['--no-sandbox', '--disable-gpu'] });
for (const route of routes) {
  for (const [tag, width, mobile] of [['desk', 1440, false], ['mob', 390, true]]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900, isMobile: mobile, hasTouch: mobile });
    await page.goto(`${base}${route}`, { waitUntil: 'networkidle0' });
    await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; animation: none !important; } iframe { visibility: hidden !important; }' });
    await page.evaluate(() => document.fonts.ready);
    const name = (route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '-'));
    await page.screenshot({ path: `${out}/${name}-${tag}.png`, fullPage: true });
    await page.close();
  }
}
await browser.close();
console.log('captured', routes.length * 2, 'screenshots to', out);
