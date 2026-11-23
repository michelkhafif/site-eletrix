// Procura overflow horizontal: node scripts/qa/overflow.mjs [base] — testa todas as páginas do sitemap interno em 320/360/390/768
import { chromium } from 'playwright';
import fs from 'node:fs';
const base = process.argv[2] || 'http://localhost:3000';
const pages = Object.keys(JSON.parse(fs.readFileSync('src/data/pages.json', 'utf8')));
const b = await chromium.launch({ channel: 'msedge' });
for (const w of [320, 360, 390, 768]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 800 } });
  const p = await ctx.newPage();
  for (const path of pages) {
    await p.goto(base + path, { waitUntil: 'load' });
    const r = await p.evaluate(() => {
      const W = document.documentElement.clientWidth; const bad = [];
      document.querySelectorAll('body *').forEach((el) => { const r = el.getBoundingClientRect(); if (r.right > W + 1 && r.width > 0 && !el.closest('[class*="overflow-x-auto"],.marquee')) bad.push(el.tagName + '.' + String(el.className).slice(0, 50) + ' ' + Math.round(r.right)); });
      return { sw: document.documentElement.scrollWidth, W, bad: bad.slice(0, 3) };
    });
    if (r.sw > r.W) console.log(w, path, r.sw, r.bad.join(' | '));
  }
  await ctx.close();
}
await b.close(); console.log('fim');
