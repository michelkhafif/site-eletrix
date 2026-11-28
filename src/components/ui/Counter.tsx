'use client';
import { useEffect, useRef } from 'react';

type Props = { value: number; prefix?: string; suffix?: string; delay?: number; duration?: number };

/**
 * O valor final está sempre no HTML (SEO e leitores de tela, via texto só para leitor de tela).
 * No visual, o número conta de 0 até o valor, começando após `delay` ms, com desaceleração.
 * Um espaço invisível com o valor final reserva a largura, então não há deslocamento de layout.
 * Com movimento reduzido, o número final aparece direto.
 */
export function Counter({ value, prefix = '', suffix = '', delay = 0, duration = 1500 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = `${prefix}${value}${suffix}`;
  useEffect(() => {
    const el = ref.current;
    if (!el || !document.documentElement.classList.contains('motion')) return;
    const fmt = (n: number) => `${prefix}${Math.round(n)}${suffix}`;
    el.textContent = fmt(0);
    // algarismos de largura igual só durante a contagem; parado, o "11" volta ao espaçamento normal
    el.classList.add('tnum');
    let raf = 0;
    const timer = setTimeout(() => {
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        el.textContent = fmt(value * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(tick);
        else el.classList.remove('tnum');
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [value, prefix, suffix, delay, duration]);
  return (
    <>
      <span className="sr-only">{finalText}</span>
      <span aria-hidden="true" className="inline-grid">
        <span className="tnum invisible col-start-1 row-start-1">{finalText}</span>
        <span ref={ref} className="col-start-1 row-start-1">{finalText}</span>
      </span>
    </>
  );
}
