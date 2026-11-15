import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { LegalPage } from '@/components/sections/LegalPage';
import { site } from '@/config/site';

const PATH = '/politica-de-privacidade/';
export const metadata = pageMeta(PATH);

export default function PrivacyPage() {
  const a = site.contact.address;
  return (
    <LegalPage path={PATH} name="Política de privacidade" title="Política de privacidade" lead="Como a Eletrix coleta, usa e protege os dados pessoais enviados pelo site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)." updated="15 de novembro de 2026">
      <h2>1. Quem é o controlador</h2>
      <p>O controlador dos dados pessoais tratados por este site é a <strong>{site.legalName}</strong>, inscrita no CNPJ sob o nº {site.cnpj}, com sede na {a.street}, {a.district}, {a.city}/{a.state}, CEP {a.zip}, que opera sob a marca <strong>Eletrix</strong>.</p>

      <h2>2. Quais dados coletamos</h2>
      <p>Coletamos apenas os dados que você nos envia ao preencher um formulário ou ao nos contatar:</p>
      <ul>
        <li><strong>Identificação e contato:</strong> nome, telefone, e-mail.</li>
        <li><strong>Sobre o seu caso:</strong> empresa ou empreendimento, cargo, cidade, número de vagas ou de carregadores, nome do condomínio, modelo do carro, situação da infraestrutura de recarga e a mensagem que você escrever.</li>
        <li><strong>Dados técnicos de navegação:</strong> endereço IP, tipo de navegador e páginas acessadas, registrados pela infraestrutura de hospedagem e pelos serviços de formulário.</li>
      </ul>
      <p>Ao clicar em um botão de WhatsApp, você é levado ao aplicativo de mensagens, e a conversa passa a seguir as regras do próprio WhatsApp.</p>

      <h2>3. Para que usamos os dados</h2>
      <ul>
        <li>Responder à sua solicitação, agendar visita técnica e elaborar propostas.</li>
        <li>Entrar em contato por telefone, WhatsApp ou e-mail sobre o assunto que você nos trouxe.</li>
        <li>Melhorar o site e o atendimento.</li>
        <li>Cumprir obrigações legais e regulatórias.</li>
      </ul>
      <p>Não vendemos dados pessoais e não os usamos para finalidades incompatíveis com as descritas aqui.</p>

      <h2>4. Bases legais</h2>
      <p>Tratamos os dados com base no seu <strong>consentimento</strong>, dado ao marcar a caixa de concordância no formulário, e na realização de <strong>procedimentos preliminares relacionados a contrato</strong> do qual você seja parte, a seu pedido. Quando aplicável, também com base no legítimo interesse da Eletrix em responder a contatos e melhorar os seus serviços, respeitados os seus direitos.</p>

      <h2>5. Com quem compartilhamos</h2>
      <p>Os dados podem ser tratados por prestadores que viabilizam o site e o atendimento, sempre para as finalidades acima: o serviço de envio de formulários, que entrega a mensagem ao e-mail da Eletrix; a infraestrutura de hospedagem do site; e as ferramentas de comunicação usadas pelo time comercial. Também poderemos compartilhar dados quando exigido por lei ou por ordem de autoridade competente.</p>

      <h2>6. Cookies e medição</h2>
      <p>Por padrão, o site não utiliza cookies de rastreamento ou publicidade. Se, no futuro, ferramentas de medição de audiência (como Google Analytics) forem ativadas, elas só serão carregadas depois do seu aceite em um aviso de cookies, e você poderá recusar. O site também guarda, no seu navegador, apenas a sua escolha sobre cookies, quando houver aviso.</p>

      <h2>7. Por quanto tempo guardamos</h2>
      <p>Guardamos os dados pelo tempo necessário para atender à sua solicitação, para manter o relacionamento comercial e para cumprir obrigações legais. Depois disso, os dados são eliminados ou anonimizados.</p>

      <h2>8. Seus direitos</h2>
      <p>Nos termos do art. 18 da LGPD, você pode, a qualquer momento: confirmar se tratamos seus dados; acessá-los; corrigir dados incompletos ou desatualizados; pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários; pedir a portabilidade; saber com quem compartilhamos; e revogar o consentimento.</p>
      <p>Para exercer qualquer desses direitos, escreva para <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. Responderemos dentro do prazo legal.</p>

      <h2>9. Segurança</h2>
      <p>Adotamos medidas técnicas e administrativas razoáveis para proteger os dados contra acesso não autorizado, perda e alteração. Nenhum sistema é totalmente imune a riscos, e, em caso de incidente relevante, seguiremos o que determina a LGPD.</p>

      <h2>10. Alterações desta política</h2>
      <p>Podemos atualizar esta política para refletir mudanças no site ou na lei. A data da última atualização aparece no topo da página.</p>

      <h2>11. Contato</h2>
      <p>Dúvidas sobre esta política ou sobre o tratamento dos seus dados: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. Veja também os nossos <Link href="/termos-de-uso/">termos de uso</Link>.</p>
    </LegalPage>
  );
}
