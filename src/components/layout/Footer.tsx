import Link from 'next/link';
import { site, whatsappLink } from '@/config/site';
import { Logo } from './Logo';
import { StoreBadges } from '@/components/ui/StoreBadges';
import { Icon } from '@/components/ui/Icon';
import { wa } from '@/data/whatsapp';
import { withBase } from '@/config/site';

const col = (title: string, links: { href: string; label: string }[]) => (
  <nav aria-label={title}>
    <h2 className="font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/55">{title}</h2>
    <ul className="mt-4 space-y-2.5">
      {links.map((l) => (
        <li key={l.href}><Link href={l.href} className="text-[0.95rem] text-white/85 transition hover:text-brand-400">{l.label}</Link></li>
      ))}
    </ul>
  </nav>
);

export function Footer() {
  const a = site.contact.address;
  return (
    <footer data-tone="dark" className="relative border-t border-white/10 bg-ink-950 pb-10 pt-16 md:pt-20">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2.7fr]">
          <div>
            <Logo height={24} />
            <p className="mt-5 max-w-xs font-display text-xl font-semibold leading-snug text-white">Carregando seu futuro.</p>
            <p className="mt-3 max-w-xs text-sm text-muted-dark">Qualidade de serviço à altura de um AAA. Operadora de recarga para veículos elétricos desde {site.foundedYear}.</p>
            <StoreBadges className="mt-6" />
            <div className="mt-6 flex items-center gap-3">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Eletrix" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-brand-400 hover:text-brand-400"><Icon name="instagram" size={18} /></a>
              {site.social.linkedin && <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da Eletrix" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-brand-400 hover:text-brand-400"><Icon name="linkedin" size={18} /></a>}
              <span className="text-sm text-muted-dark">{site.social.instagramHandle}</span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.1fr_1.25fr]">
            {col('Soluções', [
              { href: '/eletrix-hub/', label: 'Eletrix Hub' },
              { href: '/eletrix-rent/', label: 'Eletrix Rent' },
              { href: '/instalacao-carregador-residencial/', label: 'Instalação na vaga' },
              { href: '/carregadores/', label: 'Carregadores' },
              { href: '/laudo-de-demanda/', label: 'Laudo de demanda' },
              { href: '/infraestrutura-seca/', label: 'Infraestrutura seca' },
              { href: '/controle-de-demanda/', label: 'Controle de demanda' },
              { href: '/adequacao-it-41/', label: 'Adequação IT-41' },
              { href: '/troca-de-operador/', label: 'Troca de operador' },
              { href: '/white-label/', label: 'White label' },
            ])}
            {col('Empresa', [
              { href: '/sobre/', label: 'Sobre a Eletrix' },
              { href: '/empreendimentos/', label: 'Empreendimentos' },
              { href: '/parceiros/', label: 'Parceiros' },
              { href: '/estacoes/', label: 'Mapa de estações' },
              { href: '/empresas/', label: 'Para empresas' },
              { href: '/condominios/', label: 'Para condomínios' },
              { href: '/imprensa/', label: 'Imprensa' },
              { href: '/contato/', label: 'Contato' },
            ])}
            {col('Recursos', [
              { href: '/guias/', label: 'Todos os guias' },
              { href: '/guias/it-41-carregador-veicular/', label: 'IT-41 explicada' },
              { href: '/guias/lei-carregador-condominio-sao-paulo/', label: 'Lei 18.403/2026' },
              { href: '/guias/quanto-custa-instalar-carregador-carro-eletrico/', label: 'Quanto custa instalar' },
              { href: '/guias/qual-potencia-carregador-carro-eletrico/', label: 'Qual potência escolher' },
              { href: '/perguntas-frequentes/', label: 'Perguntas frequentes' },
              { href: '/app/', label: 'App Eletrix' },
              { href: '/suporte/', label: 'Suporte' },
            ])}
            <div>
              <h2 className="font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/55">Contato</h2>
              <ul className="mt-4 space-y-4 text-[0.95rem] text-white/85">
                <li>
                  <span className="block text-xs text-muted-dark">Comercial e orçamentos</span>
                  <a href={whatsappLink(wa.default)} target="_blank" rel="noopener noreferrer" className="transition hover:text-brand-400">{site.contact.phoneCommercialDisplay}</a>
                </li>
                <li>
                  <span className="block text-xs text-muted-dark">Suporte às estações · 24 horas</span>
                  <a href={whatsappLink('Olá! Preciso de suporte em uma estação Eletrix.', 'support')} target="_blank" rel="noopener noreferrer" className="transition hover:text-brand-400">{site.contact.phoneSupportDisplay}</a>
                </li>
                <li>
                  <span className="block text-xs text-muted-dark">E-mail</span>
                  <a href={`mailto:${site.contact.email}`} className="transition hover:text-brand-400">{site.contact.email}</a>
                </li>
                <li>
                  <span className="block text-xs text-muted-dark">Endereço</span>
                  <address className="not-italic leading-snug">{a.street}<br />{a.district}, {a.city}/{a.state}<br />CEP {a.zip}</address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-muted-dark md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName} · CNPJ {site.cnpj}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href="/politica-de-privacidade/" className="hover:text-white">Política de privacidade</Link></li>
            <li><Link href="/termos-de-uso/" className="hover:text-white">Termos de uso</Link></li>
          </ul>
        </div>
        <img src={withBase('/brand/carregando-seu-futuro.svg')} alt="" width={294} height={30} className="mt-8 h-auto w-[180px] opacity-25" loading="lazy" />
      </div>
    </footer>
  );
}
