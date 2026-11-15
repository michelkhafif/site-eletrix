import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqLd } from '@/lib/jsonld';
import { PageHero } from '@/components/sections/PageHero';
import { FaqList } from '@/components/sections/FAQ';
import { Container, Section } from '@/components/ui/Section';
import { CTABand } from '@/components/sections/CTABand';
import { generalFaq } from '@/data/faqs';
import { wa } from '@/data/whatsapp';

const PATH = '/perguntas-frequentes/';
export const metadata = pageMeta(PATH);

export default function FaqPage() {
  const all = generalFaq.flatMap((g) => g.items);
  return (
    <>
      <JsonLd data={faqLd(all)} />
      <PageHero
        crumbs={[{ name: 'Perguntas frequentes', href: PATH }]}
        eyebrow="Perguntas frequentes"
        title="Perguntas frequentes sobre recarga de carro elétrico."
        lead="Respostas diretas, organizadas por quem pergunta: morador, síndico ou gestor, empreendimento e usuário da rede."
        chips={generalFaq.map((g) => g.group)}
      />
      <Section tone="light">
        <Container>
          <div className="space-y-16">
            {generalFaq.map((g, i) => (
              <section key={g.group} aria-labelledby={`g${i}`} className="grid gap-8 lg:grid-cols-[0.5fr_1.5fr]">
                <h2 id={`g${i}`} className="text-h3 lg:sticky lg:top-28 lg:self-start">{g.group}</h2>
                <FaqList items={g.items} />
              </section>
            ))}
          </div>
        </Container>
      </Section>
      <CTABand title="Não achou a sua pergunta?" text="Chame o time comercial no WhatsApp. Respondemos com clareza e sem compromisso." whatsappMessage={wa.geral} bg="hub-garagem" />
    </>
  );
}
