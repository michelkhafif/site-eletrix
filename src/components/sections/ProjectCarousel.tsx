'use client';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';

const INTERVAL = 3000;

type Slide = { name: string; node: ReactNode };

/**
 * Carrossel de ponta a ponta, em laço infinito: a lista é desenhada três vezes e a posição volta,
 * sem animação, para a cópia do meio (idêntica na tela). Avança sozinho a cada 3 segundos, um cartão
 * por vez; pausa com o mouse ou o foco em cima, com a aba escondida, fora da tela ou pelo botão.
 * Com movimento reduzido, não avança sozinho. Também por setas, teclado e arraste.
 */
export function ProjectCarousel({ slides, title, label }: { slides: Slide[]; title: string; label: string }) {
  const n = slides.length;
  const [pos, setPos] = useState(n);
  const [animate, setAnimate] = useState(false);
  // o HTML sai com uma cópia só (página mais leve); as duas de apoio entram depois de carregar
  const [looped, setLooped] = useState(false);
  useEffect(() => setLooped(true), []);
  const [drag, setDrag] = useState(0);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [announce, setAnnounce] = useState('');
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number; id: number; moved: boolean } | null>(null);

  const real = ((pos % n) + n) % n;

  /** Volta para a cópia do meio sem animar (as três cópias são iguais). */
  const recenter = useCallback((p: number) => {
    if (p >= n && p < 2 * n) return p;
    setAnimate(false);
    return (((p % n) + n) % n) + n;
  }, [n]);

  useEffect(() => {
    if (animate) return;
    // dois quadros: um para aplicar a posição sem transição, outro para religar
    let b = 0;
    const a = requestAnimationFrame(() => { b = requestAnimationFrame(() => setAnimate(true)); });
    return () => { cancelAnimationFrame(a); cancelAnimationFrame(b); };
  }, [animate]);

  const go = useCallback((delta: number, manual = false) => {
    setPos((p) => {
      // se um clique rápido saiu da faixa segura, primeiro recentraliza
      const base = p + delta < 1 || p + delta > 3 * n - 6 ? (((p % n) + n) % n) + n : p;
      const next = base + delta;
      if (manual) setAnnounce(`${slides[((next % n) + n) % n].name}, ${(((next % n) + n) % n) + 1} de ${n}`);
      return next;
    });
  }, [n, slides]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    const vis = () => setTabVisible(document.visibilityState === 'visible');
    vis();
    document.addEventListener('visibilitychange', vis);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => { mq.removeEventListener('change', on); document.removeEventListener('visibilitychange', vis); io.disconnect(); };
  }, []);

  const playing = !reduced && !paused && !hover && !focus && visible && tabVisible && drag === 0;
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => go(1), INTERVAL);
    return () => clearInterval(t);
  }, [playing, go, pos]);

  const step = () => {
    const li = track.current?.children[0] as HTMLElement | undefined;
    return li ? li.offsetWidth + parseFloat(getComputedStyle(track.current!).columnGap || '0') : 320;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    if (!s.moved) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(e.clientY - s.y)) return;
      s.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setPos((p) => recenter(p));
    }
    setDrag(dx);
  };
  const onPointerEnd = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s?.moved) return;
    const dx = e.clientX - s.x;
    const size = step();
    const cards = Math.abs(dx) < 36 ? 0 : Math.max(1, Math.round(Math.abs(dx) / size));
    setDrag(0);
    if (cards) go(dx < 0 ? cards : -cards, true);
  };

  const button = 'grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-white transition hover:border-brand-400 hover:bg-brand-500/25 active:translate-y-px';

  return (
    <div ref={root} role="region" aria-roledescription="carrossel" aria-label={label}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)} onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
      onFocus={(e) => { if (!(e.target as HTMLElement).hasAttribute('data-playpause')) setFocus(true); }} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocus(false); }}>
      <div className="container-x flex items-center justify-between gap-4">
        <h3 className="font-display text-[1.35rem] font-bold text-white md:text-2xl">{title}</h3>
        <div className="flex items-center gap-2" data-wa-avoid>
          <button type="button" className={`${button} hidden sm:grid`} onClick={() => go(-1, true)} aria-label="Prédio anterior"><Icon name="arrowRight" size={20} className="rotate-180" /></button>
          {!reduced && (
            <button type="button" data-playpause className={button} onClick={() => { setPaused((v) => !v); setFocus(false); }} aria-label={paused ? 'Retomar a passagem automática' : 'Pausar a passagem automática'}>
              <Icon name={paused ? 'play' : 'pause'} size={18} />
            </button>
          )}
          <button type="button" className={`${button} hidden sm:grid`} onClick={() => go(1, true)} aria-label="Próximo prédio"><Icon name="arrowRight" size={20} /></button>
        </div>
      </div>

      <div className="carousel mt-5 cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing" tabIndex={0} aria-label="Use as setas do teclado para ver outros prédios"
        onKeyDown={(e) => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1, true); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1, true); } }}
        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd} onDragStart={(e) => e.preventDefault()}>
        <div ref={track} className="carousel-track" data-animate={animate && drag === 0}
          style={{ ['--pos' as string]: looped ? pos : pos - n, ['--drag' as string]: `${drag}px` }}
          onTransitionEnd={(e) => { if (e.target === e.currentTarget) setPos((p) => recenter(p)); }}>
          {(looped ? [0, 1, 2] : [1]).flatMap((copy) => slides.map((s, i) => (
            <div key={`${copy}-${i}`} className="carousel-slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} de ${n}`} aria-hidden={copy === 1 ? undefined : true} data-copy={copy}>
              {s.node}
            </div>
          )))}
        </div>
      </div>

      <div className="container-x mt-5 flex items-center gap-4" data-wa-avoid>
        <button type="button" className={`${button} sm:hidden`} onClick={() => go(-1, true)} aria-label="Prédio anterior"><Icon name="arrowRight" size={20} className="rotate-180" /></button>
        <div aria-hidden="true" className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/15 sm:max-w-xs">
          <span className="absolute inset-y-0 left-0 rounded-full bg-brand-500 transition-[transform] duration-500 ease-out" style={{ width: `${100 / n}%`, transform: `translateX(${real * 100}%)` }} />
        </div>
        <p aria-hidden="true" className="tnum text-sm text-fg-muted">{String(real + 1).padStart(2, '0')} / {n}</p>
        <button type="button" className={`${button} sm:hidden`} onClick={() => go(1, true)} aria-label="Próximo prédio"><Icon name="arrowRight" size={20} /></button>
      </div>
      <p aria-live="polite" className="sr-only">{announce}</p>
    </div>
  );
}
