// Screenshot rápido de trechos: node scripts/qa/view.mjs <url> <saida.png> <largura> [seletor|y]
import { chromium } from 'playwright';
const [url, out, w = '1440', sel] = process.argv.slice(2);
const b = await chromium.launch({ channel: 'msedge' });
const ctx = await b.newContext({ viewport: { width: +w, height: +w < 600 ? 844 : 900 }, reducedMotion: process.env.MOTION ? 'no-preference' : 'reduce' });
const p = await ctx.newPage();
const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(process.env.WAIT ? +process.env.WAIT : 500);
if (sel && sel.startsWith('#')) { await p.locator(sel).scrollIntoViewIfNeeded(); await p.waitForTimeout(400); await p.locator(sel).screenshot({ path: out }); }
else {
  if (sel === 'full') { await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } window.scrollTo(0, 0); }); await p.waitForTimeout(600); }
  await p.screenshot({ path: out, fullPage: sel === 'full' });
}
if (errs.length) console.log('ERROS:', errs.slice(0, 5));
await b.close();
