# PROMPT — RODADA 3: ÚLTIMAS CORREÇÕES ANTES DE O SITE DA ELETRIX IR AO AR

> Execução longa e autônoma, durante a noite. **Leia este arquivo inteiro antes de tocar em qualquer arquivo.**
> Idioma do site, dos commits e dos relatórios: português do Brasil.
> Este é o último ciclo antes de o site substituir o eletrix.mobi atual. O padrão é: **site de empresa grande, feito por um time experiente.** Nada de detalhe largado.

---

## 0. COMO TRABALHAR

### 0.1 Vá até o fim
- **Não pare no meio e não faça perguntas.** O Michel só vai ver de manhã. Na dúvida, escolha o que deixa o site mais profissional, registre a decisão e siga.
- Só termine quando **todos os itens R-1 a R-18** estiverem feitos (ou registrados como pendência real, com motivo) e a validação da seção 4 tiver rodado.
- Se algo travar (3 tentativas sem resolver, recurso externo fora do ar), registre em `REDESIGN-PENDENCIAS.md` e passe para o próximo item. Volte a ele no fim, se der.
- Use a lista de tarefas, um item por correção.

### 0.2 Pense de verdade
- **Antes de cada item, pense a fundo** (ultrathink): qual é a intenção do Michel, como uma empresa grande do setor resolveria isso, quais são 2–3 caminhos possíveis e qual é o melhor. Só então implemente.
- **Traga ideias novas.** Para cada item com liberdade criativa (marcados com 💡), proponha no mínimo 2 alternativas em `REDESIGN-DECISOES.md`, escolha uma e diga por quê. Ideias boas que ficaram de fora vão para `REDESIGN-IDEIAS.md`.
- Depois de implementar, **abra no navegador, tire screenshot e critique** como um diretor de arte exigente (mobile e desktop). Corrija o que não estiver impecável. Repita.

### 0.3 Contexto que continua valendo
- Leia antes: `CLAUDE.md`, `PROMPT-REDESIGN-SITE-ELETRIX.md` (prompt mestre das rodadas anteriores), `REDESIGN-DECISOES.md`, `REDESIGN-PENDENCIAS.md`, `REDESIGN-RELATORIO.md`.
- **Tudo do prompt mestre continua valendo** (regras de texto, padrão de UI/UX, acessibilidade WCAG 2.2 AA, `prefers-reduced-motion` em toda animação, performance, mobile e desktop pensados separadamente, anti-padrões de IA, nada de preço da IT-41, nada de rosto do Michel, nada de movE, nada de nota das lojas, "Guias" fora do menu). **Onde este prompt contradiz o mestre, vale este.**
- Materiais novos: `_materiais/rodada-3/` — leia `_materiais/rodada-3/LEIA-ME.md` primeiro. As imagens entram no site **só pelo pipeline** `scripts/optimize-images.mjs` (adicione as novas entradas lá e rode `npm run images`). `_materiais/` não é commitado.

### 0.4 Git
1. `git status`, `git pull`, crie a branch `rodada-3` a partir da `main`.
2. Commits pequenos, um por item (ex.: `R-2: suporte vira popup com 0800 e WhatsApp`).
3. Ao final: `git push -u origin rodada-3`. **Não faça merge na `main` e não publique.** O Michel aprova antes.
4. Nunca `push --force`, nunca reescrever histórico.

---

## 1. DADOS QUE MUDARAM (aplicar no site inteiro)

| Dado | Valor novo |
|---|---|
| Números da rede | **300 estações de recarga · 22 cidades · 11 estados · 6 mil clientes** (mantenha o formato atual com "+", ex.: +300) |
| Link "Baixe o App" | **https://coderbox.com.br/redirect/?empresa=eletrix** (abre a Google Play ou a App Store conforme o celular) |
| Suporte por telefone | **0800 444 1044** — 24 horas — `tel:08004441044` |
| Suporte por WhatsApp | **+55 11 91955-2120** — **das 8h às 20h** — `https://wa.me/5511919552120?text=Ol%C3%A1!%20Preciso%20de%20suporte%20em%20uma%20esta%C3%A7%C3%A3o%20Eletrix.` |

