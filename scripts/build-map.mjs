/**
 * Gera src/data/map.generated.json: SVG estático do mapa (divisas estaduais + municipais em azul) e os pins.
 * Fonte das divisas: API de malhas do IBGE (GeoJSON). Tudo é simplificado aqui, em tempo de build,
 * para o visitante receber só um SVG leve (nada de biblioteca de mapa no navegador).
 *
 * Uso: node scripts/build-map.mjs   (usa scripts/map-cache/ para não baixar de novo)
 * Entrada de pontos: src/data/estacoes.json (gerado por `npm run data`).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CACHE = path.join(ROOT, 'scripts', 'map-cache');
fs.mkdirSync(CACHE, { recursive: true });

// UFs onde a Eletrix tem pontos: ganham divisas municipais. As demais mostram só a divisa estadual.
const MUNI_UFS = { 35: 'SP', 33: 'RJ', 41: 'PR', 42: 'SC', 43: 'RS', 29: 'BA' };

async function get(file, url) {
  const f = path.join(CACHE, file);
  if (!fs.existsSync(f)) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${url} -> ${r.status}`);
    fs.writeFileSync(f, Buffer.from(await r.arrayBuffer()));
  }
  return JSON.parse(fs.readFileSync(f, 'utf8'));
}
const API = 'https://servicodados.ibge.gov.br/api/v3/malhas';
const q = (extra) => `formato=application/vnd.geo+json&${extra}`;

// --- projeção (Mercator) e enquadramento
const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
function makeView(b, width) {
  const x0 = b.lng0, x1 = b.lng1, yTop = merc(b.lat1), yBot = merc(b.lat0);
  const k = width / (x1 - x0);
  const kk = (180 / Math.PI) * k; // converte mercator (rad) para graus*k
  const height = Math.round((yTop - yBot) * kk);
  return { width, height, b, project: (lng, lat) => [(lng - x0) * k, (yTop - merc(lat)) * kk] };
}

// --- simplificação (Douglas-Peucker)
function dp(pts, tol) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let max = 0, idx = -1;
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1e-9;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / len;
      if (d > max) { max = d; idx = i; }
    }
    if (max > tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}

// Anéis são fechados (primeiro = último): divide no ponto mais distante do início e simplifica as duas metades.
function simplifyRing(pts, tol) {
  const n = pts.length - 1;
  if (n < 4) return pts;
  let far = 1, max = -1;
  for (let i = 1; i < n; i++) { const d = Math.hypot(pts[i][0] - pts[0][0], pts[i][1] - pts[0][1]); if (d > max) { max = d; far = i; } }
  const a = dp(pts.slice(0, far + 1), tol), b = dp(pts.slice(far, n + 1), tol);
  return [...a, ...b.slice(1)];
}

const inBox = (pts, v) => {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const [x, y] of pts) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  return { hit: !(x1 < -5 || y1 < -5 || x0 > v.width + 5 || y0 > v.height + 5), w: x1 - x0, h: y1 - y0 };
};

function ringsOf(geom) {
  if (geom.type === 'Polygon') return geom.coordinates;
  if (geom.type === 'MultiPolygon') return geom.coordinates.flat();
  return [];
}
const r1 = (n) => Math.round(n * 10) / 10;
function toPath(features, v, tol, minSize) {
  let d = '';
  for (const f of features) {
    for (const ring of ringsOf(f.geometry)) {
      const pts = ring.map(([lng, lat]) => v.project(lng, lat));
      const box = inBox(pts, v);
      if (!box.hit || (box.w < minSize && box.h < minSize)) continue;
      const s = simplifyRing(pts, tol);
      if (s.length < 3) continue;
      d += 'M' + s.map(([x, y]) => `${r1(x)} ${r1(y)}`).join('L') + 'Z';
    }
  }
  return d;
}

const main = makeView({ lng0: -57.8, lng1: -36.8, lat0: -31.4, lat1: -11.6 }, 1000);
const inset = makeView({ lng0: -47.0, lng1: -46.2, lat0: -24.05, lat1: -23.25 }, 600);

const brUF = await get('uf.json', `${API}/paises/BR?${q('qualidade=minima&intrarregiao=UF')}`);
const states = toPath(brUF.features, main, 0.5, 2); 

let cities = '';
for (const code of Object.keys(MUNI_UFS)) {
  const j = await get(`muni-${code}.json`, `${API}/estados/${code}?${q('qualidade=minima&intrarregiao=municipio')}`);
  cities += toPath(j.features, main, 0.7, 1.2);
}
const spFine = await get('muni-35-int.json', `${API}/estados/35?${q('qualidade=intermediaria&intrarregiao=municipio')}`);
const insetCities = toPath(spFine.features, inset, 0.5, 1);

// --- pins
const pts = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/estacoes.json'), 'utf8'));
const inInset = (s) => s.lng >= inset.b.lng0 && s.lng <= inset.b.lng1 && s.lat >= inset.b.lat0 && s.lat <= inset.b.lat1;
const [ix0, iy0] = main.project(inset.b.lng0, inset.b.lat1);
const [ix1, iy1] = main.project(inset.b.lng1, inset.b.lat0);

/** Pin em gota (ponta no ponto exato), com volume em gradiente e um halo que pulsa, defasado entre os pins. */
function svg(v, { states = '', cities = '', list, pinSize, frame }) {
  const halos = [], drops = [];
  list.forEach((s, i) => {
    const [x, y] = v.project(s.lng, s.lat);
    const delay = ((i * 0.73) % 4.2).toFixed(2);
    halos.push(`<circle class="h" cx="${r1(x)}" cy="${r1(y)}" r="${r1(pinSize * 0.75)}" style="animation-delay:${delay}s"/>`);
    drops.push(`<use href="#p" transform="translate(${r1(x)} ${r1(y)}) scale(${pinSize})"${s.status === 'operando' ? '' : ' opacity=".8"'}/>`);
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${v.width} ${v.height}" width="${v.width}" height="${v.height}">
<defs>
<radialGradient id="g" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#9be4ff"/><stop offset=".45" stop-color="#10b7ff"/><stop offset="1" stop-color="#0877ad"/></radialGradient>
<radialGradient id="h" r=".5"><stop offset="0" stop-color="#10b7ff" stop-opacity=".85"/><stop offset="1" stop-color="#10b7ff" stop-opacity="0"/></radialGradient>
<g id="p"><path d="M0 0C-.22-.4-.5-.66-.5-.98a.5.5 0 1 1 1 0C.5-.66.22-.4 0 0Z" fill="url(#g)" stroke="#04101d" stroke-opacity=".55" stroke-width=".04"/><circle cx="0" cy="-.98" r=".2" fill="#eafaff"/></g>
</defs>
<style>.h{fill:url(#h);opacity:.45;transform-box:fill-box;transform-origin:center}
@media (prefers-reduced-motion:no-preference){.h{animation:p 3.8s ease-in-out infinite}}
@keyframes p{0%,100%{opacity:.15;transform:scale(.55)}50%{opacity:.9;transform:scale(1.6)}}</style>
${frame ? '' : ''}<g fill="#0b1b30" stroke="#10b7ff" stroke-opacity=".55" stroke-width="1.3" stroke-linejoin="round"><path d="${states}"/></g>
<g fill="none" stroke="#10b7ff" stroke-opacity=".3" stroke-width=".55" stroke-linejoin="round"><path d="${cities}"/></g>
${frame ? `<rect x="${frame[0]}" y="${frame[1]}" width="${frame[2]}" height="${frame[3]}" rx="3" fill="none" stroke="#9be4ff" stroke-opacity=".8" stroke-width="1.4" stroke-dasharray="5 4"/>` : ''}
<g>${halos.join('')}</g>
<g>${drops.join('')}</g>
</svg>
`;
}
const outDir = path.join(ROOT, 'public', 'mapa');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'rede-brasil.svg'), svg(main, { states, cities, list: pts, pinSize: 27, frame: [r1(ix0), r1(iy0), r1(ix1 - ix0), r1(iy1 - iy0)] }));
// No detalhe da Grande SP o fundo é só município (sem divisa estadual grossa)
fs.writeFileSync(path.join(outDir, 'rede-grande-sp.svg'), svg(inset, { states: insetCities, cities: '', list: pts.filter(inInset), pinSize: 30 }));

const summary = { total: pts.length, operando: pts.filter((s) => s.status === 'operando').length, aInstalar: pts.filter((s) => s.status !== 'operando').length, cidades: new Set(pts.map((s) => `${s.city}/${s.uf}`)).size, estados: new Set(pts.map((s) => s.uf)).size, main: [main.width, main.height], inset: [inset.width, inset.height] };
fs.writeFileSync(path.join(ROOT, 'src/data/map.generated.json'), JSON.stringify(summary));
for (const f of ['rede-brasil.svg', 'rede-grande-sp.svg']) console.log(f, Math.round(fs.statSync(path.join(outDir, f)).size / 1024) + ' KB');
console.log(summary);
