# PLANO — Novo site da Eletrix

Documento de planejamento. Fonte dos fatos: `CLAUDE.md`. Onde este plano diverge do briefing, a decisão está registrada em `docs/PENDENCIAS.md`.

## 1. Ideia central

A Eletrix não disputa o título de maior rede. Disputa **padrão**. Todo o site é construído para que o visitante sinta isso antes de ler: espaço, rigor de grid, fotografia de edifícios AAA, números discretos, profundidade técnica e clareza.

- Mensagem-mãe: **"Qualidade de serviço à altura de um AAA."**
- Assinatura: **"Carregando seu futuro."**
- Tom: humano, direto, cordial, seguro. Voz ativa, frases curtas, termo técnico sempre explicado.
- Estrutura de cada página de solução: o que é → para quem → como funciona → por que a Eletrix → quanto custa / modelo → próximo passo.

## 2. Públicos e portas de entrada

| Público | Entrada na home | Caminho principal |
|---|---|---|
| Gestor predial / administradora | "Tenho um empreendimento" | /empresas → /eletrix-hub, /troca-de-operador |
| Proprietário / fundo / incorporadora | "Tenho um empreendimento" | /eletrix-hub (seguro, dashboard, white label), /empreendimentos |
| Síndico residencial | "Sou síndico" (card 'Qual é o seu caso?') | /condominios → laudo → infra → controle → IT-41 |
| Morador | "Quero carregar na minha vaga" | /instalacao-carregador-residencial → /carregadores |
| Comércio / hotel / shopping | "Qual é o seu caso?" | /eletrix-hub ou /eletrix-rent |
| Motorista usuário | menu "App" e "Suporte" | /app, /estacoes, /suporte |

A home tem duas portas grandes no hero (empreendimento / vaga) e, logo abaixo, o seletor "Qual é o seu caso?" com os três perfis do catálogo oficial.

## 3. Arquitetura de informação e navegação

**Header** (escuro, sticky): logo · Soluções (mega-menu) · Empreendimentos · Estações · Guias · Sobre · [App] [Suporte] discretos · botão **Fale com a Eletrix**.

**Mega-menu "Soluções"** — três colunas pelos perfis do catálogo:
1. *Para o morador* — Instalação na vaga, Carregadores.
2. *Para síndicos e gestores* — a sequência Medir → Preparar → Controlar → Regularizar (Laudo, Infra seca, Controle de demanda, Adequação IT-41).
3. *Para comércio, empresa e condomínio* — Eletrix Hub, Eletrix Rent, Troca de operador, White label.
Painel lateral em destaque: Eletrix Hub com foto real do totem.

**Rodapé**: logo + assinatura, colunas Soluções / Empresa / Recursos / Contato, badges das lojas (links em config), razão social e CNPJ, links legais.

**Mapa de páginas** (URLs definitivas, conforme CLAUDE.md §5): home, eletrix-hub, eletrix-rent, empresas, condominios, instalacao-carregador-residencial, carregadores, laudo-de-demanda, infraestrutura-seca, controle-de-demanda, adequacao-it-41, troca-de-operador, white-label, empreendimentos, estacoes, app, suporte, guias + 5 guias, 4 cidades, sobre, imprensa, contato, política de privacidade, termos de uso, 404 e as três rotas legadas.

**Páginas adicionais propostas** (todas com conteúdo real do briefing): `/perguntas-frequentes` (FAQ geral consolidada, com FAQPage e busca por público). Sem Frotas e sem Trabalhe conosco: não há conteúdo no briefing.

## 4. Wireframes textuais