- Busca global por `250`, `20 cidades`, `10 estados`, `5 mil`, `5k` e similares: atualize em `src/config/site.ts`, textos, metadados, schema JSON-LD, imagens OG (`npm run og`), páginas de cidade e artigos.
- Onde hoje está escrito "Suporte 24h" ao lado do WhatsApp de suporte, corrija: **24h é o 0800; o WhatsApp é das 8h às 20h.**

---

## 2. CORREÇÕES (R-1 a R-18)

### R-1. Header: Home, App, Parceiros e "Baixe o App"
- **Novo item "Home"** no menu principal, levando ao topo da home (clicar no logo não é intuitivo; o logo continua levando à home também).
- **Novo item "App"** no menu principal: rola até a seção do aplicativo na home (`/#app`), com rolagem suave e `scroll-margin-top` (de outra página, vai para `/#app`).
- **Novo item "Parceiros"** → página `/parceiros/` (R-11).
- O "App" que hoje fica à direita vira um **botão "Baixe o App"** (com cor, ícone de celular ou de download) que abre direto **https://coderbox.com.br/redirect/?empresa=eletrix** em nova aba (`target="_blank" rel="noopener"`). **Sem tela intermediária.**
- **Excluir a página `/app/`** (a "tela extra" sobre o aplicativo): troque por redirecionamento para `/#app` (use o `LegacyRedirect` que já existe), tire do sitemap e atualize todos os links internos que apontavam para ela.
- Ordem sugerida: `Home · Soluções ▾ · App · Estações · Parceiros · Sobre` + à direita `Baixe o App · Suporte · [Fale com a Eletrix]`. 💡 Com tantos itens, o header pode apertar entre 1024 e 1280px: teste nessas larguras e resolva com critério (espaçamento, tamanho de fonte, esconder "Sobre" num "Mais", etc.). Nada pode quebrar linha ou encostar.
- Menu mobile: os mesmos itens, com "Baixe o App" e "Suporte" bem visíveis.
- Os selos das lojas na seção do app podem continuar com os links oficiais de cada loja; **todo botão "Baixe o App" usa o link da Coderbox.**

### R-2. Suporte vira popup
- Clicar em **"Suporte"** (header, menu mobile, rodapé, qualquer lugar) **abre um popup (modal)** na própria página. Nada de ir para outra tela.
- Dentro, duas opções grandes e claras:
  - **Ligar: 0800 444 1044** — "24 horas, todos os dias" → `tel:08004441044`
  - **WhatsApp: +55 11 91955-2120** — "Das 8h às 20h" → link do WhatsApp com a mensagem pré-preenchida da seção 1
- Pode ter uma linha curta de contexto (ex.: "Problema em uma estação Eletrix? Fale com o suporte."). Breve.
- Modal acessível: `role="dialog"`, `aria-modal`, foco preso dentro, fecha com X, Esc e toque fora, devolve o foco ao botão, rola o fundo travado sem quebrar (lembre do bug antigo do menu mobile). No celular, pode abrir como folha de baixo para cima (bottom sheet).
- A URL `/suporte/` pode continuar existindo como fallback (sem JS e para o Google), mas com o mesmo conteúdo enxuto e os contatos novos; todos os links do site abrem o popup.

