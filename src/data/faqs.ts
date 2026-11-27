import type { FaqItem } from '@/components/sections/FAQ';

/** Perguntas frequentes por página. Fatos e números vêm do briefing (CLAUDE.md, seção 2). */
export const faqs: Record<string, FaqItem[]> = {
  home: [
    {
      q: 'Qual solução serve para o meu caso?',
      a: 'Se você é morador e quer carregar na própria vaga, a solução é a instalação em vaga privativa. Se é síndico ou gestor e precisa preparar o prédio, a sequência é laudo de demanda, infraestrutura seca, controle de demanda e adequação à IT-41, e você contrata só o que precisar. Se quer oferecer recarga a clientes, usuários ou moradores, a escolha é entre o Eletrix Hub (comodato) e o Eletrix Rent (locação).',
    },
    {
      q: 'Quanto custa?',
      a: 'Os preços públicos são: laudo de demanda a partir de R$ 2.799; carregadores residenciais a partir de R$ 2.799. A instalação na vaga, a infraestrutura e a adequação à IT-41 dependem do local e são orçadas depois de uma visita técnica. O Eletrix Hub é em comodato, sem mensalidade para o empreendimento.',
    },
    {
      q: 'O condomínio pode proibir o carregador na minha vaga?',
      a: 'Em São Paulo, a Lei Estadual nº 18.403/2026 garante ao condômino o direito de instalar estação de recarga em vaga privativa, desde que cumpra os requisitos técnicos e de segurança. O condomínio só pode negar com justificativa técnica. Veja os detalhes no nosso guia sobre a lei.',
    },
    {
      q: 'O que é a IT-41?',
      a: 'É a Instrução Técnica nº 41 do Corpo de Bombeiros de São Paulo. A Portaria CCB-003/970/2026, de 17 de março de 2026, a atualizou para incluir os sistemas de alimentação de veículos elétricos. Em edificações existentes, as exigências passam a valer na renovação do AVCB.',
    },
    {
      q: 'Quem opera e dá suporte às estações?',
      a: 'A Eletrix. A operação é própria e o suporte funciona 24 horas. Até hoje, nenhuma estação foi desinstalada por falta de manutenção ou de suporte.',
    },
    {
      q: 'Vocês atendem fora de São Paulo?',
      a: 'Sim. A Eletrix tem mais de 300 estações em mais de 22 cidades e mais de 11 estados. Fale com o time comercial para confirmar o atendimento na sua cidade.',
    },
  ],

  hub: [
    {
      q: 'Quanto o empreendimento paga pelo Eletrix Hub?',
      a: 'O carregador fica em comodato por 36 meses, sem mensalidade para o empreendimento. O investimento do local é a infraestrutura, e ela é negociável: depois da visita técnica, a Eletrix analisa a demanda e avalia a sua participação nos custos para viabilizar a operação.',
    },
    {
      q: 'Como o empreendimento ganha com o Hub?',
      a: 'A energia consumida nas recargas é 100% reembolsada à administração, com um bônus sobre cada kWh cobrado. A parcela da Eletrix por kWh é fixa e o reembolso acompanha o custo real de energia do local; dependendo desse custo, o bônus pode ser maior.',
    },
    {
      q: 'Quem define a tarifa cobrada do motorista?',
      a: 'A Eletrix recomenda uma tarifa final ao usuário, mas não a impõe. O empreendimento participa da decisão. O motorista paga a recarga pelo app Eletrix.',
    },
    {
      q: 'E se o empreendimento quiser encerrar o contrato?',
      a: 'O contrato pode ser rescindido a qualquer momento, por qualquer das partes, sem multa. Bons negócios se sustentam pela entrega de valor, não por multas ou cláusulas leoninas.',
    },
    {
      q: 'O que acontece se um carregador parar?',
      a: 'O suporte funciona 24 horas e, em caso de problema, o carregador volta a funcionar em até 12 horas.',
    },
    {
      q: 'Posso cobrar pelo tempo em que o carro fica parado depois da recarga?',
      a: 'Pode, se quiser. A taxa de ociosidade é opcional: terminada a recarga e passada uma tolerância (por exemplo, 20 minutos), o empreendimento pode cobrar por minuto de permanência. A decisão é sua.',
    },
    {
      q: 'A instalação segue a IT-41?',
      a: 'Sim. Os pontos de recarga são adequados à IT-41, com ART do serviço e do projeto elétrico, proteção contra choque, sobretensão e sobrecorrente, e sinalização.',
    },
  ],

  rent: [
    {
      q: 'Qual a diferença entre Eletrix Hub e Eletrix Rent?',
      a: 'O Hub é em comodato, sem mensalidade, e foi desenhado para locais com alta rotatividade de veículos elétricos, como prédios corporativos, shoppings e comércios. O Rent é uma locação com mensalidade fixa, indicada para recarga coletiva com fluxo menor, como condomínios residenciais, hotéis e pequenos comércios. Em ambos, a Eletrix opera a recarga e a energia é reembolsada.',
    },
    {
      q: 'Preciso comprar o carregador?',
      a: 'Não. O carregador é da Eletrix. O local investe na infraestrutura e na mensalidade fixa.',
    },
    {
      q: 'Quem paga pela energia das recargas?',
      a: 'Quem usa. Os usuários pagam pela recarga e a energia é 100% reembolsada ao local, que ainda tem a chance de gerar receita.',
    },
    {
      q: 'Qual o valor da mensalidade?',
      a: 'Ela depende do número de carregadores e das condições do local, e é apresentada na proposta depois da visita técnica.',
    },
    {
      q: 'Como saber se o meu caso é Hub ou Rent?',
      a: 'Na visita técnica a Eletrix avalia o fluxo esperado de veículos e a infraestrutura disponível e recomenda o modelo mais adequado. Você não precisa decidir antes.',
    },
  ],

  empresas: [
    {
      q: 'A Eletrix atende prédios corporativos, shoppings e hotéis?',
      a: 'Sim. O Eletrix Hub foi desenhado para prédios corporativos e shoppings. Para fluxos menores, como condomínios, hotéis e pequenos comércios, existe o Eletrix Rent.',
    },
    {
      q: 'Já temos carregadores de outra operadora. É possível migrar?',
      a: 'É. A Eletrix substitui os equipamentos, faz a adequação à IT-41 e assume a operação, com condições avaliadas por empreendimento. Em muitos casos, sem custo para o condomínio. Mais de 50 estações já migraram para a Eletrix nos últimos meses.',
    },
    {
      q: 'Posso ter os carregadores com a marca da minha empresa?',
      a: 'Sim, no modelo white label: os carregadores e a experiência no app levam a sua marca, com a assinatura Powered by Eletrix.',
    },
    {
      q: 'Quem faz a instalação elétrica?',
      a: 'A Eletrix. O serviço inclui ART do projeto e da instalação, proteções, placas e comunicação visual e, quando necessário, internet para a operação.',
    },
  ],

  condominios: [
    {
      q: 'Por onde começar em um condomínio?',
      a: 'Pelo laudo de demanda. Em sete dias de medição, o prédio descobre quantos carregadores comporta e com que potência. Dali em diante, a sequência é preparar a infraestrutura, controlar a demanda e regularizar na IT-41. Você contrata só o que precisar ou o pacote completo.',
    },
    {
      q: 'Cada morador paga a própria energia?',
      a: 'Sim, no modelo de instalação na vaga: o carregador é ligado ao medidor da unidade e o consumo do carro entra na conta de luz do morador, sem rateio. Quando o condomínio preferir, também é possível ligar no quadro da administração e estruturar a cobrança pelo uso.',
    },
    {
      q: 'O condomínio é obrigado a permitir a instalação?',
      a: 'Em São Paulo, a Lei Estadual nº 18.403/2026 garante ao condômino o direito de instalar a estação em vaga privativa, desde que cumpra os requisitos técnicos e de segurança. O condomínio só pode negar com justificativa técnica.',
    },
    {
      q: 'A responsabilidade do síndico muda?',
      a: 'A IT-41 coloca a responsabilidade técnica integral no responsável técnico e no instalador. Com ART, laudo e adequação feitos por quem opera, o síndico fica com documentação e um prédio preparado para vistoria.',
    },
    {
      q: 'E se o prédio já tiver carregadores instalados?',
      a: 'A Eletrix avalia o que existe. Se estiverem de acordo com as normas NBR, a adequação à IT-41 é orçada na visita técnica. Se a operadora atual não dá suporte, a troca de operador resolve as duas coisas juntas.',
    },
  ],

  instalacao: [
    {
      q: 'Quanto custa instalar o carregador na minha vaga?',
      a: 'A visita técnica é gratuita e o preço é definido depois dela, porque a distância entre a vaga e o medidor muda o custo de cada instalação. O carregador é à parte, a partir de R$ 2.799.',
    },
    {
      q: 'Preciso comprar o carregador da Eletrix?',
      a: 'Não é obrigatório, mas facilita: a Eletrix fornece WEG, Intelbras ou Livoltek com 2 anos de garantia e instala tudo de uma vez.',
    },
    {
      q: 'Quem paga a energia?',
      a: 'Você, direto na sua conta de luz. O carregador é ligado ao medidor da própria unidade, então não há rateio com o condomínio. Quando o condomínio preferir, também é possível ligar no quadro da administração e estruturar a cobrança pelo uso.',
    },
    {
      q: 'O condomínio pode barrar a instalação?',
      a: 'Em São Paulo, a Lei Estadual nº 18.403/2026 garante ao condômino o direito de instalar a estação em vaga privativa, desde que cumpra os requisitos técnicos e de segurança. O condomínio só pode negar com justificativa técnica.',
    },
    {
      q: 'Quanto tempo leva a instalação?',
      a: 'O prazo típico é de 3 dias úteis a partir da data agendada.',
    },
    {
      q: 'A instalação segue as normas?',
      a: 'Sim. A instalação é adequada à IT-41, com ART inclusa e proteções contra choque, sobretensão e sobrecorrente. Seguimos as normas do Corpo de Bombeiros.',
    },
    {
      q: 'Meu prédio tem infraestrutura seca da Eletrix. Isso muda algo?',
      a: 'Sim: nesses prédios, o morador tem desconto na instalação da própria vaga.',
    },
    {
      q: 'E se der problema depois?',
      a: 'O suporte funciona 24 horas e a instalação e o equipamento têm garantia.',
    },
  ],

  carregadores: [
    {
      q: 'Qual carregador devo escolher?',
      a: 'Se o critério é o menor investimento, o Livoltek ATOM resolve o essencial. Se você quer uma marca nacional de primeira linha, com ampla rede de assistência, o WEG WEMOB Wall. Se quer o mais conectado, com display e proteções integradas, o Intelbras Business. Os três têm 7,4 kW, conector Tipo 2 e 2 anos de garantia Eletrix.',
    },
    {
      q: 'O preço inclui a instalação?',
      a: 'Não. Os valores são do equipamento e estão sujeitos à disponibilidade em estoque. Instalação, infraestrutura elétrica, proteções e ART são orçadas à parte, conforme o local, depois da visita técnica gratuita.',
    },
    {
      q: 'Por que 7,4 kW e não 11 ou 22 kW?',
      a: 'Praticamente todos os veículos elétricos vendidos no Brasil limitam a recarga em corrente alternada a 7,4 kW. Um carregador de 11 kW ou 22 kW em AC não carrega mais rápido e custa mais, além de exigir infraestrutura maior.',
    },
    {
      q: 'Quanto tempo leva para carregar?',
      a: 'Depende do carro. Como referência, de 50% a 100% a recarga leva cerca de 5h40 em um Volvo XC40 Recharge (100% elétrico) e cerca de 1h20 em um BYD Song Plus (híbrido plug-in).',
    },
    {
      q: 'Funciona com qualquer carro elétrico?',
      a: 'Os modelos têm conector Tipo 2 e recarga em modo 3, o padrão dos veículos elétricos e híbridos plug-in vendidos no Brasil.',
    },
    {
      q: 'Qual é a garantia?',
      a: '2 anos de garantia Eletrix em todos os carregadores vendidos.',
    },
  ],

  laudo: [
    {
      q: 'Preciso de laudo de demanda para instalar carregadores?',
      a: 'Para um ou dois carregadores em prédios com folga de carga, nem sempre. Para o prédio como um todo, ou quando vários moradores querem carregar, o laudo é o que transforma suposição em número e evita sobrecarga, além de embasar a ART exigida pela IT-41, que pede estudo de demanda e curva de carga.',
    },
    {
      q: 'Quanto custa o laudo?',
      a: 'A partir de R$ 2.799. O valor final depende do porte e das condições do local.',
    },
    {
      q: 'Como é feita a medição?',
      a: 'Um equipamento registrador é instalado na entrada de energia ou no quadro geral e mede o consumo real durante 7 dias, uma semana completa, para captar os picos.',
    },
    {
      q: 'O que vem no relatório?',
      a: 'Um relatório técnico com a análise do consumo e dos picos, que indica quantos carregadores cabem no prédio, com que potência e como a carga deve ser controlada.',
    },
    {
      q: 'Depois do laudo sou obrigado a contratar o resto?',
      a: 'Não. Contrate só o que precisar. O laudo serve de base para a infraestrutura seca, para o controle de demanda e para a IT-41, mas o relatório é seu.',
    },
  ],

  infra: [
    {
      q: 'O que é infraestrutura seca?',
      a: 'É a parte fixa da instalação: eletrocalhas galvanizadas e perfuradas, por exemplo de 150×50 mm, levando um caminho único e organizado do centro de medição até as vagas. Os cabos de cada morador e os carregadores entram depois, vaga a vaga.',
    },
    {
      q: 'Por que fazer antes de ter carros elétricos?',
      a: 'Porque organizar custa menos que corrigir. Com o caminho pronto, cada instalação é mais rápida e barata, e o prédio evita as ligações improvisadas.',
    },
    {
      q: 'O que está incluso?',
      a: 'Eletrocalhas até as vagas, furo de laje quando necessário, adequação dos pavimentos à IT-41, estudo de demanda e ART.',
    },
    {
      q: 'Quanto custa?',
      a: 'Depende do prédio: número de pavimentos, distâncias e passagens. Depois da visita técnica, enviamos um orçamento com projeto executivo.',
    },
    {
      q: 'O morador ganha algo?',
      a: 'Sim. Em prédios com infraestrutura seca da Eletrix, o morador tem desconto na instalação da própria vaga.',
    },
    {
      q: 'Como é a execução?',
      a: 'Em cinco etapas: aprovação, projeto executivo validado com o condomínio, execução, vistoria final com o síndico e entrega com ART.',
    },
  ],

  demanda: [
    {
      q: 'O que é demanda contratada?',
      a: 'É a potência que o prédio reservou junto à distribuidora de energia. Ultrapassá-la gera cobrança adicional. O controle de demanda existe para que a recarga dos carros nunca empurre o prédio além do limite seguro.',
    },
    {
      q: 'Como o controle de demanda funciona?',
      a: 'O sistema monitora em tempo real o consumo do prédio e, quando a carga sobe, reduz automaticamente a potência dos carregadores. Quando há folga, devolve potência. O limite seguro nunca é ultrapassado.',
    },
    {
      q: 'Em que casos vale a pena?',
      a: 'Quando a carga do prédio é limitada e vários moradores ou usuários querem carregar ao mesmo tempo. O laudo de demanda mostra se o seu caso é esse.',
    },
    {
      q: 'Os carros carregam mais devagar?',
      a: 'Só nos horários em que o prédio está perto do limite. Como a maioria das recargas é noturna, o carro costuma estar pronto de manhã.',
    },
    {
      q: 'Preciso fazer o laudo antes?',
      a: 'Recomendamos. É o laudo que define o limite e a quantidade de carregadores. A sequência medir, preparar, controlar e regularizar existe por isso.',
    },
  ],

  it41: [
    {
      q: 'A IT-41 é obrigatória?',
      a: 'A Portaria CCB-003/970/2026, de 17 de março de 2026, atualizou a IT-41 do Corpo de Bombeiros de São Paulo para incluir os sistemas de alimentação de veículos elétricos (SAVE). Para edificações existentes, as exigências passam a valer na renovação do AVCB.',
    },
    {
      q: 'O que é o AVCB?',
      a: 'É o Auto de Vistoria do Corpo de Bombeiros, o documento que atesta que a edificação cumpre as normas de segurança contra incêndio. Ele precisa ser renovado periodicamente.',
    },
    {
      q: 'O que a Eletrix instala?',
      a: 'Três itens: um quadro identificado com placa fotoluminescente IT-41; uma botoeira de emergência por pavimento, que desliga todos os carregadores do andar, a até 5 m da entrada; e a sinalização S.A.V.E. com módulo de desligamento em cada carregador.',
    },
    {
      q: 'Quanto custa?',
      a: 'O valor depende do número de pavimentos de garagem e de carregadores, e é informado depois da visita técnica. O orçamento inclui materiais e mão de obra.',
    },
    {
      q: 'Serve para carregadores de outra marca?',
      a: 'A adequação do carregador é para carregadores de até 7,4 kW já instalados conforme as normas NBR. Casos diferentes são avaliados na visita técnica.',
    },
    {
      q: 'Por que a botoeira e os módulos dependem um do outro?',
      a: 'Porque a botoeira aciona o módulo no quadro de cada vaga. Para ela funcionar, todos os carregadores do andar precisam ter o módulo.',
    },
    {
      q: 'Vale para casas?',
      a: 'Para residências unifamiliares, a norma traz recomendação de boas práticas, não exigência.',
    },
  ],

  troca: [
    {
      q: 'Como funciona a troca de operador?',
      a: 'A Eletrix faz um diagnóstico do que já está instalado, substitui os equipamentos, adequa tudo à IT-41 e assume a operação, com suporte 24 horas, reembolso da energia e repasse ao prédio.',
    },
    {
      q: 'Quanto custa para o condomínio?',
      a: 'As condições são avaliadas por empreendimento. Em muitos casos, a troca é feita sem custo para o condomínio.',
    },
    {
      q: 'Quanto tempo o prédio fica sem carregadores?',
      a: 'O plano de substituição é combinado com a administração na visita técnica, para minimizar a interrupção.',
    },
    {
      q: 'E o contrato com a operadora atual?',
      a: 'Confira o contrato vigente antes de decidir. A equipe comercial da Eletrix ajuda a avaliar as condições de saída e o melhor momento para a troca.',
    },
    {
      q: 'A Eletrix já fez migrações?',
      a: 'Sim. Mais de 50 estações já migraram para a Eletrix nos últimos meses.',
    },
  ],

  whitelabel: [
    {
      q: 'O que é o white label da Eletrix?',
      a: 'É a personalização dos carregadores e da experiência no app com a marca do cliente, mantendo a assinatura Powered by Eletrix. A operação, o suporte e o pagamento continuam por conta da Eletrix.',
    },
    {
      q: 'Para quem faz sentido?',
      a: 'Para redes de residenciais, serviced apartments, hotéis e marcas que querem a recarga como parte da própria experiência, sem montar uma operação.',
    },
    {
      q: 'Existe um caso real?',
      a: 'Sim, com uma rede de residenciais e serviced apartments. O nome do cliente não é divulgado.',
    },
    {
      q: 'Como começo?',
      a: 'Fale com o time comercial. Entendemos o seu portfólio, definimos o escopo da personalização e propomos o modelo, Hub ou Rent, mais adequado.',
    },
  ],

  app: [
    {
      q: 'Como encontro uma estação?',
      a: 'No mapa do app Eletrix. As estações aparecem com os pontos disponíveis e você escolhe a mais próxima.',
    },
    {
      q: 'Como pago a recarga?',
      a: 'Pelo próprio app, com cartão de crédito ou saldo em carteira.',
    },
    {
      q: 'Em quais celulares funciona?',
      a: 'iOS e Android.',
    },
    {
      q: 'Meu carro é compatível?',
      a: 'As estações Eletrix são de corrente alternada (AC), 7,4 kW, com conector Tipo 2, padrão dos veículos elétricos e híbridos plug-in vendidos no Brasil.',
    },
    {
      q: 'A recarga não iniciou. O que faço?',
      a: 'Verifique se o plugue está bem encaixado e se há saldo ou cartão válido no app. Se persistir, chame o suporte 24 horas no WhatsApp.',
    },
  ],

  suporte: [
    {
      q: 'Qual o horário do suporte?',
      a: 'O suporte funciona 24 horas.',
    },
    {
      q: 'Como falo com o suporte?',
      a: 'Pelo WhatsApp +55 11 91955-2120. Informe o local e o número da estação, que está na placa do carregador.',
    },
    {
      q: 'A recarga não iniciou ou foi interrompida. O que faço?',
      a: 'Confira se o plugue está totalmente encaixado, se o carro está destravado e se o app mostra saldo ou cartão válido. Se continuar, chame o suporte.',
    },
    {
      q: 'Sou morador ou síndico e preciso de manutenção?',
      a: 'Use o mesmo canal de suporte. Em caso de problema em estação de Hub, o carregador volta a funcionar em até 12 horas.',
    },
    {
      q: 'Quero contratar a Eletrix. É o mesmo número?',
      a: 'Não. Para orçamentos e visitas técnicas, o contato comercial é o WhatsApp +55 11 96575-5730.',
    },
  ],
};

