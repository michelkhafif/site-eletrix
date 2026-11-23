// Simula o GitHub Pages: carrega páginas em /site-eletrix/ e acusa qualquer requisição 404 ou link interno sem o prefixo.
import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:3002/site-eletrix';
const b = await chromium.launch({ channel: 'msedge' });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const bad = [];
p.on('response', (r) => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
for (const u of ['/', '/eletrix-hub/', '/condominios/', '/adequacao-it-41/', '/guias/', '/contato/']) {
  await p.goto(base + u, { waitUntil: 'networkidle' });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } });
  const hrefs = await p.evaluate(() => [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')));
  const semPrefixo = hrefs.filter((h) => !h.startsWith('/site-eletrix'));
  if (semPrefixo.length) bad.push(u + ' links sem prefixo: ' + [...new Set(semPrefixo)].slice(0, 5).join(','));
}
const imgs = await p.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length);
console.log(bad.length ? 'FALHA\n' + bad.join('\n') : 'OK: nenhum 404 e todos os links internos com /site-eletrix', '| imagens quebradas na última página:', imgs);
await b.close();
