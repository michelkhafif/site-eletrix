// Verificações funcionais e de conteúdo no site estático. Uso: node scripts/qa/flows.mjs [base]
import { chromium } from 'playwright';
import fs from 'node:fs'; import path from 'node:path';
const base = process.argv[2] || 'http://localhost:3001';
const ok = (c, m) => console.log((c ? 'OK   ' : 'FALHA') + ' ' + m);
const b = await chromium.launch({ channel: 'msedge' });

// 1. movimento reduzido
{
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(600);
  const r = await p.evaluate(() => ({
    beam: getComputedStyle(document.querySelector('.led-beam')).animationName,
    marquee: getComputedStyle(document.querySelector('.marquee-wrap')).display,
    stat: [...document.querySelectorAll('#hero-t ~ dl dd, dl dd')].slice(0, 4).map((e) => e.textContent.replace(/\s+/g, ' ').trim()),
  }));
  ok(r.beam === 'none', `reduced-motion: LED parado (${r.beam})`);
  ok(r.marquee === 'none', 'reduced-motion: marquee oculto, grade estática no lugar');
  ok(/250/.test(r.stat[0]), 'reduced-motion: número final direto (' + r.stat.join(' | ') + ')');
}
// 2. contagem em escadinha com movimento
{
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(base + '/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(900);
  const mid = await p.evaluate(() => [...document.querySelectorAll('dl dd [aria-hidden] span:last-child')].slice(0, 4).map((e) => e.textContent));
  await p.waitForTimeout(3000);
  const end = await p.evaluate(() => [...document.querySelectorAll('dl dd [aria-hidden] span:last-child')].slice(0, 4).map((e) => e.textContent));
  ok(mid.join() !== end.join() && /^\+250$/.test(end[0]) && /^\+5 mil$/.test(end[3]), `contagem: meio ${mid.join(' ')} -> fim ${end.join(' ')}`);
}
// 3. redirecionamentos e links
{
  const p = await (await b.newContext()).newPage();
  for (const u of ['/empreendimentos/', '/estacoes/']) {
    const html = await (await p.request.get(base + u)).text();
    const refresh = (html.match(/http-equiv="refresh" content="([^"]*)"/) || [])[1];
    ok(/#estacoes/.test(refresh || ''), `${u} -> meta refresh ${refresh}`);
    ok(/name="robots" content="noindex/.test(html), `${u} com noindex`);
    await p.goto(base + u, { waitUntil: 'load' }).catch(() => {});
    await p.waitForTimeout(1500);
    ok(/#estacoes$/.test(p.url()), `${u} redirecionou para ${p.url()}`);
  }
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  const hrefs = await p.evaluate(() => [...document.querySelectorAll('a[href*="apps.apple.com"],a[href*="play.google.com"]')].map((a) => a.href));
  ok(hrefs.includes('https://apps.apple.com/br/app/eletrix/id6444454547') && hrefs.some((h) => h.startsWith('https://play.google.com/store/apps/details?id=com.coderbox.eletrix')), 'links das lojas corretos: ' + [...new Set(hrefs)].length);
  const wa = await p.evaluate(() => [...document.querySelectorAll('a[href*="wa.me"]')].map((a) => a.href.split('?')[0]));
  ok(wa.every((h) => /wa\.me\/55119(65755730|19552120)$/.test(h)), 'WhatsApp: só os dois números oficiais (' + [...new Set(wa)].join(', ') + ')');
  const first = await p.locator('a[href*="#estacoes"]').first().getAttribute('href');
  ok(!!first, 'link Estações presente: ' + first);
}
// 4. conteúdo proibido no HTML gerado
{
  const out = 'out'; const bad = [];
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (f.endsWith('.html')) { const t = fs.readFileSync(f, 'utf8'); const rel = f.split(path.sep).join('/'); if (/R\$\s*1\.799|R\$\s*449|R\$\s*6\.292/.test(t)) bad.push('preço IT-41 em ' + rel); if (/movE\b|RFID/i.test(t)) bad.push('movE/RFID em ' + rel); if (/nota 4,8|4,8 na App/i.test(t)) bad.push('nota das lojas em ' + rel); if (/ceo-\d+\.|michel_khafif/i.test(t)) bad.push('foto CEO em ' + rel); if (/Seguro de até R\$ 500|Dashboard em tempo real/i.test(t)) bad.push('seguro/dashboard em ' + rel); if (/white-label/.test((t.match(/<header[\s\S]*?<\/header>/) || [''])[0] + (t.match(/<footer[\s\S]*?<\/footer>/) || [''])[0])) bad.push('White label em menu/rodapé: ' + rel); if (/href="[^"]*\/(empreendimentos|estacoes)\/"/.test(t)) bad.push('link para página removida em ' + rel); } });
  walk(out);
  ok(bad.length === 0, 'varredura de conteúdo proibido: ' + (bad.join('; ') || 'nada encontrado'));
  const home = fs.readFileSync('out/index.html', 'utf8');
  ok(!/AAA/.test(home.replace(/<script[\s\S]*?<\/script>/g, '')), 'home sem "AAA" no texto visível');
  ok((home.match(/<h1/g) || []).length === 1, 'home com um único H1');
}
// 5. teclado: Tab pela home, foco sempre visível
{
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  let semFoco = 0, n = 0;
  for (let i = 0; i < 60; i++) {
    await p.keyboard.press('Tab'); n++;
    const v = await p.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); return { out: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0, tag: e.tagName + ' ' + (e.textContent || '').trim().slice(0, 30) }; });
    if (v && !v.out) { semFoco++; console.log('   sem outline:', v.tag); }
  }
  ok(semFoco === 0, `teclado: ${n} tabs, ${semFoco} elementos sem foco visível`);
  await p.keyboard.press('Enter');
}
// 6. mega menu por teclado
{
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.focus('button[aria-controls="mega-solucoes"]'); await p.keyboard.press('Enter'); await p.waitForTimeout(200);
  ok(await p.locator('#mega-solucoes a').first().isVisible(), 'mega menu abre com Enter');
  await p.keyboard.press('Escape'); await p.waitForTimeout(150);
  ok(!(await p.locator('#mega-solucoes a').first().isVisible()), 'mega menu fecha com Esc');
}
// 7. formulário de contato
{
  const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await p.goto(base + '/contato/', { waitUntil: 'networkidle' });
  await p.locator('form button[type=submit]').first().click(); await p.waitForTimeout(300);
  const errs = await p.locator('[role=alert], [id$="-err"]').count();
  ok(errs > 0, 'formulário: campos vazios mostram erro (' + errs + ')');
}
await b.close();
