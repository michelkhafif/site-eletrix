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
const R3 = 'rodada-3/';
const C = R3 + '01_Fotos_Predios_Carrossel/';
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
  'faria-lima-financial-center': P + '13_Faria-Lima-Financial-Center_SP.jpg',
  'totvs-seneca': P + '15_TOTVS-Seneca_SP.jpg',
  biosquare: P + '16_Biosquare_SP_render.jpg',
  'jk-360': P + '18_JK-360_SP.jpg',
  'botafogo-trade-center': P + '19_Botafogo-Trade-Center_RJ.jpg',
  'eco-sapucai': P + '20_ECO-Sapucai_RJ_render.jpg',
  'bresco-viracopos': P + '21_Bresco-Viracopos_Campinas.jpg',
  'maringa-park': P + '22_Shopping-Maringa-Park_PR.jpg',
  // captura real do app, com uma barra de status limpa (sem horário e carga do aparelho de quem tirou a foto)
  'app-tela': { file: E + 'eletrix_app.jpg', statusBar: true },
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
  'estadao-predios': E + 'imprensa_estadao_2_sem-rosto.jpg',
  // carrossel "Onde a Eletrix opera" (fotos de nov/2026)
  'predio-plaza-centenario': C + '01_Plaza-Centenario_SP.jpg',
  'predio-quantum': C + '02_Quantum_SP_render-noite.jpg',
  'predio-b500': C + '03_B500_SP_fachada-noite.jpg',
  'predio-cea': C + '04_Centro-Empresarial-do-Aco_SP_aerea-NOVA.jpg',
  'predio-aqwa': C + '05_AQWA-Corporate_RJ.jpg',
  'predio-cbop': C + '06_CBOP_Castelo-Branco-Office-Park_Barueri_render.jpg',
  // só a fachada espelhada: o letreiro não cabe inteiro no cartão quadrado
  'predio-pinheiros-corporate': { file: C + '07_Pinheiros-Corporate_SP.jpg', crop: { left: 430, top: 0, width: 1060, height: 1060 } },
  'predio-jk-square': C + '08_JK-Square_SP_aerea.jpg',
  'predio-river-one': C + '09_River-One_SP.jpg',
  'predio-spazio-faria-lima': C + '10_Spazio-Faria-Lima_SP.jpg',
  'predio-bfl1355': C + '11_BFL1355_SP.jpg',
  // "Qual é o seu caso?": três fotos reais, mesmo formato 4:3, enquadradas no carregador
  'caso-morador': { file: R3 + '02_Fotos_Qual-o-seu-caso/morador_carregador-azul-marinho_vertical.jpg', crop: { left: 0, top: 326, width: 640, height: 480 }, tone: { brightness: 1.05, saturation: 1.04 } },
  'caso-sindico': { file: R3 + '02_Fotos_Qual-o-seu-caso/sindico-gestor_carregador-azul-com-placas_horizontal.jpg', crop: { left: 40, top: 40, width: 1176, height: 882 }, tone: { brightness: 1.04, saturation: 1.04 } },
  'caso-negocio': { file: E + 'eletrix_hub_garagem.jpg', crop: { left: 55, top: 0, width: 1022, height: 767 }, tone: { brightness: 1.14, saturation: 1.02 } },
};

const WIDTHS = [480, 800, 1280];
const HERO = ['aqwa-por-do-sol', 'thera-praca', 'river-one-fim-de-tarde', 'pinheiros-one-aerea'];
const manifest = {};

