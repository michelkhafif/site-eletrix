/** Dados de conteúdo reutilizados em várias páginas. */

export type Testimonial = { quote: string; role: string; placeholder: true };

/** PROVISÓRIOS: substituir por depoimentos reais antes do lançamento oficial (docs/PENDENCIAS.md). */
export const testimonials: Testimonial[] = [
  {
    quote: 'Tínhamos carregadores parados e reclamação toda semana. Com a Eletrix, a troca foi feita sem custo para o condomínio, a IT-41 ficou resolvida e eu não recebo mais ligação de usuário. Hoje o prédio ainda recebe pela energia.',
    role: 'Gerente predial, edifício corporativo AAA, Vila Olímpia (SP)',
    placeholder: true,
  },
  {
    quote: 'O que mais pesou foi o atendimento. Quando um carregador dá problema, eles resolvem no mesmo dia. Para quem administra vários prédios, isso faz toda a diferença.',
    role: 'Coordenadora de facilities, administradora de imóveis corporativos (SP)',
    placeholder: true,
  },
  {
    quote: 'Os moradores começaram a comprar carro elétrico e eu não sabia por onde começar. Fizeram o laudo, montaram a infraestrutura e cada um instala na própria vaga, pagando na própria conta de luz. Acabou a discussão em assembleia.',
    role: 'Síndico, condomínio residencial, Pinheiros (SP)',
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
  /** TODO: URL original da matéria (não disponível no briefing). Não inventar. */
  url: string | null;
};

export const press: PressItem[] = [
  {
    slug: 'predios-ganham-com-recarga',
    outlet: 'Estadão',
    section: 'Mobilidade',
    year: 2025,
    title: 'Como prédios estão ganhando com a recarga elétrica',
    image: 'estadao-predios',
    imageAlt: 'Página do Estadão com a matéria sobre prédios que ganham com a recarga elétrica, assinada por Michel Khafif',
    url: null,
  },
  {
    slug: 'orelhao-ponto-de-recarga',
    outlet: 'Estadão',
    section: 'Mobilidade',
    year: 2025,
    title: 'O “orelhão” que virou ponto de recarga',
    image: 'estadao-orelhao',
    imageAlt: 'Página do Estadão com a matéria sobre o orelhão que virou ponto de recarga, com foto de carros carregando em Barueri',
    url: null,
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
