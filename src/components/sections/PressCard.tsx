import { Picture } from '@/components/ui/Picture';
import { Icon } from '@/components/ui/Icon';
import type { PressItem } from '@/data/content';

/** Cartão de matéria: o único link é o botão, que abre o texto no site do veículo em nova aba. */
export function PressCard({ item }: { item: PressItem }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-900/5">
      <div className="aspect-[16/9] overflow-hidden border-b border-ink-900/5 bg-white">
        <Picture name={item.image} alt={item.imageAlt} fill sizes="(min-width:768px) 600px, 100vw" position="50% 0%" />
      </div>
      <div className="flex flex-1 flex-col items-start p-6 md:p-7">
        <p className="text-sm font-semibold text-[#066a9b]">{item.outlet} {item.section}, {item.year}</p>
        <h3 className="mt-1.5 flex-1 font-display text-xl font-bold leading-snug text-ink-900">{item.title}</h3>
        <a href={item.url} target="_blank" rel="noopener noreferrer" data-wa-avoid
          className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-500 px-6 text-[0.95rem] font-semibold text-ink-950 shadow-[0_8px_24px_-12px_rgba(16,183,255,.8)] transition hover:bg-brand-400 active:translate-y-px">
          Ler a matéria<span className="sr-only">: {item.title} (abre em nova aba)</span>
          <Icon name="arrowUpRight" size={17} />
        </a>
      </div>
    </article>
  );
}