### Home
1. **Hero** (escuro, foto Aqwa ao pôr do sol com overlay; leve parallax): eyebrow "Operadora de recarga para veículos elétricos" · H1 "Qualidade de serviço à altura de um AAA." · subtítulo (1 frase) · duas portas: [Tenho um empreendimento] [Quero carregar na minha vaga] · rodapé do hero com 4 números discretos.
2. **Faixa de logos** (monocromática, marquee lento, pausável; nomes de peso primeiro).
3. **Qual é o seu caso?** — 3 cards (Morador, Síndico e gestor, Comércio/empresa/condomínio), cada um com a pergunta do cliente e as soluções.
4. **Eletrix Hub em destaque** (escuro): foto do totem, 6 pontos do modelo (comodato 36 meses sem mensalidade, rescisão sem multa, energia 100% reembolsada + bônus, suporte 24h/12h, seguro R$ 500 mil, dashboard), CTA.
5. **Jornada do síndico** (claro): stepper Medir → Preparar → Controlar → Regularizar com preço público onde existe.
6. **Empreendimentos**: 1 destaque grande + 4 menores, nome e cidade.
7. **Mapa** (prévia estática com pontos reais + link para /estacoes).
8. **Por que a Eletrix**: 6 pilares com fatos do briefing.
9. **Troca de operador**: faixa dedicada "Já tem carregadores no prédio? Assumimos a operação e regularizamos."
10. **App**: mockup real + badges.
11. **Depoimentos** (provisórios, flag no código).
12. **Imprensa** (Estadão, 2 matérias).
13. **Guias** (3 destaques).
14. **FAQ** curto + **CTA final** com formulário/WhatsApp.

### Páginas de solução (modelo comum)
Hero com breadcrumb, H1, lead, 2 CTAs, foto → "O que é" → "Para quem é" → "Como funciona" (stepper ou diagrama) → "O que está incluso" → "Por que a Eletrix" → "Quanto custa / modelo" (card) → FAQ (5–8 perguntas, FAQPage) → "Continue por aqui" (links internos) → CTA final. Páginas com componentes próprios:
- **Hub**: diagrama "como funciona a tarifa" (parcela fixa Eletrix + reembolso da energia + bônus), tabela Hub × Rent, formatos de instalação, "por que 7,4 kW", taxa de ociosidade opcional, ficha técnica, dashboard.
- **Rent**: tabela de decisão Hub × Rent, modelo mensalidade fixa.
- **Instalação residencial**: linha do tempo (visita → proposta → instalação em 3 dias úteis), cartões de preço "a partir de", prévia dos 3 carregadores, bloco "O condomínio pode barrar?" (Lei 18.403/2026).
- **Carregadores**: vitrine de 3 modelos, comparativo, "qual é o ideal para você" (seletor simples), nota legal de preços, JSON-LD Product/Offer.
- **Laudo**: linha do tempo de 7 dias, "o que o relatório responde".
- **Infra seca**: etapas, benefícios, antes/depois conceitual (sem inventar imagem).
- **Controle de demanda**: diagrama de funcionamento (prédio → medição → ajuste de potência).
- **IT-41**: contexto legal, 3 itens instalados, como funciona, **calculadora** (pavimentos × carregadores) com exemplo conferido (2×1.799 + 6×449 = R$ 6.292), checklist da norma.
- **Troca de operador**: 4 passos (diagnóstico → substituição → adequação IT-41 → operação e repasse), "sem custo em muitos casos" com a ressalva de avaliação por empreendimento.
- **White label**: "Powered by Eletrix", o que é personalizável, para quem.
- **Estações**: mapa MapLibre sob demanda + lista por cidade (fallback acessível).
- **Empreendimentos**: galeria editorial, 16 empreendimentos com foto (2 marcados "em breve").

### Guias (5) e cidades (4)
Artigo com sumário lateral, tempo de leitura, texto original, tabelas quando útil, FAQ, links internos para as soluções, JSON-LD Article. Cidades: panorama local (onde a Eletrix opera, com base nos locais públicos do mapa), regra aplicável, soluções relevantes, FAQ, CTA.

## 5. Sistema de design

**Cores** (tokens Tailwind + CSS variables)
- `ink` (navy-preto): 950 `#050B14`, 900 `#0A1220`, 800 `#0F1B2D`, 700 `#17263D`, 600 `#243653`.
- `brand` (azul Eletrix): 500 `#10B7FF` (ação e destaque sobre escuro), 400 `#4CCBFF`, 300 `#8EDDFF`, 600 `#0A97D6`, 700 `#0877AD` (texto azul sobre fundo claro, AA), 800 `#0A5F8A`, 100 `#D3F0FF`, 50 `#EAF8FF`.
- Neutros: `paper #F5F8FB`, `line #E2E8F0`, texto `ink-900`, texto secundário claro `#4A5B72` (AA sobre branco), secundário escuro `#9FB0C8`.
- Botão primário: fundo `brand-500`, texto `ink-950` (contraste ~9:1). Nunca texto branco sobre #10B7FF.

