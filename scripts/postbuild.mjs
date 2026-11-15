/**
 * Pós-build: robots.txt e sitemap.xml conforme o ambiente, e .nojekyll na saída.
 * NEXT_PUBLIC_SITE_ENV=production libera a indexação; qualquer outro valor bloqueia.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'out');
if (!fs.existsSync(OUT)) { console.error('Pasta out/ não encontrada.'); process.exit(1); }

const production = process.env.NEXT_PUBLIC_SITE_ENV === 'production';
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || (production ? 'https://eletrix.mobi' : 'https://michelk55.github.io/site-eletrix')).replace(/\/$/, '');
const pages = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/pages.json'), 'utf8'));

fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

if (production) {
  fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  const today = new Date().toISOString().slice(0, 10);
  const prio = (p) => (p === '/' ? '1.0' : /^\/(eletrix-hub|adequacao-it-41|instalacao-carregador-residencial|condominios|empresas)\/$/.test(p) ? '0.9' : p.startsWith('/guias/') ? '0.7' : '0.8');
  const urls = Object.keys(pages).map((p) => `  <url><loc>${siteUrl}${p}</loc><lastmod>${today}</lastmod><priority>${prio(p)}</priority></url>`).join('\n');
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  console.log('postbuild: produção, robots.txt liberado e sitemap.xml com', Object.keys(pages).length, 'URLs');
} else {
  fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
  if (fs.existsSync(path.join(OUT, 'sitemap.xml'))) fs.rmSync(path.join(OUT, 'sitemap.xml'));
  console.log('postbuild: ambiente de teste, robots.txt com Disallow: /');
}
