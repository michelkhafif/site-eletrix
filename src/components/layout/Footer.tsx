import Link from 'next/link';
import { site, whatsappLink } from '@/config/site';
import { Logo } from './Logo';
import { StoreBadges } from '@/components/ui/StoreBadges';
import { Icon } from '@/components/ui/Icon';
import { wa } from '@/data/whatsapp';

const colTitle = 'font-display text-base font-bold text-white';
const linkCls = 'inline-flex min-h-9 items-center text-[0.97rem] text-white/85 transition hover:text-brand-400';

const solucoes = [
  { href: '/eletrix-hub/', label: 'Eletrix Hub' },
  { href: '/eletrix-rent/', label: 'Eletrix Rent' },
  { href: '/instalacao-carregador-residencial/', label: 'Instalação na vaga' },
  { href: '/condominios/', label: 'Para condomínios' },
];
const empresa = [
  { href: '/sobre/', label: 'Sobre a Eletrix' },
  { href: '/#estacoes', label: 'Estações' },
  { href: '/guias/', label: 'Central de dúvidas' },
  { href: '/suporte/', label: 'Suporte' },
  { href: '/contato/', label: 'Contato' },
];

export function Footer() {
  const a = site.contact.address;
  return (
    <footer data-tone="dark" className="relative border-t border-white/10 bg-ink-950 pb-8 pt-14 md:pt-16">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr]">
          <div>
            <Logo height={24} />
            <p className="mt-5 font-display text-xl font-semibold leading-snug text-white">Carregando seu futuro.</p>
            <StoreBadges className="mt-6" />
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2.5 text-white/85 transition hover:text-brand-400">
              <Icon name="instagram" size={20} /> {site.social.instagramHandle}
            </a>
          </div>

          {/* no celular, as listas de links viram acordeões */}
          <nav aria-label="Soluções" className="hidden lg:block">
            <h2 className={colTitle}>Soluções</h2>
            <ul className="mt-3">{solucoes.map((l) => <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Empresa" className="hidden lg:block">
            <h2 className={colTitle}>Empresa</h2>
            <ul className="mt-3">{empresa.map((l) => <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>)}</ul>
          </nav>
          <div className="-mt-4 divide-y divide-white/10 border-y border-white/10 lg:hidden">
            {[['Soluções', solucoes], ['Empresa', empresa]].map(([t, list]) => (
              <details key={t as string} className="group">
                <summary className="flex min-h-14 items-center justify-between font-display text-base font-bold text-white">{t as string}<Icon name="chevronDown" size={18} className="chev transition-transform" /></summary>
                <ul className="pb-3">{(list as typeof solucoes).map((l) => <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>)}</ul>
              </details>
            ))}
          </div>

          <div>
            <h2 className={colTitle}>Fale com a gente</h2>
            <ul className="mt-3 space-y-3.5 text-[0.97rem] text-white/85">
              <li>
                <span className="block text-sm text-muted-dark">Comercial e orçamentos</span>
                <a href={whatsappLink(wa.default)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center font-semibold transition hover:text-brand-400">{site.contact.phoneCommercialDisplay}</a>
              </li>
              <li>
                <span className="block text-sm text-muted-dark">Suporte às estações, 24 horas</span>
                <a href={whatsappLink('Olá! Preciso de suporte em uma estação Eletrix.', 'support')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center font-semibold transition hover:text-brand-400">{site.contact.phoneSupportDisplay}</a>
              </li>
              <li><a href={`mailto:${site.contact.email}`} className="inline-flex min-h-9 items-center transition hover:text-brand-400">{site.contact.email}</a></li>
              <li><address className="not-italic leading-snug text-white/75">{a.street}<br />{a.district}, {a.city}/{a.state}<br />CEP {a.zip}</address></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-muted-dark md:flex-row md:items-center md:justify-between">
          <p>© 2026 {site.legalName} · CNPJ {site.cnpj}</p>
          <ul className="flex flex-wrap gap-x-6">
            <li><Link href="/politica-de-privacidade/" className="inline-flex min-h-9 items-center hover:text-white">Política de privacidade</Link></li>
            <li><Link href="/termos-de-uso/" className="inline-flex min-h-9 items-center hover:text-white">Termos de uso</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
