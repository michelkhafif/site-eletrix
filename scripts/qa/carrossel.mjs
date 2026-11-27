// Testa o carrossel de prédios: avanço a cada 3 s, laço infinito, setas, teclado, arraste/toque, pausas.
// Uso: node scripts/qa/carrossel.mjs [base-url] [pasta]
import { chromium } from 'playwright';
import fs from 'node:fs';

const base = (process.argv[2] || 'http://localhost:3001').replace(/\/$/, '');
const out = process.argv[3] || 'qa/rodada-3';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'msedge' });
let fails = 0;
const ok = (c, msg) => { console.log(c ? 'ok  ' : 'FALHA', msg); if (!c) fails++; };

for (const [w, h, touch] of [[1440, 900, false], [390, 844, true]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'no-preference', hasTouch: touch });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.locator('.carousel').scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 120));
  await page.mouse.move(2, 2);
  const state = () => page.evaluate(() => {
    const t = document.querySelector('.carousel-track');
    const lead = document.querySelector('.carousel').getBoundingClientRect();
    const slides = [...t.children];
    // cartão alinhado à margem esquerda do conteúdo
    const ml = parseFloat(getComputedStyle(t).getPropertyValue('--lead')) || 0;
    const first = slides.map((s) => ({ s, x: s.getBoundingClientRect().left })).filter((o) => o.x > -5).sort((a, b) => a.x - b.x)[0];
    const current = slides.map((s) => ({ s, d: Math.abs(s.getBoundingClientRect().left - lead.left - Math.max(w(), 0)) })).sort((a, b) => a.d - b.d);
    function w() { return Math.max(innerWidth < 768 ? 20 : 32, (innerWidth - 1240) / 2 + 32); }
    return { pos: Number(t.style.getPropertyValue('--pos')), name: current[0].s.querySelector('h4').firstChild.textContent, left: Math.round(current[0].s.getBoundingClientRect().left), counter: document.querySelector('.carousel').parentElement.querySelector('.tnum').textContent };
  });
  await page.waitForTimeout(800);
  const a = await state();
  await page.waitForTimeout(3100);
  const b = await state();
  await page.waitForTimeout(3000);
  const c = await state();
  ok(b.pos === a.pos + 1 && c.pos === b.pos + 1, `${w}: avanca um cartao a cada 3 s (${a.pos} ${a.name} -> ${b.pos} ${b.name} -> ${c.pos} ${c.name})`);
  if (w === 1440) await page.screenshot({ path: `${out}/carrossel-${w}.png` });

  // pausa no mouse (desktop)
  if (!touch) {
    const box = await page.locator('.carousel').boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + 80);
    const h1 = await state(); await page.waitForTimeout(3600); const h2 = await state();
    ok(h1.pos === h2.pos, `${w}: pausa com o mouse em cima (${h1.pos} = ${h2.pos})`);
    await page.mouse.move(2, 2);
  }
  // pausa no foco
  await page.locator('.carousel').focus();
  const f1 = await state(); await page.waitForTimeout(3500); const f2 = await state();
  ok(f1.pos === f2.pos, `${w}: pausa com o foco (${f1.pos} = ${f2.pos})`);
  // teclado
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(800); const k1 = await state();
  await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(800); const k2 = await state();
  ok(k1.counter !== f2.counter && k2.counter === f2.counter, `${w}: setas do teclado (${f2.counter} -> ${k1.counter} -> ${k2.counter})`);
  // laço infinito: muitos avanços, posição volta para a faixa do meio sem sair do ar
  const counters = [];
  for (let i = 0; i < 34; i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(i % 5 === 0 ? 750 : 40); counters.push((await state()).pos); }
  await page.waitForTimeout(900);
  const z = await state();
  const expected = ((parseInt(k2.counter) - 1 + 34) % 15) + 1;
  ok(parseInt(z.counter) === expected && z.pos >= 15 && z.pos < 30, `${w}: laco infinito (34 avancos -> ${z.counter}, posicao ${z.pos}, entre 15 e 29)`);
  ok(Math.min(...counters) >= 1 && Math.max(...counters) < 40, `${w}: nunca sai das tres copias (${Math.min(...counters)} a ${Math.max(...counters)})`);
  // botao pausar
  await page.getByRole('button', { name: 'Pausar a passagem automática' }).click();
  await page.mouse.move(2, 2); await page.evaluate(() => document.activeElement.blur());
  const p1 = await state(); await page.waitForTimeout(3500); const p2 = await state();
  ok(p1.pos === p2.pos, `${w}: botao pausar`);
  await page.getByRole('button', { name: 'Retomar a passagem automática' }).click();
  await page.mouse.move(2, 2); await page.evaluate(() => document.activeElement.blur());
  // setas na tela
  const s1 = await state();
  await page.getByRole('button', { name: 'Próximo prédio' }).filter({ visible: true }).click(); await page.waitForTimeout(150);
  await page.evaluate(() => document.activeElement.blur()); await page.waitForTimeout(700);
  const s2 = await state();
  ok(s2.pos !== s1.pos, `${w}: botao proximo (${s1.counter} -> ${s2.counter})`);
  // arraste (mouse) ou deslize (toque)
  await page.mouse.move(2, 2);
  const car = await page.locator('.carousel').boundingBox();
  const y = car.y + car.height / 2;
  const d1 = await state();
  if (touch) {
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: w - 60, y }] });
    for (let i = 1; i <= 8; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: w - 60 - i * 30, y }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  } else {
    await page.mouse.move(w * 0.7, y); await page.mouse.down(); await page.mouse.move(w * 0.7 - 420, y, { steps: 12 }); await page.mouse.up();
  }
  await page.waitForTimeout(900);
  const d2 = await state();
  ok(d2.counter !== d1.counter, `${w}: ${touch ? 'deslize no toque' : 'arraste'} (${d1.counter} -> ${d2.counter})`);
  // fora da tela pausa
  await page.evaluate(() => window.scrollTo(0, 0)); await page.mouse.move(2, 2); await page.evaluate(() => document.activeElement.blur()); await page.waitForTimeout(500);
  const o1 = await state(); await page.waitForTimeout(3600); const o2 = await state();
  ok(o1.pos === o2.pos, `${w}: pausa fora da tela (${o1.pos} = ${o2.pos})`);
  ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${w}: sem rolagem horizontal na pagina`);
  await ctx.close();
}
// movimento reduzido: nao avanca sozinho
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.locator('.carousel').scrollIntoViewIfNeeded();
  const p = () => page.evaluate(() => document.querySelector('.carousel-track').style.getPropertyValue('--pos'));
  const a = await p(); await page.waitForTimeout(6500); const b = await p();
  ok(a === b, `movimento reduzido: nao avanca sozinho (${a} = ${b})`);
  ok(await page.getByRole('button', { name: /passagem automática/ }).count() === 0, 'movimento reduzido: sem botao de pausa');
  await ctx.close();
}
await browser.close();
console.log(fails ? `${fails} falha(s)` : 'carrossel ok');
process.exit(fails ? 1 : 0);
