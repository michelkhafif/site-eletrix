import type { FaqItem } from '@/components/sections/FAQ';

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'callout'; title?: string; text: string; tone?: 'brand' | 'warn' }
  | { t: 'table'; caption: string; head: string[]; rows: string[][] };

export type GuideSection = { id: string; title: string; blocks: Block[] };

export type Guide = {
  slug: string;
  href: string;
  title: string;
  kicker: string;
  summary: string;
  lead: string;
  minutes: number;
  published: string;
  updated: string;
  image: string;
  imageAlt: string;
  sections: GuideSection[];
  faq: FaqItem[];
  next: { href: string; title: string; text: string }[];
};

export const guides: Guide[] = [
  /* ------------------------------------------------------------------ IT-41 */
  {
    slug: 'it-41-carregador-veicular',
    href: '/guias/it-41-carregador-veicular/',
    title: 'IT-41 e carregador veicular: o que muda para o prédio',
    kicker: 'Norma e segurança',
    summary: 'O que a IT-41 do Corpo de Bombeiros de São Paulo exige de quem tem carregador de carro elétrico em prédio, em linguagem direta.',
    lead: 'A recarga de carros elétricos entrou na Instrução Técnica nº 41 do Corpo de Bombeiros de São Paulo. Para o síndico ou o gestor, a pergunta é simples: o que preciso ter no meu prédio, e até quando? Este guia responde com base na portaria, sem juridiquês.',
    minutes: 8,
    published: '2026-11-15',
    updated: '2026-11-15',
    image: 'case-7',
    imageAlt: 'Carregador Eletrix instalado em parede de garagem, com placa de identificação e número da vaga',
    sections: [
      {
        id: 'o-que-e',
        title: 'O que é a IT-41 e o que mudou em 2026',
        blocks: [
          { t: 'p', text: 'As Instruções Técnicas (ITs) do Corpo de Bombeiros do Estado de São Paulo detalham como as edificações devem se proteger contra incêndio. A IT-41 trata de um tema específico, e em 17 de março de 2026 a Portaria nº CCB-003/970/2026 a atualizou para incluir os Sistemas de Alimentação de Veículos Elétricos, os SAVE: o conjunto formado pelo carregador, pelos circuitos e pelos dispositivos de proteção e desligamento.' },
          { t: 'p', text: 'Na prática, a norma deixa de tratar o carregador como mais um equipamento elétrico da garagem e passa a exigir projeto, sinalização e um jeito rápido de desligar tudo em caso de emergência.' },
          { t: 'callout', title: 'Quando vale', text: 'Para edificações existentes, as exigências passam a valer na renovação do AVCB, o Auto de Vistoria do Corpo de Bombeiros. Se o seu AVCB vence nos próximos meses, é a hora de olhar para isso.' },
        ],
      },
      {
        id: 'o-que-exige',
        title: 'O que a norma exige, em seis blocos',
        blocks: [
          { t: 'h3', text: '1. Responsabilidade e normas técnicas' },
          { t: 'p', text: 'A responsabilidade pela instalação é integral do responsável técnico e do instalador. O projeto e a execução devem seguir a NBR 5410 (instalações elétricas de baixa tensão), a NBR 17019 (instalações para recarga de veículos elétricos) e a NBR IEC 61851-1 (sistemas de recarga condutiva).' },
          { t: 'h3', text: '2. Modos de recarga' },
          { t: 'p', text: 'Em áreas internas, só são aceitos os modos de recarga 3 e 4, que usam equipamento dedicado, com comunicação entre carro e carregador. Fica proibido carregar em tomada comum, com adaptador ou com extensão.' },
          { t: 'h3', text: '3. Desligamento de emergência' },
          { t: 'p', text: 'Os pontos de desligamento manual devem ficar entre 0,90 m e 1,80 m do piso. São dois tipos: a chave de emergência de pavimento, a até 5 m da entrada principal, da entrada da garagem ou das escadas; e a chave de emergência local, a até 5 m dos equipamentos. Quando o prédio tem alarme ou detecção de incêndio, a recarga deve ser interligada a ele para desligar automaticamente.' },
          { t: 'h3', text: '4. Proteção elétrica' },
          { t: 'ul', items: ['Circuito exclusivo para cada estação de recarga.', 'Disjuntor e DR de 30 mA (tipo A, F ou B) individuais por estação.', 'DPS (proteção contra surtos) nos quadros.', 'Proibido ligar o carregador direto no disjuntor do padrão de entrada.', 'Proteção física contra impacto de veículos.'] },
          { t: 'h3', text: '5. Sinalização' },
          { t: 'p', text: 'Placas fotoluminescentes no quadro, na estação (com a identificação SAVE e o modo de recarga) e nas chaves de emergência, com instruções de uso, instruções de emergência e contato de suporte.' },
          { t: 'h3', text: '6. Localização, documentação e fiscalização' },
          { t: 'ul', items: ['Afastamento mínimo de 5 m da rota de saída em edificações com rota única.', 'ART obrigatória, acompanhada de estudo de demanda e curva de carga.', 'Equipamentos com comunicação sem fio devem ter homologação da Anatel.', 'A vistoria do Corpo de Bombeiros é visual e por amostragem.'] },
        ],
      },
      {
        id: 'casas',
        title: 'E as casas?',
        blocks: [{ t: 'p', text: 'Para residências unifamiliares, a norma traz recomendação de boas práticas, não exigência. Quem mora em casa pode, e deve, seguir as mesmas proteções, mas a IT-41 pesa mesmo é sobre edifícios, condomínios e empreendimentos.' }],
      },
      {
        id: 'como-adequar',
        title: 'Como adequar o prédio, passo a passo',
        blocks: [
          { t: 'ol', items: ['Descubra a data de vencimento do AVCB e converse com quem cuida dele.', 'Faça um levantamento do que já existe: carregadores instalados, quadros, circuitos e pontos de desligamento.', 'Meça a demanda. A IT-41 pede estudo de demanda e curva de carga, e o laudo mostra quantos carregadores o prédio comporta.', 'Instale o quadro identificado, a botoeira de emergência por pavimento e o módulo de desligamento e a sinalização em cada carregador.', 'Guarde a ART e a documentação para a vistoria.'] },
          { t: 'p', text: 'A Eletrix cobra preços públicos por esse serviço: R$ 1.799 por pavimento (botoeira a até 5 m da entrada, que desliga todos os carregadores do andar, mais as placas fotoluminescentes) e R$ 449 por carregador (módulo de desligamento no quadro da vaga, interligação com a botoeira e sinalização S.A.V.E.), com materiais e mão de obra. Um prédio com 2 andares de garagem e 6 carregadores paga R$ 6.292. Você pode simular o seu caso na calculadora da página de adequação.' },
          { t: 'callout', tone: 'warn', title: 'Uma dependência importante', text: 'A botoeira de pavimento aciona o módulo no quadro de cada vaga. Para ela funcionar, todos os carregadores do andar precisam ter o módulo. Adequar só a botoeira, ou só alguns carregadores, não resolve.' },
        ],
      },
    ],
    faq: [
      { q: 'A IT-41 vale em todo o Brasil?', a: 'Não. A IT-41 é uma instrução técnica do Corpo de Bombeiros do Estado de São Paulo. Em outros estados, valem as normas do Corpo de Bombeiros local. A NBR 17019, que trata da recarga, é nacional.' },
      { q: 'Meu prédio já tem carregadores. Preciso trocá-los?', a: 'Não necessariamente. Carregadores de até 7,4 kW já instalados conforme as normas NBR podem ser adequados com o módulo de desligamento e a sinalização. Situações diferentes são avaliadas na visita técnica.' },
      { q: 'Quem assina a ART?', a: 'O responsável técnico pelo projeto e pela instalação. Nos serviços da Eletrix, a ART do serviço e do projeto elétrico está inclusa.' },
      { q: 'Posso deixar para a renovação do AVCB?', a: 'Em edificações existentes, as exigências valem na renovação. Mas adequar com antecedência evita corrida de última hora e riscos de segurança no dia a dia.' },
    ],
    next: [
      { href: '/adequacao-it-41/', title: 'Adequação à IT-41', text: 'Preços públicos e simulador de orçamento.' },
      { href: '/laudo-de-demanda/', title: 'Laudo de demanda', text: 'O estudo de demanda que a norma pede.' },
      { href: '/guias/lei-carregador-condominio-sao-paulo/', title: 'Lei 18.403/2026', text: 'O direito do morador de instalar o carregador.' },
    ],
  },

  /* ------------------------------------------------------------------ LEI */
  {
    slug: 'lei-carregador-condominio-sao-paulo',
    href: '/guias/lei-carregador-condominio-sao-paulo/',
    title: 'Lei 18.403/2026: o condomínio pode barrar o carregador?',
    kicker: 'Direitos do morador',
    summary: 'O que a lei paulista garante ao condômino que quer instalar um carregador na vaga, e o que o condomínio pode exigir.',
    lead: 'Boa parte das dúvidas de quem compra um carro elétrico e mora em apartamento é a mesma: “o condomínio pode me impedir de instalar o carregador?”. Em São Paulo, existe uma lei estadual que responde a isso. Entenda o que ela diz e como conduzir a conversa com a administração.',
    minutes: 6,
    published: '2026-11-15',
    updated: '2026-11-15',
    image: 'river-one-fachada',
    imageAlt: 'Fachada de edifício em São Paulo às margens do Rio Pinheiros',
    sections: [
      {
        id: 'o-que-diz',
        title: 'O que a lei garante',
        blocks: [
          { t: 'p', text: 'A Lei Estadual nº 18.403/2026, de São Paulo, garante ao condômino o direito de instalar uma estação de recarga de veículo elétrico na sua vaga privativa de garagem, desde que cumpra os requisitos técnicos e de segurança.' },
          { t: 'p', text: 'Em outras palavras: o condomínio não pode simplesmente vetar. Se quiser negar o pedido, precisa de uma justificativa técnica, ou seja, um motivo ligado à capacidade elétrica ou à segurança do prédio, não uma preferência da assembleia.' },
          { t: 'callout', title: 'Este guia é informativo', text: 'Ele resume a lei em linguagem simples e não substitui orientação jurídica. Para casos de conflito com o condomínio, consulte um advogado.', tone: 'warn' },
        ],
      },
      {
        id: 'o-que-condominio-pode',
        title: 'O que o condomínio pode, e deve, exigir',
        blocks: [
          { t: 'p', text: 'A lei dá o direito, mas o direito vem com requisitos. Um pedido bem preparado costuma incluir:' },
          { t: 'ul', items: ['Projeto elétrico e ART assinados por responsável técnico habilitado.', 'Circuito exclusivo para o carregador, com disjuntor e DR individuais e proteção contra sobretensão.', 'Instalação adequada à IT-41 do Corpo de Bombeiros, com a sinalização e o desligamento de emergência exigidos.', 'Definição de como a energia será medida e paga: pelo medidor da unidade ou pelo quadro da administração.', 'Respeito à capacidade elétrica do prédio, comprovada, quando necessário, por laudo de demanda.'] },
          { t: 'p', text: 'Quando o morador chega com esses documentos, a negativa fica difícil de sustentar. E quando o prédio de fato não suporta mais cargas, a justificativa técnica existe, e a solução passa por laudo, controle de demanda e infraestrutura, não por proibição.' },
        ],
      },
      {
        id: 'o-que-a-lei-nao-diz',
        title: 'O que a lei não diz',
        blocks: [
          { t: 'ul', items: ['Ela não dispensa projeto, ART nem as normas de segurança.', 'Ela não obriga o condomínio a pagar a instalação do morador.', 'Ela não vale fora do estado de São Paulo. Em outros estados, a regra depende da legislação local e da convenção do condomínio.', 'Ela não transfere a conta de energia para os demais condôminos: quem instala, paga o próprio consumo.'] },
        ],
      },
      {
        id: 'como-conduzir',
        title: 'Como conduzir o pedido, em cinco passos',
        blocks: [
          { t: 'ol', items: ['Peça uma visita técnica. Ela mostra a distância da vaga ao medidor e o que o prédio comporta.', 'Receba o projeto e o orçamento, com ART e lista de proteções.', 'Protocole o pedido na administração, anexando o projeto, a ART e a descrição da instalação.', 'Se o condomínio negar, peça a justificativa técnica por escrito.', 'Se a justificativa for a capacidade do prédio, proponha o laudo de demanda e o controle de carga; se a recusa não tiver base técnica, busque orientação jurídica.'] },
          { t: 'p', text: 'A visita técnica da Eletrix para instalação na vaga é gratuita. Em prédios com infraestrutura seca da Eletrix, o morador ainda tem desconto na instalação.' },
        ],
      },
    ],
    faq: [
      { q: 'A lei vale para qualquer condomínio de São Paulo?', a: 'Ela é uma lei do estado de São Paulo e trata do direito do condômino de instalar estação de recarga em vaga privativa, desde que cumpra os requisitos técnicos e de segurança.' },
      { q: 'O condomínio pode cobrar alguma taxa?', a: 'Pode haver regras internas sobre a forma de medir e pagar a energia. Quando o carregador é ligado ao medidor da unidade, o consumo entra na conta de luz do morador, sem rateio.' },
      { q: 'E se a vaga for alugada ou rotativa?', a: 'A lei fala em vaga privativa. Para vagas coletivas ou de uso comum, a melhor solução costuma ser a recarga coletiva, como o Eletrix Rent ou o Hub.' },
      { q: 'O condomínio pode negar se o prédio não aguenta a carga?', a: 'Sim, com justificativa técnica. O caminho é medir: o laudo de demanda mostra quantos carregadores cabem e o controle de demanda permite ter mais sem sobrecarga.' },
    ],
    next: [
      { href: '/instalacao-carregador-residencial/', title: 'Instalação na vaga', text: 'Visita técnica gratuita para o morador.' },
      { href: '/laudo-de-demanda/', title: 'Laudo de demanda', text: 'A resposta técnica quando o prédio hesita.' },
      { href: '/guias/cobranca-energia-carregador-condominio/', title: 'Quem paga a energia', text: 'Medidor próprio, rateio ou cobrança pelo uso.' },
    ],
  },

  /* ------------------------------------------------------------------ CUSTO */
  {
    slug: 'quanto-custa-instalar-carregador-carro-eletrico',
    href: '/guias/quanto-custa-instalar-carregador-carro-eletrico/',
    title: 'Quanto custa instalar um carregador de carro elétrico',
    kicker: 'Custos',
    summary: 'O que compõe o preço de instalar um carregador na vaga: equipamento, instalação, proteções, ART e adequação à IT-41.',
    lead: 'Não existe um preço único para instalar um carregador, e desconfie de quem promete um valor fechado sem ver a garagem. Existe uma conta com poucas partes, e cada uma é fácil de entender. Veja o que compõe o custo e quais valores a Eletrix publica.',
    minutes: 7,
    published: '2026-11-15',
    updated: '2026-11-15',
    image: 'case-3',
    imageAlt: 'Carregador Eletrix instalado em coluna de garagem, com cabo de recarga',
    sections: [
      {
        id: 'composicao',
        title: 'As cinco partes do custo',
        blocks: [
          { t: 'ol', items: ['O carregador (equipamento).', 'A instalação: cabeamento da vaga até o medidor ou quadro.', 'As proteções elétricas: disjuntor, DR e proteção contra sobretensão.', 'A ART, o documento técnico que responsabiliza o engenheiro pelo projeto e pela execução.', 'A adequação à IT-41, quando o prédio ainda não a tem.'] },
          { t: 'p', text: 'Só a primeira parte tem preço de prateleira. As outras dependem do local, principalmente da distância entre a vaga e o medidor, e por isso a Eletrix faz uma visita técnica gratuita antes de apresentar o valor.' },
        ],
      },
      {
        id: 'valores-publicos',
        title: 'Valores públicos da Eletrix',
        blocks: [
          {
            t: 'table', caption: 'Valores públicos da Eletrix por item', head: ['Item', 'Valor'],
            rows: [
              ['Carregador Livoltek ATOM 7,3 kW', 'R$ 2.799 (de R$ 3.899)'],
              ['Carregador WEG WEMOB Wall 7,4 kW', 'R$ 4.699 (de R$ 5.400)'],
              ['Carregador Intelbras Business 7,4 kW', 'R$ 4.699 (de R$ 5.400)'],
              ['Visita técnica para instalação na vaga', 'Gratuita'],
              ['Laudo de demanda (para o prédio)', 'A partir de R$ 2.799'],
              ['Adequação IT-41 do pavimento', 'R$ 1.799 por pavimento'],
              ['Adequação IT-41 do carregador', 'R$ 449 por carregador'],
            ],
          },
          { t: 'p', text: 'Os valores dos carregadores referem-se ao equipamento e estão sujeitos à disponibilidade em estoque. Instalação, infraestrutura elétrica, proteções e ART são orçadas à parte, conforme o local.' },
        ],
      },
      {
        id: 'o-que-pesa',
        title: 'O que faz a instalação custar mais ou menos',
        blocks: [
          { t: 'ul', items: ['A distância entre a vaga e o medidor: é o fator que mais varia, porque define o comprimento do cabo e das eletrocalhas.', 'Se o prédio já tem infraestrutura seca: com o caminho pronto, a instalação é mais simples, e nos prédios com infraestrutura seca da Eletrix o morador tem desconto.', 'Se a ligação será no medidor da unidade ou no quadro da administração.', 'Se o prédio já tem as proteções e a sinalização da IT-41, ou se a adequação ainda precisa ser feita.', 'Se a instalação é em área interna ou externa.'] },
          { t: 'callout', title: 'Exemplo de adequação à IT-41', text: 'Um prédio com 2 andares de garagem e 6 carregadores paga 2 × R$ 1.799 + 6 × R$ 449 = R$ 6.292, com materiais e mão de obra inclusos. O custo é do prédio e se divide entre os usuários da forma que o condomínio decidir.' },
        ],
      },
      {
        id: 'como-economizar',
        title: 'Como pagar menos sem abrir mão da segurança',
        blocks: [
          { t: 'ul', items: ['Peça a visita técnica antes de comprar o carregador: ela pode mudar a escolha do modelo.', 'Verifique se o seu prédio tem infraestrutura seca. Se tem, pergunte pelo desconto.', 'Compare propostas pelo que está incluso: ART, proteções, sinalização e prazo.', 'Desconfie de instalação sem projeto e sem ART. Além do risco, ela deixa o prédio fora da norma.'] },
        ],
      },
    ],
    faq: [
      { q: 'A visita técnica é cobrada?', a: 'Não. Para instalação na vaga, a visita técnica da Eletrix é gratuita, e o preço da instalação é definido depois dela.' },
      { q: 'Posso comprar o carregador em outro lugar?', a: 'Pode. A Eletrix fornece e instala os modelos WEG, Intelbras e Livoltek com 2 anos de garantia, o que simplifica a compra, a instalação e o suporte.' },
      { q: 'Quanto vou pagar de energia?', a: 'Depende do seu consumo e da tarifa da sua distribuidora. Com o carregador ligado ao medidor da sua unidade, o consumo do carro entra na sua conta de luz e você paga só o que usa.' },
      { q: 'Existe desconto para quem mora em prédio com infraestrutura da Eletrix?', a: 'Sim. Em prédios com infraestrutura seca da Eletrix, o morador tem desconto na instalação da própria vaga.' },
    ],
    next: [
      { href: '/instalacao-carregador-residencial/', title: 'Agendar visita técnica', text: 'Gratuita, para morador.' },
      { href: '/carregadores/', title: 'Ver os carregadores', text: 'Três modelos a partir de R$ 2.799.' },
      { href: '/adequacao-it-41/', title: 'Simular a IT-41', text: 'Calculadora de orçamento por pavimento e carregador.' },
    ],
  },

  /* ------------------------------------------------------------------ POTÊNCIA */
  {
    slug: 'qual-potencia-carregador-carro-eletrico',
    href: '/guias/qual-potencia-carregador-carro-eletrico/',
    title: 'Qual a potência ideal do carregador de carro elétrico',
    kicker: 'Escolha do equipamento',
    summary: 'Por que 7,4 kW atende praticamente todos os carros elétricos vendidos no Brasil e por que 11 ou 22 kW em AC não compensam.',
    lead: 'Na hora de escolher um carregador, é comum pensar que mais potência é melhor. Em corrente alternada (AC), quase nunca é. Entenda por quê, e por que a Eletrix padronizou a rede em 7,4 kW.',
    minutes: 5,
    published: '2026-11-15',
    updated: '2026-11-15',
    image: 'hub-recarga',
    imageAlt: 'Mão conectando o plugue do carregador Eletrix ao carro elétrico',
    sections: [
      {
        id: 'ac-limita',
        title: 'O carro é quem limita a potência em AC',
        blocks: [
          { t: 'p', text: 'Todo carro elétrico tem um carregador interno que converte a corrente alternada da tomada ou da wallbox em corrente contínua para a bateria. É a capacidade desse carregador interno que define a potência máxima em AC, e não a do equipamento na parede.' },
          { t: 'p', text: 'Praticamente todos os veículos elétricos vendidos no Brasil limitam a recarga AC a 7,4 kW. Se você instalar um carregador de 11 kW ou de 22 kW, o carro continuará puxando 7,4 kW. O resultado: o mesmo tempo de recarga, com um equipamento e uma infraestrutura mais caros.' },
          { t: 'callout', title: 'Pensada para o tempo parado', text: 'A rede Eletrix é de corrente alternada (AC), 7,4 kW. Ela foi pensada para o tempo em que o carro já fica parado: na garagem, no trabalho, no hotel ou no shopping.' },
        ],
      },
      {
        id: 'nem-mais-nem-menos',
        title: 'Nem mais, nem menos',
        blocks: [
          { t: 'ul', items: ['Potências menores aumentam o tempo de recarga.', 'Potências maiores encarecem a infraestrutura (cabos, proteções, demanda do prédio) sem benefício prático no dia a dia.', '7,4 kW equilibra tempo de recarga, custo e a capacidade elétrica da maioria dos prédios.'] },
        ],
      },
      {
        id: 'quanto-tempo',
        title: 'Quanto tempo leva para carregar',
        blocks: [
          { t: 'p', text: 'O tempo depende do tamanho da bateria e do carro. Como referência, para carregar de 50% a 100% em um carregador de 7,4 kW:' },
          { t: 'table', caption: 'Exemplos de tempo de recarga de 50% a 100%', head: ['Veículo', 'Tipo', 'Tempo aproximado'], rows: [['Volvo XC40 Recharge', '100% elétrico', 'cerca de 5h40'], ['BYD Song Plus', 'Híbrido plug-in', 'cerca de 1h20']] },
          { t: 'p', text: 'Para quem carrega à noite, o tempo é irrelevante: o carro encosta na vaga ao chegar em casa e está pronto de manhã.' },
        ],
      },
      {
        id: 'ficha',
        title: 'Ficha técnica de referência',
        blocks: [
          { t: 'ul', items: ['Entrada de 220 V, monofásica ou bifásica, 50 a 60 Hz.', 'Potência máxima de 7,4 kW (32 A).', 'Corrente ajustável de 6 a 32 A, o que permite adequar a carga à capacidade do prédio.', 'Conector Tipo 2 e recarga em modo 3.'] },
        ],
      },
      {
        id: 'marcas',
        title: 'Por que WEG, Intelbras e Livoltek',
        blocks: [
          { t: 'p', text: 'São equipamentos robustos, bem documentados, com suporte técnico ágil em todo o Brasil. Para o morador ou o gestor, isso significa menos paradas, operação mais simples e mais segurança. A garantia e o pós-venda estão entre os mais completos do mercado, e a Eletrix soma a sua garantia de 2 anos nos carregadores vendidos.' },
        ],
      },
    ],
    faq: [
      { q: 'Posso instalar um carregador de 22 kW em casa?', a: 'Pode, mas, em AC, o carro vai limitar a potência. Para praticamente todos os veículos vendidos no Brasil, o ganho real é nenhum e o custo da infraestrutura é maior.' },
      { q: 'O que muda entre 7,3 kW e 7,4 kW?', a: 'Na prática, nada. Os modelos da linha residencial variam levemente na potência nominal, e todos atendem ao limite dos carros no Brasil.' },
      { q: 'A corrente do carregador pode ser reduzida?', a: 'Sim. A corrente é ajustável de 6 a 32 A, o que permite adequar a potência à capacidade do prédio.' },
    ],
    next: [
      { href: '/carregadores/', title: 'Compare os modelos', text: 'WEG, Intelbras e Livoltek, 7,4 kW.' },
      { href: '/controle-de-demanda/', title: 'Controle de demanda', text: 'Mais carregadores, sem sobrecarregar o prédio.' },
      { href: '/guias/quanto-custa-instalar-carregador-carro-eletrico/', title: 'Quanto custa instalar', text: 'O que compõe o preço.' },
    ],
  },

  /* ------------------------------------------------------------------ COBRANÇA */
  {
    slug: 'cobranca-energia-carregador-condominio',
    href: '/guias/cobranca-energia-carregador-condominio/',
    title: 'Quem paga a energia do carregador no condomínio',
    kicker: 'Energia e cobrança',
    summary: 'Medidor da unidade, quadro da administração ou recarga coletiva: três formas de pagar a energia do carregador e quando cada uma serve.',
    lead: 'A pergunta que mais trava uma assembleia é sobre dinheiro: quem paga a energia? A boa notícia é que existem formas claras de medir e cobrar, e nenhuma delas obriga o condomínio inteiro a dividir a conta do carro de um morador.',
    minutes: 5,
    published: '2026-11-15',
    updated: '2026-11-15',
    image: 'case-4',
    imageAlt: 'Carregador Eletrix em coluna de garagem, com a numeração da vaga',
    sections: [
      {
        id: 'tres-formas',
        title: 'Três formas de pagar a energia',
        blocks: [
          { t: 'h3', text: '1. Pelo medidor da unidade' },
          { t: 'p', text: 'O carregador é ligado ao medidor do próprio apartamento. O consumo do carro entra na conta de luz do morador, direto com a distribuidora, sem rateio com o condomínio. É o modelo da instalação em vaga privativa da Eletrix e o mais simples de explicar em assembleia: quem usa, paga, e paga só o que usa.' },
          { t: 'h3', text: '2. Pelo quadro da administração, com cobrança pelo uso' },
          { t: 'p', text: 'Quando o condomínio prefere, o carregador pode ser ligado ao quadro da administração, e a cobrança é estruturada pelo uso. Esse caminho faz sentido quando levar um circuito até o medidor de cada unidade é inviável.' },
          { t: 'h3', text: '3. Recarga coletiva, com pagamento pelo app' },
          { t: 'p', text: 'No Eletrix Hub e no Eletrix Rent, quem recarrega paga pela recarga no app Eletrix, e a energia é 100% reembolsada ao local. No Hub, o empreendimento ainda recebe um bônus sobre cada kWh cobrado. É o modelo para vagas coletivas, visitantes, hotéis e comércios.' },
        ],
      },
      {
        id: 'comparativo',
        title: 'Comparativo rápido',
        blocks: [
          {
            t: 'table', caption: 'Comparativo das formas de pagar a energia do carregador', head: ['', 'Medidor da unidade', 'Quadro da administração', 'Recarga coletiva (Hub / Rent)'],
            rows: [
              ['Quem paga', 'O morador, na conta de luz', 'O usuário, por cobrança pelo uso', 'O usuário, pelo app'],
              ['Rateio com o condomínio', 'Não', 'Não, se houver cobrança pelo uso', 'Não'],
              ['Indicado para', 'Vaga privativa de morador', 'Quando o medidor da unidade não é viável', 'Vagas coletivas, hotéis, comércios, visitantes'],
              ['Solução Eletrix', 'Instalação em vaga privativa', 'Instalação em vaga privativa', 'Eletrix Hub e Eletrix Rent'],
            ],
          },
        ],
      },
      {
        id: 'evitar',
        title: 'O que evitar',
        blocks: [
          { t: 'ul', items: ['Ratear o consumo por estimativa: gera conflito e não é justo com quem carrega pouco.', 'Ligações improvisadas (os “gatos”): são um risco de incêndio, tiram o prédio da norma e comprometem a vistoria.', 'Instalar sem medir a capacidade do prédio: vários carregadores simultâneos podem passar da demanda contratada. O laudo de demanda e o controle de carga resolvem isso.'] },
        ],
      },
      {
        id: 'assembleia',
        title: 'Como levar o tema à assembleia',
        blocks: [
          { t: 'p', text: 'Uma pauta que costuma funcionar tem três itens: o laudo de demanda, que mostra com números o que o prédio comporta; a infraestrutura seca, que organiza o caminho dos cabos e evita improviso; e a regra de cobrança, em que cada morador paga o seu consumo. Com essas três respostas, o debate sai do “se” e vai para o “como”.' },
        ],
      },
    ],
    faq: [
      { q: 'O condomínio precisa pagar pela energia do meu carregador?', a: 'Não, quando o carregador é ligado ao medidor da sua unidade: o consumo entra na sua conta de luz, sem rateio com o condomínio.' },
      { q: 'Como funciona a cobrança no Eletrix Hub?', a: 'O motorista paga pela recarga no app. A energia consumida é 100% reembolsada ao empreendimento, com bônus sobre cada kWh cobrado.' },
      { q: 'Dá para cobrar de visitantes?', a: 'Sim, na recarga coletiva: o pagamento é feito pelo app, com cartão de crédito ou saldo em carteira.' },
    ],
    next: [
      { href: '/eletrix-rent/', title: 'Eletrix Rent', text: 'Recarga coletiva com mensalidade fixa.' },
      { href: '/eletrix-hub/', title: 'Eletrix Hub', text: 'Comodato sem mensalidade e energia reembolsada.' },
      { href: '/controle-de-demanda/', title: 'Controle de demanda', text: 'Para não passar da demanda contratada.' },
    ],
  },
];

export const guideBySlug = (slug: string) => {
  const g = guides.find((x) => x.slug === slug);
  if (!g) throw new Error(`Guia não encontrado: ${slug}`);
  return g;
};
