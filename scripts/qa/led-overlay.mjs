// Confere os contornos do LED sobre a foto original: node scripts/qa/led-overlay.mjs [saida.png] [x y w h escala]
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..', '..');
const [out = 'qa/rodada-3/led-contornos.png', x, y, w, h, k = '1'] = process.argv.slice(2);
const led = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/hero-led.json'), 'utf8'));
const src = path.join(ROOT, '_materiais/02_Fotos_Eletrix/eletrix_carregador_totem_orelhao.jpg');
const colors = ['#ff00aa', '#00ff66', '#ffee00', '#ff6600', '#00eeff', '#ff0033', '#aa00ff', '#00ffcc', '#ffffff', '#ff3399', '#ffff33', '#33ff33'];
const paths = led.segments.map((s, i) => {
  const m = s.d.match(/M\s*([\d.]+)\s+([\d.]+)/);
  return `<path d="${s.d}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="1.6"/><circle cx="${m[1]}" cy="${m[2]}" r="4" fill="${colors[i % colors.length]}"/><text x="${+m[1] + 6}" y="${+m[2]}" font-size="13" font-family="Arial" fill="${colors[i % colors.length]}">${s.id}</text>`;
}).join('');
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${led.w}" height="${led.h}" viewBox="0 0 ${led.w} ${led.h}">${paths}</svg>`);
fs.mkdirSync(path.dirname(path.resolve(ROOT, out)), { recursive: true });
let buf = await sharp(src).modulate({ brightness: 0.75 }).composite([{ input: svg }]).png().toBuffer();
if (x !== undefined) {
  const [X, Y, W, H, K] = [x, y, w, h, k].map(Number);
  // amplia a foto e desenha os traços em resolução cheia sobre o recorte
  const big = await sharp(src).modulate({ brightness: 0.8 }).extract({ left: X, top: Y, width: W, height: H }).resize(Math.round(W * K)).toBuffer();
  const svg2 = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(W * K)}" height="${Math.round(H * K)}" viewBox="${X} ${Y} ${W} ${H}">${paths.replace(/stroke-width="1.6"/g, 'stroke-width="1"')}</svg>`);
  buf = await sharp(big).composite([{ input: svg2 }]).png().toBuffer();
}
await sharp(buf).toFile(path.resolve(ROOT, out));
console.log('ok', out);
