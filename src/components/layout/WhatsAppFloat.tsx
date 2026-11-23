'use client';
import { usePathname } from 'next/navigation';
import { whatsappLink } from '@/config/site';
import { wa, waByPath } from '@/data/whatsapp';
import { Icon } from '@/components/ui/Icon';

/** Botão flutuante discreto. Mensagem pré-preenchida muda conforme a página. */
export function WhatsAppFloat() {
  const pathname = usePathname() || '/';
  const msg = waByPath[pathname] ?? wa.default;
  return (
    <a
      href={whatsappLink(msg)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o comercial da Eletrix no WhatsApp"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }} className="group fixed right-4 z-40 flex h-12 items-center gap-2 rounded-full border border-brand-500/40 bg-ink-950/95 pl-3.5 pr-3.5 text-white shadow-lift backdrop-blur transition hover:border-brand-400 hover:bg-ink-900 md:right-6 md:pr-5"
    >
      <Icon name="whatsapp" size={20} className="text-brand-400" />
      <span className="hidden text-sm font-semibold md:inline">Falar no WhatsApp</span>
    </a>
  );
}
