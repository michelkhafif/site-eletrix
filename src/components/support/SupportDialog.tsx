'use client';
import { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BASE_PATH } from '@/config/site';
import { Icon } from '@/components/ui/Icon';
import { SupportOptions } from './SupportOptions';
import { contactByPath, contactHref } from '@/data/services';

const SUPPORT_PATH = `${BASE_PATH}/suporte/`;

/**
 * Popup de suporte. Qualquer link para /suporte/ no site abre este diálogo em vez de navegar
 * (a página /suporte/ continua existindo para quem está sem JavaScript e para o Google).
 * Usa <dialog> nativo com showModal(): o resto da página fica inerte, Esc fecha e o foco volta a quem abriu.
 */
export function SupportDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const downOnBackdrop = useRef(false);
  const pathname = usePathname();

  const unlock = useCallback(() => {
    document.documentElement.style.overflow = '';
    document.documentElement.style.paddingRight = '';
  }, []);

  const open = useCallback((from: HTMLElement | null) => {
    const d = ref.current;
    if (!d || d.open) return;
    opener.current = from;
    const bar = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = 'hidden';
    if (bar > 0) document.documentElement.style.paddingRight = `${bar}px`;
    d.showModal();
  }, []);

  const close = useCallback(() => ref.current?.close(), []);

  // Intercepta, na fase de captura, qualquer clique em link para /suporte/.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || ref.current?.contains(a)) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== SUPPORT_PATH) return;
      e.preventDefault();
      open(a);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [open]);

  const onClose = () => {
    unlock();
    const el = opener.current;
    // Se quem abriu sumiu (item do menu do celular), o foco vai para o botão do menu.
    requestAnimationFrame(() => {
      if (el && el.isConnected && el.getClientRects().length) el.focus({ preventScroll: true });
      else document.querySelector<HTMLElement>('[aria-controls="menu-mobile"]')?.focus({ preventScroll: true });
    });
  };

  useEffect(() => { if (ref.current?.open) ref.current.close(); }, [pathname]);
  useEffect(() => unlock, [unlock]);

  const trap = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== 'Tab' || !ref.current) return;
    const nodes = Array.from(ref.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'));
    if (!nodes.length) return;
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  return (
    <dialog
      ref={ref}
      id="suporte-popup"
      aria-modal="true"
      aria-labelledby="suporte-popup-t"
      aria-describedby="suporte-popup-d"
      className="sheet"
      onClose={onClose}
      onKeyDown={trap}
      onPointerDown={(e) => { downOnBackdrop.current = e.target === ref.current; }}
      onClick={(e) => { if (e.target === ref.current && downOnBackdrop.current) close(); }}
    >
      <div data-tone="light" className="relative rounded-t-3xl px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 sm:rounded-3xl sm:px-7 sm:pb-7 sm:pt-6">
        <span aria-hidden="true" className="mx-auto mb-3 block h-1 w-10 rounded-full bg-slate-300 sm:hidden" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="suporte-popup-t" className="font-display text-2xl font-extrabold leading-tight text-ink-900">Suporte Eletrix</h2>
            <p id="suporte-popup-d" className="mt-1.5 text-[0.97rem] leading-snug text-fg-muted">Problema em uma estação? Tenha em mãos o local e o número que está na placa do carregador.</p>
          </div>
          <button type="button" onClick={close} autoFocus aria-label="Fechar" className="-mr-1.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-100 text-ink-900 transition hover:bg-slate-200">
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="mt-5"><SupportOptions /></div>
        <p className="mt-4 text-sm text-fg-muted">
          Quer contratar a Eletrix? <Link href={contactHref(contactByPath[pathname])} onClick={close} className="font-semibold text-accent underline underline-offset-4 hover:no-underline">Fale com o comercial</Link>.
        </p>
      </div>
    </dialog>
  );
}
