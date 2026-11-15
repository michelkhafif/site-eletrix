'use client';
import { useState } from 'react';
import { withBase } from '@/config/site';
import { logoInfo, partners } from '@/data/partners';
import { Icon } from '@/components/ui/Icon';

function LogoImg({ slug, name, tone }: { slug: string; name: string; tone: 'dark' | 'light' }) {
  const l = logoInfo(slug);
  // altura visual padronizada; largura limitada para logos muito horizontais
  const h = 34;
  const w = Math.min(Math.round((l.w / l.h) * h), 150);
  const adjustedH = Math.round(w / (l.w / l.h));
  return (
    <img src={withBase(l.file)} alt={name} width={w} height={adjustedH} loading="lazy" decoding="async"
      className={tone === 'dark' ? 'logo-mono' : 'logo-mono-dark'} style={{ width: w, height: adjustedH, maxHeight: 40 }} />
  );
}

/** Faixa de logos monocromática, rolagem lenta e pausável. Em movimento reduzido vira lista rolável. */
export function LogoMarquee({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const [paused, setPaused] = useState(false);
  const list = partners;
  return (
    <div className="relative">
      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" data-paused={paused} role="group" aria-label="Parceiros e clientes da Eletrix">
        <ul className="marquee-track flex items-center gap-14 py-3 pr-14">
          {[...list, ...list].map((p, i) => (
            <li key={`${p.slug}-${i}`} aria-hidden={i >= list.length ? true : undefined} className="flex h-12 shrink-0 items-center">
              <LogoImg slug={p.slug} name={i >= list.length ? '' : p.name} tone={tone} />
            </li>
          ))}
        </ul>
      </div>
      <button type="button" onClick={() => setPaused((v) => !v)} aria-pressed={paused}
        className={`mx-auto mt-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition ${tone === 'dark' ? 'text-muted-dark hover:text-white' : 'text-muted hover:text-ink-900'}`}>
        <Icon name={paused ? 'play' : 'pause'} size={13} /> {paused ? 'Retomar rolagem' : 'Pausar rolagem'}
      </button>
    </div>
  );
}

/** Grade estática com os nomes de maior peso (uso em páginas internas). */
export function FeaturedLogos({ tone = 'dark', limit }: { tone?: 'dark' | 'light'; limit?: number }) {
  const list = partners.filter((p) => p.featured).slice(0, limit);
  return (
    <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
      {list.map((p) => (
        <li key={p.slug} className="flex h-12 items-center justify-center"><LogoImg slug={p.slug} name={p.name} tone={tone} /></li>
      ))}
    </ul>
  );
}
