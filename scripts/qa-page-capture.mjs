import { writeFile } from 'node:fs/promises';

const [route = '/', widthArg = '1440', heightArg = '900', label = 'page', portArg] = process.argv.slice(2);
const width = Number(widthArg);
const height = Number(heightArg);
const debugPort = portArg || process.env.NBTS_CHROME_PORT || '9222';
const target = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: 'PUT' }).then((response) => response.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
let nextId = 1;

socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result ?? {});
});

await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = nextId++;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width < 600,
  screenWidth: width,
  screenHeight: height,
});
await send('Page.navigate', { url: new URL(route, 'http://127.0.0.1:4321').href });
await new Promise((resolve) => setTimeout(resolve, 1300));
await send('Runtime.evaluate', {
  expression: 'document.fonts.ready.then(() => new Promise(resolve => setTimeout(resolve, 250)))',
  awaitPromise: true,
});

await send('Runtime.evaluate', {
  expression: `new Promise(async (resolve) => {
    document.querySelectorAll('img[loading="lazy"], iframe[loading="lazy"]').forEach((element) => {
      element.loading = 'eager';
    });
    const step = Math.max(500, Math.round(innerHeight * .8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((next) => setTimeout(next, 140));
    }
    await Promise.all([...document.images].map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise((next) => {
        image.addEventListener('load', next, { once: true });
        image.addEventListener('error', next, { once: true });
        setTimeout(next, 5000);
      });
    }));
    scrollTo(0, 0);
    await new Promise((next) => setTimeout(next, 700));
    resolve(true);
  })`,
  awaitPromise: true,
});

const audit = await send('Runtime.evaluate', {
  expression: `(() => ({
    title: document.title,
    viewport: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
    brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
    h1Count: document.querySelectorAll('h1').length,
    duplicateIds: [...document.querySelectorAll('[id]')].map((node) => node.id).filter((id, index, ids) => ids.indexOf(id) !== index),
    unnamedButtons: [...document.querySelectorAll('button')].filter((button) => !(button.textContent || '').trim() && !button.getAttribute('aria-label')).length,
    turnstileFrames: document.querySelectorAll('.cf-turnstile iframe').length,
    turnstileResponseFields: document.querySelectorAll('[name="cf-turnstile-response"]').length,
    turnstileApiPresent: typeof window.turnstile === 'object',
    turnstileResources: performance.getEntriesByType('resource')
      .filter((entry) => entry.name.includes('challenges.cloudflare.com'))
      .map((entry) => ({ name: entry.name.split('?')[0], duration: Math.round(entry.duration), transferSize: entry.transferSize })),
    turnstileWidgets: [...document.querySelectorAll('.cf-turnstile')].map((widget) => ({
      widgetId: widget.dataset.widgetId || '',
      childCount: widget.childElementCount,
      width: Math.round(widget.getBoundingClientRect().width),
      height: Math.round(widget.getBoundingClientRect().height),
      display: getComputedStyle(widget).display,
      visibility: getComputedStyle(widget).visibility,
      hasShadowRoot: Boolean(widget.shadowRoot),
      children: [...widget.children].map((child) => ({
        tag: child.tagName.toLowerCase(),
        id: child.id,
        className: child.className,
        type: child.getAttribute('type') || ''
      })),
      responsePresent: Boolean(widget.querySelector('[name="cf-turnstile-response"]')),
      responseLength: widget.querySelector('[name="cf-turnstile-response"]')?.value.length || 0
    })),
    frameHosts: [...document.querySelectorAll('iframe')].map((frame) => {
      try { return new URL(frame.src).hostname; } catch { return ''; }
    }).filter(Boolean),
    mapFrames: document.querySelectorAll('iframe[src*="openstreetmap.org"]').length,
    overflowingElements: [...document.querySelectorAll('body *')]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return !element.closest('.trap') && (rect.right > innerWidth + 1 || rect.left < -1);
      })
      .slice(0, 12)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className: typeof element.className === 'string' ? element.className : '',
        text: (element.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 80),
        left: Math.round(element.getBoundingClientRect().left),
        right: Math.round(element.getBoundingClientRect().right),
        width: Math.round(element.getBoundingClientRect().width)
      }))
  }))()`,
  returnByValue: true,
});

const metrics = await send('Page.getLayoutMetrics');
const content = metrics.cssContentSize;
const maxCaptureHeight = Math.min(Math.ceil(content.height), 16000);
const screenshot = await send('Page.captureScreenshot', {
  format: 'png',
  fromSurface: true,
  captureBeyondViewport: true,
  clip: { x: 0, y: 0, width: Math.ceil(content.width), height: maxCaptureHeight, scale: 1 },
});
const output = `/tmp/nbts-${label}-${width}.png`;
await writeFile(output, Buffer.from(screenshot.data, 'base64'));
const widgetView = await send('Runtime.evaluate', {
  expression: `(() => {
    const widget = document.querySelector('[data-turnstile-widget]');
    if (!widget) return false;
    widget.scrollIntoView({ block: 'center' });
    return true;
  })()`,
  returnByValue: true,
});
let turnstileOutput = '';
if (widgetView.result.value) {
  await new Promise((resolve) => setTimeout(resolve, 1800));
  const widgetScreenshot = await send('Page.captureScreenshot', { format: 'png', fromSurface: true });
  turnstileOutput = `/tmp/nbts-${label}-turnstile-${width}.png`;
  await writeFile(turnstileOutput, Buffer.from(widgetScreenshot.data, 'base64'));
}
console.log(JSON.stringify({ output, turnstileOutput, width, height, captureHeight: maxCaptureHeight, ...audit.result.value }));
socket.close();
