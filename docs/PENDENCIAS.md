# Pendências e decisões para o dono revisar

Tudo o que não estava no briefing (`CLAUDE.md`) foi marcado aqui. Itens com **[ação]** dependem de alguém da Eletrix.

## 1. Ações necessárias antes do lançamento

- **[ação] Ativar o GitHub Pages:** github.com/Michelk55/site-eletrix → Settings → Pages → Source: **GitHub Actions**.
- **[ação] Confirmar o e-mail do FormSubmit.** O primeiro envio de formulário faz o serviço mandar um e-mail de ativação para `admin@eletrix5.com.br`. Enquanto não for confirmado, os formulários não entregam. Endpoint em `src/config/site.ts` (`site.form.endpoint`).
- **[ação] Links das lojas do app.** Estão como busca genérica na App Store e no Google Play (`site.app.appStore`, `site.app.playStore`). Trocar pelos links oficiais.
- **[ação] LinkedIn:** URL oficial da página da Eletrix (`site.social.linkedin`). Enquanto vazio, o ícone não aparece no rodapé.
- **[ação] Links das matérias do Estadão:** `src/data/content.ts` → `press[].url`. Hoje `null` (os links originais não estavam disponíveis). A página de imprensa só mostra o botão "Ler a matéria" quando houver URL.
- **[ação] Depoimentos reais.** Os três textos de `src/data/content.ts` são **provisórios** (`placeholder: true`). Para ocultar a seção até haver reais: `site.flags.showPlaceholderTestimonials = false`.
- **[ação] Analytics:** GA4 e Meta Pixel estão preparados e **desligados** (`site.analytics.ga4Id` e `metaPixelId` vazios). Ao preencher, o site mostra o aviso de cookies e só carrega depois do aceite. Funciona só com `NEXT_PUBLIC_SITE_ENV=production`.
- **[ação] Estações "Depois":** quando as 10 estações marcadas "Depois" no CSV entrarem no ar, rodar `npm run data` e ligar `site.flags.showStationsComingLater`.
- **[ação] Jurídico.** A política de privacidade e os termos de uso foram redigidos pela equipe de desenvolvimento a partir do briefing. Pedir revisão jurídica. Pontos em aberto: nome do **encarregado (DPO)** (hoje o canal é `contato@eletrix5.com.br`), o foro (São Paulo/SP) e a lista de operadores de dados.
- **[ação] Revisão técnica dos guias** (IT-41 e Lei 18.403/2026) por quem assina a engenharia, e revisão jurídica do guia da lei. Os guias dizem que são informativos.

## 2. Migração para eletrix.mobi

- Build de produção: `NEXT_PUBLIC_SITE_ENV=production` e `NEXT_PUBLIC_BASE_PATH` vazio (ver `docs/RELATORIO.md`).
- **Redirecionamentos 301.** As rotas legadas abaixo foram criadas com meta refresh (limitação da hospedagem estática). No domínio definitivo, devem virar **301** no servidor/CDN:
  - `/estacao-de-recarga-veiculos-eletricos` → `/empresas/`
  - `/carregador-veicular-predios-corporativos` → `/eletrix-hub/`
  - `/eletroposto-tarifado` → `/eletrix-hub/`
  - *Decisão:* o briefing não dizia o destino de cada uma. Mapeei pelo nome (Hub para as duas últimas; `/empresas/` para a primeira, por ser genérica). Confirmar.
- Confirmar o estado das URLs do site antigo que estão no Google (Search Console) e se há outras além dessas três.

## 3. Decisões de conteúdo e design tomadas sem confirmação

