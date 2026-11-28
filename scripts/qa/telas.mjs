// Screenshots finais da rodada 3 em 360, 390, 768, 1024, 1280, 1440 e 1920 px:
// home inteira, /contato/, /parceiros/, popup de suporte, menu do celular (até 1023 px) e menu Soluções (desktop).
// Uso: node scripts/qa/telas.mjs [base-url] [pasta]
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';

const base = (process.argv[2] || 'http://localhost:3001').replace(/\/$/, '');
const out = process.argv[3] || 'qa/rodada-3';
fs.mkdirSync(out, { recursive: true });
const sizes = [[360, 740], [390, 844], [768, 1024], [1024, 768], [1280, 800], [1440, 900], [1920, 1080]];
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'msedge' });
const shot = (page, name, extra = {}) => page.screenshot({ path: `${out}/${name}.jpg`, type: 'jpeg', quality: 78, ...extra });

for (const [w, h] of sizes) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'no-preference', hasTouch: w < 1024 });
  await ctx.addInitScript(() => sessionStorage.setItem('eletrix-wa-balao', '1'));
  const page = await ctx.newPage();
  const full = async (path, name) => {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); }
      for (const i of document.images) { i.loading = 'eager'; await i.decode().catch(() => {}); }
      await document.fonts.ready;
      window.scrollTo(0, 0);
      document.querySelector('.wa-float')?.style.setProperty('display', 'none'); // fixo: apareceria no meio da página inteira
    });
    await page.waitForTimeout(2600);
    // congela as animações num instante representativo (a luz do hero sobre o totem; faixas de logos paradas)
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('led:seek', { detail: 5.6 }));
      document.getAnimations().filter((a) => a.animationName === 'marquee').forEach((a, i) => { a.pause(); a.currentTime = 7000 + i * 900; });
    });
    await page.waitForTimeout(250);
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    if (height <= 15000) return shot(page, `${name}-${w}`, { fullPage: true });
    // páginas muito altas passam do limite do navegador numa captura só: fotografa em partes e emenda
    const parts = [];
    for (let y = 0; y < height; y += 6000) parts.push({ top: y, input: await page.screenshot({ fullPage: true, clip: { x: 0, y, width: w, height: Math.min(6000, height - y) } }) });
    await sharp({ create: { width: w, height, channels: 3, background: '#050b14' } }).composite(parts.map((p) => ({ input: p.input, left: 0, top: p.top }))).jpeg({ quality: 78 }).toFile(`${out}/${name}-${w}.jpg`);
  };
  await full('/', 'home');
  await full('/contato/', 'contato');
  await full('/parceiros/', 'parceiros');

  // primeira tela do contato (o que a pessoa vê ao abrir)
  await page.goto(base + '/contato/', { waitUntil: 'networkidle' }); await page.waitForTimeout(700);
  await shot(page, `contato-primeira-tela-${w}`);

  await page.goto(base + '/', { waitUntil: 'networkidle' }); await page.waitForTimeout(600);
  if (w < 1024) {
    await page.getByRole('button', { name: 'Abrir menu' }).click(); await page.waitForTimeout(500);
    await shot(page, `menu-mobile-${w}`);
    await page.locator('#menu-mobile a[href$="/suporte/"]').click();
  } else {
    await page.getByRole('button', { name: 'Soluções' }).click(); await page.waitForTimeout(700);
    await shot(page, `menu-solucoes-${w}`);
    await page.keyboard.press('Escape');
    await page.locator('header a[href$="/suporte/"]').first().click();
  }
  await page.waitForTimeout(600);
  await shot(page, `suporte-popup-${w}`);
  console.log(w, 'ok');
  await ctx.close();
}
await browser.close();