/** FAQ geral: reúne as perguntas mais buscadas, agrupadas por público. */
export const generalFaq: { group: string; items: FaqItem[] }[] = [
  { group: 'Morador', items: [...faqs.instalacao.slice(0, 5)] },
  { group: 'Síndico e gestor', items: [...faqs.laudo.slice(0, 2), ...faqs.it41.slice(0, 4), ...faqs.infra.slice(0, 1)] },
  { group: 'Comércio, empresa e condomínio', items: [...faqs.hub.slice(0, 5), ...faqs.rent.slice(0, 2), ...faqs.troca.slice(0, 2)] },
  { group: 'Usuário da rede', items: [...faqs.app.slice(0, 3), ...faqs.suporte.slice(0, 3)] },
];

/** Dúvidas da home: cada resposta curta leva ao guia correspondente (estrutura de SEO aprovada). */
export const homeDuvidas: { q: string; a: string; href: string }[] = [
  { q: 'O condomínio pode proibir o carregador na minha vaga?', a: 'Em São Paulo, a Lei Estadual nº 18.403/2026 garante ao condômino o direito de instalar a estação na vaga privativa, desde que cumpra os requisitos técnicos e de segurança. O condomínio só pode negar com justificativa técnica.', href: '/guias/lei-carregador-condominio-sao-paulo/' },
  { q: 'Quanto custa instalar um carregador?', a: 'Depende da distância entre a vaga e o medidor. Os carregadores começam em R$ 2.799 e a visita técnica é gratuita: o preço da instalação sai depois dela.', href: '/guias/quanto-custa-instalar-carregador-carro-eletrico/' },
  { q: 'Quem paga a energia do carregador?', a: 'Quando o carregador é ligado ao medidor da unidade, o consumo entra na conta de luz do próprio morador, sem rateio com o condomínio. Também é possível ligar no quadro da administração e estruturar a cobrança pelo uso.', href: '/guias/cobranca-energia-carregador-condominio/' },
  { q: 'O que é a IT-41?', a: 'É a instrução técnica do Corpo de Bombeiros de São Paulo que passou a incluir a recarga de veículos elétricos (Portaria CCB-003/970/2026). Em prédios existentes, as exigências valem na renovação do AVCB.', href: '/guias/it-41-carregador-veicular/' },
  { q: 'Qual potência de carregador devo escolher?', a: 'Praticamente todos os carros elétricos vendidos no Brasil limitam a recarga em corrente alternada a 7,4 kW. Potências maiores encarecem a infraestrutura sem ganho real no dia a dia.', href: '/guias/qual-potencia-carregador-carro-eletrico/' },
];
