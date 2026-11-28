import { withBase } from '@/config/site';
import { logoInfo, partners, type Partner } from '@/data/partners';

/** Ajustes finos, conferidos um a um: logos muito largos, muito finos ou quadrados. */
const tune: Record<string, number> = {
  housi: 1.06, 'tishman-speyer': 1.12, bresco: 1.12, argoplan: 1.04, atrio: 1.02, innova: 1.04, livoltek: 0.98, cyrela: 1.04,
  garageinn: 1.06, 'elias-victor-nigri': 1.1, shpaisman: 1.06, kinea: 0.96, safra: 0.92, cbre: 0.94, brookfield: 0.95, intelbras: 0.95,
  bbz: 0.9, jaime: 0.95, weg: 0.95, jll: 1.02,
};

/**
 * Tamanho ótico: todos recebem a mesma área, corrigida pela densidade de tinta (logos cheios
 * pesam mais e ficam um pouco menores), com limites para os muito largos e os quadrados.
 */
function box(slug: string, scale = 1) {
  const l = logoInfo(slug);
  const r = l.w / l.h;
  const ink = Math.min(1.22, Math.max(0.8, Math.pow(0.32 / l.d, 0.4)));
  const s = scale * (tune[slug] ?? 1);
  const area = 2900 * s * s * ink;
  let w = Math.sqrt(area * r);
  let h = w / r;
  const maxW = 156 * s, maxH = 52 * s, minH = 15 * s;
  if (w > maxW) { w = maxW; h = w / r; }
  if (h > maxH) { h = maxH; w = h * r; }
  if (h < minH) { h = minH; w = h * r; }
  return { w: Math.round(w), h: Math.round(h) };
}

function LogoImg({ slug, name, tone, scale = 1 }: { slug: string; name: string; tone: 'dark' | 'light'; scale?: number }) {
  const l = logoInfo(slug);
  const { w, h } = box(slug, scale);
  return (
    <img src={withBase(l.file)} alt={name} width={w} height={h} loading="lazy" decoding="async"
      className={`block max-w-none ${tone === 'dark' ? 'logo-mono' : 'logo-mono-dark'}`} style={{ width: w, height: h }} />
  );
}

/**
 * Trilho de logos em rolagem contínua. A lista é desenhada duas vezes (a segunda escondida dos leitores
 * de tela) e o trilho anda exatamente metade, então o laço não tem emenda. O espaço entre logos é sempre
 * o mesmo, medido de borda a borda. Com movimento reduzido, vira uma fileira parada que se arrasta.
 */
function LogoTrack({ list, tone, scale = 1, gap, speed = 55 }: { list: Partner[]; tone: 'dark' | 'light'; scale?: number; gap: number; speed?: number }) {
  const length = list.reduce((sum, p) => sum + box(p.slug, scale).w + gap, 0);
  const group = (copy: boolean) => (
    <ul className={`marquee-group flex shrink-0 items-center ${copy ? 'marquee-copy' : ''}`} style={{ gap, paddingRight: gap }} aria-hidden={copy || undefined}>
      {list.map((p) => (
        <li key={p.slug} className="flex shrink-0 items-center justify-center" style={{ height: 64 * scale }}>
          <LogoImg slug={p.slug} name={copy ? '' : p.name} tone={tone} scale={scale} />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee">
      <div className="marquee-track flex" style={{ animationDuration: `${Math.round(length / speed)}s` }}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}

/** Faixa da home: todos os parceiros, rolando devagar e sem controles. */
export function LogoMarquee() {
  return (
    <div role="group" aria-label="Parceiros e clientes da Eletrix">
      <div className="sm:hidden"><LogoTrack list={partners} tone="light" scale={0.92} gap={44} speed={46} /></div>
      <div className="hidden sm:block"><LogoTrack list={partners} tone="light" scale={1.08} gap={68} speed={58} /></div>
    </div>
  );
}

/** Seleção estática com os nomes de maior peso (páginas internas). */
export function FeaturedLogos({ tone = 'dark', limit }: { tone?: 'dark' | 'light'; limit?: number }) {
  const list = partners.filter((p) => p.featured).slice(0, limit);
  return (
    <ul className="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {list.map((p) => (
        <li key={p.slug} className="flex h-14 w-full items-center justify-center"><LogoImg slug={p.slug} name={p.name} tone={tone} /></li>
      ))}
    </ul>
  );
}

/** Cartão de logo da página de parceiros: o logo cresce junto com o cartão. */
function Tile({ p, name }: { p: Partner; name: string }) {
  const l = logoInfo(p.slug);
  const { w } = box(p.slug, 1.08);
  return (
    <li className="partner-tile flex shrink-0 items-center justify-center rounded-2xl border border-white/[0.09] bg-white/[0.035] transition-colors duration-200 hover:border-brand-400/50 hover:bg-white/[0.07]">
      <img src={withBase(l.file)} alt={name} width={l.w} height={l.h} loading="lazy" decoding="async" className="logo-mono block h-auto max-w-none" style={{ width: `calc(var(--tile) * ${(w / 220).toFixed(4)})` }} />
    </li>
  );
}

/**
 * Três faixas em direções alternadas e velocidades um pouco diferentes. Pausam com o mouse em cima
 * ou com o foco; com movimento reduzido, dão lugar a uma grade parada (7 x 4 no desktop).
 */
export function PartnerRows() {
  const rows = ([1, 2, 3] as const).map((r) => partners.filter((p) => p.row === r));
  const durations = [64, 76, 70];
  return (
    <>
      <div className="partner-rows space-y-3 md:space-y-4" tabIndex={0} role="group" aria-label="Logos dos parceiros. Passe o mouse ou foque nesta área para pausar.">
        {rows.map((list, i) => (
          <div key={i} className="marquee">
            <div className="marquee-track flex" style={{ animationDuration: `${durations[i]}s`, animationDirection: i === 1 ? 'reverse' : 'normal' }}>
              {[false, true].map((copy) => (
                <ul key={String(copy)} className={`flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4 ${copy ? 'marquee-copy' : ''}`} aria-hidden={copy || undefined}>
                  {list.map((p) => <Tile key={p.slug} p={p} name={copy ? '' : p.name} />)}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ul className="partner-grid container-x grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4 lg:grid-cols-7">
        {partners.map((p) => <Tile key={p.slug} p={p} name={p.name} />)}
      </ul>
    </>
  );
}
