import { Container, Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Picture } from '@/components/ui/Picture';
import { ContactTabs, type FormProfile } from '@/components/forms/ContactForm';
import { site, whatsappLink } from '@/config/site';
import { wa } from '@/data/whatsapp';

/** CTA final: conversa direta no WhatsApp ou formulário por perfil. */
export function FinalContact({ initial = 'gestor', whatsappMessage = wa.default, title = 'Vamos encontrar a solução ideal para o seu caso?' }: { initial?: FormProfile; whatsappMessage?: string; title?: string }) {
  return (
    <Section tone="dark" id="fale-com-a-eletrix" labelledBy="final-t" className="overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Picture name="aqwa-noite" alt="" fill sizes="100vw" className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/92 to-ink-950/70" />
      </div>
      <Container className="relative">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div data-reveal>
            <p className="eyebrow mb-4">Fale com a Eletrix</p>
            <h2 id="final-t" className="text-h2">{title}</h2>
            <p className="mt-5 max-w-lg text-lead text-muted-dark">Fale com o nosso time e receba uma proposta sob medida. A visita técnica para instalação na vaga é gratuita.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={whatsappLink(whatsappMessage)} icon="whatsapp" size="lg">Falar no WhatsApp</Button>
              <Button href={`tel:${site.contact.phoneCommercialTel}`} variant="onDark" size="lg" icon="phone">{site.contact.phoneCommercialDisplay}</Button>
            </div>
            <ul className="mt-10 space-y-4 text-muted-dark [overflow-wrap:anywhere]">
              <li className="flex gap-3"><Icon name="clock" size={20} className="mt-0.5 text-brand-400" /> <span>Suporte 24 horas para as estações em operação.</span></li>
              <li className="flex gap-3"><Icon name="mail" size={20} className="mt-0.5 text-brand-400" /> <a href={`mailto:${site.contact.email}`} className="hover:text-white">{site.contact.email}</a></li>
              <li className="flex gap-3"><Icon name="pin" size={20} className="mt-0.5 text-brand-400" /> <span>{site.contact.address.street}, {site.contact.address.district}, {site.contact.address.city}/{site.contact.address.state}</span></li>
            </ul>
          </div>
          <div data-reveal className="rounded-3xl border border-white/10 bg-ink-900/80 p-6 backdrop-blur md:p-9">
            <ContactTabs initial={initial} tone="dark" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
