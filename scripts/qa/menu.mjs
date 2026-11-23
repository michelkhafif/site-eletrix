// Testa menu mobile (390x844 e 360x640, retrato e paisagem) e mega menu desktop.
import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:3000';
const b = await chromium.launch({ channel: 'msedge' });
const out = [];
for (const [w, h] of [[390, 844], [360, 640], [844, 390]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.tap('button[aria-controls="menu-mobile"]');
  await p.waitForTimeout(300);
  const box = await p.locator('#menu-mobile').boundingBox();
  const lock = await p.evaluate(() => getComputedStyle(document.body).overflow);
  out.push(`${w}x${h}: painel ${Math.round(box?.width)}x${Math.round(box?.height)}, body overflow=${lock}`);
  await p.screenshot({ path: `qa/depois/menu-mobile-${w}x${h}.png` });
  await p.tap('#menu-mobile button[aria-expanded]');
  await p.waitForTimeout(200);
  await p.screenshot({ path: `qa/depois/menu-mobile-solucoes-${w}x${h}.png` });
  await p.keyboard.press('Escape');
  await p.waitForTimeout(200);
  out.push(`  após Esc: painel presente=${await p.locator('#menu-mobile').count()}, foco no botão=${await p.evaluate(() => document.activeElement?.getAttribute('aria-controls'))}`);
  await p.tap('button[aria-controls="menu-mobile"]'); await p.waitForTimeout(200);
  await p.tap('#menu-mobile a[href*="estacoes"]'); await p.waitForTimeout(800);
  out.push(`  link Estações: url=${p.url()} painel=${await p.locator('#menu-mobile').count()}, scrollY=${await p.evaluate(() => Math.round(scrollY))}`);
  await ctx.close();
}
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto(base + '/eletrix-hub/', { waitUntil: 'networkidle' });
await p.click('button[aria-controls="mega-solucoes"]'); await p.waitForTimeout(400);
await p.screenshot({ path: 'qa/depois/mega-menu-1440.png', clip: { x: 0, y: 0, width: 1440, height: 520 } });
await p.goto(base + '/eletrix-hub/', { waitUntil: 'networkidle' });
await p.click('header a[href*="estacoes"]'); await p.waitForTimeout(1200);
out.push(`desktop, Estações a partir do Hub: url=${p.url()}`);
console.log(out.join('\n'));
await b.close();
