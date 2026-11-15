/** Mensagens pré-preenchidas de WhatsApp por página/perfil. */
export const wa = {
  default: 'Olá! Vim pelo site da Eletrix e gostaria de falar com o time comercial.',
  empreendimento: 'Olá! Vim pelo site e quero agendar uma visita técnica para o meu empreendimento.',
  hub: 'Olá! Vim pelo site e quero saber como instalar o Eletrix Hub no meu empreendimento.',
  rent: 'Olá! Vim pelo site e quero saber como funciona o Eletrix Rent para o meu condomínio, hotel ou comércio.',
  morador: 'Olá! Vim pelo site e quero agendar a visita técnica gratuita para instalar um carregador na minha vaga.',
  carregador: 'Olá! Vim pelo site e quero comprar um carregador veicular. Pode me ajudar a escolher o modelo?',
  sindico: 'Olá! Sou síndico(a) e vim pelo site. Quero entender como preparar o prédio para recarga de carros elétricos.',
  laudo: 'Olá! Vim pelo site e quero contratar o laudo de demanda de energia para o meu prédio.',
  infra: 'Olá! Vim pelo site e quero um orçamento de infraestrutura seca para o meu prédio.',
  demanda: 'Olá! Vim pelo site e quero saber como funciona o controle de demanda para os carregadores do meu prédio.',
  it41: 'Olá! Vim pelo site e quero adequar a recarga do meu prédio à IT-41.',
  troca: 'Olá! Vim pelo site. O meu prédio já tem carregadores de outra operadora e quero saber como migrar para a Eletrix.',
  whitelabel: 'Olá! Vim pelo site e quero conversar sobre o white label Powered by Eletrix para a minha marca.',
  geral: 'Olá! Vim pelo site da Eletrix e quero tirar uma dúvida.',
} as const;

export const waByPath: Record<string, string> = {
  '/': wa.default,
  '/empresas/': wa.empreendimento,
  '/eletrix-hub/': wa.hub,
  '/eletrix-rent/': wa.rent,
  '/condominios/': wa.sindico,
  '/instalacao-carregador-residencial/': wa.morador,
  '/carregadores/': wa.carregador,
  '/laudo-de-demanda/': wa.laudo,
  '/infraestrutura-seca/': wa.infra,
  '/controle-de-demanda/': wa.demanda,
  '/adequacao-it-41/': wa.it41,
  '/troca-de-operador/': wa.troca,
  '/white-label/': wa.whitelabel,
};
