import fs from 'node:fs';
import path from 'node:path';
import * as parse5 from 'parse5';

const dist = path.resolve('dist');
const origin = 'https://newbeginningspgh.org';
const errors = [];
const warnings = [];

const sitemapFiles = fs.readdirSync(dist).filter((file) => /^sitemap-\d+\.xml$/.test(file));
const sitemap = sitemapFiles.map((file) => fs.readFileSync(path.join(dist, file), 'utf8')).join('\n');
const routes = [...sitemap.matchAll(/<loc>(https:\/\/newbeginningspgh\.org([^<]*))<\/loc>/g)]
  .map((match) => match[2] || '/');
const titles = new Map();
const descriptions = new Map();

const attrs = (node) => Object.fromEntries((node.attrs || []).map((item) => [item.name, item.value]));
const descendants = (node, result = []) => {
  for (const child of node.childNodes || []) {
    result.push(child);
    descendants(child, result);
  }
  if (node.content) descendants(node.content, result);
  return result;
};
const text = (node) => node.nodeName === '#text'
  ? node.value || ''
  : (node.childNodes || []).map(text).join('');
const routeFile = (route) => route === '/'
  ? path.join(dist, 'index.html')
  : path.join(dist, route.replace(/^\//, ''), 'index.html');
const one = (nodes, tag, predicate, route, label) => {
  const found = nodes.filter((node) => node.tagName === tag && predicate(attrs(node)));
  if (found.length !== 1) errors.push(`${route}: expected one ${label}, found ${found.length}`);
  return found[0];
};

for (const route of routes) {
  const file = routeFile(route);
  if (!fs.existsSync(file)) {
    errors.push(`${route}: sitemap route has no built HTML file`);
    continue;
  }

  const doc = parse5.parse(fs.readFileSync(file, 'utf8'));
  const nodes = descendants(doc);
  const titleNode = one(nodes, 'title', () => true, route, 'title');
  const title = titleNode ? text(titleNode).trim() : '';
  const descriptionNode = one(nodes, 'meta', (a) => a.name === 'description', route, 'meta description');
  const description = descriptionNode ? attrs(descriptionNode).content.trim() : '';
  const canonical = one(nodes, 'link', (a) => a.rel === 'canonical', route, 'canonical');
  const robots = one(nodes, 'meta', (a) => a.name === 'robots', route, 'robots meta');

  if (!title || title.length > 65) warnings.push(`${route}: title length is ${title.length}`);
  if (!description || description.length < 100 || description.length > 170) warnings.push(`${route}: description length is ${description.length}`);
  if (titles.has(title)) errors.push(`${route}: duplicate title also used by ${titles.get(title)}`);
  else titles.set(title, route);
  if (descriptions.has(description)) errors.push(`${route}: duplicate description also used by ${descriptions.get(description)}`);
  else descriptions.set(description, route);
  if (canonical && attrs(canonical).href !== `${origin}${route}`) errors.push(`${route}: canonical mismatch`);
  if (robots && !attrs(robots).content.includes('index, follow')) errors.push(`${route}: canonical page must be index, follow`);

  for (const [key, attr] of [
    ['og:title', 'property'], ['og:description', 'property'], ['og:url', 'property'],
    ['og:image', 'property'], ['og:image:alt', 'property'], ['og:image:width', 'property'],
    ['og:image:height', 'property'], ['og:site_name', 'property'], ['og:locale', 'property'],
    ['twitter:card', 'name'], ['twitter:title', 'name'], ['twitter:description', 'name'],
    ['twitter:image', 'name'], ['twitter:image:alt', 'name'],
  ]) {
    one(nodes, 'meta', (a) => a[attr] === key && Boolean(a.content), route, key);
  }

  const ogImage = nodes.find((node) => node.tagName === 'meta' && attrs(node).property === 'og:image');
  if (ogImage) {
    const url = new URL(attrs(ogImage).content);
    const imageFile = path.join(dist, url.pathname.replace(/^\//, ''));
    if (url.origin !== origin || !fs.existsSync(imageFile)) errors.push(`${route}: unavailable og:image ${url}`);
  }

  if (nodes.some((node) => node.tagName === 'meta' && attrs(node).name === 'keywords')) {
    errors.push(`${route}: obsolete meta keywords must not be present`);
  }

  const schemas = nodes.filter((node) => node.tagName === 'script' && attrs(node).type === 'application/ld+json');
  if (schemas.length !== 1) {
    errors.push(`${route}: expected one JSON-LD graph, found ${schemas.length}`);
    continue;
  }

  let schema;
  try {
    schema = JSON.parse(text(schemas[0]));
  } catch (error) {
    errors.push(`${route}: invalid JSON-LD: ${error.message}`);
  }
  if (!schema) continue;

  if (schema['@context'] !== 'https://schema.org') errors.push(`${route}: incorrect JSON-LD context`);
  if (!Array.isArray(schema['@graph'])) errors.push(`${route}: JSON-LD graph missing`);
  const graph = schema['@graph'] || [];
  const webpage = graph.find((item) => ['WebPage', 'AboutPage', 'ContactPage', 'ProfilePage', 'CollectionPage'].includes(item['@type']));
  if (!webpage) errors.push(`${route}: WebPage-family entity missing`);
  if (webpage?.url !== `${origin}${route}`) errors.push(`${route}: WebPage URL mismatch`);
  if (webpage?.description !== description) errors.push(`${route}: schema and meta descriptions differ`);
  if (route === '/') {
    if (!graph.some((item) => item['@type'] === 'Organization')) errors.push('/: Organization entity missing');
    if (!graph.some((item) => item['@type'] === 'WebSite')) errors.push('/: WebSite entity missing');
  }
  for (const breadcrumb of graph.filter((item) => item['@type'] === 'BreadcrumbList')) {
    const positions = breadcrumb.itemListElement?.map((item) => item.position) || [];
    if (positions.some((position, index) => position !== index + 1)) errors.push(`${route}: invalid breadcrumb positions`);
  }
  if (JSON.stringify(schema).includes('NonprofitOrganization')) {
    errors.push(`${route}: invalid NonprofitOrganization type present`);
  }
}

if (routes.length !== 14) errors.push(`sitemap: expected 14 canonical routes, found ${routes.length}`);
for (const excluded of ['/404/', '/board/', '/about/board/theresa-rem-canofari/', '/about/susan-rua/', '/mens-housing/', '/womens-housing/', '/transparency/']) {
  if (routes.includes(excluded)) errors.push(`sitemap: excluded route present: ${excluded}`);
}

const robotsText = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
if (!robotsText.includes(`Sitemap: ${origin}/sitemap-index.xml`)) errors.push('robots.txt: sitemap declaration missing');
if (!fs.existsSync(path.join(dist, 'sitemap-index.xml'))) errors.push('sitemap index missing');

const manifest = JSON.parse(fs.readFileSync(path.join(dist, 'site.webmanifest'), 'utf8'));
for (const icon of manifest.icons || []) {
  if (!fs.existsSync(path.join(dist, icon.src.replace(/^\//, '')))) errors.push(`manifest icon missing: ${icon.src}`);
}

const notFound = parse5.parse(fs.readFileSync(path.join(dist, '404.html'), 'utf8'));
const notFoundNodes = descendants(notFound, []);
if (!notFoundNodes.some((node) => node.tagName === 'meta' && attrs(node).name === 'robots' && attrs(node).content.includes('noindex'))) errors.push('404: noindex missing');
if (notFoundNodes.some((node) => node.tagName === 'link' && attrs(node).rel === 'canonical')) errors.push('404: canonical must be absent');
if (notFoundNodes.some((node) => node.tagName === 'script' && attrs(node).type === 'application/ld+json')) errors.push('404: JSON-LD must be absent');

console.log(JSON.stringify({ routes: routes.length, titles: titles.size, descriptions: descriptions.size, errors, warnings }, null, 2));
if (errors.length || warnings.length) process.exitCode = 1;