### R-3. "Fale com a Eletrix" (`/contato/`) — refazer, sem enrolação
O Michel achou a página grande, branca e com texto demais. No celular, o formulário fica jogado lá embaixo.
- **Tire o bloco de texto do topo** ("Fale com a Eletrix: orçamento, visita técnica e dúvidas. Escolha o canal mais cômodo…"). No lugar: um título curto (ex.: "Fale com a Eletrix") e, no máximo, uma linha de apoio.
- **Tire endereço e CNPJ** desta página (continuam só na linha final do rodapé).
- **Contatos primeiro, em cima, compactos e bonitos**: WhatsApp comercial (+55 11 96575-5730), e-mail e suporte (abre o popup do R-2). Formato reduzido (chips/linhas compactas ou cards baixos lado a lado), não botões gigantes empilhados.
- **No celular, ao abrir a página, parte do formulário já precisa aparecer na primeira tela** (não inteiro, mas o começo dele). Teste em 360×640, 390×844 e 430×932 e ajuste até isso ser verdade.
- **Fundo com mais vida**: nada de página toda branca com caixas brancas. 💡 Ex.: fundo azul-marinho da marca com o formulário num card claro em destaque; ou faixa escura em cima com contatos e o formulário subindo sobre ela. Escolha a solução mais elegante.
- **Formulário**: tire "White label". O campo de interesse lista **todos os serviços reais** (mesma lista em todos os formulários do site):
  - Eletrix Hub (prédios corporativos e shoppings)
  - Eletrix Rent (condomínios e hotéis)
  - Instalação na minha vaga
  - Compra de carregador
  - Laudo de demanda de energia
  - Infraestrutura seca
  - Controle de demanda
  - Adequação à norma IT-41
  - Troca de operador
  - Ainda não sei
- **Pré-seleção por link**: a página aceita parâmetros na URL (ex.: `/contato/?perfil=morador&interesse=instalacao-vaga`) e já abre com a aba de perfil e o interesse certos. Todos os botões que mandam para cá (R-5, R-8, R-9, R-13) usam isso. Leia os parâmetros no cliente (o site é exportação estática).
- Revise as outras páginas com o mesmo problema (fundo branco demais, caixas brancas sobre branco) e aplique o mesmo cuidado.

### R-4. O LED do hero — refazer de verdade 💡
O feixe de luz atual (`led-beam` / `led-glow` em `src/components/sections/home.tsx`) ficou simples demais: "um risco passando na tela". O que o Michel quer:
- **Um LED curto, como uma cobrinha de luz**, que **percorre o contorno dos objetos da foto do hero** (`totem-orelhao`): o orelhão, o carregador, o cabo e o plugue, o carro, o prédio. Não é uma linha longa: é um segmento curto e brilhante, com rastro que esmaece, contornando as formas.
- Como fazer bem:
  1. **Trace os contornos reais** dos objetos sobre a imagem original. Use ferramentas para isso (ex.: detecção de bordas com `sharp` + um script em `scripts/`, ou potrace) e depois **refine à mão** os caminhos SVG para ficarem suaves e fiéis (curvas de Bézier limpas, sem serrilhado).
  2. Coloque um `<svg>` sobre a foto com o **mesmo enquadramento** da imagem (`viewBox` nas dimensões da foto original + `preserveAspectRatio="xMidYMid slice"` casando com o `object-fit: cover` e o `object-position` usados). Se mobile e desktop usam recortes diferentes, garanta que o contorno continua exatamente em cima do objeto nos dois (pode ter dois conjuntos de caminhos).
  3. Anime com `pathLength="1"` + `stroke-dasharray` curto (ex.: `0.05 0.95`) + `stroke-dashoffset`, em azul #10B7FF, com brilho (cópia do traço com desfoque/`drop-shadow` leve) e um rastro (2–3 segmentos com opacidade decrescente). A luz passa de um objeto para o outro numa sequência coreografada (ex.: corre pelo cabo do carregador até o plugue, entra no carro, sobe pelo orelhão, contorna o prédio), em loop lento e elegante.
  4. Leve: só `stroke-dashoffset`/`opacity`, sem animar layout; nada de canvas pesado.
  5. `prefers-reduced-motion: reduce`: sem movimento (no máximo o contorno parado e bem sutil, ou nada).
