import { withBase } from '@/config/site';
import { logoInfo, partners } from '@/data/partners';

/** Tamanho visual padronizado: mesma "área" para todos, com limites para logos muito largos ou quadrados. */
const boost: Record<string, number> = { 'tishman-speyer': 1.7, bresco: 1.5, garageinn: 1.35, 'elias-victor-nigri': 1.35, bbz: 1.2, 'padrao-park': 1.3, 'paris-condominios': 1.3, guardian: 1.2, 'cushman-wakefield': 1.15, winpark: 1.15, intercity: 1.15 };

function box(slug: string, scale = 1) {
  scale *= boost[slug] ?? 1;
  const l = logoInfo(slug);
  const r = l.w / l.h;
  const area = 1900 * scale;
  let w = Math.sqrt(area * r);
  let h = w / r;
  const maxW = 140 * scale, maxH = 46 * scale, minH = 18 * scale;
  if (w > maxW) { w = maxW; h = w / r; }
  if (h > maxH) { h = maxH; w = h * r; }
  if (h < minH) { h = minH; w = h * r; }
  return { w: Math.round(w), h: Math.round(h) };
}

function LogoImg({ slug, name, tone, scale = 1, eager }: { slug: string; name: string; tone: 'dark' | 'light'; scale?: number; eager?: boolean }) {
  const l = logoInfo(slug);
  const { w, h } = box(slug, scale);
  return (
    <img src={withBase(l.file)} alt={name} width={w} height={h} loading={eager ? 'eager' : 'lazy'} decoding="async"
      className={tone === 'dark' ? 'logo-mono' : 'logo-mono-dark'} style={{ width: w, height: h }} />
  );
}

/**
 * Faixa de logos monocromática em rolagem contínua e lenta (todos os parceiros no ciclo), pausável.
 * Com movimento reduzido a faixa some e entra uma grade estática com todos os logos.
 */
export function LogoMarquee({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const list = partners;
  return (
    <div>
      <div className="marquee-wrap relative">
        {/* Sem botão de pausa: a rolagem para ao passar o mouse ou receber foco, e some com movimento reduzido */}
        <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]" role="group" aria-label="Parceiros e clientes da Eletrix" tabIndex={0}>
          <ul className="marquee-track flex items-center py-3">
            {[...list, ...list].map((p, i) => (
              <li key={`${p.slug}-${i}`} aria-hidden={i >= list.length ? true : undefined} className="flex h-20 w-[240px] shrink-0 items-center justify-center">
                <LogoImg slug={p.slug} name={i >= list.length ? '' : p.name} tone={tone} scale={1.45} eager={i < 6} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul className="logos-static grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-6" aria-label="Parceiros e clientes da Eletrix">
        {list.map((p) => (
          <li key={p.slug} className="flex h-16 w-full items-center justify-center"><LogoImg slug={p.slug} name={p.name} tone={tone} scale={1.1} /></li>
        ))}
      </ul>
    </div>
  );
}

/** Grade estática com os nomes de maior peso (uso em páginas internas). */
export function FeaturedLogos({ tone = 'dark', limit }: { tone?: 'dark' | 'light'; limit?: number }) {
  const list = partners.filter((p) => p.featured).slice(0, limit);
  return (
    <ul className="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
      {list.map((p) => (
        <li key={p.slug} className="flex h-14 w-full items-center justify-center"><LogoImg slug={p.slug} name={p.name} tone={tone} scale={1.1} /></li>
      ))}
    </ul>
  );
}

/** Grade completa (página de parceiros): destaque primeiro, depois os demais. */
export function AllLogos({ tone = 'light' }: { tone?: 'dark' | 'light' }) {
  const featured = partners.filter((p) => p.featured);
  const rest = partners.filter((p) => !p.featured);
  const cell = 'flex h-24 items-center justify-center rounded-2xl border border-hair bg-card px-4';
  return (
    <div className="space-y-10">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {featured.map((p) => <li key={p.slug} className={`${cell} h-28`}><LogoImg slug={p.slug} name={p.name} tone={tone} scale={1.25} /></li>)}
      </ul>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {rest.map((p) => <li key={p.slug} className={cell}><LogoImg slug={p.slug} name={p.name} tone={tone} scale={0.95} /></li>)}
      </ul>
    </div>
  );
}
