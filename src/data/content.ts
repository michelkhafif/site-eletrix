/** Dados de conteúdo reutilizados em várias páginas. */

export type Testimonial = {
  quote: string;
  /** Trecho (idêntico ao do depoimento) que recebe destaque visual */
  highlight: string;
  role: string;
  place: string;
  /** Foto real da operação Eletrix, apenas ilustrativa: não identifica o local do depoimento */
  photo: string;
  placeholder: true;
};

/**
 * PROVISÓRIOS: substituir por depoimentos reais antes do lançamento oficial (ver GO-LIVE.md).
 * Para esconder a seção: site.flags.showPlaceholderTestimonials = false.
 */
export const testimonials: Testimonial[] = [
  {
    quote: 'Tínhamos carregadores parados e reclamação toda semana. Com a Eletrix, a troca foi feita sem custo para o condomínio, a IT-41 ficou resolvida e eu não recebo mais ligação de usuário. Hoje o prédio ainda recebe pela energia.',
    highlight: 'eu não recebo mais ligação de usuário',
    role: 'Gerente predial',
    place: 'Edifício corporativo, Vila Olímpia (SP)',
    photo: 'case-2',
    placeholder: true,
  },
  {
    quote: 'O que mais pesou foi o atendimento. Quando um carregador dá problema, eles resolvem no mesmo dia. Para quem administra vários prédios, isso faz toda a diferença.',
    highlight: 'eles resolvem no mesmo dia',
    role: 'Coordenadora de facilities',
    place: 'Administradora de imóveis corporativos (SP)',
    photo: 'case-1',
    placeholder: true,
  },
  {
    quote: 'Os moradores começaram a comprar carro elétrico e eu não sabia por onde começar. Fizeram o laudo, montaram a infraestrutura e cada um instala na própria vaga, pagando na própria conta de luz. Acabou a discussão em assembleia.',
    highlight: 'Acabou a discussão em assembleia',
    role: 'Síndico',
    place: 'Condomínio residencial, Pinheiros (SP)',
    photo: 'case-5',
    placeholder: true,
  },
];

export type PressItem = {
  slug: string;
  outlet: string;
  section: string;
  year: number;
  title: string;
  image: string;
  imageAlt: string;
  /** Matéria no site do Estadão (abre em nova aba) */
  url: string;
};

export const press: PressItem[] = [
  {
    slug: 'predios-ganham-com-recarga',
    outlet: 'Estadão',
    section: 'Mobilidade',
    year: 2025,
    title: 'Como prédios estão ganhando com a recarga elétrica',
    image: 'estadao-predios',
    imageAlt: 'Página do Estadão com a matéria sobre prédios que ganham com a recarga elétrica',
    url: 'https://mobilidade.estadao.com.br/inovacao/como-predios-estao-ganhando-com-a-recarga-eletrica/',
  },
  {
    slug: 'orelhao-ponto-de-recarga',
    outlet: 'Estadão',
    section: 'Mobilidade',
    year: 2025,
    title: 'O “orelhão” que virou ponto de recarga',
    image: 'estadao-orelhao',
    imageAlt: 'Página do Estadão com a matéria sobre o orelhão que virou ponto de recarga, com foto de carros carregando em Barueri',
    // CONFIRMAR: o endereço enviado para este card fala de Fórmula E e não pôde ser aberto para conferência (REDESIGN-PENDENCIAS.md).
    url: 'https://mobilidade.estadao.com.br/mobilidade-para-que/descarbonizacao-formula-e-faz-pesquisas-para-ampliar-a-recuperacao-de-energia-nas-frenagens/',
  },
];

export const whyEletrix = [
  { icon: 'headset', title: 'Suporte 24 horas', text: 'Em caso de problema em um Hub, o carregador volta a funcionar em até 12 horas.' },
  { icon: 'shield', title: 'Conformidade com a IT-41', text: 'Quadro identificado, botoeira por pavimento e sinalização S.A.V.E. em todos os pontos.' },
  { icon: 'handshake', title: 'Contrato sem multa', text: 'Rescisão a qualquer momento, por qualquer das partes, sem multa. Entrega de valor, não cláusulas leoninas.' },
  { icon: 'wrench', title: 'Operação própria', text: 'Time técnico próprio para instalação, manutenção e atendimento. Um só parceiro, do laudo à operação.' },
  { icon: 'badge', title: 'WEG, Intelbras e Livoltek', text: 'Equipamentos robustos, bem documentados, com suporte técnico ágil em todo o Brasil.' },
  { icon: 'lock', title: 'Nenhuma desinstalação por falta de suporte', text: 'Até hoje, nenhuma estação foi desinstalada por falta de manutenção ou de suporte.' },
] as const;
