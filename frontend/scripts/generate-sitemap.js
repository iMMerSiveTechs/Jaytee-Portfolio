#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://jaytee.dev';

const pages = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.9' },
  { path: '/work', priority: '0.8' },
  { path: '/work/job-forge', priority: '0.7' },
  { path: '/work/churnwise', priority: '0.7' },
  { path: '/work/transplant-tracker', priority: '0.7' },
  { path: '/tools', priority: '0.8' },
  { path: '/work-with-me', priority: '0.8' },
  { path: '/notes', priority: '0.7' },
  { path: '/contact', priority: '0.7' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${SITE_URL}${p.path}</loc><priority>${p.priority}</priority></url>`).join('\n')}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'robots.txt'), robotsTxt);

console.log(`Generated sitemap.xml and robots.txt for ${SITE_URL}`);
