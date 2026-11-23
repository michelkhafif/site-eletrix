// Screenshots de QA. Uso: node scripts/qa/shots.mjs <pasta-saida> [base-url] [paginas separadas por vírgula]
import { chromium } from 'playwright';
const out = process.argv[2] || 'qa/depois';
const base = (process.argv[3] || 'http://localhost:3000').replace(/\/$/, '');
const pages = (process.argv[4] || '/,/eletrix-hub/,/condominios/,/instalacao-carregador-residencial/,/adequacao-it-41/,/contato/,/guias/').split(',');
const widths = [390, 1440];
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'msedge' });
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 600 ? 844 : 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' }).catch(() => {});
    await page.evaluate(async () => { document.documentElement.classList.remove('motion'); for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(400);
    const name = (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '-')) + '-' + w + '.png';
    await page.screenshot({ path: `${out}/${name}`, fullPage: true });
    console.log(name);
  }
  await ctx.close();
}
await browser.close();
