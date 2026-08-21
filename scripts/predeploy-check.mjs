import { existsSync } from 'node:fs';

const pages = [
  '',
  'about',
  'about/board',
  'about/board/theresa-rem-canofari',
  'about/susan-rua',
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
console.log('dist complete');
