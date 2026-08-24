import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const pages = [
  '',
  'about',
  'about/board',
  'about/transparency',
  'recovery-housing',
  'recovery-housing/men',
  'recovery-housing/women',
  'admissions',
  'referrals',
  'support-us',
  'contact',
  'privacy',
  'accessibility',
  'terms',
  'board',
  'mens-housing',
  'womens-housing',
  'transparency',
  '404',
];
const missing = pages.filter((page) => !existsSync(`dist/${page ? `${page}/` : ''}index.html`) && !(page === '404' && existsSync('dist/404.html')));
if (missing.length) {
  console.error(`DEPLOY BLOCKED, missing: ${missing.join(', ')}`);
  process.exit(1);
}

const dashCheckExtensions = new Set(['.astro', '.html', '.js', '.mjs', '.ts', '.txt']);
const dashCheckRoots = ['src', 'public', 'worker/src'];
const dashPunctuation = /[—–]|&(?:mdash|ndash);|&#(?:8211|8212);/;
const filesWithDashPunctuation = [];

const checkDashPunctuation = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) checkDashPunctuation(file);
    else if (dashCheckExtensions.has(extname(file)) && dashPunctuation.test(readFileSync(file, 'utf8'))) {
      filesWithDashPunctuation.push(file);
    }
  }
};

dashCheckRoots.forEach(checkDashPunctuation);
if (filesWithDashPunctuation.length) {
  console.error(`DEPLOY BLOCKED, dash punctuation found in: ${filesWithDashPunctuation.join(', ')}`);
  process.exit(1);
}

console.log('dist complete');
