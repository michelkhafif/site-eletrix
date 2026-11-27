import Link from 'next/link';
import { Container, Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppGlyph';
import { Picture } from '@/components/ui/Picture';
import { ContactForm } from '@/components/forms/ContactForm';
import { site, whatsappLink } from '@/config/site';
import { wa } from '@/data/whatsapp';
import type { ContactContext } from '@/data/services';

/**
 * Fechamento das páginas: conversa direta de um lado, o formulário do outro.
 * Os dois painéis têm o mesmo topo e a mesma base (grade com altura igual).
 */
export function FinalContact({ initial, origin, whatsappMessage = wa.default, title = 'Vamos encontrar a solução ideal para o seu caso?' }: { initial?: ContactContext; origin?: string; whatsappMessage?: string; title?: string }) {
  const a = site.contact.address;
  const row = 'flex items-start gap-3.5';
  const icon = 'mt-0.5 shrink-0 text-brand-400';
  return (
    <Section tone="dark" id="fale-com-a-eletrix" labelledBy="final-t" className="overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Picture name="aqwa-noite" alt="" fill sizes="100vw" className="opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/65" />
      </div>
      <Container className="relative">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6">
          <div className="flex flex-col justify-between gap-10 rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10 backdrop-blur-sm md:p-9">
            <div>
              <h2 id="final-t" className="text-h2">{title}</h2>
              <p className="mt-4 max-w-md text-lead text-muted-dark">Conte o seu caso. O time comercial indica o caminho e agenda a visita técnica.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:max-w-sm">
                <Button href={whatsappLink(whatsappMessage)} size="lg">
                  <span className="inline-flex items-center gap-2"><WhatsAppGlyph size={19} /> Falar no WhatsApp</span>
                </Button>
                <Button href={`tel:${site.contact.phoneCommercialTel}`} variant="onDark" size="lg">
                  <span className="inline-flex items-center gap-2"><Icon name="phone" size={18} /> {site.contact.phoneCommercialDisplay}</span>
                </Button>
              </div>
            </div>
            <ul className="space-y-4 border-t border-white/10 pt-7 text-[0.97rem] text-white/85 [overflow-wrap:anywhere]">
              <li className={row}><Icon name="headset" size={20} className={icon} /><span>Já usa uma estação? <Link href="/suporte/" className="font-semibold text-brand-400 underline underline-offset-4 hover:no-underline">Abrir o suporte</Link></span></li>
              <li className={row}><Icon name="mail" size={20} className={icon} /><a href={`mailto:${site.contact.email}`} className="hover:text-brand-400">{site.contact.email}</a></li>
              <li className={row}><Icon name="pin" size={20} className={icon} /><span>{a.street}, {a.district}, {a.city}/{a.state}</span></li>
            </ul>
          </div>
          <div data-tone="light" className="rounded-3xl p-5 shadow-lift sm:p-8">
            <ContactForm initial={initial} origin={origin} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
