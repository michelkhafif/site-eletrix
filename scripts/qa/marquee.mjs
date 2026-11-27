// Confere a faixa de logos da home: fotografa a volta inteira, em pedaços, em cada largura.
// Uso: node scripts/qa/marquee.mjs [base-url] [pasta]
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';

const base = (process.argv[2] || 'http://localhost:3001').replace(/\/$/, '');
const out = process.argv[3] || 'qa/rodada-3';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'msedge' });
for (const w of [360, 768, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.evaluate(async () => { for (const i of document.querySelectorAll('.marquee img')) { i.loading = 'eager'; await i.decode().catch(() => {}); } });
  const section = page.locator('section:has(.marquee)').first();
  await section.scrollIntoViewIfNeeded();
  const info = await page.evaluate(() => {
    const track = [...document.querySelectorAll('.marquee-track')].find((t) => t.getClientRects().length && t.offsetParent);
    const g = track.querySelector('.marquee-group');
    const imgs = [...g.querySelectorAll('img')];
    const gaps = imgs.slice(1).map((im, i) => Math.round(im.getBoundingClientRect().left - imgs[i].getBoundingClientRect().right));
    return { half: g.getBoundingClientRect().width, dur: parseFloat(track.style.animationDuration), n: imgs.length, loaded: imgs.filter((i) => i.naturalWidth > 0).length, gaps: [...new Set(gaps)].join(','), sizes: imgs.map((i) => `${i.alt}:${Math.round(i.getBoundingClientRect().width)}x${Math.round(i.getBoundingClientRect().height)}`).join(' ') };
  });
  console.log(w, JSON.stringify(info));
  const pieces = Math.ceil(info.half / w) + 0;
  const shots = [];
  for (let k = 0; k < pieces; k++) {
    await page.evaluate(({ ms }) => document.getAnimations().filter((a) => a.animationName === 'marquee').forEach((a) => { a.pause(); a.currentTime = ms; }), { ms: ((k * w) / info.half) * info.dur * 1000 });
    await page.waitForTimeout(80);
    shots.push(await section.screenshot());
  }
  const meta = await sharp(shots[0]).metadata();
  await sharp({ create: { width: w, height: shots.length * (meta.height + 6), channels: 3, background: '#e33' } })
    .composite(shots.map((s, i) => ({ input: s, left: 0, top: i * (meta.height + 6) }))).png().toFile(`${out}/parceiros-faixa-${w}.png`);
  await ctx.close();
}
await browser.close();
