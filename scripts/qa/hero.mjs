// Confere o hero com o LED: screenshots por largura e quadros da coreografia (animação congelada em instantes escolhidos).
// Uso: node scripts/qa/hero.mjs [base-url] [pasta-saida]
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';

const base = (process.argv[2] || 'http://localhost:3001').replace(/\/$/, '');
const out = process.argv[3] || 'qa/rodada-3';
fs.mkdirSync(out, { recursive: true });
const sizes = [[390, 844], [768, 1024], [1440, 900], [1920, 1080], [360, 640], [1024, 768]];
const frames = [1.0, 2.4, 3.6, 5.6, 7.4, 8.6]; // segundos

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'msedge' });
const freeze = (p, t) => p.evaluate((ms) => {
  document.getAnimations().filter((a) => a.animationName?.startsWith('l') || a.animationName?.startsWith('o')).forEach((a) => { a.pause(); a.currentTime = ms; });
}, t * 1000);

for (const [w, h] of sizes) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'no-preference', hasTouch: w < 700 });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2600);
  const m = await page.evaluate(() => {
    const hero = document.querySelector('.hero').getBoundingClientRect();
    const f = [...document.querySelectorAll('.cover-frame')].map((e) => e.getBoundingClientRect());
    const media = document.querySelector('.hero-media').getBoundingClientRect();
    return { hero: Math.round(hero.height), media: `${Math.round(media.width)}x${Math.round(media.height)}`, same: f[0].x === f[1].x && f[0].y === f[1].y && f[0].width === f[1].width, frame: `${Math.round(f[0].width)}x${Math.round(f[0].height)}`, sw: document.documentElement.scrollWidth, anims: document.getAnimations().length };
  });
  console.log(w, h, JSON.stringify(m), errs.join(' '));
  await freeze(page, 5.6);
  await page.screenshot({ path: `${out}/hero-${w}.png` });
  if ([390, 1440].includes(w)) {
    const shots = [];
    for (const t of frames) {
      await freeze(page, t);
      await page.waitForTimeout(120);
      shots.push(await page.screenshot({ clip: { x: 0, y: 0, width: w, height: Math.min(h, m.hero) } }));
    }
    const cols = w < 700 ? 6 : 2, ch = Math.min(h, m.hero), rows = Math.ceil(frames.length / cols);
    const comps = shots.map((s, i) => ({ input: s, left: (i % cols) * (w + 12), top: Math.floor(i / cols) * (ch + 12) }));
    await sharp({ create: { width: cols * (w + 12) - 12, height: rows * (ch + 12) - 12, channels: 3, background: '#f0f' } }).composite(comps).png().toFile(`${out}/hero-quadros-${w}.png`);
  }
  await ctx.close();
}
await browser.close();