async function processImage(name, entry) {
  // a entrada é um caminho ou { file, crop, tone }: recorte e ajuste de luz aplicados antes de redimensionar
  const { file: rel, crop, tone, statusBar } = typeof entry === 'string' ? { file: entry } : entry;
  let file = path.join(SRC, rel);
  if (crop || tone || statusBar) {
    let img = sharp(file).rotate();
    if (crop) img = img.extract(crop);
    if (tone) img = img.modulate(tone);
    if (statusBar) img = img.composite([{ input: await cleanStatusBar(file), top: 0, left: 0 }]);
    file = await img.png().toBuffer();
  }
  const meta = await sharp(file).metadata();
  const aspect = meta.height / meta.width;
  // a foto do hero ganha uma largura intermediária para o celular
  const wl = name === 'totem-orelhao' ? [480, 640, 800, 1280] : HERO.includes(name) ? [...WIDTHS, 1920] : WIDTHS;
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
// Os 28 parceiros (lista definitiva de nov/2026). Para cada um, a melhor fonte do mesmo logo.
// Saída: WebP em um único tom (a "tinta" é o canal alfa), então o site aplica o mesmo cinza a todos.
// "ink" diz como preservar recortes internos (partes claras dentro de formas coloridas):
//   knockout  = pixels claros e sem cor viram vazado (G da GarageInn, J do Jaime, flor da Intercity)
//   light     = só as partes claras viram tinta (BBZ: letras vazadas nos quadrados)
//   elias     = vazado só dentro dos círculos vermelhos (o texto é branco)
//   shpaisman = o vermelho do símbolo fica mais claro que o bloco preto, para o "S" aparecer
const LOGOS = '03_Logos/';
const NEW = R3 + '03_Logos_Parceiros_nov2026/';
const V = LOGOS + 'svg_vetor/';
const O = LOGOS + 'oficiais/';
const partnerLogos = {
  argoplan: { src: NEW + 'argoplan.png' },
  atrio: { src: LOGOS + 'png_cor_transparente/atrio.png' }, // a versão nova saiu pequena (150 x 24)
  barzel: { src: V + 'barzel.svg' },
  bbz: { src: V + 'bbz.svg', ink: 'light' },
  bresco: { src: O + 'bresco.png' },
  brookfield: { src: NEW + 'brookfield.png' },
  cbre: { src: V + 'cbre.svg' },
  'cushman-wakefield': { src: V + 'cushman-wakefield.svg' },
  cyrela: { src: V + 'cyrela.svg' },
  'elias-victor-nigri': { src: NEW + 'elias-victor-nigri.png', ink: 'elias' },
  garageinn: { src: NEW + 'garageinn.png', ink: 'knockout' },
  hersil: { src: O + 'hersil.svg' },
  housi: { src: NEW + 'housi.png' },
  innova: { src: V + 'innova.svg' },
  intelbras: { src: V + 'intelbras.svg' },
  intercity: { src: NEW + 'intercity.png', ink: 'knockout' },
  jaime: { src: V + 'jaime.svg', ink: 'knockout' },
  jll: { src: V + 'jll.svg' },
  kinea: { src: O + 'kinea.svg' },
  link: { src: LOGOS + 'png_cor_transparente/link.png' },
  livoltek: { src: NEW + 'livoltek.png' },
  patria: { src: LOGOS + 'png_branco/patria.png' },
  safra: { src: O + 'safra.svg', wordmarkOnly: true }, // mesmo logotipo, sem o brasão
  shpaisman: { src: V + 'shpaisman.svg', ink: 'shpaisman' },
  'tishman-speyer': { src: NEW + 'tishman-speyer.png' },
  totvs: { src: V + 'totvs.svg' },
  vitacon: { src: NEW + 'vitacon.png' },
  weg: { src: LOGOS + 'png_branco/weg.png' }, // o SVG tem fundo azul sólido
};
const logoManifest = {};

/** Recorta o viewBox do SVG para o conteúdo visível (usado no logo da própria Eletrix). */
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

const smooth = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };

