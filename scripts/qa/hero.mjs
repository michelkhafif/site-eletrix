// Hero em várias larguras, com movimento ligado (LED visível). Uso: node scripts/qa/hero.mjs [base]
import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:3001';
const b = await chromium.launch({ channel: 'msedge' });
for (const [w, h] of [[320, 640], [430, 932], [768, 1024], [1024, 768], [1920, 1080]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(4300); // pega o feixe de LED no meio do percurso
  await p.screenshot({ path: `qa/depois/hero-${w}.png` });
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(w, 'overflow-x:', ov);
}
await b.close();
