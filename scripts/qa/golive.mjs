// Confere o build de produção em out/ (rode depois de: NEXT_PUBLIC_SITE_ENV=production npm run build).
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(import.meta.dirname, '..', '..', 'out');
const pages = JSON.parse(fs.readFileSync(path.join(OUT, '..', 'src/data/pages.json'), 'utf8'));
const SITE = 'https://eletrix.mobi';
let fails = 0;
const ok = (c, msg) => { console.log(c ? 'ok  ' : 'FALHA', msg); if (!c) fails++; };
const read = (p) => fs.readFileSync(path.join(OUT, p), 'utf8');

const all = [];
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else if (/\.(html|xml|txt|json|css|js|svg)$/.test(f.name) || f.name === '_redirects') all.push(p); } })(OUT);
const stale = all.filter((f) => /github\.io|\/site-eletrix\//.test(fs.readFileSync(f, 'utf8')));
ok(!stale.length, `nenhuma referência ao endereço de teste (${stale.slice(0, 3).map((f) => path.relative(OUT, f)).join(', ') || 'limpo'})`);

ok(read('robots.txt') === `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`, 'robots.txt libera e aponta o sitemap');
ok(read('CNAME').trim() === 'eletrix.mobi', 'CNAME = eletrix.mobi');
ok(fs.existsSync(path.join(OUT, '.nojekyll')), '.nojekyll presente');
const urls = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
ok(urls.length === Object.keys(pages).length && urls.every((u) => u.startsWith(`${SITE}/`)), `sitemap com ${urls.length} URLs em ${SITE}`);
ok(!urls.some((u) => /\/(app|empreendimentos|estacoes|eletroposto-tarifado)\/$/.test(u)), 'sitemap sem rotas antigas');

const problems = [];
for (const p of Object.keys(pages)) {
  const html = read(path.join(p, 'index.html'));
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical !== `${SITE}${p}`) problems.push(`${p} canonical ${canonical}`);
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) problems.push(`${p} noindex`);
  const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  if (!og?.startsWith(`${SITE}/og/`) || !fs.existsSync(path.join(OUT, og.replace(SITE, '')))) problems.push(`${p} og:image ${og}`);
  if (html.match(/<h1[ >]/g)?.length !== 1) problems.push(`${p} H1 x${html.match(/<h1[ >]/g)?.length ?? 0}`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const text = JSON.stringify(JSON.parse(m[1])); for (const u of text.match(/https?:\/\/[^"\\]+/g) ?? []) if (!/^https:\/\/(eletrix\.mobi|schema\.org|www\.instagram\.com)/.test(u)) problems.push(`${p} schema ${u}`); }
    catch { problems.push(`${p} JSON-LD inválido`); }
  }
}
ok(!problems.length, `canonical, robots, Open Graph, H1 e schema das ${Object.keys(pages).length} páginas ${problems.slice(0, 5).join(' | ')}`);

for (const [from, to] of [['estacao-de-recarga-veiculos-eletricos', '/empresas/'], ['carregador-veicular-predios-corporativos', '/eletrix-hub/'], ['eletroposto-tarifado', '/eletrix-hub/'], ['empreendimentos', '/#estacoes'], ['estacoes', '/#estacoes'], ['app', '/#app']]) {
  const html = read(`${from}/index.html`);
  ok(html.includes(`content="0;url=${to}"`) && /noindex/.test(html), `/${from}/ redireciona para ${to}`);
}
for (const f of ['404.html', 'favicon.ico', 'favicon.svg', 'apple-touch-icon.png', '_redirects']) ok(fs.existsSync(path.join(OUT, f)), `${f} presente`);
const total = all.length && Object.keys(pages).length;
console.log(fails ? `${fails} falha(s)` : `produção ok (${total} páginas indexáveis)`);
process.exit(fails ? 1 : 0);
