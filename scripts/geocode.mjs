/**
 * Geocodifica os pontos novos do mapa (_materiais/rodada-3/novos_pontos_mapa_nov2026.csv) no
 * Nominatim/OpenStreetMap, uma requisição por segundo, e guarda em scripts/geocode-cache.json.
 * O cache não guarda endereços, só nome, cidade, coordenada e precisão. Uso: node scripts/geocode.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { parse } from 'csv-parse/sync';

const ROOT = path.resolve(import.meta.dirname, '..');
const CSV = path.join(ROOT, '_materiais', 'rodada-3', 'novos_pontos_mapa_nov2026.csv');
const CACHE = path.join(ROOT, 'scripts', 'geocode-cache.json');
const UA = 'static-map-geocoder/1.0 (build script, 1 request per second)';
const STATE = { AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul', MG: 'Minas Gerais', PA: 'Pará', PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RS: 'Rio Grande do Sul', RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina', SP: 'São Paulo', SE: 'Sergipe', TO: 'Tocantins' };

/** Rua, número e bairro escritos à mão a partir do endereço enviado, para as consultas acertarem. */
const parsed = {
  'Clube de Campo SP': ['Praça Rockford', '28', 'Vila Represa'], Biosquare: ['Rua dos Pinheiros', '701', 'Pinheiros'], Totvs: ['Avenida Braz Leme', '1000', 'Jardim São Bento'],
  'Parque Ana Costa': ['Avenida Ana Costa', '433', 'Gonzaga'], 'Park Europeu': ['Via Expressa Paul Fritz Kuehnrich', '1600', 'Itoupava Norte'],
  'Norte Sul Plaza': ['Avenida Presidente Ernesto Geisel', '2300', ''], 'Praça Nova Araçatuba': ['Rua Carlos Pereira da Silva', '6000', 'Guanabara'],
  'Montes Claros Shopping': ['Avenida Donato Quintino', '90', 'Cidade Nova'], 'JF 913': ['Rua Joaquim Floriano', '913', 'Itaim Bibi'],
  'JK Tower': ['Rua Leopoldo Couto de Magalhães Júnior', '110', 'Itaim Bibi'], 'Eco Sapucai': ['Rua Marquês de Sapucaí', '200', 'Santo Cristo'],
  Martiniano: ['Rua Martiniano de Carvalho', '851', 'Bela Vista'], 'Plaza I': ['Rua James Joule', '92', 'Cidade Monções'], 'Torre 2.000': ['Rua dos Pinheiros', '870', 'Pinheiros'],
  'Spazio Faria Lima': ['Rua Iguatemi', '151', 'Itaim Bibi'], 'Lagoa Corporate': ['Rua Humaitá', '275', 'Humaitá'], 'Gabriel 1825': ['Alameda Gabriel Monteiro da Silva', '1825', 'Jardim Europa'],
  Denver: ['Avenida Angélica', '2163', 'Consolação'], 'Sueste Plaza': ['Rua Joaquim Floriano', '960', 'Itaim Bibi'], 'Corporate Plaza': ['Avenida Iraí', '72', 'Indianópolis'],
  'Washington Commercial Building': ['Avenida Angélica', '2197', 'Consolação'], 'JF 100': ['Rua Joaquim Floriano', '100', 'Itaim Bibi'], Citadel: ['Rua Bela Cintra', '986', 'Consolação'],
  Quantum: ['Rua Joaquim Floriano', '973', 'Itaim Bibi'], 'Padrão Park Bom Retiro': ['Rua Correia de Melo', '98', 'Bom Retiro'], 'Golden Light': ['Rua Pedroso Alvarenga', '1046', 'Itaim Bibi'],
  'Martim Afonso (Edifício Martim Francisco de Andrada e Silva)': ['Rua Padre João Manuel', '755', 'Cerqueira César'],
  'CASA (Cen. Adm. Sto. Amaro)': ['Avenida Alfredo Egídio de Souza Aranha', '100', 'Vila Cruzeiro'], 'Centro Empresarial Botafogo': ['Praia de Botafogo', '300', 'Botafogo'],
  'Isabella Plaza': ['Avenida Presidente Juscelino Kubitschek', '28', 'Vila Nova Conceição'], 'Crystal Plaza Shopping Center': ['Rua Comendador Araújo', '731', 'Batel'],
  'Shopping Park Europeu': ['Via Expressa Paul Fritz Kuehnrich', '1600', 'Itoupava Norte'], 'Shopping Três Lagoas': ['Avenida Jamil Jorge Salomão', '3807', ''],
  'Shopping Sete Lagoas': ['Avenida Otávio Campelo Ribeiro', '2801', 'Eldorado'], 'Shopping Vale do Aço': ['Avenida Pedro Linhares Gomes', '3900', ''],
  'Shopping Eco Valle': ['Estrada Chiquito de Aquino', '46', ''], 'Praça Nova Santa Maria': ['BR-287', '2885', 'Urlândia'], 'Shopping Serra Dourada': ['Avenida Nova Altamira', '1851', 'Bela Vista'],
  'Jatahy Shopping': ['Avenida Presidente Tancredo Neves', '100', 'Setor Epaminondas'], 'Rio Verde': ['Avenida Presidente Vargas', '1740', ''],
  'Pátio Central Shopping': ['Praça Alexina Cândida Conceição', '5', 'Centro'], 'Ourinhos Shopping': ['Rua Cardoso Ribeiro', '970', 'Vila Boa Esperança'],
  'Boa Vista Shopping': ['Rua Borba Gato', '59', 'Santo Amaro'], Prudenshopping: ['Avenida Manoel Goulart', '2400', 'Jardim das Rosas'], 'Campinas Shopping': ['Rua Jacy Teixeira de Camargo', '940', 'Jardim do Lago'],
};