/** Quanto de tinta cada pixel opaco recebe (0 = vazado, 1 = cheio). */
function inkWeight(mode, r, g, b, fx, fy) {
  const L = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const sat = (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
  const paleness = smooth(0.6, 0.8, L) * (1 - smooth(0.22, 0.42, sat));
  if (mode === 'knockout') return 1 - paleness;
  if (mode === 'light') return smooth(0.72, 0.86, L);
  if (mode === 'elias') return fx < 0.43 && fy < 0.52 ? smooth(0.25, 0.5, sat) : 1;
  if (mode === 'shpaisman') return fx < 0.19 && sat > 0.25 && r > g * 1.4 ? 0.42 : 1;
  return 1;
}

async function processLogo(slug) {
  const { src, ink = 'solid', wordmarkOnly } = partnerLogos[slug];
  const file = path.join(SRC, src);
  let input = sharp(file);
  if (file.endsWith('.svg')) {
    const m = await sharp(file).metadata();
    input = sharp(file, { density: Math.min(2400, Math.max(72, (72 * 1400) / m.width)) });
  }
  let { data, info } = await input.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let { width: W, height: H } = info;
  if (wordmarkOnly) {
    // corta o símbolo à esquerda: procura o maior vão de colunas vazias e fica com o que vem depois
    const used = Array.from({ length: W }, (_, x) => { for (let y = 0; y < H; y++) if (data[(y * W + x) * 4 + 3] > 20) return true; return false; });
    let best = [0, 0], from = -1;
    for (let x = 0; x < W; x++) {
      if (!used[x] && from < 0) from = x;
      if (used[x] && from >= 0) { if (from > 0 && x - from > best[1] - best[0]) best = [from, x]; from = -1; }
    }
    const r = await sharp(data, { raw: { width: W, height: H, channels: 4 } }).extract({ left: best[1], top: 0, width: W - best[1], height: H }).raw().toBuffer({ resolveWithObject: true });
    data = r.data; W = r.info.width; H = r.info.height;
  }
  // caixa do conteúdo (antes da tinta, para as frações das regiões)
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (data[(y * W + x) * 4 + 3] > 48) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1;
  const out = Buffer.alloc(bw * bh * 4);
  let sum = 0;
  for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) {
    const k = ((y + y0) * W + (x + x0)) * 4;
    const o = (y * bw + x) * 4;
    // piso de ruído: alguns arquivos têm pixels quase invisíveis no fundo
    const clean = Math.max(0, data[k + 3] - 34) * (255 / 221);
    const a = clean * inkWeight(ink, data[k], data[k + 1], data[k + 2], x / bw, y / bh);
    out[o] = 10; out[o + 1] = 18; out[o + 2] = 32; out[o + 3] = Math.round(a);
    sum += a / 255;
  }
  const dest = path.join(OUT_LOGO, `${slug}.webp`);
  await sharp(out, { raw: { width: bw, height: bh, channels: 4 } }).resize({ width: 560, height: 200, fit: 'inside', withoutEnlargement: true }).webp({ quality: 86, alphaQuality: 96 }).toFile(dest);
  const meta = await sharp(dest).metadata();
  // densidade de tinta: logos cheios parecem maiores e precisam de um pouco menos de área
  logoManifest[slug] = { file: `/logos/${slug}.webp`, w: meta.width, h: meta.height, d: Number((sum / (bw * bh)).toFixed(3)) };
  console.log('logo', slug, `${meta.width}x${meta.height}`, logoManifest[slug].d);
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

/** Barra de status neutra por cima da original: 9:41, sinal, Wi-Fi e bateria sem porcentagem. */
async function cleanStatusBar(file) {
  const { width } = await sharp(file).metadata();
  const { data } = await sharp(file).extract({ left: 4, top: 4, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
  const bg = `rgb(${data[0]},${data[1]},${data[2]})`;
  const k = width / 590;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${Math.round(74 * k)}" viewBox="0 0 590 74">
    <rect width="590" height="74" fill="${bg}"/>
    <text x="70" y="52" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700" fill="#000">9:41</text>
    <g fill="#000">
      <rect x="418" y="43" width="5" height="9" rx="1.5"/><rect x="427" y="39" width="5" height="13" rx="1.5"/><rect x="436" y="35" width="5" height="17" rx="1.5"/><rect x="445" y="31" width="5" height="21" rx="1.5"/>
      <path d="M472 51.5l-6.5-7.2a9.6 9.6 0 0 1 13 0z"/><path d="M459 37a19 19 0 0 1 26 0l-3.4 3.6a14 14 0 0 0-19.2 0z"/>
      <rect x="497" y="33" width="34" height="18" rx="5" fill="none" stroke="#000" stroke-opacity=".4" stroke-width="2"/><rect x="500" y="36" width="28" height="12" rx="3"/><path d="M533 38.5c2 .6 3 2 3 3.500s-1 2.900-3 3.500z" fill-opacity=".45"/>
    </g>
  </svg>`);
}

/** Foto do hero bem pequena e desfocada: preenche o fundo do hero no desktop (cerca de 1 KB). */
async function processAmbient() {
  await sharp(path.join(SRC, images['totem-orelhao'])).resize({ width: 64 }).blur(1.6).modulate({ saturation: 1.15 }).webp({ quality: 62 }).toFile(path.join(OUT_IMG, 'hero-ambiente.webp'));
  console.log('img hero-ambiente');
}

// uso: node scripts/optimize-images.mjs [img|logos|ambiente] [prefixo, para refazer só algumas imagens]
const only = process.argv[2];
const prefix = process.argv[3];
if (prefix) Object.assign(manifest, JSON.parse(fs.readFileSync(path.join(DATA, 'images.generated.json'), 'utf8')));
if (!only || only === 'img') for (const [n, f] of Object.entries(images)) if (!prefix || n.startsWith(prefix)) await processImage(n, f);
if (!only || only === 'img' || only === 'ambiente') await processAmbient();
if (!only || only === 'logos') {
  for (const s of Object.keys(partnerLogos)) await processLogo(s);
  // apaga logos que saíram da lista
  for (const f of fs.readdirSync(OUT_LOGO)) if (!Object.values(logoManifest).some((l) => l.file.endsWith(`/${f}`))) fs.rmSync(path.join(OUT_LOGO, f));
  await processBrand();
}
if (!only || only === 'img') fs.writeFileSync(path.join(DATA, 'images.generated.json'), JSON.stringify(manifest, null, 1));
if (!only || only === 'logos') fs.writeFileSync(path.join(DATA, 'logos.generated.json'), JSON.stringify(logoManifest, null, 1));
console.log('ok');
