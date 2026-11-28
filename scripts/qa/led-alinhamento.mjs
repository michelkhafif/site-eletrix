// Prova de alinhamento no navegador: desenha TODOS os contornos de uma vez, finos, sobre a foto renderizada
// em cada largura (densidade 2x), e salva o recorte da foto. Uso: node scripts/qa/led-alinhamento.mjs [base] [pasta]
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';

const base = (process.argv[2] || 'http://localhost:3001').replace(/\/$/, '');
const out = process.argv[3] || 'qa/rodada-3';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'msedge' });
for (const [w, h] of [[390, 844], [768, 1024], [1440, 900], [1920, 1080]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => sessionStorage.setItem('eletrix-wa-balao', '1'));
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: `
    .led-seg { opacity: 1 !important; }
    .led-seg path { stroke-dasharray: none !important; stroke: #ff2bd6 !important; stroke-opacity: 1 !important; stroke-width: ${w < 768 ? 2.4 : 1.6} !important; }
    .led-seg path:not(.led-body) { display: none; }
    .hero-shade { opacity: .35; } .hero-led { -webkit-mask-image: none !important; mask-image: none !important; }
    .hero h1, .hero .pointer-events-auto, header, .wa-float { visibility: hidden !important; }` });
  await page.waitForTimeout(500);
  const buf = await page.locator('.hero-media').screenshot();
  await sharp(buf).jpeg({ quality: 86 }).toFile(`${out}/led-alinhamento-${w}.jpg`);
  console.log(w, 'ok');
  await ctx.close();
}
await browser.close();
