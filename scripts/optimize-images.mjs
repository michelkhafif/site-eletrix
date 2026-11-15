/**
 * Otimiza as imagens de _materiais/ para public/ (AVIF + WebP + JPG, várias larguras),
 * prepara os logos (SVG recortado / PNG → WebP) e gera manifestos com dimensões.
 *
 * Uso: npm run images
 * Só entra no repositório o que sai daqui. _materiais/ nunca é commitado.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, '_materiais');
const OUT_IMG = path.join(ROOT, 'public', 'images');
const OUT_LOGO = path.join(ROOT, 'public', 'logos');
const OUT_BRAND = path.join(ROOT, 'public', 'brand');
const DATA = path.join(ROOT, 'src', 'data');

for (const d of [OUT_IMG, OUT_LOGO, OUT_BRAND, DATA]) fs.mkdirSync(d, { recursive: true });

// nome limpo -> arquivo de origem
const P = '01_Fotos_Predios/';
const E = '02_Fotos_Eletrix/';
const images = {
  'aqwa-por-do-sol': P + '01_Aqwa-Corporate_RJ_por-do-sol.jpg',
  'aqwa-noite': P + '02_Aqwa-Corporate_RJ_noite.jpg',
  'thera-praca': P + '03_Thera-Corporate_SP_praca.jpg',
  'thera-entrada': P + '04_Thera-Corporate_SP_entrada.jpg',
  'river-one-fim-de-tarde': P + '05_River-One_SP_fim-de-tarde.jpg',
  'river-one-fachada': P + '06_River-One_SP_fachada-rio.jpg',
  'pinheiros-one-aerea': P + '07_Pinheiros-One_SP_aerea.jpg',
  'pinheiros-one-fachada': P + '08_Pinheiros-One_SP_fachada.jpg',
  'arquipeo-aerea': P + '09_Arquipeo_SP_aerea.jpg',
  'arquipeo-jardim': P + '10_Arquipeo_SP_jardim-interno.jpg',
  'cea-aerea': P + '11_Centro-Empresarial-do-Aco_SP_aerea.jpg',
  'cea-fachada': P + '12_Centro-Empresarial-do-Aco_SP_fachada.jpg',
  'faria-lima-financial-center': P + '13_Faria-Lima-Financial-Center_SP.jpg',
  'castelo-branco-office-park': P + '14_Castelo-Branco-Office-Park_Barueri.jpg',
  'totvs-seneca': P + '15_TOTVS-Seneca_SP.jpg',
  biosquare: P + '16_Biosquare_SP_render.jpg',
  'berrini-500': P + '17_Berrini-500_SP.jpg',
  'jk-360': P + '18_JK-360_SP.jpg',
  'botafogo-trade-center': P + '19_Botafogo-Trade-Center_RJ.jpg',
  'eco-sapucai': P + '20_ECO-Sapucai_RJ_render.jpg',
  'bresco-viracopos': P + '21_Bresco-Viracopos_Campinas.jpg',
  'maringa-park': P + '22_Shopping-Maringa-Park_PR.jpg',
  'app-mapa': E + 'eletrix_app.jpg',
  'totem-orelhao': E + 'eletrix_carregador_totem_orelhao.jpg',
  'case-1': E + 'eletrix_case_1.jpg',
  'case-2': E + 'eletrix_case_2.jpg',
  'case-3': E + 'eletrix_case_3.jpg',
  'case-4': E + 'eletrix_case_4.jpg',
  'case-5': E + 'eletrix_case_5.jpg',
  'case-6': E + 'eletrix_case_6.jpg',
  'case-7': E + 'eletrix_case_7.jpg',
  'case-8': E + 'eletrix_case_8.jpg',
  'hub-garagem': E + 'eletrix_hub_garagem.jpg',
  'hub-recarga': E + 'eletrix_hub_recarga.jpg',
  'estadao-orelhao': E + 'imprensa_estadao_1.jpg',
  'estadao-predios': E + 'imprensa_estadao_2.jpg',
  ceo: E + 'michel_khafif_ceo.jpg',
};

const WIDTHS = [480, 800, 1280];
const HERO = ['aqwa-por-do-sol', 'thera-praca', 'river-one-fim-de-tarde', 'pinheiros-one-aerea'];
const manifest = {};

async function processImage(name, rel) {
  const file = path.join(SRC, rel);
  const meta = await sharp(file).metadata();
  const aspect = meta.height / meta.width;
  const wl = HERO.includes(name) ? [...WIDTHS, 1920] : WIDTHS;
  const ws = wl.filter((w) => w < meta.width);
  const maxW = Math.min(meta.width, wl[wl.length - 1]);
  if (!ws.includes(maxW)) ws.push(maxW);
  ws.sort((a, b) => a - b);
  for (const w of ws) {
    const base = sharp(file).rotate().resize({ width: w, withoutEnlargement: true });
    await base.clone().avif({ quality: 52, effort: 4 }).toFile(path.join(OUT_IMG, `${name}-${w}.avif`));
    await base.clone().webp({ quality: 74 }).toFile(path.join(OUT_IMG, `${name}-${w}.webp`));
  }
  // JPG só como fallback, em uma largura (a maior até 1280)
  const fb = ws.filter((w) => w <= 1280).pop();
  await sharp(file).rotate().resize({ width: fb, withoutEnlargement: true }).jpeg({ quality: 74, progressive: true, mozjpeg: true }).toFile(path.join(OUT_IMG, `${name}-${fb}.jpg`));
  manifest[name] = { w: maxW, h: Math.round(maxW * aspect), widths: ws, fallback: fb };
  console.log('img', name, ws.join(','));
}

// ---------- logos ----------
// svg quando o vetor é bom; senão PNG → WebP. Ordem de preferência definida por partner.
const LOGOS = '03_Logos/';
const svgOk = ['barzel', 'cbre', 'cushman-wakefield', 'cyrela', 'hazak', 'innova', 'intelbras', 'jaime', 'jll', 'plenty-park', 'rrm-estacionamentos', 'shpaisman', 'sl', 'totvs', 'weg', 'winpark'];
const pngOnly = [
  'argoplan', 'atrio', 'bbz', 'bresco', 'brookfield', 'confiance-hotel', 'elias-victor-nigri', 'garageinn', 'guardian',
  'hersil', 'housi', 'inteli', 'intercity', 'kinea', 'link', 'padrao-park', 'paris-condominios', 'patria', 'pepe',
  'safra', 'slaviero-hoteis', 'tishman-speyer', 'vitacon',
];
const logoManifest = {};

/** Recorta o viewBox do SVG para o conteúdo visível. */
async function cropSvg(svgText) {
  svgText = svgText.replace(/<c2pa:manifest[\s\S]*?(<\/c2pa:manifest>|\/>)/g, '').replace(/ xmlns:c2pa="[^"]*"/g, '');
  const vb = svgText.match(/viewBox="([\d.\-\s]+)"/);
  const wh = svgText.match(/<svg[^>]*\swidth="([\d.]+)(?:px)?"[^>]*\sheight="([\d.]+)(?:px)?"/);
  let [x, y, w, h] = vb ? vb[1].trim().split(/\s+/).map(Number) : [0, 0, Number(wh?.[1]), Number(wh?.[2])];
  if (!w || !h) return { svg: svgText, w: 100, h: 40 };
  const scale = 1600 / w;
  const buf = Buffer.from(svgText);
  const { data, info } = await sharp(buf, { density: 72 * scale }).resize({ width: 1600 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const opaqueBg = data[3] === 255 && data[(info.width * 4) - 1] === 255;
  // bbox por alfa > 8 e por pixels não-brancos (alguns svgs têm fundo branco)
  let minX = info.width, minY = info.height, maxX = 0, maxY = 0;
  for (let j = 0; j < info.height; j++) {
    for (let i = 0; i < info.width; i++) {
      const k = (j * info.width + i) * 4;
      const a = data[k + 3];
      const nonWhite = data[k] < 245 || data[k + 1] < 245 || data[k + 2] < 245;
      if (a > 8 && (nonWhite || !opaqueBg)) {
        if (i < minX) minX = i; if (i > maxX) maxX = i; if (j < minY) minY = j; if (j > maxY) maxY = j;
      }
    }
  }
  if (maxX <= minX || maxY <= minY) return { svg: svgText, w, h };
  const s = w / info.width;
  const pad = 2;
  const nx = x + Math.max(0, minX - pad) * s;
  const ny = y + Math.max(0, minY - pad) * s;
  const nw = (maxX - minX + 2 * pad) * s;
  const nh = (maxY - minY + 2 * pad) * s;
  const f = (n) => Number(n.toFixed(2));
  let out = svgText
    .replace(/viewBox="[^"]*"/, `viewBox="${f(nx)} ${f(ny)} ${f(nw)} ${f(nh)}"`)
    .replace(/(<svg[^>]*?)\swidth="[^"]*"/, '$1')
    .replace(/(<svg[^>]*?)\sheight="[^"]*"/, '$1');
  if (!/viewBox=/.test(out)) out = out.replace('<svg', `<svg viewBox="${f(nx)} ${f(ny)} ${f(nw)} ${f(nh)}"`);
  return { svg: out, w: f(nw), h: f(nh) };
}

async function processLogo(slug) {
  if (svgOk.includes(slug)) {
    const text = fs.readFileSync(path.join(SRC, LOGOS, 'svg_vetor', `${slug}.svg`), 'utf8');
    const { svg, w, h } = await cropSvg(text);
    fs.writeFileSync(path.join(OUT_LOGO, `${slug}.svg`), svg);
    logoManifest[slug] = { file: `/logos/${slug}.svg`, w: Math.round(w), h: Math.round(h) };
  } else {
    const file = path.join(SRC, LOGOS, 'png_cor_transparente', `${slug}.png`);
    const trimmed = await sharp(file).trim({ threshold: 10 }).toBuffer();
    const out = path.join(OUT_LOGO, `${slug}.webp`);
    await sharp(trimmed).resize({ width: 360, withoutEnlargement: true }).webp({ quality: 88, alphaQuality: 95 }).toFile(out);
    const m = await sharp(out).metadata();
    logoManifest[slug] = { file: `/logos/${slug}.webp`, w: m.width, h: m.height };
  }
  console.log('logo', slug);
}

async function processBrand() {
  for (const [src, dest] of [
    ['eletrix_logo_transparente_para-fundo-escuro.svg', 'eletrix-logo-escuro.svg'],
    ['eletrix_logo_transparente_para-fundo-claro.svg', 'eletrix-logo-claro.svg'],
    ['eletrix_slogan_carregando-seu-futuro.svg', 'carregando-seu-futuro.svg'],
  ]) {
    const text = fs.readFileSync(path.join(SRC, LOGOS, 'eletrix', src), 'utf8');
    const { svg, w, h } = await cropSvg(text);
    fs.writeFileSync(path.join(OUT_BRAND, dest), svg);
    console.log('brand', dest, w, h);
  }
}

const only = process.argv[2];
if (!only || only === 'img') for (const [n, f] of Object.entries(images)) await processImage(n, f);
if (!only || only === 'logos') {
  for (const s of [...svgOk, ...pngOnly]) await processLogo(s);
  await processBrand();
}
if (!only || only === 'img') fs.writeFileSync(path.join(DATA, 'images.generated.json'), JSON.stringify(manifest, null, 1));
if (!only || only === 'logos') fs.writeFileSync(path.join(DATA, 'logos.generated.json'), JSON.stringify(logoManifest, null, 1));
console.log('ok');
