export type Charger = {
  slug: string;
  brand: 'WEG' | 'Intelbras' | 'Livoltek';
  model: string;
  fullName: string;
  tag: string;
  pitch: string;
  price: number;
  oldPrice: number;
  priceLabel: string;
  oldPriceLabel: string;
  specs: string[];
  compare: {
    cabo: string;
    protecao: string;
    conectividade: string;
    liberacao: string;
    display: string;
  };
  chooseIf: string;
};

export const chargers: Charger[] = [
  {
    slug: 'livoltek-atom',
    brand: 'Livoltek',
    model: 'ATOM 7,3 kW',
    fullName: 'Livoltek ATOM 7,3 kW',
    tag: 'Custo-benefício',
    pitch: 'Entrega o essencial para a recarga do dia a dia pelo melhor preço da linha.',
    price: 2799,
    oldPrice: 3899,
    priceLabel: 'R$ 2.799',
    oldPriceLabel: 'R$ 3.899',
    specs: ['Plug & play, liberação por app', 'Wi-Fi, Bluetooth e Ethernet', 'Botão de emergência', 'Estrutura IK10', 'Cabo de 5 m', 'Proteção IP54'],
    compare: { cabo: '5 metros', protecao: 'IP54', conectividade: 'Wi-Fi, Bluetooth e Ethernet', liberacao: 'App ou plug & play', display: 'LEDs de status' },
    chooseIf: 'Você quer o essencial pelo menor investimento.',
  },
  {
    slug: 'weg-wemob-wall',
    brand: 'WEG',
    model: 'WEMOB Wall 7,4 kW',
    fullName: 'WEG WEMOB Wall 7,4 kW',
    tag: 'Marca nacional',
    pitch: 'Fabricante brasileiro de primeira linha, com ampla rede de assistência no país.',
    price: 4699,
    oldPrice: 5400,
    priceLabel: 'R$ 4.699',
    oldPriceLabel: 'R$ 5.400',
    specs: ['Wi-Fi com controle pelo app', 'Plug & play ou liberação por app', 'Cabo de 5 m', 'Proteção IP65 (chuva, sol e poeira)', 'Medição de consumo de energia'],
    compare: { cabo: '5 metros', protecao: 'IP65', conectividade: 'Wi-Fi', liberacao: 'App ou plug & play', display: 'LEDs de status' },
    chooseIf: 'Você quer a marca mais reconhecida do Brasil: confiabilidade nacional, cabo longo e IP65.',
  },
  {
    slug: 'intelbras-business',
    brand: 'Intelbras',
    model: 'Business 7,4 kW',
    fullName: 'Intelbras Business 7,4 kW',
    tag: 'Mais completo',
    pitch: 'O modelo mais conectado, com display e proteções elétricas já integradas.',
    price: 4699,
    oldPrice: 5400,
    priceLabel: 'R$ 4.699',
    oldPriceLabel: 'R$ 5.400',
    specs: ['Display LCD de 2,7" com dados da recarga', 'Wi-Fi, Ethernet, 4G e Bluetooth', 'IDR e disjuntor internos', 'Cabo de 4 m', 'Proteção IP65', 'Frente em vidro temperado'],
    compare: { cabo: '4 metros', protecao: 'IP65', conectividade: 'Wi-Fi, Ethernet, 4G e Bluetooth', liberacao: 'App ou plug & play', display: 'Tela LCD de 2,7"' },
    chooseIf: 'Você quer acompanhar tudo e ter mais conexões: display, 4G e proteções internas.',
  },
];

export const chargerNote =
  'Valores referentes ao equipamento, sujeitos à disponibilidade em estoque. Instalação, infraestrutura elétrica, proteções e ART são orçadas à parte, conforme o local.';
