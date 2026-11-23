# PROMPT MESTRE — REDESIGN E CORREÇÕES DO SITE DA ELETRIX

> Execução longa e autônoma (rodando durante a noite). Leia este documento inteiro antes de tocar em qualquer arquivo.
> Idioma do site e do relatório final: português do Brasil.

---

## SUMÁRIO

- PARTE 0 — Como executar esta tarefa (modo noturno, autonomia, git, registro de decisões)
- PARTE 1 — Contexto: quem é a Eletrix e para quem é o site
- PARTE 2 — Correções específicas pedidas pelo Michel (obrigatórias, seção por seção)
- PARTE 3 — Regras de texto e de conteúdo
- PARTE 4 — Referências, Skills e guias de design (consultar e aplicar)
- PARTE 5 — Padrão profissional de UI/UX (sistema de design, hierarquia, estados, acessibilidade, performance)
- PARTE 6 — Experiência mobile e desktop (duas experiências excelentes, não uma adaptada)
- PARTE 7 — Direção de design: processo, anti-padrões de IA e autocrítica
- PARTE 8 — O que deve ser preservado (proteções)
- PARTE 9 — Validação real no navegador
- PARTE 10 — Liberdade criativa: novas ideias
- PARTE 11 — Entregáveis e relatório final
- ANEXO A — Texto integral da Skill Frontend Design (Anthropic)
- ANEXO B — Checklist final de aceite

---

# PARTE 0 — COMO EXECUTAR ESTA TAREFA

## 0.1 Modo de trabalho

Você vai trabalhar sozinho por várias horas. O Michel só vai olhar o resultado de manhã. Por isso:

1. **Não pare para fazer perguntas.** Quando houver dúvida, escolha a opção mais sensata para o objetivo do site, registre a decisão e siga.
2. **Registre todas as decisões** em `REDESIGN-DECISOES.md`, na raiz do projeto: o que decidiu, por quê, e quais alternativas descartou. O Michel vai revisar esse arquivo.
3. **Registre ideias extras** (que você teve mas não implementou, ou implementou como opção) em `REDESIGN-IDEIAS.md`.
4. **Registre pendências** que dependem do Michel (fotos que faltam, dados de estações incompletos, textos a confirmar) em `REDESIGN-PENDENCIAS.md`.
5. Use a lista de tarefas para acompanhar o progresso por fase.
6. Trabalhe em ciclos: auditar → planejar → implementar → ver no navegador → corrigir → registrar. Não tente fazer tudo de uma vez.
7. Se uma tarefa travar (erro que não resolve em 3 tentativas, recurso externo inacessível), registre em `REDESIGN-PENDENCIAS.md` e passe para a próxima. Não fique em loop.

## 0.2 Git (segurança)

1. Antes de começar: `git status`, `git pull` e crie a branch `redesign-v2` a partir da branch principal.
2. Faça **commits pequenos e frequentes**, um por correção ou por fase, com mensagens claras em português (ex.: `home: novo hero com foto escurecida e animação de LED`).
3. **Não faça merge na branch principal e não publique no GitHub Pages.** O Michel quer aprovar antes de ir ao ar.
4. Ao final, faça `git push -u origin redesign-v2` (só a branch, para backup).
5. Nunca use `git push --force`, nunca reescreva histórico, nunca apague a branch principal.

## 0.3 Primeira fase obrigatória: entender o projeto

Antes de qualquer mudança visual:

- Leia a estrutura do repositório, identifique o framework (provavelmente Astro, HTML estático publicado no GitHub Pages em `michelkhafif.github.io/site-eletrix/`), o sistema de estilos, os componentes reutilizáveis, os dados (estações, empreendimentos, parceiros) e as imagens disponíveis.
- Rode o projeto localmente (`npm install`, `npm run dev`) e abra no navegador.
- Faça um inventário: todas as páginas, todos os componentes, onde cada texto e cada imagem são usados.
- Tire screenshots do estado atual (desktop 1440px e mobile 390px) de cada página principal e salve em `qa/antes/`. Isso serve de comparação no relatório.
- Só depois comece as correções.

## 0.4 Ordem de execução sugerida

1. Inventário + screenshots "antes"
2. Bug crítico: menu mobile travando (C-3)
3. Tokens de design (cores, tipografia, espaçamento, raios, sombras) — base para tudo
4. Componentes compartilhados (botões, header, menu de soluções, rodapé)
5. Home, de cima para baixo (hero → parceiros → "Qual é o seu caso?" → síndicos → estações/mapa → por que a Eletrix → app → dúvidas frequentes → rodapé)
6. Remoção de páginas e redirecionamentos (Empreendimentos, Estações)
7. Páginas de produto (Eletrix Hub, IT-41 e demais)
8. Revisão global: textos, imagens, rosto do Michel, links
9. Passada de responsividade (mobile e desktop, separadamente)
10. Acessibilidade e performance
11. Validação visual completa + screenshots "depois" em `qa/depois/`
12. Relatório final

---

# PARTE 1 — CONTEXTO: QUEM É A ELETRIX

- **Eletrix** (Eletrix5 Comércio e Serviços Ltda) instala e opera estações de recarga para carros elétricos desde 2021.
- Atua em prédios corporativos, shoppings, hotéis e condomínios residenciais, e também instala carregadores na vaga privativa do morador.
- Números oficiais do site: **+250 estações de recarga, +20 cidades, +10 estados, +5 mil clientes.**
- Presença: São Paulo (maior concentração), Paraná, Santa Catarina, Rio Grande do Sul, Rio de Janeiro, Bahia e outros.
- Cor da marca: **azul #10B7FF**. Logo: "ELE" em branco + "TRIX" em azul sobre fundo escuro (versão com símbolo e versão só com o nome).
- Slogan: **"Carregando seu futuro."**
- A rede é só de carregadores **AC** (não há carregadores rápidos DC). O app **não mostra % de bateria**. Não prometa nada disso.
- App do cliente: **Eletrix**.
  - App Store: https://apps.apple.com/br/app/eletrix/id6444454547
  - Google Play: https://play.google.com/store/apps/details?id=com.coderbox.eletrix&hl=pt_BR&gl=US

### Linhas de produto e serviços

| Produto / serviço | Para quem | Observação |
|---|---|---|
| **Eletrix Hub** | **Prédios corporativos e shoppings** | Comodato; a Eletrix opera e remunera o empreendimento. Pode usar a frase "Qualidade de serviço à altura de um AAA" **somente aqui** (é linguagem de corporativo). |
| **Eletrix Rent** | Condomínios, hotéis, recarga coletiva com menor rotatividade | Locação do equipamento. |
| **Instalação em vaga privativa** | Morador | Ligada ao medidor do próprio morador; visita técnica gratuita; carregadores a partir de R$ 2.799 (WEG, Intelbras, Livoltek), 2 anos de garantia Eletrix. |
| **Laudo de demanda de energia** | Síndico / gestor | "Medir". A partir de R$ 2.799. |
| **Infraestrutura seca** | Síndico / gestor | "Preparar". Orçamento após visita técnica. |
| **Controle de demanda** | Síndico / gestor | "Controlar". Orçamento após visita técnica. |
| **Adequação à IT-41** | Síndico / gestor | "Regularizar". **Sem preço em nenhum lugar do site** (ver C-6). |
| **Troca de operador** | Quem já tem carregadores de outro operador | Assumimos a operação e regularizamos. |

### Não usar no site

- Não mencionar **movE** (plataforma por trás do app).
- Não mencionar o fluxo de **cartão RFID com manobrista** (foi um projeto pontual).
- Não listar nomes de todos os prédios em texto (o site deve parecer de empresa grande, não um catálogo).
- Não mostrar **nota/avaliação** das lojas de aplicativo.

### Contatos (manter exatamente como estão)

- Comercial e orçamentos: +55 11 96575-5730 (WhatsApp)
- Suporte às estações, 24 horas: +55 11 91955-2120 (WhatsApp)
- E-mail: contato@eletrix5.com.br
- Endereço: Av. Angélica, 688 – Conj. 801, Santa Cecília, São Paulo/SP, CEP 01228-000
- © 2026 Eletrix5 Comércio e Serviços Ltda · CNPJ 51.055.198/0001-41
- Instagram: @eletrix.mobi

### Estrutura de SEO já aprovada (não quebrar)

- **"Guias" não fica no menu principal.** Os artigos são acessados por:
  1. Link **"Central de dúvidas"** no rodapé → `/guias`
  2. Bloco **"Dúvidas frequentes"** no meio da home, com 4–5 perguntas que linkam para artigos + "Ver todas as dúvidas"
  3. Bloco **"Dúvidas sobre…"** no fim das páginas de serviço, com 4–5 links para os artigos do grupo
- Escada de 3 cliques: Home → `/guias` (5 grupos) → grupo → artigo.
- Schema (Article, FAQPage, BreadcrumbList) e `sitemap.xml` devem continuar funcionando.
- Hoje o header tem "Guias" no menu principal: **remova** do header e garanta os três acessos acima.

---

# PARTE 2 — CORREÇÕES ESPECÍFICAS (OBRIGATÓRIAS)