- **Validação obrigatória**: screenshots em 390, 768, 1440 e 1920 px e confira, com zoom, que a luz está **em cima** das bordas dos objetos, não deslocada. Grave 2–3 frames para conferir a coreografia. Se não ficar com cara profissional, refaça.
- Não pode atrapalhar a leitura do título.

### R-5. Botões e link do hero
- "Quero carregar na minha vaga" → **"Carregar na minha vaga"**.
- O link de baixo deixa de perguntar "Síndico ou gestor?". Passa a ser: **"Precisa se adequar à norma? Adequação à norma IT-41"** (a parte "Adequação à norma IT-41" é o link).
- **Os três** — "Tenho um empreendimento", "Carregar na minha vaga" e o link da IT-41 — vão para **`/contato/`** com perfil/interesse pré-selecionados (R-3).
- Números atualizados (seção 1), com a contagem em escadinha que já existe.

### R-6. Números novos em todo o site
- **+300 estações de recarga · +22 cidades · +11 estados · +6 mil clientes** (seção 1). Hero, metadados, schema, imagens OG, páginas de cidade, artigos e qualquer outro lugar.

### R-7. Parceiros — lista nova, perfeita
- A lista **definitiva** são os **28 logos** de `_materiais/rodada-3/03_Logos_Parceiros_nov2026/` (referência visual: `_referencia_PARCEIROS_SITE.png`). **Livoltek é novo.** Saem do site os que não estão nessa lista (Inteli, RRM, Paris Condomínios, Padrão Park, Confiance, Guardian, SL, Winpark, Plenty Park, Slaviero, Pepe, Hazak). Atualize `src/data/partners.ts`, o pipeline de logos em `scripts/optimize-images.mjs` e o `logos.generated.json`. Apague do `public/logos/` os arquivos que ficarem sem uso.
- Se já existir uma versão oficial de melhor qualidade do mesmo logo em `_materiais/03_Logos/oficiais/` (vetor), prefira a de melhor qualidade. A Atrio saiu pequena (150×24): use a oficial.
- **Mesmo tratamento dos atuais** (cinza/monocromático uniforme). Cuidado: vários logos novos são **brancos** (Pátria, Bresco, Argoplan, Hersil, Elias Victor Nigri, WEG) e outros têm partes brancas internas (Jaime, BBZ). Gere versões monocromáticas que **continuem legíveis**, conferindo **um por um** em screenshot ampliado. Nenhum logo pode sumir, virar borrão ou ficar diferente dos outros.
- **Espaçamento perfeito**: normalize pelo tamanho ótico (área/peso visual), não só pela altura. Logos largos (Elias Victor Nigri, Tishman Speyer) e quadrados (BBZ, Jaime) devem parecer do mesmo "tamanho". Mesmo intervalo entre todos.
- **Misture tudo**: nada da ordem da imagem de referência, nenhuma sequência óbvia (não juntar os do mesmo setor, não colocar os grandes todos no começo). Embaralhe com uma ordem fixa e equilibrada (alternando largos e compactos, cores originais diferentes).
- Valide a faixa rolando em 360, 768 e 1440 px.

### R-8. "Qual é o seu caso?" — fotos reais e botões para o contato
- Troque as ilustrações por **fotos reais**:
  - **Morador** → `02_Fotos_Qual-o-seu-caso/morador_carregador-azul-marinho_vertical.jpg` (carregador azul-marinho na parede). **Centralize no carregador**, com as placas ao lado aparecendo, bem enquadrado.
  - **Síndico ou gestor** → `sindico-gestor_carregador-azul-com-placas_horizontal.jpg`.
  - **Comércio, empresa e condomínio** → `_materiais/02_Fotos_Eletrix/eletrix_hub_garagem.jpg` (garagem com vários carregadores).
  - Mesmo formato e mesmo tratamento nas três, centralizadas e organizadas. Defina `object-position` para cada uma e confira em mobile e desktop.
- Os três botões ("Instalar na minha vaga", "Ver o caminho do prédio" e o do comércio) **vão para `/contato/`** com o perfil certo pré-selecionado. Ajuste os textos dos botões para dizer isso (ex.: "Pedir visita técnica", "Falar com um especialista").