const norm = (s) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
let last = 0;
async function api(params) {
  const wait = last + 1100 - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  last = Date.now();
  const url = `https://nominatim.openstreetmap.org/search?${new URLSearchParams({ format: 'jsonv2', addressdetails: '1', countrycodes: 'br', limit: '5', 'accept-language': 'pt-BR', ...params })}`;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`Nominatim ${r.status}`);
  return r.json();
}

/** O resultado precisa cair no estado certo e na cidade certa (ou região administrativa dela). */
const inPlace = (hit, city, uf) => {
  const a = hit.address ?? {};
  const state = norm(a.state) === norm(STATE[uf]) || (a['ISO3166-2-lvl4'] ?? '').endsWith(`-${uf}`);
  const cities = [a.city, a.town, a.municipality, a.village, a.county, a.city_district].map(norm);
  return state && cities.some((c) => c === norm(city) || c.includes(norm(city)));
};

async function geocode(name, city, uf) {
  const [street, number, district] = parsed[name] ?? [];
  if (!street) throw new Error(`Sem rua para ${name}`);
  const tries = [
    ['numero', { street: `${number} ${street}`, city, state: STATE[uf] }],
    ['numero', { q: `${street}, ${number}, ${city}, ${STATE[uf]}` }],
    ['nome', { q: `${name}, ${city}, ${STATE[uf]}` }],
    ['rua', { q: `${street}, ${district || city}, ${city}, ${STATE[uf]}` }],
    ['rua', { street, city, state: STATE[uf] }],
    ...(district ? [['bairro (aproximado)', { q: `${district}, ${city}, ${STATE[uf]}` }]] : []),
    ['cidade (aproximado)', { q: `${city}, ${STATE[uf]}` }],
  ];
  let road = null;
  for (const [kind, params] of tries) {
    const hits = (await api(params)).filter((h) => inPlace(h, city, uf));
    if (!hits.length) continue;
    if (kind === 'numero') {
      const exact = hits.find((h) => String(h.address?.house_number ?? '').split(/\D/)[0] === number);
      if (exact) return { lat: +exact.lat, lng: +exact.lon, precision: 'numero' };
      // sem o número exato: guarda a rua e segue procurando algo melhor
      road ??= { lat: +hits[0].lat, lng: +hits[0].lon, precision: 'rua (aproximado)' };
      continue;
    }
    if (kind === 'nome') {
      // um estabelecimento com o mesmo nome só vale se estiver na rua ou no bairro informados (ou for um shopping)
      const words = (t) => norm(t).split(/\W+/).filter((w) => w.length > 3 && !['rua', 'avenida', 'alameda', 'praca', 'doutor', 'presidente'].includes(w));
      const same = (x, y) => words(x).some((w) => words(y).includes(w));
      const poi = hits.find((h) => !['highway', 'boundary', 'place'].includes(h.category)
        && (h.type === 'mall' || same(h.address?.road, street) || (district && same(h.address?.suburb ?? h.address?.neighbourhood, district))));
      if (poi) return { lat: +poi.lat, lng: +poi.lon, precision: 'estabelecimento' };
      continue;
    }
    if (kind === 'rua') return road ?? { lat: +hits[0].lat, lng: +hits[0].lon, precision: 'rua (aproximado)' };
    return road ?? { lat: +hits[0].lat, lng: +hits[0].lon, precision: kind };
  }
  if (road) return road;
  throw new Error(`Não geocodificou: ${name} (${city}/${uf})`);
}

