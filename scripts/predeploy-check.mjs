import { existsSync } from 'node:fs';

const pages = ['', 'recovery-housing', 'mens-housing', 'womens-housing', 'admissions', 'referrals', 'about', 'board', 'support-us', 'contact', 'transparency', 'privacy', 'accessibility', 'terms', '404'];
const missing = pages.filter((page) => !existsSync(`dist/${page ? `${page}/` : ''}index.html`) && !(page === '404' && existsSync('dist/404.html')));
if (missing.length) {
  console.error(`DEPLOY BLOCKED, missing: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('dist complete');