### R-9. Seção Eletrix Hub (home)
- Adicione à lista de diferenciais: **"Aplicativo individualizado"** e **"Dashboard de gerenciamento"** (frase curta para cada, coerente com o resto).
- Foto principal da seção: a **foto dos orelhões** (`totem-orelhao`).
- Botão **"Conhecer o Eletrix Hub"** → `/contato/?interesse=eletrix-hub` (ajuste o texto se fizer mais sentido, ex.: "Quero o Eletrix Hub").

### R-10. Aplicativo logo depois do Eletrix Hub 💡
- A seção do app (`id="app"`) vem **imediatamente depois** da seção do Eletrix Hub.
- A seção do Hub deve **indicar que o próximo assunto é o app** (o app individualizado é parte do Hub). Pense em pelo menos 2 formas e escolha a melhor. Ex.: o item "Aplicativo individualizado" do Hub com uma chamada "Veja o app ↓" que rola até a seção; uma transição visual contínua (o mockup do iPhone "saindo" da seção do Hub para a seção do app; mesma cor de fundo emendando as duas); uma frase-ponte curta no fim do Hub.
- Revise a seção do app: mockup limpo, texto mínimo, botão **"Baixe o App"** (link Coderbox) + selos das lojas.

### R-11. Página Parceiros (`/parceiros/`) — bonita e curta 💡
- Item "Parceiros" no header (R-1) leva para cá.
- Página **curta** (não extensa): título forte (ex.: "Quem confia na Eletrix"), uma linha de apoio e os logos em **3 faixas rolando**, uma embaixo da outra, em direções alternadas e velocidades levemente diferentes, com máscara de esmaecimento nas bordas. Elegante, com cara de empresa grande.
- Sem logo repetido lado a lado entre as faixas; distribua os 28 nas 3 faixas de forma equilibrada.
- Pause ao passar o mouse/focar; com `prefers-reduced-motion`, vira uma grade estática organizada.
- Feche com um CTA discreto para o contato.
- 💡 Considere fundo escuro da marca para os logos claros brilharem, ou fundo claro com logos cinza — escolha o mais sofisticado e registre.

