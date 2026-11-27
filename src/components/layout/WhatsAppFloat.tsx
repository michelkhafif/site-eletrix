'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { whatsappLink } from '@/config/site';
import { wa, waByPath } from '@/data/whatsapp';
import { Icon } from '@/components/ui/Icon';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppGlyph';

const KEY = 'eletrix-wa-balao';
const DELAY = 4000;
/** No celular o balão se recolhe sozinho para não ficar sobre o conteúdo. */
const MOBILE_TIMEOUT = 9000;
/** O botão não fica por cima de formulários, botões de ação nem do conteúdo do rodapé. */
const AVOID = '[data-wa-avoid], main summary, footer a, footer summary, footer p';

function seen() {
  try { return window.sessionStorage.getItem(KEY) === '1'; } catch { return false; }
}
function remember() {
  try { window.sessionStorage.setItem(KEY, '1'); } catch {}
}

const overlaps = (a: DOMRect, b: DOMRect) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

/** Botão flutuante do WhatsApp comercial, com balão de fala. A mensagem muda conforme a página. */
export function WhatsAppFloat() {
  const pathname = usePathname() || '/';
  const msg = waByPath[pathname] ?? wa.default;
  const [bubble, setBubble] = useState(false);
  const [away, setAway] = useState(false);
  const [bubbleAway, setBubbleAway] = useState(false);
  const button = useRef<HTMLAnchorElement>(null);
  const balloon = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => { remember(); setBubble(false); }, []);

  useEffect(() => {
    if (seen()) return;
    let hide: ReturnType<typeof setTimeout> | undefined;
    const show = setTimeout(() => {
      if (seen()) return;
      setBubble(true);
      if (window.matchMedia('(max-width: 767px)').matches) hide = setTimeout(dismiss, MOBILE_TIMEOUT);
    }, DELAY);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [dismiss]);

  // sai da frente quando cairia sobre um botão, um formulário ou o texto do rodapé
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const el = button.current;
      if (!el) return;
      const area = (x: HTMLElement) => {
        // posição de repouso, sem o deslocamento usado para esconder
        const r = x.getBoundingClientRect();
        const dy = new DOMMatrixReadOnly(getComputedStyle(x).transform).m42;
        return new DOMRect(r.left - 6, r.top - dy - 6, r.width + 12, r.height + 12);
      };
      const targets = Array.from(document.querySelectorAll<HTMLElement>(AVOID)).map((t) => t.getBoundingClientRect()).filter((r) => r.width > 0 && r.bottom > 0 && r.top < window.innerHeight);
      const b = area(el);
      setAway(targets.some((r) => overlaps(r, b)));
      if (balloon.current) { const s = area(balloon.current); setBubbleAway(targets.some((r) => overlaps(r, s))); }
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(check); };
    queue();
    const late = setTimeout(queue, 500);
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => { cancelAnimationFrame(frame); clearTimeout(late); window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue); };
  }, [pathname, bubble]);

  const hidden = 'pointer-events-none translate-y-3 opacity-0';

  return (
    <div className="wa-float fixed z-40 flex items-end gap-3" style={{ right: 'calc(1rem + env(safe-area-inset-right))', bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
      {bubble && (
        <div ref={balloon} className={`wa-bubble relative mb-1.5 flex items-center gap-1 rounded-2xl bg-white py-1.5 pl-4 pr-1.5 shadow-[0_12px_32px_-8px_rgba(5,11,20,.35)] ring-1 ring-ink-900/10 transition-[opacity,transform] duration-200 ${bubbleAway || away ? hidden : ''}`}>
          <a href={whatsappLink(msg)} target="_blank" rel="noopener noreferrer" onClick={dismiss} className="whitespace-nowrap py-2 text-[0.95rem] font-semibold text-ink-900">Como podemos ajudar?</a>
          <button type="button" onClick={dismiss} aria-label="Fechar a mensagem" className="grid h-9 w-9 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-ink-900">
            <Icon name="close" size={16} strokeWidth={2} />
          </button>
          <span aria-hidden="true" className="absolute -right-1.5 bottom-3.5 h-3 w-3 rotate-45 bg-white ring-1 ring-ink-900/10 [clip-path:polygon(0_0,100%_0,100%_100%)]" />
        </div>
      )}
      <a
        ref={button}
        href={whatsappLink(msg)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={dismiss}
        aria-label="Falar no WhatsApp com o comercial da Eletrix"
        className={`grid h-[58px] w-[58px] shrink-0 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-6px_rgba(5,11,20,.45),0_4px_14px_-4px_rgba(37,211,102,.55)] transition-[opacity,transform,background-color] duration-200 hover:bg-[#1FBF5B] focus-visible:!outline-offset-4 active:scale-95 ${away ? `${hidden} focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100` : ''}`}
      >
        <WhatsAppGlyph size={32} />
      </a>
    </div>
  );
}
