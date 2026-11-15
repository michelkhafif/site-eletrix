/**
 * Gera uma imagem Open Graph (1200x630) por página, com a identidade da marca:
 * foto do empreendimento escurecida, logo ELETRIX, kicker azul e título.
 * Uso: npm run og  (depende de public/images e src/data/pages.json)
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const pages = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/pages.json'), 'utf8'));
const images = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/images.generated.json'), 'utf8'));
const outDir = path.join(ROOT, 'public', 'og');
fs.mkdirSync(outDir, { recursive: true });

const logoSvg = fs.readFileSync(path.join(ROOT, 'public/brand/eletrix-logo-escuro.svg'), 'utf8');
const logoInner = logoSvg.replace(/<\?xml[^>]*>/, '').replace(/<svg[^>]*>/, '').replace('</svg>', '');
const vb = logoSvg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function wrap(text, max) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}

const slug = (p) => (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '--'));

for (const [p, m] of Object.entries(pages)) {
  const { headline, kicker, bg } = m.og;
  const info = images[bg];
  const file = path.join(ROOT, 'public/images', `${bg}-${info.fallback}.jpg`);
  const photo = await sharp(file).resize(1200, 630, { fit: 'cover', position: 'attention' }).toBuffer();
  const size = headline.length > 48 ? 54 : headline.length > 28 ? 64 : 76;
  const lines = wrap(headline, headline.length > 48 ? 24 : 20).slice(0, 4);
  const logoH = 34;
  const logoW = (vb[2] / vb[3]) * logoH;
  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#050B14" stop-opacity=".97"/><stop offset=".6" stop-color="#050B14" stop-opacity=".82"/><stop offset="1" stop-color="#050B14" stop-opacity=".35"/></linearGradient>
    <linearGradient id="b" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#050B14" stop-opacity=".7"/><stop offset=".5" stop-color="#050B14" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/><rect width="1200" height="630" fill="url(#b)"/>
  <rect x="72" y="72" width="40" height="3" fill="#10B7FF"/>
  <svg x="72" y="96" width="${logoW}" height="${logoH}" viewBox="${vb.join(' ')}">${logoInner}</svg>
  <text x="72" y="214" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" letter-spacing="3" fill="#10B7FF">${esc(kicker.toUpperCase())}</text>
  ${lines.map((l, i) => `<text x="72" y="${290 + i * (size * 1.1)}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="800" fill="#fff" letter-spacing="-1.5">${esc(l)}</text>`).join('\n  ')}
  <text x="72" y="570" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#A9B8CF">Carregando seu futuro</text>
  <text x="1128" y="570" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#fff">eletrix.mobi</text>
</svg>`;
  await sharp(photo).composite([{ input: Buffer.from(svg) }]).png({ compressionLevel: 9, palette: true, quality: 82 }).toFile(path.join(outDir, `${slug(p)}.png`));
  console.log('og', slug(p));
}
