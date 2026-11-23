export type Profile = 'morador' | 'sindico' | 'negocio';

export type Solution = {
  slug: string;
  href: string;
  code: string;
  name: string;
  /** Verbo da jornada do síndico, quando houver */
  step?: 'Medir' | 'Preparar' | 'Controlar' | 'Regularizar';
  profile: Profile;
  tagline: string;
  summary: string;
  icon: 'plug' | 'gauge' | 'route' | 'sliders' | 'shield' | 'building' | 'key' | 'home';
  price?: string;
  priceNote?: string;
  image: string;
};

export const profiles: Record<Profile, { title: string; question: string; description: string }> = {
  morador: {
    title: 'Morador',
    question: 'Quero carregar o carro na minha vaga.',
    description: 'Instalação segura na sua vaga, ligada ao seu medidor, e carregadores com garantia Eletrix.',
  },
  sindico: {
    title: 'Síndico e gestor',
    question: 'Quero preparar o prédio com segurança.',
    description: 'Do laudo à regularização: medir, preparar, controlar e regularizar, com um só parceiro.',
  },
  negocio: {
    title: 'Comércio, empresa e condomínio',
    question: 'Quero oferecer recarga para clientes, usuários ou moradores.',
    description: 'Recarga coletiva operada pela Eletrix, em comodato ou em locação, com a energia reembolsada.',
  },
};

export const solutions: Solution[] = [
  {
    slug: 'instalacao-carregador-residencial',
    href: '/instalacao-carregador-residencial/',
    code: '01',
    name: 'Instalação em vaga privativa',
    profile: 'morador',
    tagline: 'Carregue na sua vaga. Pague na sua conta de luz.',
    summary: 'O carregador é ligado ao medidor da sua unidade. O consumo do carro entra na sua conta de energia, sem rateio com o condomínio.',
    icon: 'home',
    price: 'Visita técnica gratuita',
    priceNote: 'O valor da instalação é definido depois da visita.',
    image: 'case-1',
  },
  {
    slug: 'laudo-de-demanda',
    href: '/laudo-de-demanda/',
    code: '02',
    name: 'Laudo de demanda de energia',
    step: 'Medir',
    profile: 'sindico',
    tagline: 'Saiba exatamente o que o seu prédio aguenta.',
    summary: 'Sete dias de medição no quadro geral e um relatório técnico que diz quantos carregadores cabem, com que potência e como controlar a carga.',
    icon: 'gauge',
    price: 'A partir de R$ 2.799',
    image: 'hub-garagem',
  },
  {
    slug: 'infraestrutura-seca',
    href: '/infraestrutura-seca/',
    code: '03',
    name: 'Infraestrutura seca',
    step: 'Preparar',
    profile: 'sindico',
    tagline: 'Um padrão único e seguro de recarga para todo o prédio.',
    summary: 'Eletrocalhas até as vagas, caminho único para os cabos e fim das ligações improvisadas. Cada morador instala depois, com desconto.',
    icon: 'route',
    price: 'Orçamento após visita técnica',
    image: 'case-8',
  },
  {
    slug: 'controle-de-demanda',
    href: '/controle-de-demanda/',
    code: '04',
    name: 'Controle de demanda',
    step: 'Controlar',
    profile: 'sindico',
    tagline: 'Mais carregadores, sem sobrecarregar o prédio.',
    summary: 'Monitora o consumo em tempo real e ajusta a potência dos carregadores sozinho, sem passar do limite seguro.',
    icon: 'sliders',
    price: 'Orçamento após visita técnica',
    image: 'case-2',
  },
  {
    slug: 'adequacao-it-41',
    href: '/adequacao-it-41/',
    code: '05',
    name: 'Adequação à IT-41',
    step: 'Regularizar',
    profile: 'sindico',
    tagline: 'Recarga regularizada e pronta para o AVCB.',
    summary: 'Quadro identificado, botoeira de emergência por pavimento e sinalização S.A.V.E. em cada ponto, com preço público.',
    icon: 'shield',
    price: 'Orçamento após visita técnica',
    image: 'case-7',
  },
  {
    slug: 'eletrix-hub',
    href: '/eletrix-hub/',
    code: '06',
    name: 'Eletrix Hub',
    profile: 'negocio',
    tagline: 'Recarga tarifada para prédios corporativos e shoppings.',
    summary: 'Estações tarifadas em comodato por 36 meses, sem mensalidade. A Eletrix opera tudo e reembolsa 100% da energia, com bônus ao local.',
    icon: 'building',
    price: 'Comodato, sem mensalidade',
    image: 'totem-orelhao',
  },
  {
    slug: 'eletrix-rent',
    href: '/eletrix-rent/',
    code: '07',
    name: 'Eletrix Rent',
    profile: 'negocio',
    tagline: 'Ofereça recarga sem comprar o carregador.',
    summary: 'Carregador da Eletrix com mensalidade fixa para condomínios, hotéis e pequenos comércios. Energia 100% reembolsada.',
    icon: 'key',
    price: 'Mensalidade fixa',
    image: 'case-5',
  },
];

export const extraSolutions = [
  {
    slug: 'troca-de-operador',
    href: '/troca-de-operador/',
    name: 'Troca de operador',
    summary: 'Já tem carregadores no prédio? Assumimos a operação e regularizamos.',
  },
  {
    slug: 'white-label',
    href: '/white-label/',
    name: 'White label',
    summary: 'Carregadores e app com a sua marca e a assinatura Powered by Eletrix.',
  },
  {
    slug: 'carregadores',
    href: '/carregadores/',
    name: 'Carregadores',
    summary: 'WEG, Intelbras e Livoltek, 7,4 kW, com 2 anos de garantia Eletrix.',
  },
];

export const journey = solutions.filter((s) => s.step);
export const bySlug = (slug: string) => {
  const s = solutions.find((x) => x.slug === slug);
  if (!s) throw new Error(`Solução não encontrada: ${slug}`);
  return s;
};
