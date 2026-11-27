import type { FaqItem } from '@/components/sections/FAQ';

export type City = {
  slug: 'sao-paulo' | 'rio-de-janeiro' | 'curitiba' | 'campinas';
  path: string;
  name: string;
  state: string;
  uf: string;
  h1: string;
  eyebrow: string;
  lead: string;
  /** Cidades (como estão no CSV) cujos locais públicos entram na página */
  stationCities: string[];
  heroImage: string;
  heroAlt: string;
  sections: { id: string; title: string; paragraphs: string[]; bullets?: string[] }[];
  /** Soluções com foco para a cidade (slugs de solutions.ts) */
  focus: string[];
  focusIntro: string;
  faq: FaqItem[];
  ctaMessage: string;
};

export const cities: City[] = [
  {
    slug: 'sao-paulo',
    path: '/sao-paulo/',
    name: 'São Paulo',
    state: 'São Paulo',
    uf: 'SP',
    h1: 'Carregador de carro elétrico em São Paulo: instalação, IT-41 e estações Eletrix.',
    eyebrow: 'Eletrix em São Paulo',
    lead: 'São Paulo é a cidade da sede da Eletrix e onde a rede é mais densa: prédios corporativos, hotéis, escolas, estacionamentos e condomínios. É também onde estão as regras que mais interessam a quem administra um prédio: a Lei Estadual 18.403/2026 e a IT-41 do Corpo de Bombeiros.',
    stationCities: ['São Paulo'],
    heroImage: 'faria-lima-financial-center',
    heroAlt: 'Torre do Faria Lima Financial Center, em São Paulo',
    sections: [
      {
        id: 'regras',
        title: 'As duas regras de São Paulo que todo prédio precisa conhecer',
        paragraphs: [
          'A primeira é a Lei Estadual nº 18.403/2026, que garante ao condômino o direito de instalar uma estação de recarga na vaga privativa, desde que cumpra os requisitos técnicos e de segurança. O condomínio só pode negar com justificativa técnica. Para o morador, isso muda a conversa na administração: o pedido deixa de ser um favor e passa a ser um direito com requisitos.',
          'A segunda é a IT-41, a Instrução Técnica do Corpo de Bombeiros de São Paulo. A Portaria CCB-003/970/2026, de 17 de março de 2026, a atualizou para incluir os sistemas de recarga de veículos elétricos. Em edificações existentes, as exigências valem na renovação do AVCB.',
        ],
        bullets: ['Morador: visita técnica gratuita, projeto e ART para sustentar o pedido ao condomínio.', 'Síndico: laudo de demanda para medir, infraestrutura seca para organizar e adequação à IT-41 para regularizar.', 'Empreendimento: Eletrix Hub ou Rent, com a operação, o suporte e a IT-41 por conta da Eletrix.'],
      },
      {
        id: 'quem-atendemos',
        title: 'Para quem a Eletrix atua na capital',
        paragraphs: [
          'Na capital paulista, a Eletrix atende edifícios corporativos, condomínios residenciais, hotéis, escolas, estacionamentos e comércios. A sede fica na Avenida Angélica, em Santa Cecília.',
          'Para prédios corporativos, o Eletrix Hub leva estações tarifadas em comodato, sem mensalidade e com energia reembolsada. Para condomínios residenciais, o caminho começa pelo laudo de demanda e pode seguir até a regularização na IT-41. Para o morador, a instalação é ligada ao medidor da própria unidade.',
        ],
      },
    ],
    focus: ['eletrix-hub', 'adequacao-it-41', 'instalacao-carregador-residencial', 'laudo-de-demanda'],
    focusIntro: 'As soluções mais procuradas em São Paulo.',
    faq: [
      { q: 'A Lei 18.403/2026 vale na cidade de São Paulo?', a: 'Sim. É uma lei estadual, e vale para os condomínios do estado de São Paulo, incluindo a capital. Ela garante ao condômino o direito de instalar a estação em vaga privativa, desde que cumpra os requisitos técnicos e de segurança.' },
      { q: 'A IT-41 é exigida em todos os prédios de São Paulo?', a: 'Ela se aplica às instalações de recarga de veículos elétricos em edificações. Para as existentes, as exigências valem na renovação do AVCB. Situações específicas são avaliadas na visita técnica.' },
      { q: 'Onde posso carregar o meu carro elétrico em São Paulo?', a: 'Nas estações Eletrix em prédios, hotéis, escolas, estacionamentos e comércios da cidade. Veja o mapa e use o app para localizar a mais próxima.' },
      { q: 'A Eletrix atende em qualquer região da cidade?', a: 'Fale com o time comercial e informe o endereço do prédio. A visita técnica é agendada a partir dele.' },
    ],
    ctaMessage: 'Olá! Vim pela página de São Paulo e quero falar com o time da Eletrix.',
  },
  {
    slug: 'rio-de-janeiro',
    path: '/rio-de-janeiro/',
    name: 'Rio de Janeiro',
    state: 'Rio de Janeiro',
    uf: 'RJ',
    h1: 'Carregador de carro elétrico no Rio de Janeiro: estações Eletrix em prédios e hotéis.',
    eyebrow: 'Eletrix no Rio de Janeiro',
    lead: 'No Rio, a Eletrix opera estações em edifícios corporativos e em hotel, entre eles o Aqwa Corporate, na zona portuária, e o Botafogo Trade Center. A mesma operação, o mesmo suporte 24 horas e o mesmo padrão adotados em São Paulo.',
    stationCities: ['Rio de Janeiro'],
    heroImage: 'aqwa-por-do-sol',
    heroAlt: 'Edifício Aqwa Corporate ao pôr do sol, na zona portuária do Rio de Janeiro',
    sections: [
      {
        id: 'operacao',
        title: 'Como a Eletrix opera no Rio',
        paragraphs: [
          'Os empreendimentos cariocas atendidos pela Eletrix seguem o modelo do Eletrix Hub: o carregador fica em comodato, sem mensalidade para o empreendimento, a Eletrix opera as estações e o motorista paga a recarga pelo app. A energia é reembolsada ao local, com bônus sobre cada kWh cobrado.',
          'Há ainda um empreendimento em fase de entrada em operação, o ECO Sapucaí, que aparece no nosso portfólio como projeto.',
        ],
      },
      {
        id: 'normas',
        title: 'Normas de segurança no estado do Rio',
        paragraphs: [
          'A IT-41 é uma instrução técnica do Corpo de Bombeiros do Estado de São Paulo. Cada estado tem as suas normas de segurança contra incêndio, e no Rio de Janeiro valem as exigências do Corpo de Bombeiros fluminense. Por isso, a visita técnica é a etapa em que a Eletrix confirma o que se aplica ao seu prédio.',
          'Em qualquer estado, a instalação segue a ABNT NBR 5410 e a NBR 17019, com ART, circuito exclusivo, disjuntor e DR por estação, proteção contra sobretensão e sinalização.',
        ],
      },
    ],
    focus: ['eletrix-hub', 'eletrix-rent', 'laudo-de-demanda', 'adequacao-it-41'],
    focusIntro: 'Soluções para empreendimentos e condomínios do Rio.',
    faq: [
      { q: 'A Eletrix opera no Rio de Janeiro?', a: 'Sim. Há estações em edifícios corporativos e em hotel na cidade, como o Aqwa Corporate e o Botafogo Trade Center, entre outros locais do mapa.' },
      { q: 'A IT-41 vale no Rio?', a: 'A IT-41 é do Corpo de Bombeiros de São Paulo. No Rio, valem as exigências do Corpo de Bombeiros do estado, e a visita técnica confirma o que se aplica ao seu prédio.' },
      { q: 'Como contratar o Eletrix Hub no Rio?', a: 'Agende uma visita técnica pelo WhatsApp. A Eletrix avalia a demanda, o fluxo de veículos e apresenta a proposta, com a infraestrutura negociada.' },
      { q: 'A lei paulista 18.403/2026 vale no Rio?', a: 'Não. Ela é estadual, de São Paulo. No Rio, a instalação em vaga privativa segue a convenção do condomínio e a legislação local.' },
    ],
    ctaMessage: 'Olá! Vim pela página do Rio de Janeiro e quero falar com o time da Eletrix.',
  },
  {
    slug: 'curitiba',
    path: '/curitiba/',
    name: 'Curitiba',
    state: 'Paraná',
    uf: 'PR',
    h1: 'Carregador de carro elétrico em Curitiba: estações Eletrix em hotéis e empreendimentos.',
    eyebrow: 'Eletrix em Curitiba e no Paraná',
    lead: 'Em Curitiba, a recarga Eletrix está principalmente em hotéis, como o Intercity Batel e o Novotel. O hóspede recarrega durante a estadia, e o hotel oferece o serviço sem comprar o equipamento.',
    stationCities: ['Curitiba', 'Guarapuava', 'Ponta Grossa', 'São José dos Pinhais'],
    heroImage: 'maringa-park',
    heroAlt: 'Shopping Maringá Park, no Paraná',
    sections: [
      {
        id: 'hoteis',
        title: 'Hotéis: onde a recarga encaixa melhor',
        paragraphs: [
          'Em hotéis, o carro fica parado por horas, o tempo ideal para a recarga em corrente alternada de 7,4 kW. A Eletrix oferece o Eletrix Rent para hotéis, com mensalidade fixa e sem a compra do carregador, e o Eletrix Hub quando o fluxo de veículos justifica o comodato.',
          'Em ambos, quem recarrega paga pelo app e a energia é 100% reembolsada ao hotel. Com o white label, os carregadores podem levar a marca da rede hoteleira, com a assinatura Powered by Eletrix.',
        ],
      },
      {
        id: 'estado',
        title: 'Presença no Paraná',
        paragraphs: [
          'Além de Curitiba, a rede chega a Guarapuava, Ponta Grossa e São José dos Pinhais, e o Shopping Maringá Park está entre os empreendimentos com a recarga Eletrix. A mesma operação e o mesmo suporte 24 horas valem em todas as cidades.',
          'Para condomínios residenciais e prédios comerciais da região, o caminho de laudo de demanda, infraestrutura seca, controle de demanda e adequação às normas de segurança segue a mesma lógica. As exigências do Corpo de Bombeiros do Paraná são confirmadas na visita técnica.',
        ],
      },
    ],
    focus: ['eletrix-rent', 'eletrix-hub', 'laudo-de-demanda', 'infraestrutura-seca'],
    focusIntro: 'Soluções para hotéis, comércios e condomínios de Curitiba.',
    faq: [
      { q: 'A Eletrix tem estações em Curitiba?', a: 'Sim, principalmente em hotéis, como o Intercity Batel e o Novotel. Use o app para localizar as estações.' },
      { q: 'O meu hotel pode oferecer recarga sem comprar o carregador?', a: 'Sim. No Eletrix Rent, o carregador é da Eletrix, e o hotel paga uma mensalidade fixa. No Hub, o carregador fica em comodato por 36 meses, sem mensalidade.' },
      { q: 'A Eletrix atende outras cidades do Paraná?', a: 'Sim, como Guarapuava, Ponta Grossa e São José dos Pinhais. Fale com o time comercial para confirmar o atendimento na sua cidade.' },
      { q: 'Qual a regra de segurança no Paraná?', a: 'A IT-41 é do Corpo de Bombeiros de São Paulo. No Paraná, valem as exigências do Corpo de Bombeiros do estado, confirmadas na visita técnica. A instalação segue as NBR 5410 e 17019.' },
    ],
    ctaMessage: 'Olá! Vim pela página de Curitiba e quero falar com o time da Eletrix.',
  },
  {
    slug: 'campinas',
    path: '/campinas/',
    name: 'Campinas',
    state: 'São Paulo',
    uf: 'SP',
    h1: 'Carregador de carro elétrico em Campinas: da logística ao condomínio.',
    eyebrow: 'Eletrix em Campinas e região',
    lead: 'Em Campinas e região, a Eletrix opera estações em um centro logístico, em shopping e em condomínios, como o Bresco Viracopos e o Bresco Mall. A região também reúne hotéis em Itupeva, Louveira e Jundiaí, e empreendimentos em Barueri.',
    stationCities: ['Campinas', 'Itupeva', 'Louveira', 'Jundiaí'],
    heroImage: 'bresco-viracopos',
    heroAlt: 'Galpão logístico Bresco Viracopos, em Campinas',
    sections: [
      {
        id: 'perfil',
        title: 'Um polo de perfis diferentes',
        paragraphs: [
          'Campinas reúne centros logísticos, shoppings, condomínios residenciais e empresas. A Eletrix atende cada um com o modelo mais adequado: Hub para espaços com alto fluxo, Rent para fluxos menores e a instalação na vaga para o morador.',
          'Em centros logísticos e galpões, a recarga atende equipes e visitantes, com infraestrutura dimensionada ao local e a mesma operação com suporte 24 horas.',
        ],
      },
      {
        id: 'lei-e-norma',
        title: 'Lei e norma para quem está em Campinas',
        paragraphs: [
          'Campinas fica no estado de São Paulo, então valem as duas regras que mais interessam ao morador e ao síndico: a Lei Estadual nº 18.403/2026, que garante o direito de instalar a estação em vaga privativa, e a IT-41 do Corpo de Bombeiros de São Paulo, que desde a Portaria CCB-003/970/2026 inclui os sistemas de recarga de veículos elétricos.',
          'Para edificações existentes, as exigências da IT-41 passam a valer na renovação do AVCB. Se o seu condomínio se aproxima dessa data, o laudo de demanda e a adequação à IT-41 são o caminho.',
        ],
      },
    ],
    focus: ['eletrix-hub', 'instalacao-carregador-residencial', 'adequacao-it-41', 'laudo-de-demanda'],
    focusIntro: 'Soluções para empresas, condomínios e moradores de Campinas.',
    faq: [
      { q: 'A Eletrix atende Campinas?', a: 'Sim. Há estações em centro logístico, shopping e condomínios de Campinas, além de outras cidades da região, como Itupeva, Louveira e Jundiaí.' },
      { q: 'A lei paulista vale em Campinas?', a: 'Sim. A Lei Estadual nº 18.403/2026 vale em todo o estado de São Paulo e garante ao condômino o direito de instalar a estação de recarga em vaga privativa, desde que cumpra os requisitos técnicos e de segurança.' },
      { q: 'Como agendar a visita técnica em Campinas?', a: 'Chame o time comercial no WhatsApp e informe o condomínio e a cidade. A visita para instalação na vaga é gratuita.' },
      { q: 'Meu galpão pode ter recarga?', a: 'Sim. O Eletrix Hub atende prédios corporativos, shoppings, comércios, hotéis e galpões, com a infraestrutura negociada depois da visita técnica.' },
    ],
    ctaMessage: 'Olá! Vim pela página de Campinas e quero falar com o time da Eletrix.',
  },
];

export const cityBySlug = (slug: string) => {
  const c = cities.find((x) => x.slug === slug);
  if (!c) throw new Error(`Cidade não encontrada: ${slug}`);
  return c;
};