**Tipografia** (self-hosted via `next/font`): **Manrope** (títulos, 600–800) e **Inter** (texto, números tabulares nas estatísticas). Escala fluida com `clamp()`: display 3.5→5.5rem, h1 2.5→4rem, h2 1.875→2.75rem, h3 1.25→1.5rem, corpo 1.0625rem/1.65, pequeno 0.875rem.

**Grid e espaço**: container 1240 px, gutter 24/32, 12 colunas; seções com 96–128 px de respiro vertical no desktop (64–80 no mobile). Raio 14–20 px; bordas de 1 px; sombras só em elementos elevados.

**Ritmo**: seções alternam `dark` (ink-950/900), `light` (branco) e `paper`. Nunca duas escuras seguidas sem razão.

**Componentes**: Button (primary, secondary, ghost, on-dark), Card, Section/SectionHeader, Eyebrow, Stat, Steps, Tabs, Accordion (details nativo), Table, Callout, Breadcrumbs, Header + MegaMenu, Footer, WhatsApp flutuante discreto, Form (validação, estado de envio/sucesso, honeypot, LGPD), Calculator, Map, Picture (srcset AVIF/WebP/JPG), LogoMarquee, Counter.
Estados: hover, `focus-visible` (anel 2 px azul + offset), disabled, loading.

**Motion**: fade + deslocamento de 12 px na entrada de seções (380 ms), contador numérico que roda uma vez, parallax leve no hero (≤ 24 px), transições de menu de 160 ms, marquee de logos (60 s por volta, pausa em hover/foco e botão de pausa). Tudo desligado em `prefers-reduced-motion`. Conteúdo visível sem JavaScript.

## 6. Estratégia de conteúdo e SEO por página

- Um H1 por página; title ≤ 60; description ≤ 155; canonical; OG/Twitter com imagem própria (gerada no build, identidade da marca).
- JSON-LD: Organization (home), WebSite, Service nas soluções, Product/Offer nos carregadores, FAQPage nas FAQs, BreadcrumbList nas internas, Article nos guias, ElectricVehicleChargingStation/LocalBusiness na página de contato/estações quando fizer sentido.
- Palavra-chave por página conforme CLAUDE.md §5, usada em title, H1, primeiro parágrafo e um H2.
- Linkagem interna: cada solução aponta para a anterior/próxima da sequência, para o guia relacionado e para a cidade; cada guia aponta para a solução que resolve o problema.
- Sitemap e robots gerados por script de build, controlados por `NEXT_PUBLIC_SITE_ENV`. Em teste: noindex + `Disallow: /`.
- Rotas legadas com meta refresh + link e noindex.

## 7. Técnica

- Next.js 15 (App Router), `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`, TypeScript estrito, Tailwind 3.
- `basePath`/`assetPrefix` via `NEXT_PUBLIC_BASE_PATH`. Helper `withBase()` para tudo que não é `next/link`.
- Configuração única em `src/config/site.ts`; conteúdo em `src/data/`.
- Imagens: `scripts/optimize-images.mjs` (sharp) → `public/images/` com AVIF/WebP/JPG em larguras múltiplas e `src/data/images.generated.json` com dimensões.
- Estações: `scripts/build-stations.mjs` converte o CSV para `src/data/stations.json` (só "Sim", só campos públicos, flag para "Depois").
- Mapa: MapLibre GL + OpenFreeMap, carregado sob demanda.
- Formulários: FormSubmit (AJAX) → admin@eletrix5.com.br, endpoint em config.
- Deploy: `.github/workflows/deploy.yml` (Pages via Actions).
- Analytics: GA4/Meta Pixel preparados em config, desligados por padrão; aviso de cookies só aparece quando houver IDs.

## 8. Critérios de pronto

Lint e typecheck sem erros; build estático ok com e sem basePath; nenhum link interno quebrado; nenhum número fora da seção 2 do briefing; nenhum dado de proposta; Lighthouse ≥ 95 nas quatro categorias no mobile; navegação por teclado no mega-menu; sem layout shift; `prefers-reduced-motion` respeitado.