| Decisão | Por quê | O que confirmar |
|---|---|---|
| Garantia dos carregadores: **2 anos** | CLAUDE.md. O catálogo em PDF (out/2026) ainda cita 1 ano e "cartão RFID" em alguns trechos | Atualizar o catálogo. O site não menciona RFID |
| Números oficiais: +250 estações, +20 cidades, +10 estados, +5 mil clientes | CLAUDE.md. O catálogo cita "+200" e "6 estados" | Catálogo desatualizado |
| Não exibimos número de locais nem de estações por local no mapa | Regra do briefing | — |
| Mapa mostra 94 locais "Sim" do CSV, só nome e cidade | Regra do briefing. Inclui as 2 unidades Housi (residencial de marca, listadas como "Sim") | Confirmar se as unidades Housi podem aparecer |
| Logos: todos os 39 parceiros em uma faixa monocromática | CLAUDE.md pede logos de parceiros | WEG e Intelbras são fornecedoras de equipamento, não clientes. A faixa fala "Parceiros e clientes" para ser correta |
| Rótulo "Parceiros e clientes" | Evita afirmar que todos são clientes | Confirmar se há logos que não devem aparecer |
| Página adicional `/perguntas-frequentes/` | Melhora SEO e atende a todos os públicos, só com fatos do briefing | — |
| Rotas legadas (item 2) | Briefing | — |
| Cidades: RJ e Curitiba **não** afirmam regra estadual específica | Só consta no briefing a IT-41 de SP | Se desejar, incluir as normas do CBMERJ e do CBMPR com revisão técnica |
| Cidade de São Paulo e Campinas citam a Lei 18.403/2026 | Lei estadual de SP, no briefing | — |
| "Troca de operador": o texto lista sinais genéricos (carregadores parados, suporte, IT-41, sem retorno, contrato) | Briefing cita carregadores com suporte ruim ou fora da IT-41. Outros sinais são exemplos | Revisar o tom e a lista |
| FAQ da troca: respostas sobre "prazo de interrupção" e "contrato com a operadora atual" são genéricas | Briefing não detalha o procedimento | Fornecer o procedimento real |
| White label: público-alvo (hotéis, incorporadoras) é extrapolação | Briefing cita só rede de residenciais/serviced apartments | Confirmar |
| Controle de demanda: texto sobre "carro costuma estar pronto de manhã" | Inferência do funcionamento descrito | Confirmar com engenharia |
| Hub vs. Rent: na tabela, a rescisão do Rent diz "condições na proposta" | Briefing só garante rescisão sem multa no Hub | Informar a regra do Rent |
| Texto do laudo ("análise simula a entrada dos carregadores") | Interpretação de "análise do consumo e dos picos" | Confirmar |
| Reembolso do Hub "bônus ao local sobre cada kWh cobrado" | Briefing | — |
| Foto do CEO e menção à autoria do artigo do Estadão | Foto do material e assinatura vista na matéria | Confirmar o uso |
| Tarifas, mensalidades e valor da infraestrutura: não publicados | Briefing | — |
| Instalação "em 3 dias úteis" | Briefing ("prazo típico") | — |
| Tipografia Manrope + Inter via `next/font` | Boa leitura em português, números tabulares | — |
| Hero com foto do Aqwa e nome do empreendimento só em contexto de portfólio | Briefing | — |

## 4. Pontos técnicos

- Mapa: tiles do OpenFreeMap (sem chave, sem custo). Para produção em alta escala, considerar um provedor com SLA.
- Tamanho do repositório: as imagens otimizadas somam cerca de 20 MB. Para reduzir, ajustar a lista de imagens em `scripts/optimize-images.mjs`.
- Logos em PNG (Kinea, Pátria, Safra, Tishman Speyer, Hersil, Argoplan, Vitacon, Bresco, Brookfield, Housi, Atrio, Link, Inteli, Intercity, Confiance, Slaviero, Pepe): pedir o vetor oficial a cada parceiro para nitidez em telas grandes. Falta também o logo da Eletrix em vetor com o símbolo do plug (o SVG fornecido é só o logotipo).
- Imagens Open Graph são geradas por `npm run og` a partir de `src/data/pages.json` (fonte Arial no render do SVG). Idealmente, o designer valida a arte.
- Ao alterar títulos e descrições, editar apenas `src/data/pages.json`. O script `npm run seo:check` valida os limites de tamanho.
