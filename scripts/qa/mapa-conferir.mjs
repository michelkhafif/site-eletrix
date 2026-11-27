// Confere a posição de cidades no mapa: renderiza o SVG e circula cada uma, com um recorte ampliado.
// Uso: node scripts/qa/mapa-conferir.mjs [pasta]
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..', '..');
const out = process.argv[2] || 'qa/rodada-3';
const meta = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/map.generated.json'), 'utf8'));
const pts = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/estacoes.json'), 'utf8'));
const [W, H] = meta.main;
const b = meta.bbox;
const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const k = W / (b.lng1 - b.lng0);
const project = (lng, lat) => [(lng - b.lng0) * k, (merc(b.lat1) - merc(lat)) * (180 / Math.PI) * k];
const cities = ['Altamira', 'Jataí', 'Santa Maria', 'Blumenau', 'Campo Grande', 'Montes Claros'];
const SCALE = 2;
const base = await sharp(path.join(ROOT, 'public/mapa/rede-brasil.svg'), { density: 72 * SCALE }).flatten({ background: '#050b14' }).png().toBuffer();
const crops = [];
for (const c of cities) {
  const s = pts.find((p) => p.city === c);
  const [x, y] = project(s.lng, s.lat).map((v) => v * SCALE);
  const size = 260;
  const left = Math.max(0, Math.min(W * SCALE - size, Math.round(x - size / 2)));
  const top = Math.max(0, Math.min(H * SCALE - size, Math.round(y - size / 2)));
  const mark = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${x - left}" cy="${y - top}" r="4" fill="none" stroke="#ff2bd6" stroke-width="2"/><circle cx="${x - left}" cy="${y - top}" r="46" fill="none" stroke="#ff2bd6" stroke-opacity=".7"/><rect width="${size}" height="22" fill="#000" opacity=".75"/><text x="6" y="16" font-family="Arial" font-size="13" fill="#fff">${c}/${s.uf} ${s.lat.toFixed(3)}, ${s.lng.toFixed(3)}</text></svg>`);
  crops.push(await sharp(base).extract({ left, top, width: size, height: size }).composite([{ input: mark }]).png().toBuffer());
  console.log(c, s.uf, s.lat, s.lng);
}
fs.mkdirSync(path.join(ROOT, out), { recursive: true });
await sharp({ create: { width: 3 * 270 - 10, height: 2 * 270 - 10, channels: 3, background: '#e33' } })
  .composite(crops.map((c, i) => ({ input: c, left: (i % 3) * 270, top: Math.floor(i / 3) * 270 }))).png().toFile(path.join(ROOT, out, 'mapa-conferencia.png'));
