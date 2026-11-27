// Testa o botão flutuante do WhatsApp: tamanho, link, balão (entra depois de alguns segundos, fecha e não volta)
// e confere, rolando as páginas, que ele nunca fica visível sobre botões, formulários ou o texto do rodapé.
// Uso: node scripts/qa/whatsapp.mjs [base-url] [pasta]
import { chromium } from 'playwright';
import fs from 'node:fs';

const base = (process.argv[2] || 'http://localhost:3001').replace(/\/$/, '');
const out = process.argv[3] || 'qa/rodada-3';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'msedge' });
let fails = 0;
const ok = (c, msg) => { console.log(c ? 'ok  ' : 'FALHA', msg); if (!c) fails++; };

for (const [w, h] of [[390, 844], [360, 640], [1440, 900]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', hasTouch: w < 700 });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  ok(await page.locator('.wa-bubble').count() === 0, `${w}: sem balao logo ao abrir`);
  await page.waitForSelector('.wa-bubble', { timeout: 8000 }).catch(() => {});
  ok(await page.locator('.wa-bubble').count() === 1, `${w}: balao aparece depois de alguns segundos`);
  const info = await page.evaluate(() => { const a = document.querySelector('a[aria-label^="Falar no WhatsApp com"]'); const r = a.getBoundingClientRect(); return { w: r.width, h: r.height, href: a.href, target: a.target, bg: getComputedStyle(a).backgroundColor, text: document.querySelector('.wa-bubble a')?.textContent }; });
  ok(info.w >= 56 && info.w <= 60 && info.h === info.w, `${w}: tamanho ${info.w}px`);
  ok(info.href.startsWith('https://wa.me/5511965755730?text=') && info.target === '_blank' && info.bg === 'rgb(37, 211, 102)', `${w}: link comercial, nova aba e verde #25D366 (balao: "${info.text}")`);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${out}/whatsapp-balao-${w}.png` });
  await page.getByRole('button', { name: 'Fechar a mensagem' }).click();
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(5500);
  ok(await page.locator('.wa-bubble').count() === 0, `${w}: fechado, nao volta na mesma sessao`);

  // rola várias páginas e mede sobreposição com alvos importantes enquanto o botão está visível
  for (const path of ['/', '/contato/', '/eletrix-hub/', '/instalacao-carregador-residencial/', '/parceiros/']) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const total = await page.evaluate(() => document.body.scrollHeight);
    const bad = [];
    let visible = 0, steps = 0;
    for (let y = 0; y < total; y += Math.round(h * 0.45)) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(260);
      const r = await page.evaluate(() => {
        const a = document.querySelector('a[aria-label^="Falar no WhatsApp com"]');
        const o = +getComputedStyle(a).opacity;
        if (o < 0.5) return { shown: false, hit: [] };
        const b = a.getBoundingClientRect();
        const hit = [...document.querySelectorAll('main a[href], main button, main input, main select, main textarea, main summary, footer a, footer summary')]
          .filter((e) => (e.matches('[data-wa-avoid], [data-wa-avoid] *, summary, input, select, textarea') || e.closest('footer')) && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[aria-hidden=true]'))
          .filter((e) => { const x = e.getBoundingClientRect(); return x.width > 1 && x.left < b.right && x.right > b.left && x.top < b.bottom && x.bottom > b.top; })
          .map((e) => (e.textContent || e.getAttribute('name') || e.tagName).trim().slice(0, 30));
        return { shown: true, hit };
      });
      steps++; if (r.shown) visible++;
      if (r.hit.length) bad.push(`y=${y}: ${r.hit.join(', ')}`);
    }
    ok(!bad.length, `${w} ${path}: sem cobrir botoes ou formulario (visivel em ${visible}/${steps} posicoes)${bad.length ? ' -> ' + bad.slice(0, 3).join(' | ') : ''}`);
  }
  await ctx.close();
}
await browser.close();
console.log(fails ? `${fails} falha(s)` : 'whatsapp ok');
process.exit(fails ? 1 : 0);
