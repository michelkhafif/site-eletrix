'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { Logo } from './Logo';
import { Picture } from '@/components/ui/Picture';
import { extraSolutions, profiles, solutions, type Profile } from '@/data/solutions';

const mainLinks = [
  { href: '/empreendimentos/', label: 'Empreendimentos' },
  { href: '/estacoes/', label: 'Estações' },
  { href: '/guias/', label: 'Guias' },
  { href: '/sobre/', label: 'Sobre' },
];

const profileOrder: Profile[] = ['morador', 'sindico', 'negocio'];

function MegaPanel({ onNavigate }: { onNavigate: () => void }) {
  const group = (p: Profile) => solutions.filter((s) => s.profile === p);
  return (
    <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-lift lg:grid-cols-[1fr_1fr_1.1fr_0.9fr]">
      {profileOrder.map((p) => (
        <div key={p} className="bg-ink-900 p-6">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-400">{profiles[p].title}</p>
          <p className="mb-4 mt-1 text-sm text-muted-dark">{profiles[p].question}</p>
          <ul className="space-y-1">
            {group(p).map((s) => (
              <li key={s.slug}>
                <Link href={s.href} onClick={onNavigate} className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-white/5">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-400">
                    <Icon name={s.icon} size={17} />
                  </span>
                  <span>
                    <span className="flex items-center gap-2 text-[0.95rem] font-semibold text-white">
                      {s.name}
                      {s.step && <span className="rounded-full border border-white/15 px-2 py-px text-[0.65rem] font-medium uppercase tracking-wider text-muted-dark">{s.step}</span>}
                    </span>
                    <span className="mt-0.5 block text-[0.82rem] leading-snug text-muted-dark">{s.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
            {p === 'morador' && (
              <li>
                <Link href="/carregadores/" onClick={onNavigate} className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-white/5">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-400"><Icon name="charge" size={17} /></span>
                  <span>
                    <span className="text-[0.95rem] font-semibold text-white">Carregadores</span>
                    <span className="mt-0.5 block text-[0.82rem] leading-snug text-muted-dark">WEG, Intelbras e Livoltek a partir de R$ 2.799.</span>
                  </span>
                </Link>
              </li>
            )}
            {p === 'negocio' &&
              extraSolutions.filter((e) => e.slug !== 'carregadores').map((e) => (
                <li key={e.slug}>
                  <Link href={e.href} onClick={onNavigate} className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-white/5">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-400"><Icon name={e.slug === 'white-label' ? 'palette' : 'refresh'} size={17} /></span>
                    <span>
                      <span className="text-[0.95rem] font-semibold text-white">{e.name}</span>
                      <span className="mt-0.5 block text-[0.82rem] leading-snug text-muted-dark">{e.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
      <Link href="/eletrix-hub/" onClick={onNavigate} className="group relative hidden min-h-[280px] overflow-hidden bg-ink-950 lg:block">
        <div className="absolute inset-0"><Picture name="totem-orelhao" alt="" sizes="320px" fill position="50% 30%" className="opacity-70 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-85" /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-400">Em destaque</p>
          <p className="mt-1 font-display text-xl font-bold text-white">Eletrix Hub</p>
          <p className="mt-1 text-sm text-muted-dark">Qualidade de serviço à altura de um AAA.</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400">Conhecer <Icon name="arrowRight" size={16} className="transition group-hover:translate-x-0.5" /></span>
        </div>
      </Link>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mobileSol, setMobileSol] = useState(false);
  const megaBtn = useRef<HTMLButtonElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => { setMega(false); setMobile(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);

  useEffect(() => {
    if (!mega && !mobile) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mega) megaBtn.current?.focus();
        setMega(false);
        setMobile(false);
      }
    };
    const click = (e: MouseEvent) => { if (mega && wrap.current && !wrap.current.contains(e.target as Node)) setMega(false); };
    document.addEventListener('keydown', key);
    document.addEventListener('mousedown', click);
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('mousedown', click); };
  }, [mega, mobile]);

  // Hover abre e fecha o menu; um clique "fixa" o painel aberto (útil no toque e no teclado) e outro clique fecha.
  const [pinned, setPinned] = useState(false);
  const openHover = useCallback(() => { clearTimeout(closeTimer.current); setMega(true); }, []);
  const closeHover = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega((open) => (pinned ? open : false)), 160);
  }, [pinned]);
  const onMegaClick = () => {
    if (!mega) { setMega(true); setPinned(true); }
    else if (!pinned) setPinned(true);
    else { setMega(false); setPinned(false); }
  };
  useEffect(() => { if (!mega) setPinned(false); }, [mega]);

  const active = (href: string) => pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ${
        solid || mega || mobile ? 'border-b border-white/10 bg-ink-950/90 backdrop-blur-xl' : 'border-b border-transparent bg-gradient-to-b from-ink-950/70 to-transparent'
      }`}
      style={{ height: 'var(--header-h)' }}
    >
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-950">
        Pular para o conteúdo
      </a>
      <div className="container-x flex h-full items-center justify-between gap-6">
        <Logo height={21} />

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          <div ref={wrap} className="relative" onMouseEnter={openHover} onMouseLeave={closeHover}>
            <button
              ref={megaBtn}
              type="button"
              aria-expanded={mega}
              aria-controls="mega-solucoes"
              onClick={onMegaClick}
              className={`flex h-10 items-center gap-1.5 rounded-full px-4 text-[0.92rem] font-medium transition hover:bg-white/10 ${mega ? 'bg-white/10 text-white' : 'text-white/90'}`}
            >
              Soluções <Icon name="chevronDown" size={16} className={`transition-transform duration-200 ${mega ? 'rotate-180' : ''}`} />
            </button>
            <div id="mega-solucoes" hidden={!mega} className="fixed left-1/2 top-[calc(var(--header-h)-4px)] w-[min(1180px,calc(100vw-2rem))] -translate-x-1/2 pt-3">
              {mega && <MegaPanel onNavigate={() => setMega(false)} />}
            </div>
          </div>
          {mainLinks.map((l) => (
            <Link key={l.href} href={l.href} aria-current={active(l.href) ? 'page' : undefined}
              className={`flex h-10 items-center rounded-full px-4 text-[0.92rem] font-medium transition hover:bg-white/10 ${active(l.href) ? 'text-brand-400' : 'text-white/90'}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <Link href="/app/" className="flex h-10 items-center rounded-full px-3 text-sm text-muted-dark transition hover:text-white">App</Link>
          <Link href="/suporte/" className="flex h-10 items-center rounded-full px-3 text-sm text-muted-dark transition hover:text-white">Suporte</Link>
          <Button href="/contato/" size="sm" className="ml-2">Fale com a Eletrix</Button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white lg:hidden"
          aria-label={mobile ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobile}
          aria-controls="menu-mobile"
          onClick={() => setMobile((v) => !v)}
        >
          <Icon name={mobile ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      {mobile && (
        <div id="menu-mobile" className="fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto bg-ink-950 lg:hidden" data-tone="dark">
          <nav aria-label="Menu móvel" className="container-x flex min-h-full flex-col py-6">
            <button type="button" aria-expanded={mobileSol} onClick={() => setMobileSol((v) => !v)}
              className="flex items-center justify-between border-b border-white/10 py-4 text-left font-display text-xl font-bold text-white">
              Soluções <Icon name="chevronDown" className={`transition-transform ${mobileSol ? 'rotate-180' : ''}`} />
            </button>
            {mobileSol && (
              <div className="space-y-6 border-b border-white/10 py-5">
                {profileOrder.map((p) => (
                  <div key={p}>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-400">{profiles[p].title}</p>
                    <ul className="mt-2">
                      {solutions.filter((s) => s.profile === p).map((s) => (
                        <li key={s.slug}><Link href={s.href} className="flex items-center justify-between py-2.5 text-[0.98rem] text-white/90">{s.name}{s.step && <span className="text-xs text-muted-dark">{s.step}</span>}</Link></li>
                      ))}
                      {p === 'morador' && <li><Link href="/carregadores/" className="block py-2.5 text-[0.98rem] text-white/90">Carregadores</Link></li>}
                      {p === 'negocio' && extraSolutions.filter((e) => e.slug !== 'carregadores').map((e) => <li key={e.slug}><Link href={e.href} className="block py-2.5 text-[0.98rem] text-white/90">{e.name}</Link></li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {mainLinks.map((l) => (
              <Link key={l.href} href={l.href} className="border-b border-white/10 py-4 font-display text-xl font-bold text-white">{l.label}</Link>
            ))}
            <div className="mt-4 flex gap-6 text-muted-dark">
              <Link href="/app/" className="py-2">App</Link>
              <Link href="/suporte/" className="py-2">Suporte</Link>
              <Link href="/imprensa/" className="py-2">Imprensa</Link>
            </div>
            <div className="mt-auto pt-8">
              <Button href="/contato/" size="lg" className="w-full">Fale com a Eletrix</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
