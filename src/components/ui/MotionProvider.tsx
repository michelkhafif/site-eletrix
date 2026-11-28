'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Um único observer revela os elementos [data-reveal]. Sem JS ou com movimento reduzido, tudo fica visível. */
export function MotionProvider() {
  const pathname = usePathname();
  // Logos das faixas rolantes: carregam depois que a página termina (sem disputar com a foto principal),
  // para nenhum chegar em branco à tela.
  useEffect(() => {
    const load = () => document.querySelectorAll<HTMLImageElement>('.marquee img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
    if (document.readyState === 'complete') load();
    else window.addEventListener('load', load, { once: true });
    return () => window.removeEventListener('load', load);
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('motion')) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.in)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
