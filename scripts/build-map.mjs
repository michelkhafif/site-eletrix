/**
 * Gera public/mapa/rede-brasil.svg: mapa estático (divisas estaduais e municipais em azul), pins
 * e o detalhe ampliado da Grande São Paulo, em um arquivo só. Fonte das divisas: API de malhas do
 * IBGE (GeoJSON), simplificadas aqui, em tempo de build (nenhuma biblioteca de mapa no navegador).
 *
 * Uso: node scripts/build-map.mjs   (usa scripts/map-cache/ para não baixar de novo)
 * Pontos: src/data/estacoes.json (gerado por scripts/build-stations.mjs).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CACHE = path.join(ROOT, 'scripts', 'map-cache');
fs.mkdirSync(CACHE, { recursive: true });

const UF_CODE = { RO: 11, AC: 12, AM: 13, RR: 14, PA: 15, AP: 16, TO: 17, MA: 21, PI: 22, CE: 23, RN: 24, PB: 25, PE: 26, AL: 27, SE: 28, BA: 29, MG: 31, ES: 32, RJ: 33, SP: 35, PR: 41, SC: 42, RS: 43, MS: 50, MT: 51, GO: 52, DF: 53 };

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
  const kk = (180 / Math.PI) * k;
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
// Anéis são fechados: divide no ponto mais distante do início e simplifica as duas metades.
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
const ringsOf = (g) => (g.type === 'Polygon' ? g.coordinates : g.type === 'MultiPolygon' ? g.coordinates.flat() : []);

/** Caminho compacto: coordenadas relativas com uma casa decimal. */
const num = (n) => String(Math.round(n * 10) / 10).replace(/^(-?)0\./, '$1.');
function toPath(features, v, tol, minSize) {
  let d = '';
  for (const f of features) {
    for (const ring of ringsOf(f.geometry)) {
      const pts = ring.map(([lng, lat]) => v.project(lng, lat));
      const box = inBox(pts, v);
      if (!box.hit || (box.w < minSize && box.h < minSize)) continue;
      const s = simplifyRing(pts, tol).map(([x, y]) => [Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
      if (s.length < 3) continue;
      let [px, py] = s[0];
      let seg = `M${num(px)} ${num(py)}l`;
      for (let i = 1; i < s.length - 1; i++) {
        const dx = s[i][0] - px, dy = s[i][1] - py;
        if (!dx && !dy) continue;
        const a = num(dx), b = num(dy);
        seg += `${i > 1 && !a.startsWith('-') ? ' ' : ''}${a}${b.startsWith('-') ? '' : ' '}${b}`;
        [px, py] = s[i];
      }
      d += `${seg}z`;
    }
  }
  return d;
}

// --- dados
const points = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/estacoes.json'), 'utf8'));
const ufs = [...new Set(points.map((p) => p.uf))];
const lngs = points.map((p) => p.lng), lats = points.map((p) => p.lat);
// enquadra todos os pontos, com folga; sobra de mar à direita para o detalhe da Grande São Paulo
const main = makeView({ lng0: Math.min(...lngs) - 3.2, lng1: Math.max(...lngs) + 2.6, lat0: Math.min(...lats) - 2.1, lat1: Math.max(...lats) + 2.3 }, 900);
// capital e entorno imediato: perto o bastante para os pins do centro se abrirem
const insetView = makeView({ lng0: -46.885, lng1: -46.545, lat0: -23.745, lat1: -23.43 }, 600);

const brUF = await get('uf.json', `${API}/paises/BR?${q('qualidade=minima&intrarregiao=UF')}`);
const codes = new Set(ufs.map((u) => String(UF_CODE[u])));
const isPresent = (f) => codes.has(String(f.properties?.codarea));
const statesOther = toPath(brUF.features.filter((f) => !isPresent(f)), main, 0.6, 2);
const statesOn = toPath(brUF.features.filter(isPresent), main, 0.6, 2);

let cities = '';
for (const uf of ufs) {
  const code = UF_CODE[uf];
  const j = await get(`muni-${code}.json`, `${API}/estados/${code}?${q('qualidade=minima&intrarregiao=municipio')}`);
  cities += toPath(j.features, main, 0.8, 1.6);
}
const spFine = await get('muni-35-int.json', `${API}/estados/35?${q('qualidade=intermediaria&intrarregiao=municipio')}`);
const insetCities = toPath(spFine.features, insetView, 0.7, 2);
const capital = toPath(spFine.features.filter((f) => String(f.properties?.codarea) === '3550308'), insetView, 0.7, 2);

// --- pins
const r1 = (n) => Math.round(n * 10) / 10;
const inside = (s, v) => s.lng >= v.b.lng0 && s.lng <= v.b.lng1 && s.lat >= v.b.lat0 && s.lat <= v.b.lat1;
/** Pequeno agrupamento em volta do endereço (em frações do tamanho do pin). */
const cluster = [[0, -0.62], [-0.62, 0.2], [0.62, 0.2]];
let halo = 0;
function pins(list, v, size, { thin = 0, minGap = 0 } = {}) {
  const kept = [];
  const halos = [], drops = [];
  const placed = list.map((s) => ({ s, xy: v.project(s.lng, s.lat) })).sort((a, b) => a.xy[1] - b.xy[1]);
  for (const { s, xy: [x, y] } of placed) {
    // no mapa geral, a região do detalhe fica com menos pins para não virar mancha
    const crowded = thin && inside(s, insetView);
    if (crowded && kept.some(([a, b]) => Math.hypot(a - x, b - y) < thin)) continue;
    if (minGap && kept.some(([a, b]) => Math.hypot(a - x, b - y) < minGap)) continue;
    kept.push([x, y]);
    const animated = halo % 3 === 0;
    const delay = ((halo * 0.61) % 4.4).toFixed(2);
    halo += 1;
    halos.push(`<circle class="${animated ? 'h a' : 'h'}" cx="${r1(x)}" cy="${r1(y - size * 0.45)}" r="${r1(size * (s.pins > 1 ? 1.35 : 0.9))}"${animated ? ` style="animation-delay:${delay}s"` : ''}/>`);
    const offsets = s.pins > 1 && !crowded ? cluster : [[0, 0]];
    for (const [dx, dy] of offsets) drops.push(`<use href="#p" transform="translate(${r1(x + dx * size)} ${r1(y + dy * size)}) scale(${size})"${s.status === 'operando' ? '' : ' opacity=".82"'}/>`);
  }
  return { halos: halos.join(''), drops: drops.join(''), count: drops.length };
}

const [fx0, fy0] = main.project(insetView.b.lng0, insetView.b.lat1);
const [fx1, fy1] = main.project(insetView.b.lng1, insetView.b.lat0);
// detalhe no mar, abaixo do Rio de Janeiro
const [ix, iy] = main.project(-44.45, -24.75);
const isize = Math.min(main.width - ix - 12, main.height - iy - 14);
const k = isize / insetView.width;

const mainPins = pins(points, main, 23, { thin: 13 });
const insetPins = pins(points.filter((s) => inside(s, insetView)), insetView, 20, { minGap: 5.5 });

/** Pulso dos halos (só na versão animada). */
const pulse = `
@media (prefers-reduced-motion:no-preference){.a{animation:p 4.4s ease-in-out infinite}}
@keyframes p{0%,100%{opacity:.12;transform:scale(.6)}50%{opacity:.95;transform:scale(1.55)}}`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${main.width} ${main.height}" width="${main.width}" height="${main.height}">
<defs>
<radialGradient id="g" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#b6ecff"/><stop offset=".42" stop-color="#10b7ff"/><stop offset="1" stop-color="#0a6fa3"/></radialGradient>
<radialGradient id="h" r=".5"><stop offset="0" stop-color="#10b7ff" stop-opacity=".8"/><stop offset="1" stop-color="#10b7ff" stop-opacity="0"/></radialGradient>
<g id="p"><ellipse cx=".06" cy=".02" rx=".3" ry=".1" fill="#000" opacity=".35"/><path d="M0 0C-.22-.4-.5-.66-.5-.98a.5.5 0 1 1 1 0C.5-.66.22-.4 0 0Z" fill="url(#g)" stroke="#031120" stroke-opacity=".7" stroke-width=".07"/><circle cx="0" cy="-.98" r=".19" fill="#eefaff"/></g>
<clipPath id="c"><rect width="${insetView.width}" height="${insetView.height}" rx="34"/></clipPath>
<linearGradient id="fx" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#000"/><stop offset=".09" stop-color="#fff"/><stop offset=".91" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
<linearGradient id="fy" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset=".08" stop-color="#fff"/><stop offset=".96" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
<mask id="mx" maskUnits="userSpaceOnUse" x="0" y="0" width="${main.width}" height="${main.height}"><rect width="${main.width}" height="${main.height}" fill="url(#fx)"/></mask>
<mask id="my" maskUnits="userSpaceOnUse" x="0" y="0" width="${main.width}" height="${main.height}"><rect width="${main.width}" height="${main.height}" fill="url(#fy)"/></mask>
</defs>
<style>.h{fill:url(#h);opacity:.42;transform-box:fill-box;transform-origin:center}${pulse}</style>
<g mask="url(#mx)"><g mask="url(#my)" stroke-linejoin="round">
<path d="${statesOther}" fill="#08142a" stroke="#10b7ff" stroke-opacity=".28" stroke-width="1"/>
<path d="${statesOn}" fill="#0c2444" stroke="none"/>
<path d="${cities}" fill="none" stroke="#10b7ff" stroke-opacity=".34" stroke-width=".55"/>
<path d="${statesOn}" fill="none" stroke="#3fc7ff" stroke-opacity=".85" stroke-width="1.4"/>
</g></g>
<g stroke="#9be4ff" stroke-width="1.2" fill="none">
<rect x="${r1(fx0)}" y="${r1(fy0)}" width="${r1(fx1 - fx0)}" height="${r1(fy1 - fy0)}" rx="4" stroke-opacity=".9"/>
<path d="M${r1(fx1)} ${r1(fy0)}L${r1(ix + isize - 14)} ${r1(iy + 2)}M${r1(fx0)} ${r1(fy1)}L${r1(ix + 2)} ${r1(iy + isize - 14)}" stroke-opacity=".38" stroke-dasharray="4 5"/>
</g>
<g>${mainPins.halos}</g>
<g>${mainPins.drops}</g>
<g transform="translate(${r1(ix)} ${r1(iy)}) scale(${k.toFixed(4)})">
<g clip-path="url(#c)">
<rect width="${insetView.width}" height="${insetView.height}" fill="#071326"/>
<path d="${insetCities}" fill="#0c2444" stroke="#10b7ff" stroke-opacity=".5" stroke-width="1.8" stroke-linejoin="round"/>
<path d="${capital}" fill="#12365f" stroke="#4ccbff" stroke-opacity=".9" stroke-width="2.4" stroke-linejoin="round"/>
<g>${insetPins.halos}</g>
<g>${insetPins.drops}</g>
</g>
<rect width="${insetView.width}" height="${insetView.height}" rx="34" fill="none" stroke="#4ccbff" stroke-width="${r1(1.6 / k)}"/>
</g>
</svg>
`;

const outDir = path.join(ROOT, 'public', 'mapa');
fs.mkdirSync(outDir, { recursive: true });
fs.rmSync(path.join(outDir, 'rede-grande-sp.svg'), { force: true });
fs.writeFileSync(path.join(outDir, 'rede-brasil.svg'), svg);
// versão sem animação, escolhida pela própria página quando a pessoa pede menos movimento
// (a consulta de mídia dentro de um SVG carregado como imagem não é confiável em todos os navegadores)
fs.writeFileSync(path.join(outDir, 'rede-brasil-parado.svg'), svg.replace(pulse, ''));

const pct = (v, total) => Math.round((v / total) * 1000) / 10;
const summary = {
  locais: points.length, pins: points.reduce((n, p) => n + p.pins, 0), cidades: new Set(points.map((s) => `${s.city}/${s.uf}`)).size, estados: ufs.length,
  main: [main.width, main.height],
  /** enquadramento do mapa geral (para conferir pontos) */
  bbox: main.b,
  /** posição do rótulo do detalhe, em % do mapa */
  inset: { left: pct(ix, main.width), top: pct(iy, main.height), width: pct(isize, main.width) },
};
fs.writeFileSync(path.join(ROOT, 'src/data/map.generated.json'), JSON.stringify(summary));
const size = fs.statSync(path.join(outDir, 'rede-brasil.svg')).size;
const { gzipSync } = await import('node:zlib');
console.log(`rede-brasil.svg ${Math.round(size / 1024)} KB (gzip ${Math.round(gzipSync(svg).length / 1024)} KB), pins no mapa ${mainPins.count}, no detalhe ${insetPins.count}`);
console.log(summary);
