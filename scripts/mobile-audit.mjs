// Mobile layout audit. Usage: node scripts/mobile-audit.mjs [baseUrl] [width]
// Measures the things that make a phone layout feel broken: a layout viewport wider than the
// screen (the browser scales everything down), header lockup vs. menu button, sections that mix
// centered and left-aligned text, body copy under 16px, and tap targets under 24px / 44px.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const base = (process.argv[2] || 'http://127.0.0.1:4399').replace(/\/$/, '');
const width = Number(process.argv[3] || 390);
const executablePath = process.env.CHROME_PATH || '/usr/bin/chromium';
const sitemap = fs.readdirSync('dist').filter((f) => /^sitemap-\d+\.xml$/.test(f)).map((f) => fs.readFileSync(`dist/${f}`, 'utf8')).join('\n');
const routes = [...sitemap.matchAll(/<loc>https:\/\/newbeginningspgh\.org([^<]*)<\/loc>/g)].map((m) => m[1] || '/');

const browser = await puppeteer.launch({ executablePath, args: ['--no-sandbox', '--disable-gpu'] });
let failures = 0;
for (const route of routes) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${base}${route}?audit=${Date.now()}`, { waitUntil: 'networkidle0' });
  const r = await page.evaluate(() => {
    const vis = (el) => { const b = el.getBoundingClientRect(); const cs = getComputedStyle(el); return b.width > 0 && b.height > 0 && cs.visibility !== 'hidden'; };
    const label = (el) => el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.split(' ')[0] : '');
    const logo = document.querySelector('.wordmark svg'); const menu = document.querySelector('.menu-button');
    const lb = logo?.getBoundingClientRect(); const mb = menu?.getBoundingClientRect();
    const sections = [...document.querySelectorAll('main section')].map((s) => {
      const els = [...s.querySelectorAll('h1,h2,h3,p')].filter(vis);
      const aligns = new Set(els.map((el) => getComputedStyle(el).textAlign.replace('start', 'left')));
      return { name: (s.querySelector('h1,h2')?.textContent || s.className || '').trim().slice(0, 40), aligns: [...aligns] };
    }).filter((s) => s.aligns.length > 1);
    const small = {};
    for (const el of document.querySelectorAll('main p, main li, main dd, main dt')) {
      if (!vis(el) || el.textContent.trim().length < 25 || el.classList.contains('eyebrow') || getComputedStyle(el).textTransform === 'uppercase') continue;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < 16) { const k = `${label(el.closest('section') || el.parentElement)} > ${label(el)}`; small[k] = small[k] ? { ...small[k], n: small[k].n + 1 } : { px: +fs.toFixed(1), n: 1 }; }
    }
    const targets = [...document.querySelectorAll('a, button, summary, input, select, textarea')].filter((el) => vis(el) && !el.closest('p, .copyright') && !(el.matches('input[type=radio], input[type=checkbox]') && el.closest('label')));
    const under = (min) => targets.filter((el) => { const b = el.getBoundingClientRect(); return b.height < min || b.width < min; }).map((el) => `${label(el)} "${el.textContent.trim().slice(0, 24)}" ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`);
    return {
      layoutWidth: document.documentElement.clientWidth, innerWidth,
      scrollWidth: document.scrollingElement.scrollWidth,
      logo: lb ? { w: Math.round(lb.width), h: Math.round(lb.height), pct: Math.round((lb.width / innerWidth) * 100) } : null,
      menu: mb ? { w: Math.round(mb.width), h: Math.round(mb.height), onScreen: mb.right <= innerWidth + 1 && mb.width >= 44 } : null,
      mixedSections: sections, smallText: small, under24: under(24), under44: under(44),
    };
  });
  const problems = [];
  if (r.innerWidth !== width || r.scrollWidth > width) problems.push(`layout viewport ${r.innerWidth}px / scroll width ${r.scrollWidth}px (screen ${width}px)`);
  if (r.menu && !r.menu.onScreen) problems.push(`menu button ${r.menu.w}x${r.menu.h} not fully on screen`);
  if (r.logo && r.logo.pct > 60) problems.push(`logo takes ${r.logo.pct}% of viewport`);
  if (r.mixedSections.length) problems.push(`mixed alignment: ${r.mixedSections.map((s) => `"${s.name}" (${s.aligns.join('+')})`).join('; ')}`);
  if (Object.keys(r.smallText).length) problems.push(`text under 16px: ${Object.entries(r.smallText).map(([k, v]) => `${k} ${v.px}px x${v.n}`).join('; ')}`);
  if (r.under24.length) problems.push(`tap targets under 24px: ${r.under24.join('; ')}`);
  console.log(`${problems.length ? 'FAIL' : 'ok  '} ${route}  logo ${r.logo?.w}x${r.logo?.h} (${r.logo?.pct}%)  menu ${r.menu?.w}x${r.menu?.h}  under44: ${r.under44.length}`);
  for (const p of problems) console.log(`      - ${p}`);
  if (r.under44.length && process.env.VERBOSE) for (const t of r.under44) console.log(`        44: ${t}`);
  failures += problems.length;
  await page.close();
}
await browser.close();
if (failures) process.exitCode = 1;
