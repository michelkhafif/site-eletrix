import type { ReactNode } from 'react';
import { Container, Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { site, whatsappLink } from '@/config/site';

type Props = {
  title: ReactNode;
  text?: ReactNode;
  whatsappMessage: string;
  whatsappLabel?: string;
  secondary?: { href: string; label: string };
  bg?: string;
  id?: string;
};

export function CTABand({ title, text, whatsappMessage, whatsappLabel = 'Falar no WhatsApp', secondary = { href: '/contato/', label: 'Enviar mensagem' }, bg = 'aqwa-noite', id }: Props) {
  return (
    <Section tone="dark" className="overflow-hidden" tight id={id}>
      <div className="absolute inset-0" aria-hidden="true">
        <Picture name={bg} alt="" fill sizes="100vw" className="opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/60" />
      </div>
      <Container className="relative">
        <div data-reveal className="max-w-3xl">
          <p className="eyebrow mb-4">Próximo passo</p>
          <h2 className="text-h2 text-white">{title}</h2>
          {text && <p className="mt-5 max-w-2xl text-lead text-muted-dark">{text}</p>}
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={whatsappLink(whatsappMessage)} icon="whatsapp" size="lg">{whatsappLabel}</Button>
            <Button href={secondary.href} variant="onDark" size="lg">{secondary.label}</Button>
          </div>
          <p className="mt-6 text-sm text-muted-dark">Comercial no WhatsApp {site.contact.phoneCommercialDisplay}. Suporte das estações 24 horas pelo {site.contact.support0800Display}.</p>
        </div>
      </Container>
    </Section>
  );
}