### R-12. Botão flutuante do WhatsApp 💡
- Vira um **botão redondo verde com o ícone oficial do WhatsApp** (glifo em SVG, verde #25D366, sombra suave), no canto inferior direito.
- Com um **balão de fala** ao lado com uma frase curta e profissional (ex.: "Fale com a gente", "Posso ajudar?" — escolha a melhor). O balão aparece alguns segundos depois de abrir a página, com uma entrada suave, pode ser fechado e não volta a aparecer na mesma sessão (`sessionStorage` com try/catch).
- Leva ao WhatsApp comercial (+55 11 96575-5730) com a mensagem pré-preenchida atual.
- Tem que parecer de empresa séria: tamanho certo (56–60 px), não cobrir botões nem o formulário, respeitar a safe area do iPhone, não ficar em cima do rodapé de forma feia. Com reduced motion, sem animação.

### R-13. "Para síndicos e gestores" — fechamento da seção
- A parte de cima (medir → preparar → controlar → regularizar) **está boa, não mexa**.
- O fim da seção está **branco, vazio, com o botão "Ver o caminho completo para condomínios" solto e deslocado** (ver `04_Referencias/print_rodape-branco-secao-sindicos_PROBLEMA.png`). Reestruture essa parte: 💡 ex.: uma faixa de fechamento integrada à seção, com uma frase curta ("Não sabe por onde começar? A gente avalia o seu prédio.") e o botão alinhado ao grid; ou o CTA dentro de um bloco colorido que fecha a timeline.
- Botão com **novo texto** (ex.: "Falar com um especialista" ou "Agendar avaliação do prédio") → `/contato/?perfil=sindico`.

### R-14. "Onde a Eletrix opera" — mapa completo + carrossel de prédios 💡 (me surpreenda)
**Estrutura base** (referência: `04_Referencias/referencia_carrossel-galeria-predios.png`): **mapa em cima** e, embaixo, um **carrossel de fotos de prédios de ponta a ponta da tela**.
- **Carrossel**:
  - Mesmo formato de card que já existe (foto + nome + cidade/UF), com o mesmo tratamento de cor.
  - **Ordem exata**: 1 Plaza Centenário · 2 Quantum · 3 B500 · 4 CEA (Centro Empresarial do Aço, **foto nova**) · 5 AQWA (RJ) · 6 CBOP (Castelo Branco Office Park, Barueri) · 7 Pinheiros Corporate · 8 JK Square · 9 River One (foto nova) · 10 Spazio Faria Lima · 11 BFL1355. Fotos em `_materiais/rodada-3/01_Fotos_Predios_Carrossel/` (ver LEIA-ME). Depois do 11º, pode continuar com os que já estão no site e não se repetem (Thera Corporate, Pinheiros One, Arquipeo, Faria Lima Financial Center) — registre a decisão.
  - **Não use** a foto `99_A-CONFIRMAR...` (prédio sem nome confirmado); registre em pendências.
  - **Avança sozinho a cada 3 segundos**, um card para o lado, com transição suave; **rolagem infinita** (nunca acaba, sem "pulo" visível ao recomeçar).
  - Também **manual**: setas, arrastar/deslizar no celular, teclado. Indicador de posição discreto.
  - Pausa ao passar o mouse, ao focar, quando a aba não está visível e quando a seção sai da tela. Com `prefers-reduced-motion`: não avança sozinho.
  - Atualize `src/data/projects.ts` (novos prédios, foto nova do CEA e do River One) e o pipeline de imagens.
- **Mapa** (`scripts/build-stations.mjs` + `scripts/build-map.mjs`):
  - Adicione **todos os pontos** de `_materiais/rodada-3/novos_pontos_mapa_nov2026.csv` (empreendimentos + shoppings Argoplan). Endereços repetidos contam uma vez. Se um ponto já existir no `_materiais/predios_eletrix.csv` (mesmo nome ou a menos de ~150 m), não duplique — só garanta os 3 pins.
  - **3 pins por endereço**, levemente afastados entre si (um pequeno agrupamento em volta do endereço) para dar volume sem virar um borrão.
  - Geocodifique os endereços com o Nominatim/OpenStreetMap (1 requisição por segundo, User-Agent identificado), salve em cache em um arquivo no projeto e confira se cada ponto caiu na cidade/UF certa. JK Square: use o quarteirão entre R. Tenente Negrão, R. Dr. Renato Paes de Barros e Av. Juscelino Kubitschek. Se algum não geocodificar, use o centro do bairro/cidade e registre como aproximado.
  - **Estados**: inclua as divisas municipais de todos os estados onde a Eletrix passa a ter pontos — hoje `MUNI_UFS` só tem SP, RJ, PR, SC, RS, BA; entram **MS, MG, GO, PA** (e qualquer outro que aparecer nos dados, ex.: PE). Ajuste o recorte do mapa para mostrar todos (Altamira-PA e Jataí/Rio Verde-GO ampliam bastante a área).
  - Confira: a contagem de estados e cidades nos dados deve bater com **11 estados e 22 cidades**. Se não bater, não mude os números do site — registre a diferença em `REDESIGN-PENDENCIAS.md`.
  - Pins azuis com volume e brilho pulsando defasado, estático, sem clique (como já está). Mantenha o detalhe ampliado da Grande SP se ainda fizer sentido.
- **Repense a seção inteira para ficar realmente bonita e limpa.** Use a referência como ponto de partida, mas traga ideias. Ex.: título + mapa com uma legenda viva ("300 estações em 11 estados"), lista discreta de estados ao lado do mapa, transição elegante entre mapa e carrossel, carrossel saindo da borda da tela. Proponha pelo menos 2 composições em `REDESIGN-DECISOES.md` (com wireframe em ASCII), escolha e implemente a melhor.

### R-15. "O que muda quando a operação funciona" — dar alma à seção 💡
- Textos e organização estão bons; o problema é visual: a seção parece solta, sem graça, largada. Os clientes reparam muito nessa parte, porque querem ver feedback.
- Dê um olhar diferente. Ideias para avaliar: depoimentos em destaque com a foto do prédio do cliente ao fundo, aspas grandes como elemento gráfico, nome/cargo/empreendimento bem tipografados, um depoimento principal grande e outros menores; ou carrossel elegante; ou depoimento + número concreto ao lado. Escolha e registre.
- **Não invente depoimentos nem nomes.** Os atuais são provisórios (`src/data/content.ts`): mantenha o conteúdo e a marcação de provisório no código.

### R-16. Notícias (Estadão) na home
- Cada notícia ganha um **botão próprio** ("Ler a matéria") que abre a matéria no Estadão em nova aba:
  - https://mobilidade.estadao.com.br/mobilidade-para-que/descarbonizacao-formula-e-faz-pesquisas-para-ampliar-a-recuperacao-de-energia-nas-frenagens/
  - https://mobilidade.estadao.com.br/inovacao/como-predios-estao-ganhando-com-a-recarga-eletrica/
  - O de "prédios" vai para o card "Como prédios estão ganhando com a recarga elétrica". Confira o outro abrindo as URLs (WebFetch) e associando ao card do "orelhão"; se não conseguir abrir, associe o link da Fórmula E ao card do orelhão e registre.
- Abaixo dos cards, fica **só o botão "Ver imprensa"**, que leva à página `/imprensa/`. Os cards em si deixam de levar para `/imprensa/`.
- Atualize também a página `/imprensa/` com os mesmos links externos.

### R-17. Fechamento da home (formulário + "Vamos encontrar a solução…")
- Reorganize o bloco final (`FinalContact`) para ficar **bonito e alinhado**: o texto "Vamos encontrar a solução…" até o endereço de um lado e o formulário do outro, com topos e bases alinhados no grid.
- **Formulário mais curto**: tire **Cidade** e **Nº de vagas**; no lugar, um campo **Endereço** (texto livre). "Tenho interesse em" com **todos os serviços** (lista do R-3).
- **Padronize com o formulário do `/contato/`**: mesmo componente, mesmos campos, mesmas opções, mesmo visual. Uma só fonte para a lista de serviços (ex.: `src/data/services.ts`).
- Garanta que o envio continua funcionando (mesmo destino de hoje) e que os nomes dos campos no e-mail recebido fazem sentido.

### R-18. Pronto para ir ao ar
O site vai substituir o eletrix.mobi. **Não publique**, mas deixe tudo pronto e escreva `GO-LIVE.md` com o passo a passo para o Michel:
- Build para o domínio raiz (sem o `basePath` `/site-eletrix` do GitHub Pages de teste): confira que `npm run build` gera tudo certo para `https://eletrix.mobi/`.
- URLs canônicas, `sitemap.xml`, `robots.txt`, Open Graph e schema apontando para `https://eletrix.mobi`.
- Arquivo `CNAME` (se for continuar no GitHub Pages) ou instruções para a hospedagem escolhida; configuração de DNS que o Michel vai precisar mudar.
- Redirecionamentos das URLs antigas do site atual (feito no Lovable) que tiverem tráfego: liste as que encontrar no site atual e crie redirecionamentos para as páginas novas equivalentes.
- Formulários testados de ponta a ponta, 404 bonito, favicon, Google Search Console (passo a passo para enviar o sitemap), Analytics.
- Checklist final de lançamento.

---

## 3. REGRAS DESTA RODADA

1. **Todo botão que leva ao "Fale com a Eletrix" usa pré-seleção** de perfil/interesse.
2. **Nada branco e largado.** Toda seção precisa ter intenção de cor, alinhamento e fechamento. Pequenos detalhes deixam o site amador: alinhe, equilibre, termine cada seção.
3. Textos curtos, voz ativa, botões dizendo o que acontece. Nunca "insights", "colaboração" ou "marco importante".
4. Dados de contato exatamente como neste prompt e no prompt mestre.
5. Toda animação nova (LED, carrosséis, faixas de logos, balão do WhatsApp) respeita `prefers-reduced-motion` e não causa layout shift.
6. Não quebre o que está bom: SEO (Central de dúvidas, schema, sitemap), artigos, menu mobile, mega menu, processo do síndico.

---

## 4. VALIDAÇÃO (obrigatória, no navegador)

- Rode `npm run images`, `npm run data`, `npm run build`, `npm run links:check`, `npm run seo:check` e `npm run typecheck` sem erros.
- Use os scripts de QA em `scripts/qa/` (Playwright). Screenshots em **360, 390, 768, 1024, 1280, 1440 e 1920 px** de: home inteira, `/contato/`, `/parceiros/`, popup de suporte aberto, menu mobile aberto. Salve em `qa/rodada-3/`.
- Teste de ponta a ponta:
  - Header: Home, App (rola), Estações (rola), Parceiros, Baixe o App (abre Coderbox em nova aba), Suporte (abre popup), Fale com a Eletrix.
  - Popup de suporte: abre, links `tel:` e WhatsApp corretos, fecha com X/Esc/fora, foco volta.
  - Hero: os 3 links chegam ao `/contato/` com a pré-seleção certa. Idem cards de "Qual é o seu caso?", Eletrix Hub e síndicos.
  - `/contato/` no celular: parte do formulário visível na primeira tela.
  - Carrossel de prédios: avança a cada 3 s, infinito, manual com setas e com toque, pausa no hover/foco.
  - Faixas de parceiros: os 28 logos legíveis, nenhum sumindo, sem sequência.
  - Mapa: todos os estados com divisas, pins nos lugares certos (confira alguns em zoom: Altamira-PA, Jataí-GO, Santa Maria-RS, Blumenau-SC, Campo Grande-MS, Montes Claros-MG).
  - LED do hero exatamente sobre os contornos, em todas as larguras.
  - Botão do WhatsApp com balão, sem cobrir nada.
  - Notícias: botões externos corretos; "Ver imprensa" leva a `/imprensa/`.
  - `/app/` redireciona para `/#app`.
  - `prefers-reduced-motion: reduce` emulado: nada se mexe sozinho.
  - Navegação só por teclado na home inteira, com foco visível.
- Lighthouse (performance, acessibilidade, boas práticas, SEO) na home e no `/contato/`, mobile e desktop. Registre os números reais.
- **Não afirme que testou algo que não testou.**

---

## 5. ENTREGÁVEIS

1. Branch `rodada-3` enviada ao GitHub, commits por item.
2. `RODADA-3-RELATORIO.md` (curto, direto): uma linha por item R-1 a R-18 (feito / parcial / pendente + onde), decisões criativas tomadas, números do Lighthouse, o que não deu para validar.
3. `REDESIGN-DECISOES.md`, `REDESIGN-IDEIAS.md` e `REDESIGN-PENDENCIAS.md` atualizados (pendências da rodada 3 numa seção própria, incluindo: nome do prédio da foto `99_A-CONFIRMAR`, pontos geocodificados de forma aproximada, depoimentos reais).
4. `GO-LIVE.md` (R-18).
5. Screenshots em `qa/rodada-3/`.

---

## DIRETRIZ FINAL

Quem abrir o site precisa sentir que entrou no site de uma **empresa grande e séria** de recarga de carros elétricos: rede enorme no mapa, parceiros de peso, fotos reais, contato fácil, nada largado. Pense em cada detalhe, critique cada tela no navegador e só pare quando estiver no nível de lançamento.
