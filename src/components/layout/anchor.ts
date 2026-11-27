import { BASE_PATH } from '@/config/site';

/**
 * Links para o topo ou para uma seção da home, quando já se está nela: rola suavemente
 * (sem suavidade com movimento reduzido) e leva o foco junto. De outras páginas, o link navega normalmente.
 */
export function scrollOnHome(e: React.MouseEvent, href: string, pathname: string): void {
  if (pathname !== '/' || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const [path, id] = href.split('#');
  if (path !== '/') return;
  const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  const target = id ? document.getElementById(id) : null;
  if (id && !target) return;
  e.preventDefault();
  // espera o menu do celular fechar e liberar a rolagem antes de rolar
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (target) {
      target.scrollIntoView({ behavior, block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    } else window.scrollTo({ top: 0, behavior });
    window.history.replaceState(null, '', `${BASE_PATH}/${id ? `#${id}` : ''}`);
  }));
}
