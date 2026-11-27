/**
 * Fonte única dos serviços oferecidos nos formulários e dos links para "Fale com a Eletrix".
 * Os parâmetros da URL (?perfil=...&interesse=...) usam estes identificadores.
 */
export type ProfileId = 'empreendimento' | 'sindico' | 'morador';

export const services = [
  { id: 'eletrix-hub', label: 'Eletrix Hub (prédios corporativos e shoppings)', profile: 'empreendimento' },
  { id: 'eletrix-rent', label: 'Eletrix Rent (condomínios e hotéis)', profile: 'empreendimento' },
  { id: 'instalacao-vaga', label: 'Instalação na minha vaga', profile: 'morador' },
  { id: 'compra-carregador', label: 'Compra de carregador', profile: 'morador' },
  { id: 'laudo-demanda', label: 'Laudo de demanda de energia', profile: 'sindico' },
  { id: 'infraestrutura-seca', label: 'Infraestrutura seca', profile: 'sindico' },
  { id: 'controle-demanda', label: 'Controle de demanda', profile: 'sindico' },
  { id: 'adequacao-it-41', label: 'Adequação à norma IT-41', profile: 'sindico' },
  { id: 'troca-operador', label: 'Troca de operador', profile: 'empreendimento' },
  { id: 'nao-sei', label: 'Ainda não sei', profile: null },
] as const;

export type ServiceId = (typeof services)[number]['id'];

export const profileIds: ProfileId[] = ['empreendimento', 'sindico', 'morador'];

export const isServiceId = (v: string | null | undefined): v is ServiceId => services.some((s) => s.id === v);

/** Aceita também "gestor" como sinônimo de empreendimento. */
export const toProfileId = (v: string | null | undefined): ProfileId | null =>
  v === 'gestor' ? 'empreendimento' : (profileIds as string[]).includes(v ?? '') ? (v as ProfileId) : null;

export type ContactContext = { perfil?: ProfileId; interesse?: ServiceId };

/** Link para a página de contato já com o perfil e o interesse pré-selecionados. */
export function contactHref({ perfil, interesse }: ContactContext = {}): string {
  const q = new URLSearchParams();
  const p = perfil ?? services.find((s) => s.id === interesse)?.profile ?? undefined;
  if (p) q.set('perfil', p);
  if (interesse) q.set('interesse', interesse);
  const s = q.toString();
  return s ? `/contato/?${s}` : '/contato/';
}

/** Contexto de cada página: o botão "Fale com a Eletrix" já chega com a escolha certa. */
export const contactByPath: Record<string, ContactContext> = {
  '/eletrix-hub/': { interesse: 'eletrix-hub' },
  '/eletrix-rent/': { interesse: 'eletrix-rent' },
  '/empresas/': { perfil: 'empreendimento' },
  '/parceiros/': { perfil: 'empreendimento' },
  '/white-label/': { perfil: 'empreendimento' },
  '/troca-de-operador/': { interesse: 'troca-operador' },
  '/condominios/': { perfil: 'sindico' },
  '/laudo-de-demanda/': { interesse: 'laudo-demanda' },
  '/infraestrutura-seca/': { interesse: 'infraestrutura-seca' },
  '/controle-de-demanda/': { interesse: 'controle-demanda' },
  '/adequacao-it-41/': { interesse: 'adequacao-it-41' },
  '/instalacao-carregador-residencial/': { interesse: 'instalacao-vaga' },
  '/carregadores/': { interesse: 'compra-carregador' },
  '/guias/it-41-carregador-veicular/': { interesse: 'adequacao-it-41' },
  '/guias/lei-carregador-condominio-sao-paulo/': { interesse: 'instalacao-vaga' },
  '/guias/quanto-custa-instalar-carregador-carro-eletrico/': { interesse: 'instalacao-vaga' },
  '/guias/qual-potencia-carregador-carro-eletrico/': { interesse: 'compra-carregador' },
  '/guias/cobranca-energia-carregador-condominio/': { perfil: 'sindico' },
};