Estas são as correções que o Michel pediu, com as palavras e a intenção dele. Todas devem ser implementadas. Onde ele deixou a decisão para você, decida com critério e registre em `REDESIGN-DECISOES.md`.

---

## C-1. HERO (primeira dobra da home) — refazer

### O problema, nas palavras do Michel
> "A tela inicial não está de uma empresa grande, tem muita informação. Esse 'qualidade de serviço à altura de um AAA' não precisa ter (quem é de residencial não entende essa fala). Toda essa descrição é muito texto para ter de início também."

### O que deve existir no hero (só isso, nesta ordem)

1. **Fundo:** uma foto **realista e real** de um carro carregando numa estação Eletrix, ocupando o hero inteiro, **escurecida** (overlay escuro sobre a foto para o texto ficar legível).
   - Use uma foto real que já está no repositório (por exemplo, a do carro plugado no carregador azul que hoje aparece na colagem do hero). **Não gere imagem por IA e não use banco de imagens genérico.**
   - Otimize: formatos modernos (AVIF/WebP com fallback), `srcset` com tamanhos para mobile e desktop, `fetchpriority="high"` na imagem do hero, dimensões definidas para não causar layout shift.
   - Recorte (object-position) pensado separadamente para mobile (retrato) e desktop (paisagem) — o carregador e o plug devem aparecer nos dois.

