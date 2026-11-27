'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { Logo } from './Logo';
import { scrollOnHome } from './anchor';
import { Picture } from '@/components/ui/Picture';
import { extraSolutions, profiles, solutions, type Profile } from '@/data/solutions';
import { contactByPath, contactHref } from '@/data/services';
import { site } from '@/config/site';

/** Ordem do menu: Home · Soluções · App · Estações · Parceiros · Sobre. */
const beforeSolutions = [{ href: '/', label: 'Home' }];
const afterSolutions = [
  { href: '/#app', label: 'App' },
  { href: '/#estacoes', label: 'Estações' },
  { href: '/parceiros/', label: 'Parceiros' },
  { href: '/sobre/', label: 'Sobre' },
];

const profileOrder: Profile[] = ['morador', 'sindico', 'negocio'];

function MegaPanel({ onNavigate }: { onNavigate: () => void }) {
  const group = (p: Profile) => solutions.filter((s) => s.profile === p);
  return (
    <div className="grid gap-0 divide-x divide-white overflow-hidden rounded-2xl border border-white bg-ink-900 shadow-lift lg:grid-cols-[1fr_1fr_1.1fr_0.9fr]">
      {profileOrder.map((p) => (
        <div key={p} className="bg-ink-900 p-6">
          <p className="text-sm font-semibold text-brand-400">{profiles[p].title}</p>
          <p className="mb-4 mt-1 text-sm text-muted-dark">{profiles[p].question}</p>
          <ul className="space-y-1">
            {group(p).map((s) => (
              <li key={s.slug}>
                <Link href={s.href} onClick={onNavigate} className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-white/5">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-400">
                    <Icon name={s.icon} size={17} />
                  </span>
                  <span>
                    {s.step && <span className="block text-xs font-semibold text-brand-400">{s.step}</span>}
                    <span className="block text-[0.95rem] font-semibold leading-snug text-white">{s.name}</span>
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
              extraSolutions.filter((e) => e.slug !== 'carregadores' && e.slug !== 'white-label').map((e) => (
                <li key={e.slug}>
                  <Link href={e.href} onClick={onNavigate} className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-white/5">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-400"><Icon name="refresh" size={17} /></span>
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
          <p className="text-sm font-semibold text-brand-400">Em destaque</p>
          <p className="mt-1 font-display text-xl font-bold text-white">Eletrix Hub</p>
          <p className="mt-1 text-sm text-muted-dark">Para prédios corporativos e shoppings.</p>
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
  const panel = useRef<HTMLDivElement>(null);
  const burger = useRef<HTMLButtonElement>(null);
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
    // com o menu aberto, elementos flutuantes (WhatsApp) saem da frente
    document.documentElement.toggleAttribute('data-menu-open', mobile);
    return () => { document.body.style.overflow = ''; document.documentElement.removeAttribute('data-menu-open'); };
  }, [mobile]);

  useEffect(() => {
    if (!mega && !mobile) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mega) megaBtn.current?.focus();
        if (mobile) burger.current?.focus();
        setMega(false);
        setMobile(false);
      }
      if (e.key === 'Tab' && mobile) {
        const nodes = [burger.current, ...Array.from(panel.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])') ?? [])].filter(Boolean) as HTMLElement[];
        if (!nodes.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
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

  const active = (href: string) => (href === '/' ? pathname === '/' : !href.includes('#') && pathname.startsWith(href));
  const contact = contactHref(contactByPath[pathname]);
  const go = (href: string) => (e: React.MouseEvent) => { setMobile(false); setMega(false); scrollOnHome(e, href, pathname); };
  const mobileLink = (l: { href: string; label: string }) => (
    <Link key={l.href} href={l.href} onClick={go(l.href)} aria-current={active(l.href) ? 'page' : undefined}
      className={`flex min-h-[3.25rem] shrink-0 items-center border-b border-white/10 py-2 font-display text-xl font-bold ${active(l.href) ? 'text-brand-400' : 'text-white'}`}>
      {l.label}
    </Link>
  );
  const navLink = (l: { href: string; label: string }) => (
    <Link key={l.href} href={l.href} onClick={go(l.href)} aria-current={active(l.href) ? 'page' : undefined}
      className={`flex h-10 items-center whitespace-nowrap rounded-full px-2 text-[0.86rem] font-medium transition hover:bg-white/10 xl:px-3.5 xl:text-[0.92rem] ${active(l.href) ? 'text-brand-400' : 'text-white/90'}`}>
      {l.label}
    </Link>
  );

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ${
        solid || mega || mobile ? 'border-b border-white/10 bg-ink-950/90 backdrop-blur-xl' : 'border-b border-transparent bg-gradient-to-b from-ink-950/70 to-transparent'
      }`}
      style={{ height: 'var(--header-h)' }}
    >
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-950">
        Pular para o conteúdo
      </a>
      <div className="container-x flex h-full items-center justify-between gap-3 xl:gap-6">
        <Logo height={20} onClick={go('/')} className="[&>img]:!h-[18px] sm:[&>img]:!h-5 xl:[&>img]:!h-[21px]" />

        <nav aria-label="Principal" className="hidden items-center lg:flex xl:gap-1">
          {beforeSolutions.map(navLink)}
          <div ref={wrap} className="relative" onMouseEnter={openHover} onMouseLeave={closeHover}>
            <button
              ref={megaBtn}
              type="button"
              aria-expanded={mega}
              aria-controls="mega-solucoes"
              onClick={onMegaClick}
              className={`flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-2 text-[0.86rem] font-medium transition hover:bg-white/10 xl:gap-1.5 xl:px-3.5 xl:text-[0.92rem] ${mega ? 'bg-white/10 text-white' : 'text-white/90'}`}
            >
              Soluções <Icon name="chevronDown" size={15} className={`transition-transform duration-200 ${mega ? 'rotate-180' : ''}`} />
            </button>
            <div id="mega-solucoes" hidden={!mega} className="fixed left-1/2 top-[calc(var(--header-h)-4px)] w-[min(1180px,calc(100vw-2rem))] -translate-x-1/2 pt-3">
              {mega && <MegaPanel onNavigate={() => setMega(false)} />}
            </div>
          </div>
          {afterSolutions.map(navLink)}
        </nav>

        <div className="hidden items-center gap-1 lg:flex xl:gap-2">
          <a href={site.app.download} target="_blank" rel="noopener"
            className="flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-400/60 bg-brand-500/15 px-3 text-[0.84rem] font-semibold text-white transition hover:border-brand-400 hover:bg-brand-500/30 xl:px-4 xl:text-sm">
            <Icon name="phoneApp" size={16} strokeWidth={1.9} className="text-brand-400" /> Baixe o App
          </a>
          <Link href="/suporte/" aria-haspopup="dialog" className="flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full px-2 text-[0.84rem] font-medium text-white/85 transition hover:bg-white/10 hover:text-white xl:px-3 xl:text-sm">
            <Icon name="headset" size={17} className="hidden xl:block" />Suporte
          </Link>
          <Button href={contact} size="sm" className="!px-3.5 !text-[0.84rem] xl:!px-4 xl:!text-sm">Fale com a Eletrix</Button>
        </div>

        <button
          ref={burger}
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

    </header>
      {mobile && (
        <div id="menu-mobile" ref={panel} role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-x-0 bottom-0 top-0 z-40 overflow-y-auto overscroll-contain bg-ink-950 pt-[var(--header-h)] lg:hidden" style={{ height: '100dvh' }} data-tone="dark">
          <nav aria-label="Menu móvel" className="container-x flex min-h-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
            {beforeSolutions.map(mobileLink)}
            <button type="button" aria-expanded={mobileSol} onClick={() => setMobileSol((v) => !v)}
              className="flex min-h-[3.25rem] shrink-0 items-center justify-between border-b border-white/10 py-2 text-left font-display text-xl font-bold text-white">
              Soluções <Icon name="chevronDown" className={`transition-transform ${mobileSol ? 'rotate-180' : ''}`} />
            </button>
            {mobileSol && (
              <div className="space-y-6 border-b border-white/10 py-5">
                {profileOrder.map((p) => (
                  <div key={p}>
                    <p className="font-display text-sm font-bold text-brand-400">{profiles[p].title}</p>
                    <ul className="mt-1">
                      {solutions.filter((s) => s.profile === p).map((s) => (
                        <li key={s.slug}><Link href={s.href} onClick={() => setMobile(false)} className="flex min-h-12 items-center justify-between text-[1rem] text-white/90">{s.name}{s.step && <span className="text-xs text-muted-dark">{s.step}</span>}</Link></li>
                      ))}
                      {p === 'morador' && <li><Link href="/carregadores/" onClick={() => setMobile(false)} className="flex min-h-12 items-center text-[1rem] text-white/90">Carregadores</Link></li>}
                      {p === 'negocio' && extraSolutions.filter((e) => e.slug !== 'carregadores' && e.slug !== 'white-label').map((e) => <li key={e.slug}><Link href={e.href} onClick={() => setMobile(false)} className="flex min-h-12 items-center text-[1rem] text-white/90">{e.name}</Link></li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {afterSolutions.map(mobileLink)}
            <div className="mt-auto pt-6">
              <div className="grid grid-cols-2 gap-3">
                <a href={site.app.download} target="_blank" rel="noopener" onClick={() => setMobile(false)}
                  className="flex min-h-14 items-center justify-center gap-2 rounded-full border border-brand-400/60 bg-brand-500/15 px-3 text-center font-semibold text-white active:bg-brand-500/40">
                  <Icon name="phoneApp" size={19} className="shrink-0 text-brand-400" /> Baixe o App
                </a>
                <Link href="/suporte/" aria-haspopup="dialog" onClick={() => setMobile(false)}
                  className="flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 font-semibold text-white active:bg-white/15">
                  <Icon name="headset" size={19} className="shrink-0 text-brand-400" /> Suporte
                </Link>
              </div>
              <Button href={contact} size="lg" className="mt-3 w-full" onClick={() => setMobile(false)}>Fale com a Eletrix</Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
