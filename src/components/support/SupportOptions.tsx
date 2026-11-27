import { site, whatsappLink } from '@/config/site';
import { Icon } from '@/components/ui/Icon';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppGlyph';
import { wa } from '@/data/whatsapp';

/** Os dois canais de suporte, em botões grandes. Usado no popup e na página /suporte/. */
export function SupportOptions({ columns = false }: { columns?: boolean }) {
  const c = site.contact;
  const base = 'group flex items-center gap-4 rounded-2xl p-4 text-left transition active:translate-y-px sm:p-5';
  return (
    <ul data-wa-avoid className={`grid gap-3 ${columns ? 'sm:grid-cols-2 sm:gap-4' : ''}`}>
      <li>
        <a href={`tel:${c.support0800Tel}`} className={`${base} h-full bg-ink-900 text-white ring-1 ring-brand-400/40 hover:bg-ink-800 hover:ring-brand-400`}>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-500 text-ink-950"><Icon name="phone" size={22} strokeWidth={2} /></span>
          <span className="min-w-0">
            <span className="block text-sm font-medium text-brand-300">Ligar</span>
            <span className="tnum block font-display text-[1.45rem] font-extrabold leading-tight tracking-tight">{c.support0800Display}</span>
            <span className="mt-0.5 block text-sm text-muted-dark">{c.support0800Hours}</span>
          </span>
        </a>
      </li>
      <li>
        <a href={whatsappLink(wa.suporte, 'support')} target="_blank" rel="noopener noreferrer" className={`${base} h-full bg-[#E9FBF0] text-ink-900 ring-1 ring-[#25D366]/50 hover:bg-[#DCF8E6] hover:ring-[#25D366]`}>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white"><WhatsAppGlyph size={26} /></span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-[#0B6B34]">WhatsApp</span>
            <span className="tnum block font-display text-[1.25rem] font-extrabold leading-tight tracking-tight">{c.phoneSupportDisplay}</span>
            <span className="mt-0.5 block text-sm text-[#3D5A49]">{c.whatsappSupportHours}</span>
          </span>
        </a>
      </li>
    </ul>
  );
}
