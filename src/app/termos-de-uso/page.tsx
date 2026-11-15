import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { LegalPage } from '@/components/sections/LegalPage';
import { site } from '@/config/site';

const PATH = '/termos-de-uso/';
export const metadata = pageMeta(PATH);

export default function TermsPage() {
  return (
    <LegalPage path={PATH} name="Termos de uso" title="Termos de uso do site" lead="Condições para navegar neste site e usar as informações que ele traz." updated="15 de novembro de 2026">
      <h2>1. Aceitação</h2>
      <p>Ao acessar o site da Eletrix, mantido pela {site.legalName} (CNPJ {site.cnpj}), você concorda com estes termos e com a <Link href="/politica-de-privacidade/">política de privacidade</Link>. Se não concordar, não utilize o site.</p>

      <h2>2. O que o site é</h2>
      <p>O site apresenta a Eletrix, as suas soluções de recarga de veículos elétricos e canais de contato. As informações têm caráter informativo e comercial. Elas não constituem proposta vinculante, projeto elétrico, laudo técnico nem orientação jurídica.</p>

      <h2>3. Preços, prazos e condições</h2>
      <ul>
        <li>Os valores indicados como &ldquo;a partir de&rdquo; são referenciais. O preço final depende das condições do local e é definido em proposta, depois de visita técnica.</li>
        <li>Os valores dos carregadores referem-se ao equipamento e estão sujeitos à disponibilidade em estoque. Instalação, infraestrutura elétrica, proteções e ART são orçadas à parte, conforme o local.</li>
        <li>Os modelos comerciais (Eletrix Hub, Eletrix Rent e outros) seguem as condições do contrato assinado com cada cliente.</li>
        <li>Imagens são ilustrativas. As imagens de empreendimentos são usadas com autorização contratual.</li>
      </ul>

      <h2>4. Normas e legislação</h2>
      <p>Os guias e as páginas do site resumem normas e leis, como a IT-41 do Corpo de Bombeiros de São Paulo e a Lei Estadual nº 18.403/2026, em linguagem simples. O texto oficial prevalece sempre sobre o resumo. Para decisões que dependam da interpretação de uma norma, consulte um profissional habilitado.</p>

      <h2>5. Propriedade intelectual</h2>
      <p>A marca Eletrix, o logotipo, os textos, as imagens, o layout e o código do site pertencem à {site.legalName} ou a terceiros que autorizaram o uso. Marcas de parceiros e clientes pertencem aos respectivos titulares e são exibidas para identificar relações comerciais. É proibida a reprodução sem autorização.</p>

      <h2>6. Links e serviços de terceiros</h2>
      <p>O site pode conter links para sites e aplicativos de terceiros, como lojas de aplicativos, WhatsApp e redes sociais. A Eletrix não controla esses serviços nem responde pelo seu conteúdo.</p>

      <h2>7. Disponibilidade</h2>
      <p>Buscamos manter o site disponível e atualizado, mas não garantimos funcionamento ininterrupto nem ausência de erros. Podemos alterar ou retirar conteúdos a qualquer momento.</p>

      <h2>8. Contato</h2>
      <p>Dúvidas sobre estes termos: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>

      <h2>9. Foro</h2>
      <p>Fica eleito o foro da comarca de São Paulo/SP para resolver questões relativas a estes termos, ressalvados os direitos do consumidor previstos em lei.</p>
    </LegalPage>
  );
}