2. **Animação de "energia":** na frente da foto escurecida, uma **luz de LED azul passando**, como se a imagem estivesse energizada. Ideias para você escolher a melhor (e registrar a escolha):
   - Um feixe/linha de luz azul (#10B7FF) com brilho suave que percorre a imagem lentamente, como corrente passando pelo cabo.
   - Uma linha fina que acompanha o traçado do cabo de recarga na foto, com um pulso luminoso viajando do carregador até o carro.
   - Um brilho que "varre" a cena na diagonal, de forma sutil, em loop lento.
   - Regras: precisa ser **sutil, elegante e lenta** (nada de efeito de videogame); feita em CSS/SVG leve (transform/opacity, sem animar propriedades caras); **pausada com `prefers-reduced-motion: reduce`**; não pode atrapalhar a leitura do título. Deve ser o único "momento" de movimento automático da página (junto com a contagem dos números).

3. **Uma frase principal (H1)**, grande, que diga o que a Eletrix faz: **é uma rede de recarga e também presta os serviços desse nicho** (instalação, infraestrutura, regularização). Sem texto explicativo embaixo. O Michel deixou a escolha com você. Opções para avaliar (pode criar uma melhor):
   - "Rede de recarga para carros elétricos. Do prédio à sua vaga."
   - "Recarga de carros elétricos, do prédio à sua vaga."
   - "A rede de recarga que também instala na sua vaga."
   - "Onde o seu carro elétrico carrega: no prédio, no trabalho e na sua vaga."
   Critérios: entendível por morador e por gestor; transmite tamanho (rede) e serviço; curta (cabe em 2–3 linhas no mobile); contém "recarga" + "carros elétricos" (SEO do H1). **Remova "Qualidade de serviço à altura de um AAA" e o parágrafo longo.** Registre a escolha e as alternativas no arquivo de decisões.

4. **Os dois botões** (o Michel achou "perfeitos", manter a ideia e os textos):
   - "Tenho um empreendimento" (Hub, Rent, troca de operador)
   - "Quero carregar na minha vaga" (Visita técnica gratuita)
   - **No celular: um ao lado do outro**, não empilhados. Para caber: esconda as linhas de apoio ("Hub, Rent, troca de operador" / "Visita técnica gratuita") no mobile ou reduza para uma palavra; altura confortável para o polegar (mínimo 44–48px); texto pode quebrar em 2 linhas de forma equilibrada.
   - Botões com cor (primário azul da marca; secundário com contorno ou fundo translúcido), estados de hover, foco visível e pressionado.

5. **Link para síndicos:** "Síndico ou gestor? Veja o caminho do laudo à IT-41." — manter, mas **deve levar à página do produto** (`/adequacao-it-41/` ou à página do caminho do condomínio — escolha a que faz mais sentido para "do laudo à IT-41" e registre).

6. **Os números** (+250 estações de recarga, +20 cidades, +10 estados, +5 mil clientes):
   - Ao abrir a página, eles **crescem** (contagem de 0 até o valor) em **escadinha** (um começa um pouco depois do outro).
   - Contagem rápida (~1,2–1,8s cada), com easing de desaceleração; sem layout shift (reserve a largura do número final, use `font-variant-numeric: tabular-nums`).
   - Com `prefers-reduced-motion`, mostrar o número final direto.
   - O valor final deve estar no HTML (para SEO e leitores de tela); a animação é só visual.

### Resumo do hero
Foto real escurecida + LED azul animado → H1 curto → 2 botões → link síndico/IT-41 → 4 números animados. **Nada mais.** A colagem de fotos da direita, o cartão "Recarregando / Conector Tipo 2 · 7,4 kW", o eyebrow "RECARGA DE CARROS ELÉTRICOS PARA PRÉDIOS, HOTÉIS E CONDOMÍNIOS" e o parágrafo saem.

---

## C-2. FAIXA DE PARCEIROS — logo abaixo do hero

### O problema
> "A parte de baixo, quando você abre a tela inicial, deveria ser de outra cor, porque aí induz a pessoa a rolar para baixo. Direto ser os parceiros e ser escuro complica isso."

### O que fazer
- A seção que aparece logo abaixo do hero deve ter **cor diferente do hero** (clara, ou um tom que contraste claramente com o hero escuro), para a pessoa perceber que há conteúdo abaixo e rolar.
- Os parceiros podem continuar logo abaixo do hero **ou** ser realocados para outro ponto da página — avalie o que fica melhor e registre. Se ficarem logo abaixo, a faixa não pode ser escura.
- **Logos maiores** do que hoje (legíveis, com tamanho visual equilibrado entre si — normalize a altura/área ótica de cada logo, não só a largura).
- **Só a rolagem automática (marquee).** Remova o botão de pausar e o link "ver todos os parceiros".
- Acessibilidade: como não haverá botão de pausa, a rolagem deve **pausar ao passar o mouse e ao receber foco**, e **parar** com `prefers-reduced-motion: reduce`. Logos com `alt` adequado; a lista duplicada usada para o loop deve ficar com `aria-hidden="true"`.
- Logos em versão monocromática ou com tratamento uniforme, para não virar uma colcha de cores (registre a escolha).

---

## C-3. BUG CRÍTICO — MENU MOBILE TRAVA A TELA (P0)

> "Na direita em cima, no celular, para ver todos os itens do site não está funcionando: eu clico, ele fica X, mas trava a tela."

- Reproduza no navegador em 390px e 360px.
- Causa provável: o script trava a rolagem do `body` (overflow hidden) mas o painel do menu não aparece (z-index, `display`, `transform` fora da tela, altura zero, conflito de classe) — investigue e corrija a causa real.
- O menu mobile deve: abrir com uma transição curta e clara; mostrar todos os itens; permitir rolar dentro do menu se for longo; fechar pelo X, pela tecla Esc, ao tocar num link e ao tocar fora; devolver o foco ao botão ao fechar; prender o foco dentro do menu enquanto aberto; respeitar safe areas do iPhone e altura dinâmica do viewport (`100dvh`).
- Botão com `aria-expanded`, `aria-controls` e rótulo acessível ("Abrir menu" / "Fechar menu").
- Teste também em landscape.

---

## C-4. "QUAL É O SEU CASO?" — entendimento instantâneo e mais cor

### O problema
> "Sinto que falta algo mais claro, que antes de ler a pessoa já entendeu. Talvez com algum desenho, algo nesse estilo. E sempre os botões têm que ter cor. Sinto que acaba ficando muito esbranquiçado, e site muito branco acaba perdendo o charme ou a criatividade."

### O que fazer
- Cada um dos 3 perfis (Morador / Síndico e gestor / Comércio, empresa e condomínio) precisa de um **elemento visual que comunique o caso antes da leitura**:
  - Opção recomendada: **ilustrações próprias em SVG**, em traço consistente, nas cores da marca. Ex.: Morador = carro na vaga com carregador de parede; Síndico = prédio com um escudo/check (segurança e regularização); Comércio/empresa = fachada ou garagem com vários carregadores e carros.
  - Alternativa: fotos reais recortadas de cada situação (vaga privativa, quadro elétrico/infra, hub com vários carregadores).
  - Escolha uma linguagem e aplique igual nos três. Nada de ícones genéricos de biblioteca soltos.
- **Botões com cor** (preenchidos), não só contorno cinza. O botão de cada card deve ser claramente clicável.
- Os números **01–07** antes dos itens **não são uma sequência** — remova (a numeração só faz sentido no processo do síndico, C-6).
- Reduza texto: título do perfil + frase entre aspas pode ficar; a descrição deve ser curta.
- Os 3 cards hoje são idênticos (mesmo raio, mesma sombra, branco no branco). Dê hierarquia e vida: fundo de seção com tom, cards com cor/ilustração, sem cair no "kit de cards SaaS".

### Diretriz geral para o site todo (vale para todas as seções)
- **O site está branco demais.** Crie ritmo de cor entre seções: alternar seções claras, seções em tom azul bem claro da marca, e seções escuras (azul-marinho da marca), com intenção. O azul #10B7FF deve aparecer com mais presença em botões, destaques e ilustrações — sem exagero e sem gradientes decorativos.
- **Todos os botões de ação têm cor.** Botão primário = azul da marca; secundário = escuro da marca ou contorno colorido. Defina isso nos tokens e aplique em todo lugar.

---

## C-5. MENU "SOLUÇÕES" (mega menu)

> "Os traços que dividem as seções são transparentes e acaba ficando com restos do fundo, e acaba ficando feio. Faça algo só branco nos traços, ao invés de aparecer o fundo atrás. E tire o White label de lá."

- O painel do mega menu deve ter **fundo sólido** (sem transparência mostrando a página atrás) e **divisórias sólidas e limpas** (branco ou cor de borda definida nos tokens — escolha o que fica melhor sobre o fundo e registre). Nenhum "resto" de imagem atrás dos traços.
- **Remova "White label"** do menu. Remova também do rodapé. Não apague a página `/white-label/` do repositório; apenas tire dos menus e registre.
- Revise o alinhamento: hoje os títulos quebram em 2–3 linhas ao lado das tags (MEDIR, PREPARAR…). Organize para leitura limpa.
- O card "Em destaque — Eletrix Hub" pode continuar, com foto real.
- No mobile, as soluções aparecem dentro do menu mobile (C-3) de forma organizada por perfil (accordion ou grupos simples).

---

## C-6. "PARA SÍNDICOS E GESTORES" — processo claro e profissional

> "A intenção desse foi boa, mas acho que dá para profissionalizar. As flechas não estão centralizadas, o texto largado, precisa de algo realmente estruturado e organizado. Esquece falar de valores da IT-41, não vamos falar de valor nenhum dentro da IT-41. Quero que mostre o processo de forma clara para o cliente realmente entender, sem exagerar em textos."

Conteúdo atual (base):
- Título: "Medir, preparar, controlar e regularizar."
- 1. **Medir** — Laudo de demanda de energia — "Saiba exatamente o que o seu prédio aguenta." — A partir de R$ 2.799 → `/laudo-de-demanda/`
- 2. **Preparar** — Infraestrutura seca — "Um padrão único e seguro de recarga para todo o prédio." — Orçamento após visita técnica → `/infraestrutura-seca/`
- 3. **Controlar** — Controle de demanda — "Mais carregadores, sem sobrecarregar o prédio." — Orçamento após visita técnica → `/controle-de-demanda/`
- 4. **Regularizar** — Adequação à IT-41 — "Recarga regularizada e pronta para o AVCB." → `/adequacao-it-41/`
- CTA: "Ver o caminho completo para condomínios" → `/condominios/`

O que fazer:
- Transformar em um **processo visual de verdade** (aqui a numeração 1–4 faz sentido, porque é uma sequência): uma linha de etapas (stepper/timeline) com conectores **perfeitamente alinhados e centralizados** entre as etapas, cada etapa com verbo + nome do serviço + uma frase curta.
- Considere um elemento visual por etapa (ícone próprio ou mini ilustração consistente com C-4).
- **IT-41: nenhum preço**, nem aqui nem na página `/adequacao-it-41/`, nem em nenhum outro lugar do site (remova "R$ 1.799 por pavimento + R$ 449 por carregador" de todo o projeto — faça uma busca global). Na etapa da IT-41, use algo como "Orçamento após visita técnica" ou nada.
- Os dois textos soltos ("Contrate só o que precisa ou o pacote completo…" e "Os carros elétricos já estão chegando às garagens…") estão largados: reorganize em um único bloco de introdução curto, bem alinhado, ou corte o que for redundante.
- Desktop: as 4 etapas lado a lado com conector horizontal. Mobile: etapas na vertical com conector vertical à esquerda (timeline), não 4 cards gigantes empilhados.
- CTA com cor.

---

## C-7. SEÇÃO "ESTAÇÕES": FOTOS DE PRÉDIOS + MAPA NOVO

> "Na aba de onde a Eletrix opera, pode dividir essa parte: coloque de um lado as fotos de 6 prédios que a Eletrix opera em SP e no outro lado crie um mapa."

### Layout
- **Um lado: 6 fotos de prédios que a Eletrix opera em São Paulo.** Use fotos reais que já estão no repositório (a Eletrix tem contrato que permite usar as imagens dos prédios). Composição de galeria cuidada (grade 2×3 ou mosaico), mesmo tratamento de cor, legenda discreta opcional (nome do prédio ou bairro, se o dado já existir no projeto). Se não houver 6 fotos boas, use as melhores disponíveis e registre em `REDESIGN-PENDENCIAS.md` quais faltam.
- **Outro lado: o mapa novo.**
- Mobile: mapa primeiro (ou fotos primeiro — decida pela força visual), com as fotos em carrossel horizontal com rolagem por toque ou grade 2×3 compacta.

### O mapa
> "Coloque spots, mas não igual hoje, só spots de bolinha. Faça spots que são pins, que dão mais volume no mapa. Faz o mapa com um traçado dividindo todas as cidades com traço azul, sabe? E vários spots também azuis, mas que ficam brilhando. Considere todos os pontos que a Eletrix tem hoje e tem para instalar ainda, já cadastrados no mapa. Não precisa fazer os pontos clicáveis, pode ser apenas estático."

- **Base:** mapa do Brasil com o **traçado das divisas municipais em linhas azuis** finas (e divisas estaduais um pouco mais marcadas), sobre fundo escuro da marca.
  - Fonte de geometria sugerida: API de malhas do IBGE (`https://servicodados.ibge.gov.br/api/v3/malhas/...`, formato GeoJSON, `intrarregiao=municipio`, qualidade mínima) ou o repositório público `tbrugz/geodata-br` no GitHub.
  - **Pré-processe em tempo de build** (ou uma vez, com um script em `scripts/`) para gerar um **SVG estático otimizado** (simplificar geometria, ex.: com mapshaper ou d3-geo + topojson-simplify). Não carregue bibliotecas de mapa no navegador do visitante (nada de Leaflet/Mapbox para isso). Meta: SVG leve (idealmente < 300 KB comprimido).
  - Para manter leve e bonito: divisas municipais nos estados onde a Eletrix atua e divisas estaduais no restante; recorte (viewBox) focado na região onde estão os pontos (Sul, Sudeste e litoral até o Nordeste). Registre a decisão.
- **Pins:** formato de **pin (gota)** com volume (gradiente sutil, sombra pequena), **azuis**, com **brilho pulsando** suave e defasado entre eles (não todos ao mesmo tempo). Brilho parado com `prefers-reduced-motion`.
- **Dados:** inclua **todos os pontos da Eletrix — operando e a instalar.**
  - Procure os dados que já existem no repositório (página de estações, arquivos JSON/MD/CSV de estações e empreendimentos).
  - Consolide em um arquivo único de dados (ex.: `src/data/estacoes.json`) com: nome, cidade, UF, latitude, longitude, status (`operando` | `a-instalar`).
  - Se houver apenas endereço sem coordenada, geocodifique com o Nominatim/OpenStreetMap respeitando 1 requisição por segundo e um User-Agent identificado, guarde o resultado em cache no arquivo e marque como aproximado.
  - **Não invente pontos nem coordenadas.** Se os pontos "a instalar" não estiverem no repositório, deixe a estrutura pronta e registre em `REDESIGN-PENDENCIAS.md` que o Michel precisa enviar a lista.
  - Todos os pins azuis e brilhando (pode haver uma diferença muito sutil para "a instalar", se ficar bonito — registre a escolha).
- **São Paulo concentra muitos pontos:** para não virar uma mancha, considere um **detalhe ampliado da Grande São Paulo** (inset) dentro do mapa. Registre.
- **Estático, sem clique, sem tooltip.** Com `role="img"` e um `aria-label`/texto alternativo descritivo (ex.: "Mapa com as estações da Eletrix em X cidades de Y estados").
- O mapa antigo de bolinhas sai.

### Remoção de páginas e mudança no menu
> "Apague a tela de Empreendimentos, vamos só mostrar os principais na tela principal. Apague também a aba de Estações, não precisa mostrar local a local em texto. No menu deixe 'Estações': a pessoa clica e desce para essa seção."

- **Remova as páginas `/empreendimentos/` e `/estacoes/`.**
- No lugar de cada uma, como o site está no GitHub Pages, crie um **redirecionamento** para `/#estacoes` (página HTML mínima com `meta refresh` + `link rel="canonical"` + link visível), para não gerar 404 em links antigos e no Google. Tire as duas do `sitemap.xml`.
- **Atualize todos os links internos** que apontavam para essas páginas (menu, rodapé, CTAs, mapa "Abrir o mapa", artigos, páginas de serviço). Faça uma busca global.
- No header, o item **"Estações"** leva para a seção da home (`/#estacoes`), com rolagem suave (desligada com reduced motion) e compensação da altura do header fixo (`scroll-margin-top`). Em outras páginas, o mesmo link leva à home na seção.
- Remova também o item "Empreendimentos" do menu.

---

## C-8. SEÇÃO "PRESENTE DO SUL AO NORDESTE, DESDE 2021" — remover

> "Os números aqui do Sul ao Nordeste com o mapa na direita não precisa, sem necessidade dessa aba, é encher linguiça."

- Remova essa seção inteira (título, texto, os 4 números repetidos, o mapa antigo e o botão "Ver o mapa de estações"). Os números ficam **só no hero**, e o mapa fica **só na nova seção C-7**.
- A frase "Até hoje, nenhuma estação foi desinstalada por falta de manutenção ou de suporte." é forte: avalie reaproveitar em "Por que a Eletrix" (C-9). Registre.

---

## C-9. "POR QUE A ELETRIX" — mais vivo, menos texto

> "Gostei dessa parte, mas o design está totalmente IA. Não amei, precisa de algo mais bonito, mais vivo. Muito texto fica morto."

Base atual: "Por que a Eletrix — Padrão, operação e confiança. O padrão de serviço que um empreendimento AAA espera, do projeto ao suporte, com operação própria."

- Mantenha a ideia dos três pilares (**padrão, operação, confiança**), mas com design vivo:
  - Fotos reais da operação (técnicos instalando, quadro elétrico organizado, carregadores Eletrix em prédios de alto padrão) dominando a composição, com pouco texto por cima ou ao lado.
  - Uma frase forte por pilar, no máximo uma linha de apoio. Provas concretas no lugar de adjetivos (ex.: operação própria, suporte 24h, 2 anos de garantia nos carregadores, "nenhuma estação desinstalada por falta de suporte").
  - Layout que não seja "três cards iguais com ícone em cima". Pense em composição editorial com foto grande + pilares, ou foto por pilar com alternância.
- Nesta seção, "padrão AAA" pode aparecer de forma pontual (é sobre empreendimentos), mas não como título principal da home.

---

## C-10. SEÇÃO DO APP

> "Não fala de nota nas lojas de aplicativo, por favor. Faça um mockup mais bonito do iPhone e deixe clean."

- **Remova qualquer nota, estrelas ou número de avaliações.**
- **Mockup de iPhone bonito e limpo**, feito em HTML/CSS/SVG (moldura fina e realista, sombra suave), com a tela mostrando o app Eletrix (use screenshots reais do app se existirem no repositório; se não, desenhe a tela com fidelidade ao fluxo real: encontrar estação → conectar o carro → iniciar a recarga pelo app → pagamento no app). **Não mostre % de bateria** (o app não mostra).
- Texto mínimo: o que o app faz em 1 frase + 2 ou 3 passos curtos (baixar, cadastrar e definir pagamento, conectar e iniciar pelo app).
- Botões oficiais das lojas com os **links corretos**:
  - App Store: https://apps.apple.com/br/app/eletrix/id6444454547
  - Google Play: https://play.google.com/store/apps/details?id=com.coderbox.eletrix&hl=pt_BR&gl=US
- Corrija esses links **em todo o site** (hoje o rodapé aponta para páginas de busca das lojas).

---

## C-11. REMOVER O ROSTO DO MICHEL

> "Não sei onde está o rosto do Michel, mas tira de onde for, por favor."

- Faça uma busca completa: imagens (nomes de arquivo com michel, ceo, fundador, founder, khafif, retrato), seções do tipo "Fala do CEO", página Sobre, imprensa, imagens Open Graph/redes sociais (`og:image`), favicons, schema `Person` com foto, textos alternativos.
- Remova a foto de todos os lugares. Se uma seção depender da foto, reorganize a seção sem ela (ou remova a seção, se ficar vazia de sentido) e registre.
- Apague do repositório os arquivos de imagem do rosto que ficarem sem uso.

---

## C-12. EXTRA DA HOME: BLOCO "DÚVIDAS FREQUENTES"

- Garanta o bloco aprovado na estrutura de SEO: 4–5 perguntas no meio da home, cada uma linkando para o artigo correspondente, + "Ver todas as dúvidas" → `/guias`.
- Se for em accordion, use `<details>/<summary>` ou um componente acessível; mantenha o schema FAQPage coerente com o conteúdo visível.

---

## C-13. RODAPÉ — enxuto, bonito e organizado

> "Esse final não precisa ter um zilhão de links e de informação, pode ser algo mais bonito e organizado."

O rodapé atual tem mais de 30 links. Reduza para o essencial, com hierarquia clara. Proposta (ajuste com critério e registre):

- **Bloco da marca:** logo, slogan **"Carregando seu futuro."** (remova "Qualidade de serviço à altura de um AAA" do rodapé), botões das lojas com os links corretos, Instagram @eletrix.mobi.
- **Soluções:** Eletrix Hub · Eletrix Rent · Instalação na vaga · Para condomínios (caminho do laudo à IT-41)
- **Empresa:** Sobre · Estações (→ `/#estacoes`) · Central de dúvidas (→ `/guias`, **obrigatório**) · Suporte · Contato
- **Fale com a gente:** WhatsApp comercial (+55 11 96575-5730), Suporte 24h (+55 11 91955-2120), e-mail, endereço — exatamente como estão.
- **Linha final:** © 2026 Eletrix5 Comércio e Serviços Ltda · CNPJ · Política de privacidade · Termos de uso.
- Sem White label, Empreendimentos, Mapa de estações (página), Parceiros, Imprensa e a lista de artigos — os artigos são acessados pela Central de dúvidas.
- Os links de WhatsApp mantêm as mensagens pré-preenchidas atuais.
- Mobile: rodapé reorganizado (blocos empilhados com bom espaçamento ou accordion para as listas de links), contatos tocáveis, nada apertado.

---

## C-14. PÁGINA ELETRIX HUB — foco corporativo

> "O Eletrix Hub é para corporativos!"

- Posicione a página para **prédios corporativos e shoppings** (título, texto, fotos, CTA).
- **Remova estes dois itens:**
  - "Seguro de até R$ 500 mil — Instalação e manutenção, responsabilidade civil em todo o país."
  - "Dashboard em tempo real — Todas as recargas e carregadores em um painel."
- "Qualidade de serviço à altura de um AAA" pode ficar aqui (é a página certa para essa frase).
- Revise o resto da página com as mesmas regras (menos texto, mais prova, botões com cor, bloco "Dúvidas sobre…" no fim).

---

## C-15. HEADER (menu principal)

- Itens finais sugeridos: **Soluções ▾ · Estações (âncora) · Sobre** + à direita **App · Suporte · botão "Fale com a Eletrix"** (com cor). Sem "Empreendimentos" e sem "Guias".
- Header fixo discreto ao rolar (fundo sólido ou com leve desfoque, legível sobre qualquer seção), sem pular o layout.
- O botão "Falar no WhatsApp" flutuante: manter, mas garantir que não cubra conteúdo importante nem os botões do hero no mobile (respeitar safe area; considerar só ícone no mobile).

---

## C-16. REVISÃO GLOBAL DAS DEMAIS PÁGINAS

Aplique os mesmos padrões em todas as páginas que continuam no site (Eletrix Rent, Instalação em vaga privativa, Carregadores, Laudo, Infraestrutura seca, Controle de demanda, Adequação IT-41, Troca de operador, Para empresas, Para condomínios, Sobre, Contato, Suporte, App, Central de dúvidas, grupos e artigos, Política de privacidade, Termos):

- Menos texto, hierarquia clara, um CTA principal com cor por página.
- Bloco "Dúvidas sobre…" no fim das páginas de serviço.
- Mesmos componentes, mesmos tokens, mesma linguagem visual.
- Página "Sobre": sem foto do Michel (C-11).
- Formulários (Contato): rótulos claros, `autocomplete`, `inputmode` e `type` corretos (tel, email), validação útil, mensagem de sucesso e de erro clara, sem perder o que foi digitado.

---

# PARTE 3 — REGRAS DE TEXTO E CONTEÚDO

1. Português do Brasil, frases curtas, voz ativa, linguagem simples (o morador e o síndico precisam entender).
2. **Menos texto sempre.** Cada texto tem uma função. Se não ajuda a entender ou a agir, sai.
3. Nunca usar as palavras "insights" e "colaboração", nem a expressão "marco importante".
4. Nada de texto com cara de IA: sem frases genéricas ("soluções inovadoras", "transforme sua experiência"), sem exagero de adjetivos.
5. Botões dizem exatamente o que acontece ("Falar no WhatsApp", "Agendar visita técnica"), em sentence case.
6. Sem rótulos em CAIXA ALTA espaçada acima de todos os títulos (o famoso "eyebrow"); use só se carregar informação real.
7. Sem `→` colado em todo botão e link por padrão. Use ícone de seta só onde ajuda.
8. Preços: manter os que existem (laudo a partir de R$ 2.799; carregadores a partir de R$ 2.799; "orçamento após visita técnica"). **IT-41: sem preço.**
9. Não inventar números, clientes, depoimentos, prêmios ou funcionalidades. Depoimentos existentes que são placeholders devem continuar claramente marcados como tal no código (comentário) e listados em `REDESIGN-PENDENCIAS.md`.
10. Dados de contato e endereço: exatamente como estão na Parte 1.

---

# PARTE 4 — REFERÊNCIAS, SKILLS E GUIAS (CONSULTAR E APLICAR)

Use estas referências juntas, com inteligência, não de forma mecânica. Se uma Skill estiver instalada, use-a diretamente. Se não estiver, consulte a documentação pública (WebFetch) quando acessível e aplique os princípios relevantes. **Não assuma que uma Skill está instalada ou que um link foi lido com sucesso** — no relatório, diga exatamente quais você conseguiu acessar. Não instale dependências só para "cumprir a lista".

## 4.1 Design visual e identidade

| # | Referência | Link | Para que usar |
|---|---|---|---|
| 1 | **Anthropic — Frontend Design Skill** (texto integral no ANEXO A) | https://github.com/anthropics/skills/tree/main/skills/frontend-design · https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md · plugin: https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design | Referência principal: identidade visual distinta, tipografia, composição, cor, evitar estética genérica de IA. |
| 2 | **Impeccable** | https://github.com/pbakaus/impeccable · https://github.com/pbakaus/impeccable/blob/main/README.md | Métodos de crítica e refinamento: CRITIQUE, AUDIT, DISTILL, POLISH, QUIETER, TYPESET, LAYOUT, HARDEN (ver 4.4). |
| 3 | **Vercel — Web Design Guidelines** | https://github.com/vercel-labs/agent-skills · https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md | Qualidade de implementação: acessibilidade, HTML semântico, teclado, foco, formulários, tipografia, responsivo, feedback, carregamento, animação, performance. |
| 4 | **UI UX Pro Max** | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/README.md | Sistema de design: combinações tipográficas, paletas, escala de espaçamento, consistência de componentes, navegação, hierarquia. **Refinar a identidade atual, não inventar outra.** |
| 5 | **Unslop UI Skill** | https://github.com/claudiusararu/unslop-ui-skill | Identificar e eliminar padrões visuais de IA. |
| 6 | **Unslop** | https://github.com/heydamir/unslop | Idem, segunda referência. |
| 7 | **Emil Kowalski — Design Engineering / Animate** | https://github.com/emilkowalski/skills · https://github.com/emilkowalski/skills/blob/main/skills/animate/SKILL.md | Microinterações e movimento: hover, botões, dropdown, modais, timing, easing, foco. Movimento rápido, sutil e previsível. |

## 4.2 Responsividade e mobile

| # | Referência | Link / repositório | Para que usar |
|---|---|---|---|
| 8 | **Mobile Responsive Skill** | `AsadSumbul/mobile-responsive` (https://github.com/AsadSumbul/mobile-responsive) | Layout mobile-first, componentes fluidos, reflow, escala tipográfica, overflow, navegação responsiva, toque. |
| 9 | **Antislop Layout Mobile** | `cedimscalapan/cedims`, skill `antislop-layoutmobile` (https://github.com/cedimscalapan/cedims) | Evitar adaptação superficial desktop→mobile; recompor cada página para tela pequena. |
| 10 | **UX Skills for Claude** | `parhamb/design-skills` (https://github.com/parhamb/design-skills) — priorizar ux-review, ux-navigation, ux-forms, ux-information-architecture, ux-accessibility, ux-visual-design | Avaliar a experiência mobile completa, não só o CSS. |
| 11 | **Google web.dev — Responsive Web Design Basics** | https://web.dev/articles/responsive-web-design-basics | Breakpoints guiados pelo conteúdo, layouts flexíveis, tipografia responsiva, interações conforme o tipo de entrada. |
| 12 | **Nielsen Norman Group — Mobile UX** | https://www.nngroup.com/topic/mobile-tablet-design/ | Descoberta, navegação eficiente, menor custo de interação, hierarquia, toque confortável. Considere também a pesquisa da NN/g sobre os efeitos ruins do mobile-first mal adaptado no desktop. |

## 4.3 UX, acessibilidade, performance e validação

| # | Referência | Link | Para que usar |
|---|---|---|---|
| 13 | **NN/g — 10 heurísticas de usabilidade** | https://www.nngroup.com/articles/ten-usability-heuristics/ | Avaliar o site inteiro contra as 10 heurísticas. |
| 14 | **NN/g — Progressive disclosure** | https://www.nngroup.com/articles/progressive-disclosure/ | Mostrar o essencial primeiro; revelar o secundário quando fizer sentido. |
| 15 | **NN/g — Empty states** | https://www.nngroup.com/articles/empty-state-interface-design/ | Estados vazios, carregando, erro, sucesso, desabilitado. |
| 16 | **Mobbin** | https://mobbin.com/ | Referências de produtos reais (se acessível). Inspiração, nunca cópia. |
| 17 | **Refero** | https://refero.design/ | Padrões de interface de produtos reais (se acessível). Inspiração, nunca cópia. |
| 18 | **WCAG 2.2** | https://www.w3.org/TR/WCAG22/ | Meta: nível AA. |
| 19 | **Core Web Vitals** | https://web.dev/articles/vitals | Metas: LCP ≤ 2,5s · INP ≤ 200ms · CLS ≤ 0,1 (medir, não supor). |
| 20 | **Microsoft Playwright MCP** | https://github.com/microsoft/playwright-mcp | Validar o site renderizado no navegador. |

## 4.4 Como usar os métodos do Impeccable neste projeto

- **CRITIQUE:** avaliar hierarquia fraca, componentes inconsistentes, espaçamento ruim, interações confusas, complexidade visual desnecessária.
- **AUDIT:** acessibilidade, responsividade, qualidade das interações, performance, consistência de implementação.
- **DISTILL:** cortar elementos, conteúdo redundante, explicações em excesso, enfeites. (É o pedido central do Michel: menos texto.)
- **POLISH:** refinar tipografia, alinhamento, espaçamento, bordas, proporções, relações de cor, detalhes de componentes.
- **QUIETER:** reduzir ênfase excessiva, cores desnecessárias, sombras fortes, elementos decorativos, prioridades competindo.
- **TYPESET:** melhorar tipografia, hierarquia de texto, tamanhos, entrelinhas, legibilidade, ritmo.
- **LAYOUT:** composição, alinhamento, sistema de espaçamento, densidade, comportamento responsivo.
- **HARDEN:** carregamento, erros, conteúdo vazio, textos longos, entradas incomuns.

Use cada método de acordo com os problemas encontrados na auditoria.

---

# PARTE 5 — PADRÃO PROFISSIONAL DE UI/UX

O objetivo não é só deixar o site mais bonito. É deixá-lo **melhor de usar**, com o nível de um time experiente de Product Designers, UX Architects, UI Designers e Frontend Engineers — não de um template de IA.

## 5.1 Sistema de design unificado (tokens)

Audite o que existe e consolide em tokens reutilizáveis (variáveis CSS ou o sistema que o projeto já usa). **Não introduza um framework de UI novo** sem motivo técnico forte.

- **Cores:** azul da marca #10B7FF (primário), azul-marinho escuro da marca (superfícies escuras), um tom de azul bem claro para seções intermediárias, branco, cinzas de texto e borda com contraste AA, cores semânticas (sucesso, alerta, erro), estados interativos (hover, ativo, foco, desabilitado). Paleta contida, cor usada com intenção.
- **Tipografia:** no máximo duas famílias (ou uma só bem trabalhada), escala tipográfica clara, pesos intencionais, entrelinhas, espaçamento de letras, limites de largura de linha (< 80 caracteres), regras de quebra/truncamento. Avalie a tipografia atual: se for genérica para o assunto, escolha algo com mais personalidade e legibilidade, coerente com a marca, e registre.
- **Espaçamento:** uma escala única (ex.: 4/8/12/16/24/32/48/64/96/128). Nada de valores arbitrários diferentes por página. Ritmo vertical consistente entre seções.
- **Raios e sombras:** hierarquia (não o mesmo raio e a mesma sombra em tudo). Poucas sombras, sutis.
- **Componentes padronizados:** botões (primário, secundário, terciário/link, tamanhos), campos de formulário, selects, checkboxes, cards (quando forem realmente necessários), tabelas, tabs, accordions, modais, tooltips, navegação, badges, notificações. Componentes parecidos têm a mesma aparência e o mesmo comportamento.
- Cuidado com especificidade de CSS: classes de seção e de componente não podem se anular (especialmente padding/margin entre seções).

## 5.2 Arquitetura de informação e hierarquia

Cada página tem um propósito claro, cada ação importante é fácil de achar, cada seção justifica sua presença. Prioridade de leitura:
1. O que a pessoa precisa entender.
2. O que a pessoa precisa fazer.
3. Informação de apoio relevante.
4. Detalhes secundários, acessíveis quando necessários.

Nem todo elemento tem a mesma importância visual. Simplifique a navegação, reduza passos, agrupe o que é relacionado, elimine explicações redundantes, deixe a ação principal óbvia.

## 5.3 As 10 heurísticas da NN/g aplicadas ao site

1. Visibilidade do estado do sistema (ex.: menu aberto/fechado claro, envio de formulário com feedback).
2. Correspondência com o mundo real (palavras do morador e do síndico, não jargão interno).
3. Controle e liberdade (fechar menus com Esc/toque fora, voltar fácil).
4. Consistência e padrões (mesmo botão, mesmo nome, mesma ação em todo o site).
5. Prevenção de erros (formulários com tipos certos e validação).
6. Reconhecimento em vez de memorização (navegação visível, onde estou).
7. Flexibilidade e eficiência (atalhos claros: WhatsApp, botões do hero).
8. Estética e minimalismo (o pedido central: menos texto, menos ruído).
9. Ajudar a reconhecer e corrigir erros (mensagens claras, sem pedir desculpas, dizendo o que fazer).
10. Ajuda e documentação (Central de dúvidas acessível pelo rodapé e pela home).

## 5.4 Estados da interface

Revise e projete: carregando (imagens com placeholder sem layout shift), vazio, erro (formulário: o que deu errado e como resolver), sucesso ("Mensagem enviada" — a ação mantém o mesmo nome do botão), desabilitado (deixar claro por quê). Mensagens curtas e naturais.

## 5.5 Acessibilidade — WCAG 2.2 AA

Contraste de texto (incluindo texto sobre a foto escurecida do hero e sobre o mapa), navegação por teclado completa, foco visível em tudo, HTML semântico, um H1 por página e títulos em ordem lógica, rótulos de formulário, identificação de erros, compatibilidade com leitor de tela, tamanho de alvo de toque, `prefers-reduced-motion` em **todas** as animações (LED do hero, contagem, marquee, pulso dos pins, rolagem suave), diálogos/menus acessíveis, informação que não depende só de cor, `lang="pt-BR"`, textos alternativos úteis. Testes automáticos não bastam: verifique também manualmente.

## 5.6 Performance

Meta Core Web Vitals: LCP ≤ 2,5s, INP ≤ 200ms, CLS ≤ 0,1. Prioridades: imagem do hero otimizada e priorizada; demais imagens com `loading="lazy"` e dimensões definidas; fontes com `font-display: swap` e pré-carregamento só do necessário; pouco JavaScript (o site é estático — animações em CSS sempre que possível); mapa como SVG estático; sem dependências desnecessárias; nada de efeitos caros (blur pesado em áreas grandes, animação de propriedades que causam layout). Meça com Lighthouse (se disponível) antes e depois e registre os números reais.

## 5.7 Princípios inegociáveis

1. Menos ruído visual.
2. Hierarquia de informação melhor.
3. Consistência acima de variedade.
4. Usabilidade acima de decoração.
5. Qualidade acima de complexidade.
6. Interações com propósito e feedback.
7. Tipografia profissional.
8. Identidade visual contida e intencional.
9. Confiabilidade no mundo real (carregando, vazio, erro, textos longos).
10. Nada de estética genérica de IA.
11. Preservar o produto (funcionalidades e fluxos que funcionam).
12. Nenhuma informação desnecessária.
13. Nada de engenharia excessiva.
14. Validação visual é essencial.
15. Todo elemento precisa ter um propósito.

---

# PARTE 6 — EXPERIÊNCIA MOBILE E DESKTOP

> **Não quero um site de desktop simplesmente redimensionado para o celular.** Quero duas experiências igualmente excelentes, pensadas de forma independente, com a mesma identidade.

## 6.1 Mobile como experiência de primeira classe

Para cada página, pergunte: o que a pessoa precisa logo de cara? Qual é a ação principal? O que está ocupando espaço sem necessidade? Dá para fazer com o polegar, confortavelmente? A tela parece pensada para celular ou só espremida?

- Não basta "nada vaza da tela". Precisa ser equilibrado, intuitivo, eficiente e confortável.
- Não empilhe todos os elementos do desktop numa coluna infinita. Reorganize: prioridade, divulgação progressiva, carrosséis horizontais quando fizerem sentido (galeria de prédios, parceiros), accordions para listas longas (rodapé, dúvidas).
- Títulos não podem ocupar a tela inteira; textos não podem ficar minúsculos.
- Hero no mobile: foto com recorte vertical pensado, H1 em 2–3 linhas, **dois botões lado a lado**, link IT-41, números em uma linha de 4 ou 2×2 (escolha o que fica mais equilibrado), e um indício de que há conteúdo abaixo (a próxima seção com cor diferente aparecendo).

## 6.2 Desktop com excelência própria

Aproveite a tela grande: colunas, lado a lado (fotos + mapa, etapas do síndico na horizontal), densidade adequada, navegação completa visível (mega menu), interações de mouse e teclado. Não force padrões de celular no desktop: nada de componentes gigantes, rolagem excessiva ou funções escondidas atrás de menu hambúrguer.

## 6.3 Navegação adaptativa

- Desktop: header com mega menu de Soluções.
- Mobile: header compacto + menu em tela cheia/gaveta (corrigido em C-3), organizado por perfil. Não introduza bottom navigation só por introduzir — o site tem poucos destinos; avalie e registre.
- Nunca dependa só de gestos. A pessoa sempre sabe onde está e como voltar.

## 6.4 Toque

Alvos de 44–48px, espaço entre elementos tocáveis, estados de toque (pressionado) visíveis, nada que dependa só de hover, ações principais ao alcance do polegar quando fizer sentido.

## 6.5 Formulários no celular

Teclado certo (`type="tel"`, `type="email"`, `inputmode`), `autocomplete` correto, rótulos sempre visíveis, validação clara, teclado virtual não cobrindo o botão de enviar, nada de perder o que foi digitado.

## 6.6 Detalhes de navegador mobile

iOS Safari e Android Chrome: `100dvh`/`svh` em vez de `100vh`, `env(safe-area-inset-*)`, barra do navegador que some e aparece, elementos fixos (header, botão de WhatsApp) que não cobrem conteúdo, rolagem por toque suave, retrato e paisagem. Não imite app nativo sem necessidade: o objetivo é um **site mobile excelente**.

## 6.7 Uma identidade só

Layouts, navegação e composição podem ser diferentes entre mobile e desktop; tipografia, cores, ícones, ilustrações, linguagem e terminologia são as mesmas. Use os mesmos componentes e tokens; não duplique implementações.

## 6.8 Larguras de teste (referência, não breakpoints obrigatórios)

320 · 360 · 390 · 430 · 768 · 1024 · 1440 · 1920 px. Breakpoints reais são definidos pelo conteúdo.

## 6.9 Auditorias separadas

Para cada página importante, avalie duas vezes:
- **Mobile:** navegação, toque, prioridade da informação, uso do espaço, legibilidade, conclusão da tarefa (chegar ao WhatsApp / pedir visita), formulários, eficiência da rolagem, consistência.
- **Desktop:** densidade, composição, eficiência da navegação, visualização (mapa), velocidade, teclado e mouse, agrupamento, refinamento.

Não considere terminado até as duas atingirem padrão profissional. Layout responsivo que "funciona" não é necessariamente boa UX.

---

# PARTE 7 — DIREÇÃO DE DESIGN, ANTI-PADRÕES DE IA E AUTOCRÍTICA

## 7.1 Processo em duas passadas (da Skill Frontend Design)

**Passada 1 — plano.** Antes de codar o redesign visual, escreva em `REDESIGN-DECISOES.md` um plano compacto:
- **Cor:** 4–6 cores nomeadas com hex (partindo do #10B7FF e do azul-marinho atual).
- **Tipografia:** famílias e papéis.
- **Layout:** conceito de layout da home e das páginas de serviço, com wireframes em ASCII; regras de alinhamento.
- **Princípios:** o que torna este site único — a partir do universo da Eletrix (energia, cabo, carregador, garagem de prédio, quadro elétrico, LED azul do carregador, o próprio azul da marca).
- **O elemento memorável:** escolha **um** lugar para ousar (provavelmente o hero com o LED de energia, ou o mapa com pins brilhando) e mantenha o resto disciplinado.

**Revisão do plano:** compare com o que você faria para "qualquer site de recarga de carro elétrico". O que for genérico, revise e diga o que mudou e por quê. Só depois implemente.

**Passada 2 — construir e criticar.** Implemente, abra no navegador, tire screenshots, critique como um diretor de arte exigente, corrija. Conselho da Chanel: antes de sair de casa, olhe no espelho e tire um acessório.

## 7.2 Padrões de IA a eliminar (quando usados sem intenção)

- Cantos excessivamente arredondados e o mesmo raio em tudo.
- Gradientes decorativos sem função.
- Layout SaaS genérico; grades de cards idênticos com a mesma sombra cinza (`rgba(0,0,0,.1)`).
- Glassmorphism decorativo; fundos decorativos carregados.
- Ícones genéricos de biblioteca sem relação com o assunto.
- Títulos gigantes sem necessidade; destacar uma única palavra do título com outra cor/itálico.
- Rótulos em CAIXA ALTA espaçada acima de todo título; numeração 01/02/03 em conteúdo que não é sequência.
- Strings com ponto médio "A · B · C" e rótulos "PALAVRA — fragmento" como enfeite; `→` em todo botão.
- Fonte monoespaçada para rótulos pequenos sem motivo; preto "quase preto" (#0B0B0B/#111) no lugar de uma cor da marca.
- Badges coloridos desnecessários; animações de "fade e sobe" em toda seção; hover animado em todo card.
- Excesso de espaço em branco ou densidade ruim; falta de hierarquia; tipografia genérica; páginas com cara de template.
- Paletas típicas de IA: fundo creme (#F4F1EA) com serifa e terracota (#D97757); fundo quase preto com um único verde-ácido; layout de jornal com linhas finas e zero raio.

**Importante:** cantos arredondados, gradientes, cards, sombras e animações não são proibidos. O que sai é o uso **desnecessário, repetitivo ou mal executado**. O objetivo não é um site vazio e minimalista demais — é um site **intencional**.

## 7.3 Movimento

Movimento automático só para chamar atenção, com parcimônia: aqui, o LED do hero, a contagem dos números e o brilho dos pins. Nada de animação de entrada em cada seção. Movimento que responde à ação da pessoa (abrir menu, expandir dúvida, enviar formulário) é bem-vindo quando mostra o que mudou. Transições rápidas (150–250ms), easing natural, previsíveis. Tudo respeita `prefers-reduced-motion`.

## 7.4 Escrita como design

Palavras existem para facilitar entender e usar. Escreva do ponto de vista do usuário, nomeie as coisas como ele entende, descreva o que algo é ou faz sem "vender". Voz ativa. O botão diz o que acontece. Uma ação tem o mesmo nome no fluxo todo. Erros explicam o que houve e como resolver, sem pedir desculpas. Tom conversacional, verbos simples, sentence case, sem enchimento.

## 7.5 Polimento final (detalhes que separam médio de profissional)

Alinhamento ótico, proporção tipográfica, consistência de títulos, legibilidade, ritmo vertical, dimensões de componentes, raios, espessura de bordas, alinhamento de ícones, proporção de botões, altura de campos, espaçamento da navegação, contraste de fundo, hierarquia de superfícies, hover, foco, sombras, composição de modais, transições responsivas, indicadores de carregamento, estados vazios, mensagens de erro. Corrija pequenas inconsistências que, somadas, derrubam a qualidade percebida. **Não mude o que já está bom só para mostrar atividade.**

---

# PARTE 8 — O QUE DEVE SER PRESERVADO

Esta é uma iniciativa de melhoria de UI/UX e das correções listadas, não uma licença para reconstruir tudo.

- Preservar: estrutura de SEO aprovada (Parte 1), URLs das páginas que continuam, schema, sitemap, metadados, links de WhatsApp com mensagens pré-preenchidas, formulários funcionando, contatos, conteúdo dos artigos/guias, identidade da marca (azul #10B7FF, logo).
- Não remover funcionalidades além das pedidas.
- Não adicionar dependências sem justificativa (ferramentas de teste e scripts de build do mapa podem entrar como `devDependencies` — registre).
- Não substituir componentes que funcionam bem sem motivo.
- Não criar funcionalidades novas além das pedidas, exceto se estiverem em `REDESIGN-IDEIAS.md` como proposta e forem pequenas e claramente positivas (ver Parte 10).
- **Não mude algo que já está bom só porque dá para mudar.**

---

# PARTE 9 — VALIDAÇÃO REAL NO NAVEGADOR

Build sem erro **não** significa interface pronta.

1. Use o Playwright MCP se estiver disponível. Se não estiver, use Playwright via `npx` com um script de screenshots em `scripts/qa/` (ferramenta de desenvolvimento, não vai para o site publicado).
2. Fluxo de validação:
   1. Abrir o site local.
   2. Navegar pelas páginas e fluxos principais.
   3. Tirar screenshots nas larguras da Parte 6.8 (pelo menos 360, 390, 768, 1024, 1440).
   4. Identificar problemas visuais e de usabilidade.
   5. Corrigir.
   6. Reabrir, comparar com o "antes", checar se não houve regressão.
   7. Repetir até resolver os problemas significativos.
3. Fluxos que precisam ser testados de ponta a ponta, em mobile e desktop:
   - Abrir e fechar o menu mobile (C-3) — sem travar a tela.
   - Mega menu de Soluções (desktop) e soluções no menu mobile.
   - Item "Estações" do menu levando à seção da home (de dentro da home e de outra página).
   - Botões do hero → páginas certas; link "Síndico ou gestor" → produto.
   - Links antigos `/empreendimentos/` e `/estacoes/` → redirecionam para `/#estacoes`.
   - Links das lojas de app.
   - WhatsApp comercial e suporte.
   - Formulário de contato (preenchimento, validação, mensagem).
   - Central de dúvidas pelo rodapé e pelo bloco da home.
   - Teclado: navegar a home inteira só com Tab/Shift+Tab/Enter/Esc, com foco visível.
   - `prefers-reduced-motion: reduce` emulado: nada se mexe sozinho.
4. Checagens automáticas: build, links internos quebrados (crie uma checagem simples se não existir), console sem erros, Lighthouse (performance, acessibilidade, boas práticas, SEO) antes e depois, se disponível.
5. Salve as screenshots finais em `qa/depois/` com nomes claros (`home-390.png`, `home-1440.png`, etc.).
6. Se alguma ferramenta não estiver disponível, **diga isso no relatório**. Não afirme que validou algo que não validou.

---

# PARTE 10 — LIBERDADE CRIATIVA: NOVAS IDEIAS

O Michel quer que você também pense em ideias novas para levar o site a outro patamar, sempre dentro do nicho de recarga de carros elétricos e da identidade da Eletrix.

- Implemente ideias pequenas e claramente positivas que reforcem os pedidos (ex.: detalhe da Grande SP no mapa, microinteração do cabo "energizando" no hover do botão primário, ilustração consistente nos perfis e nas etapas).
- Ideias maiores ou que mudem conteúdo/estrutura: **não implemente na versão principal**; descreva em `REDESIGN-IDEIAS.md` com o porquê, o esforço e, se possível, um esboço (ASCII ou uma página de protótipo separada em `/prototipos/`, fora do menu e com `noindex`).
- Toda ideia passa pelo filtro: melhora o entendimento ou a conversão (WhatsApp, visita técnica, contato)? Combina com uma empresa grande e séria do setor? Não é enfeite?

---

# PARTE 11 — ENTREGÁVEIS E RELATÓRIO FINAL

Ao terminar, deixe na raiz do projeto:

1. **`REDESIGN-RELATORIO.md`** (em português, conciso, focado em resultado):
   1. **Correções do Michel (C-1 a C-16):** uma linha por item — feito / feito parcialmente / pendente, e onde.
   2. **Principais melhorias de UX:** o que mudou e por quê.
   3. **Refinamentos visuais:** tipografia, layout, espaçamento, hierarquia, componentes, consistência.
   4. **Estética de IA removida:** quais padrões foram corrigidos.
   5. **Sistema de design:** tokens e componentes padronizados.
   6. **Acessibilidade e responsividade:** o que foi verificado e corrigido, por largura.
   7. **Validação:** quais testes funcionais e visuais foram **realmente** executados, com números do Lighthouse antes/depois se medidos.
   8. **Referências consultadas:** quais Skills/links foram realmente acessados e usados, e quais não puderam ser acessados.
   9. **Limitações:** o que não pôde ser validado ou concluído.
   10. **Como ver:** comandos para rodar localmente e lista das screenshots em `qa/depois/`.
2. **`REDESIGN-DECISOES.md`** — plano de design, frase do hero escolhida e alternativas, e todas as decisões tomadas sozinho.
3. **`REDESIGN-PENDENCIAS.md`** — tudo que depende do Michel (fotos, lista de pontos a instalar, textos a confirmar, depoimentos reais).
4. **`REDESIGN-IDEIAS.md`** — ideias novas.
5. **`qa/antes/` e `qa/depois/`** — screenshots.
6. Branch `redesign-v2` com commits organizados e enviada ao GitHub (sem merge na principal, sem publicar).

Não afirme que ferramentas, Skills, testes ou auditorias foram usados se não foram.

---

# DIRETRIZ FINAL

O site deve ser:
- Profissional sem ser genérico.
- Sofisticado sem ser excessivo.
- Mínimo sem parecer vazio.
- Informativo sem sobrecarregar.
- Moderno sem seguir modinha.
- Visualmente marcante sem perder usabilidade.
- Interativo sem animação desnecessária.
- Consistente sem ser repetitivo.
- Tecnicamente confiável sem complexidade desnecessária.
- Excelente no desktop **e** excelente no celular — cada um pensado para o seu contexto.

Um visitante deve abrir o site e, em 3 segundos, entender: **a Eletrix é uma rede grande de recarga de carros elétricos e resolve a recarga do prédio e da vaga dele.** E saber exatamente em qual botão clicar.

**Não deixe o site só mais bonito. Deixe-o realmente melhor de usar — com cara de empresa grande do setor, feito por um time experiente, e não por um template de IA.**

---

# ANEXO A — SKILL FRONTEND DESIGN (ANTHROPIC), TEXTO INTEGRAL

> Fonte: https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md — reproduzido para garantir que você tenha o conteúdo mesmo sem a Skill instalada. Onde este anexo e as Partes 2–3 divergirem, **valem os pedidos do Michel** (por exemplo, a cor da marca já está definida).

**name:** frontend-design
**description:** Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defaults.

## Frontend Design

Approach this as the design lead at a design studio known for giving every client a distinct visual identity that is not mistaken for anyone else's. This client has already rejected proposals that felt cliché or templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take aesthetic risk if justified.

### Ground your designs in the subject matter

If the brief does not identify what the product or subject matter is, identify it yourself before designing, and confirm with the client. You can come up with one concrete subject, the design's audience, and the design's primary job, as a proposal. If there's any information in your memory about the client's preferences or context about what they're building, use that as a hint. The subject's industry, subject matter, materials, and vernacular are where distinctive visual choices come from — a design for a toy for girls aged 8–11 will be very aesthetically different from a dashboard for financial analysts. Build with the brief's real content and subject matter throughout.

### Design principles

For web designs, the hero is the first thing viewers will see. Open with the most characteristic thing in the subject's world, in the form that is most appropriate: a headline, an image, an animation, a live demo, an interactive moment, or other treatments. Be deliberate with your choice: a big number with a small label, supporting stats, and a gradient accent is the default treatment, so only use it if that's truly the best option.

Typography carries the personality of the page. You don't need a different typeface for display or headline text and body content: use one family or two, and if two, make them clearly distinct.

Choose your typefaces deliberately, not the default families you would reach for on any other project, and set a clear type scale following the default guidance of The Elements of Typographic Style with intentional weights, widths, and spacing. When type is used as a headline or visual element, use the type treatment itself as an active part of the design, not a neutral delivery vehicle for the content.

Default to line lengths of less than 80 characters. Serif typefaces can have slightly longer line lengths; give serif body text slightly more line-height than a sans-serif.

Avoid these default typographic treatments; they are the commonest tells of a generated page:

- Accenting just a single word or phrase in a headline, like putting one word in italic/bold or a different color.
- Using all caps for labels.
- Adding unnecessary typographic labels above content.

Visual structure is information. Structural devices like outlines, borders, numbering, eyebrows, dividers, labels, etc., encode useful information about the content rather than decorate it. Many generic designs use numbered markers (01 / 02 / 03), but that's only appropriate if the content actually is a sequence — like a stepped process or a timeline. Before adding numbered markers, check the content really is a sequence.

Use non-user-triggered motion sparingly and deliberately, only to draw attention. A single orchestrated moment — one page-load sequence or one reveal — lands better than scattered effects; fade-and-slide-up entrances on each section and hover transitions on every card are the generic default and read as AI-generated. Motion that answers a person's action (opening, expanding, confirming) is welcome when it shows what changed.

Consider written content carefully. Often a design brief may not contain real content, and it's up to you to come up with copy and placeholder content. Copy can make a design feel as templated as the design itself. See the below section on writing for more guidance.

### Process: plan, review against the brief, build, critique

For calibration, AI-generated design right now clusters around some traits:

- a warm cream background (near #F4F1EA) with a high-contrast serif display and a terracotta or warm-clay accent (often near #D97757 — Anthropic's own Claude-interaction accent, so on a user's brief it reads as a tell);
- a near-black background with a single bright acid-green or vermilion accent;
- a broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns;
- the SaaS-card kit: content chopped into identical rounded cards, one border-radius on everything regardless of hierarchy, the same soft grey shadow (rgba(0,0,0,.1)) under each, and gradient washes as decoration;
- template chrome that appears whatever the subject: a tracked-out ALL-CAPS eyebrow label above every heading; meta strings joined with middle dots ('A · B · C'); labels built as 'WORD — fragment' with a spaced em dash; tinted near-black (#0B0B0B, #111) standing in for black; a monospace face for small data labels; a '→' appended to link and button text.

All traits are legitimate for some briefs, but they are defaults rather than choices, and they appear regardless of subject. Where the brief pins down a visual direction, follow it exactly — the brief's own words always win, including when it asks for one of these looks. Where it leaves an axis free, don't spend that freedom on one of these defaults. As with a hired human designer, there's often a careful balance between doing what you're good at and taking each project as a chance to experiment and learn.

Work in two passes. First, brainstorm a short design plan based on the client's design brief: create a compact token system with color, type, layout, and principles.

- Color: describe the core base palette as 4–6 named hex values.
- Type: the typefaces and their roles.
- Layout: a layout concept, using one-sentence prose descriptions and ASCII wireframes to ideate and compare. Include alignment guidance; should the content be left aligned, center aligned, justified?
- Principles: the high-level guidance for what makes this page unique.

Then review that plan against the brief before building: if any part of it reads like the generic default you would produce for any similar page (work through a similar prompt to see if you arrive somewhere similar) rather than a choice made for this specific brief — revise that part, say what you changed and why. Only after you've confirmed the relative uniqueness of your design plan should you start to write the code, following the revised plan.

When writing the code, be careful of structuring your CSS selector specificities. It's easy to generate CSS classes that cancel each other out (especially with a type-based selector like .section and an element-based selector like .cta). This can happen often with padding/margin between sections.

### Restraint and self-critique

Spend your boldness in one place. Let one element be the memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief. Build to a quality floor without announcing it: responsive down to mobile, visible keyboard focus, reduced motion respected, visually accessible, harmonious color palettes. Critique your own work as you build, taking screenshots to review if your environment supports it — a picture is worth 1000 tokens. Consider Chanel's advice: before leaving the house, take a look in the mirror and remove one accessory. Human creatives have memory and always try to do something new, so if you have a space to quickly jot down notes about what you've tried, it can help you in future passes.

### More on writing in design

Words appear in a design for one reason: to make it easier to understand and use. They are design content, not decoration. Bring the same intentionality and minimalism to copywriting that you would bring to spacing and color. Before writing anything, ask what the design needs to say, and how it can best be said to help the person navigate the experience.

Write from the end user's perspective. Name things by what users will understand in simple language, not by how the system is built. A user manages notifications, not webhook config. Describe what something is or does in plain terms rather than selling it. Being specific and legible to new users is always better than being clever.

Use active voice as default. A CTA says exactly what happens when it is used: "Save changes," not "Submit." An action keeps the same name through the whole flow, so the button that says "Publish" produces a toast that says "Published." The vocabulary of an interface is the signposting for someone navigating the product. Cohesion and consistency are how people learn their way around.

Treat failure and emptiness as moments for direction, not mood. Explain what went wrong and how to fix it, in the interface's voice rather than a person's. Errors don't apologize, and they are never vague about what happened. An empty screen is an invitation to act.

Keep the tone conversational: plain verbs, sentence case, no filler, with tone matched to the brand and the audience. Let each written element do exactly one job.

---

# ANEXO B — CHECKLIST FINAL DE ACEITE

Responda cada item no relatório (sim / não / parcial, com uma linha de explicação).

**Correções do Michel**
- [ ] Hero: foto real escurecida + LED azul animado, H1 curto, sem "AAA" e sem parágrafo longo
- [ ] Botões do hero lado a lado no celular
- [ ] Link "Síndico ou gestor" leva ao produto
- [ ] Números com contagem em escadinha (e estáticos com reduced motion)
- [ ] Seção abaixo do hero com cor diferente, convidando a rolar
- [ ] Parceiros: logos maiores, só rolagem, sem pausar e sem "ver todos"
- [ ] Menu mobile abre, rola e fecha sem travar
- [ ] "Qual é o seu caso?": visual que se entende antes de ler, botões com cor, sem numeração falsa
- [ ] Site menos branco, com ritmo de cor entre seções; todos os botões com cor
- [ ] Mega menu com fundo e divisórias sólidas, sem White label
- [ ] Processo do síndico profissional, conectores centralizados, **sem preço da IT-41 em nenhum lugar**
- [ ] Seção Estações: 6 fotos de prédios de SP + mapa com divisas municipais azuis e pins brilhando, estático
- [ ] Todos os pontos (operando + a instalar) no mapa, ou pendência registrada
- [ ] Páginas Empreendimentos e Estações removidas, com redirecionamento e links atualizados
- [ ] "Estações" no menu rola para a seção
- [ ] Seção "Do Sul ao Nordeste" removida
- [ ] "Por que a Eletrix" vivo, com fotos e pouco texto
- [ ] App: sem nota das lojas, mockup de iPhone limpo, links corretos em todo o site
- [ ] Rosto do Michel removido de todo o site
- [ ] Rodapé enxuto, com "Central de dúvidas" e contatos corretos, sem "AAA"
- [ ] Eletrix Hub focado em corporativo, sem "Seguro de até R$ 500 mil" e sem "Dashboard em tempo real"
- [ ] "Guias" fora do menu principal; bloco "Dúvidas frequentes" na home

**Qualidade**
1. O site ainda parece feito por IA?
2. Tem identidade visual consistente e reconhecível?
3. A tipografia é profissional?
4. Espaçamento e alinhamento consistentes?
5. Navegação intuitiva?
6. Hierarquia de informação clara?
7. Há informação desnecessária?
8. Componentes consistentes?
9. Interações previsíveis?
10. O site parece rápido?
11. Estados de carregando, vazio e erro bem resolvidos?
12. O mobile é realmente bom de usar (não só "cabe")?
13. O desktop aproveita a tela grande?
14. Acessibilidade AA respeitada?
15. Parece um produto digital de uma empresa grande, feito por um time experiente?

Se houver problemas significativos, continue refinando. Quando os problemas importantes estiverem resolvidos, pare — não fique fazendo mudanças subjetivas sem fim.