/** JK Square: o quarteirão entre a R. Tenente Negrão, a R. Dr. Renato Paes de Barros e a Av. JK. */
async function jkSquare() {
  const lines = async (q) => {
    const hits = await api({ q: `${q}, Itaim Bibi, São Paulo`, polygon_geojson: '1', limit: '12' });
    return hits.filter((h) => h.category === 'highway' && h.geojson?.type === 'LineString').flatMap((h) => h.geojson.coordinates.map(([x, y]) => [x, y]));
  };
  const t = await lines('Rua Tenente Negrão');
  const r = await lines('Rua Doutor Renato Paes de Barros');
  const j = await lines('Avenida Presidente Juscelino Kubitschek');
  const dist = (a, b) => Math.hypot((a[0] - b[0]) * 102000, (a[1] - b[1]) * 111000);
  const nearest = (A, B) => { let best = [Infinity]; for (const a of A) for (const b of B) { const d = dist(a, b); if (d < best[0]) best = [d, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]]; } return best; };
  const [dt, it] = nearest(t, j);
  const [dr, ir] = nearest(r, j);
  if (!it || !ir || dt > 120 || dr > 120) throw new Error('JK Square: cruzamentos não encontrados');
  const mid = [(it[0] + ir[0]) / 2, (it[1] + ir[1]) / 2];
  // avança para dentro do quarteirão, no sentido em que as duas ruas seguem a partir da avenida
  const inward = [...t, ...r].filter((p) => dist(p, mid) < 220 && nearest([p], j)[0] > 30);
  const dir = inward.length ? [inward.reduce((s, p) => s + p[0], 0) / inward.length - mid[0], inward.reduce((s, p) => s + p[1], 0) / inward.length - mid[1]] : [0, 0];
  const len = dist([mid[0] + dir[0], mid[1] + dir[1]], mid) || 1;
  const k = Math.min(1, 55 / len);
  return { lat: +(mid[1] + dir[1] * k).toFixed(6), lng: +(mid[0] + dir[0] * k).toFixed(6), precision: 'quarteirao (aproximado)' };
}

const rows = parse(fs.readFileSync(CSV, 'utf8').replace(/^﻿/, ''), { columns: true, delimiter: ';', skip_empty_lines: true });
const seen = new Set();
for (const row of rows) {
  const name = row.nome.trim();
  const city = row.cidade.trim();
  const uf = row.uf.trim();
  const key = `${name}|${city}|${uf}`;
  if (seen.has(key)) continue; // endereço repetido na lista conta uma vez
  seen.add(key);
  const hash = createHash('sha1').update(row.endereco_como_enviado).digest('hex').slice(0, 10);
  if (cache[key]?.hash === hash) continue;
  const res = name === 'JK Square' ? await jkSquare() : await geocode(name, city, uf);
  cache[key] = { name, city, uf, ...res, hash };
  fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1));
  console.log(key, res.precision, res.lat, res.lng);
}
const approx = Object.values(cache).filter((c) => c.precision.includes('aproximado'));
console.log(`${Object.keys(cache).length} pontos no cache; aproximados: ${approx.map((c) => `${c.name} (${c.precision})`).join(', ') || 'nenhum'}`);
