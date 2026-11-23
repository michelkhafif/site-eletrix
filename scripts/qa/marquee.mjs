import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'msedge' });
for (const [w, h, rm] of [[1440, 900, 'no-preference'], [390, 844, 'reduce']]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, reducedMotion: rm })).newPage();
  await p.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
  const t = () => p.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector('.marquee-track')).transform).m41);
  const a = await t(); await p.waitForTimeout(1500); const c = await t();
  console.log(w, rm, 'deslocamento em 1,5 s:', Math.round(c - a), 'px; controles:', await p.locator('.marquee button, .marquee a').count());
  await p.locator('.marquee').scrollIntoViewIfNeeded(); await p.screenshot({ path: `qa/depois/marquee-${w}.png` });
}
await b.close();
