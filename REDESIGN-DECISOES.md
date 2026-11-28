# Redesign v2: decisões

Branch: `redesign-v2` (não foi feito merge na principal nem publicação). Este arquivo registra o plano de design e todas as decisões tomadas sem consulta.

## 1. Plano de design (passada 1)

**Conceito.** Um site de infraestrutura de energia, não de "app de carro". O universo visual vem do que a Eletrix faz: o LED azul do carregador, o cabo, a garagem do prédio, o quadro elétrico. Seções escuras (azul-marinho) alternam com seções brancas e com um azul bem claro da marca, e uma única faixa de azul pleno (troca de operador) funciona como respiro de cor.

**Cor** (tokens em `tailwind.config.ts` e `globals.css`)
| Nome | Hex | Uso |
|---|---|---|
| Azul Eletrix | `#10B7FF` | ação: botão primário, números das etapas, pins, destaques |
| Azul-marinho profundo | `#050B14` / `#0A1220` | hero, mapa, depoimentos, rodapé (`dark` e `ink`) |
| Azul-céu | `#E3F5FE` | seções intermediárias (`paper`), troca de cor entre brancas |
| Azul sólido | `#10B7FF` com texto `#04101D` | faixa "troca de operador" (`brand`) |
| Branco | `#FFFFFF` | seções de leitura (`light`) |
| Azul de texto em fundo claro | `#0877AD` | links e rótulos (contraste AA em branco e no azul-céu) |

**Tipografia.** Mantive Manrope (títulos) e Inter (texto), já self-hosted. Alternativas avaliadas: trocar por uma fonte com mais personalidade. Descartei: a Manrope em peso 800 tem boa leitura em português, números tabulares e combina com a marca; trocar custaria o carregamento de uma fonte nova sem ganho claro.

**Layout.** Grade de 1240 px, alinhamento à esquerda (leitura), títulos de seção curtos sem rótulo acima, uma ação principal por bloco.

**O elemento memorável (onde ousei).** O hero: foto real de um carro carregando, escurecida, com um feixe de LED azul que cruza a imagem lentamente. O mapa é o segundo momento (pins em gota que brilham defasados). O resto é disciplinado.

**Revisão contra o genérico.** Uma primeira ideia era repetir o padrão "3 cards iguais com ícone" em Por que a Eletrix e Qual é o seu caso. Mudei: Por que a Eletrix virou composição editorial (foto grande + sobreposta, três pilares em linhas, sem cartões); Qual é o seu caso usa ilustração própria no topo de cada cartão, com lista de soluções e botão cheio.

## 2. Decisões por item

### C-1 Hero
- **H1 escolhido:** "Rede de recarga para carros elétricos, do prédio à sua vaga." Alternativas descartadas: "A rede de recarga que também instala na sua vaga" (comprida e menos clara para o gestor); "Onde o seu carro elétrico carrega: no prédio, no trabalho e na sua vaga" (3 linhas longas no celular). Escolhida porque diz "rede" (tamanho), "recarga" e "carros elétricos" (SEO) e "do prédio à sua vaga" (gestor e morador), em 3 linhas no celular.
- **Foto:** `totem-orelhao` (carro plugado, real). É a única foto real com carro conectado no repositório. Origem 960 × 1280 (retrato); no desktop é recortada em paisagem com `object-position` 50% 74% (plug visível) e overlay escuro. Fica levemente ampliada no desktop (1,5×), mas o overlay mascara. **Pendência:** foto em paisagem e alta resolução melhoraria o hero (ver pendências).
- **LED:** feixe diagonal de luz azul (gradiente translúcido, `mix-blend-mode: screen`) que cruza a foto em 9 s com pausa; mais um filete de luz que pulsa na base do hero. Só `transform` e `opacity`. Desligado com `prefers-reduced-motion`. Descartei o pulso ao longo do cabo: a posição do cabo muda em cada recorte (mobile/desktop), e um erro de alinhamento ficaria pior que o feixe.
- **Link do síndico:** leva a `/condominios/` (a página que mostra o caminho completo laudo → IT-41). A alternativa era `/adequacao-it-41/`, que cobre só o último passo e não cumpre a promessa "do laudo à IT-41".
- **Números:** contam em escadinha (220 ms de defasagem), 1,5 s, easing quártico; largura reservada com um espaço invisível com o valor final; o valor final está no HTML (texto para leitor de tela).
- Removidos: eyebrow, parágrafo, colagem, cartão "Recarregando", parallax.

### C-2 Parceiros
- Ficam logo abaixo do hero, em fundo **branco**. Logos monocromáticos cinza-azulado sobre branco (um único tratamento para não virar colcha), escala 1,45× (antes 1×). Altura e área ótica continuam normalizadas por proporção.
- Sem botão de pausa e sem "ver todos". A rolagem pausa com hover e foco (CSS; o contêiner recebe foco por teclado) e some com movimento reduzido (vira grade estática). Duplicata `aria-hidden`.

### C-3 Menu mobile
- **Causa real:** o `<header>` tem `backdrop-filter`, que cria um bloco de contenção para elementos `position: fixed`. O painel do menu (fixo, dentro do header) ficava com a altura do header (72 px), invisível, enquanto o `overflow: hidden` do body já travava a rolagem. Correção: o painel agora é irmão do header, não filho.
- Também: `100dvh`, safe area, rolagem interna, Esc, fechar ao tocar em link, foco preso no painel (Tab circular) e devolvido ao botão. Testado em 390 × 844, 360 × 640 e 844 × 390 (paisagem).
- Fechar ao tocar fora: o painel ocupa a tela toda; não há "fora" no mobile.
- Bottom navigation: não adotei (poucos destinos; o menu em tela cheia resolve).

### C-4 Qual é o seu caso?
- Ilustrações SVG próprias (`CaseIllustrations.tsx`), um traço só, fundo marinho, azul da marca. Morador = carro na vaga, carregador de parede e medidor; Síndico = prédio com escudo e check; Comércio = torre e garagem com vários carregadores.
- Numeração 01–07 removida em todo o site (só ficou em sequências reais: etapas do síndico, passos do app e "Como funciona").
- A lista do morador inclui "Carregadores a partir de R$ 2.799" e a do comércio inclui "Troca de operador" (são soluções reais desses perfis).

### Diretriz de cor e botões
- `paper` virou azul-céu, `light` virou branco puro (antes: cinzas). Botões: primário azul; secundário agora é azul-marinho cheio; `onDark` tem preenchimento azul translúcido e contorno azul. Nenhum botão é só contorno cinza. Seta nos botões só quando passada explicitamente (padrão agora é sem ícone).
- Rótulos em caixa alta espaçada removidos de todo o site; os rótulos de seção ("eyebrow") deixaram de ser exibidos nas seções (`Band`), e nos heros de página só ficam quando carregam informação ("Para prédios corporativos e shoppings").
- Animação de entrada por seção removida (era o `data-reveal`). Os atributos continuam no HTML, sem efeito.

### C-5 Mega menu
- Painel com fundo sólido (`ink-900`) e divisórias **brancas** sólidas (1 px), sem transparência. White label saiu do menu e do rodapé (a página `/white-label/` continua existindo, no sitemap). Rótulos "Medir/Preparar..." continuam como pequenas etiquetas, sem caixa alta.
- Card em destaque do Hub mantido; a frase "AAA" saiu daí e do rodapé (fica só no Hub).

### C-6 Etapas do síndico
- Stepper de verdade: círculos numerados 1–4 ligados por linha, **alinhados ao centro dos círculos** (calculado em CSS, testado). Verbo + serviço + frase + preço (só laudo "A partir de R$ 2.799" e "Orçamento após visita técnica") + link. No celular vira linha do tempo vertical com a linha à esquerda.
- **Preço da IT-41 removido de todo o site** (home, página, FAQs, guias, calculadora). A calculadora IT-41 foi apagada (`It41Calculator.tsx`) porque só existia para calcular esse preço. Substituí por "Orçamento após visita técnica". O botão principal da página IT-41 agora é "Agendar visita técnica".
- Os dois textos soltos viraram um bloco único de duas linhas.

### C-7 Estações
- Seção `#estacoes` na home: 6 fotos de SP à esquerda (grade 2×3; no celular, carrossel horizontal com snap) e o mapa à direita.
- **Mapa:** SVG estático gerado em build (`scripts/build-map.mjs`) a partir da API de malhas do IBGE (qualidade mínima). Divisas estaduais de todo o Brasil e municipais nos 6 estados com pontos (SP, RJ, PR, SC, RS, BA); enquadramento no Sul/Sudeste até a Bahia. Dois arquivos em `public/mapa/` (carregados como imagem, lazy; nenhum JS de mapa no navegador): `rede-brasil.svg` (366 KB, 121 KB comprimido) e `rede-grande-sp.svg` (44 KB). A meta era < 300 KB comprimido.
- **Pins:** gota com gradiente e sombra de contorno, halo que pulsa com atraso diferente em cada pin (CSS dentro do SVG, respeita movimento reduzido). Os "a instalar" têm opacidade levemente menor; o brilho é o mesmo.
- **Detalhe da Grande SP:** recorte ampliado no canto (o mar à direita do mapa estava vazio), com a moldura tracejada no mapa principal.
- **Dados:** `src/data/estacoes.json` (nome, cidade, UF, lat, lng, status `operando` | `a-instalar`), gerado por `npm run data` a partir do CSV. 94 operando + 10 a instalar. **Regra de privacidade mantida:** linhas "Não" (vagas privativas e pins provisórios) nunca entram.
- `/empreendimentos/` e `/estacoes/` viraram páginas de redirecionamento (meta refresh + link) para `/#estacoes`, fora do sitemap. Links internos atualizados. Os componentes do mapa interativo antigo (MapLibre) foram apagados.
- O mapa não tem clique nem tooltip (conforme pedido), com `alt` descritivo.

### C-8 "Do Sul ao Nordeste"
- Seção removida inteira. A frase "Nenhuma estação foi desinstalada por falta de suporte" foi reaproveitada em "Por que a Eletrix" (pilar Confiança).

### C-9 Por que a Eletrix
- Composição editorial: foto vertical grande + foto horizontal sobreposta (técnico plugando) à esquerda; à direita, três pilares em linhas (Padrão, Operação, Confiança), uma frase forte e uma prova curta em cada. Sem ícones, sem cartões. "AAA" não aparece na home.

### C-10 App
- Sem nota e sem estrelas, em todo o site (home, página do app, FAQ, metadados). Mockup de iPhone em CSS (moldura fina, ilha dinâmica, botões laterais, sombra suave) com a **captura real** do app (`app-mapa`). Não mostra % de bateria. Três passos curtos. Links oficiais das lojas em `src/config/site.ts` (valem para o site todo, inclusive o rodapé).

### C-11 Rosto do Michel
- Removidos: seção "Liderança" da página Sobre; arquivos `public/images/ceo-*`; entrada `ceo` do manifesto e do script de imagens; a menção ao nome nos textos alternativos.
- **A matéria do Estadão (`estadao-predios`) trazia o retrato dele no cabeçalho.** Desfoquei esse retrato no arquivo-fonte (`imprensa_estadao_2_sem-rosto.jpg`, dentro de `_materiais/`, fora do Git) e regerei a imagem. O nome do autor no título da matéria permanece (é o texto do jornal).
- OG images: nenhuma usa foto de pessoa.

### C-12 / C-13 Dúvidas e rodapé
- Dúvidas frequentes na home: 5 perguntas (lei, custo, energia, IT-41, potência), cada resposta com link "Ler o guia completo" + "Ver todas as dúvidas" para `/guias/`. FAQPage JSON-LD gerado a partir do mesmo conteúdo visível.
- O bloco "Dúvidas sobre…" foi adicionado ao fim de 11 páginas de serviço (`DuvidasSobre.tsx`), com 4–5 links.
- **Estrutura de /guias:** hoje é uma lista plana de 5 guias, não "5 grupos → grupo → artigo" como descrito na Parte 1. Não reestruturei (Parte 8: preservar URLs e conteúdo); registrei nas ideias.
- Rodapé: marca + slogan + lojas + Instagram; colunas Soluções e Empresa (acordeão no celular); Fale com a gente (contatos como estavam); linha final legal. Sem White label, Empreendimentos, Mapa, Parceiros, Imprensa e lista de artigos. "Central de dúvidas" → `/guias/`.

### C-14 Hub
- Foco em prédios corporativos e shoppings (título, texto, tabela de comparação, FAQ, metadados). Removidos: seguro de até R$ 500 mil e dashboard em tempo real (da página do Hub, da home, da página de empresas, do FAQ e da frase de "troca de operador"). A frase "AAA" ficou no Hub. Hotéis, comércios e galpões saíram dos textos do Hub e a descrição do Rent (hotéis, pequenos comércios) ficou como estava.
- A página de **cidades** (`/campinas/`) ainda cita galpões como caso; não mexi (é descrição local de um empreendimento real, Bresco Viracopos).

### C-15 Header
- Soluções ▾ · Estações · Sobre; à direita App · Suporte · "Fale com a Eletrix" (visíveis a partir de 1024 px). Sem Empreendimentos e Guias. "Estações" aponta para `/#estacoes` (rola com suavidade e compensação do header, desligada com movimento reduzido). Botão de WhatsApp flutuante: só ícone no celular, respeitando a safe area.

### C-16 Páginas internas
- Mudanças nos componentes compartilhados (botões, rótulos, numeração, links "Ver mais" sem seta) refletem em todas. Revisão visual página a página em `qa/depois/` (ver relatório).

## 3. Outras decisões
- `playwright` entrou como `devDependency` (QA). O Chromium da cache dele não bate com a versão instalada; os scripts usam o Edge do sistema (`channel: 'msedge'`).
- `scripts/map-cache/` (JSON bruto do IBGE) está no `.gitignore`; o SVG final é commitado.
- Não adotei animações de entrada por seção. Movimento automático na página inteira: LED do hero, contagem, marquee de logos e pulso dos pins.

## 4. Correção posterior: faixa de parceiros (C-2, revisão do Michel)
Substitui a decisão do item C-2 acima. A faixa volta a ser uma rolagem horizontal, sem grade estática:
- Rolagem automática e contínua, em loop infinito e sem emenda: a lista é repetida uma vez e a animação vai de 0 a -50%. Velocidade de cerca de 70 px/s (140 s por volta), calma o bastante para reconhecer cada marca.
- Sem botão de pausa, sem "ver todos", **sem pausa no hover ou no foco** e sem qualquer controle. A faixa nem recebe foco por teclado.
- **Roda também com `prefers-reduced-motion`**, por pedido expresso. O marquee é a exceção à regra de reduzir movimento; a grade estática foi removida. Registro o risco: usuários sensíveis a movimento verão a faixa rolando (o movimento é lento e linear).
- Logos maiores (escala 1,6× contra 1,45× antes), com a mesma área ótica entre eles (altura e largura calculadas pela proporção de cada logo). Células de 200 px no celular e 240 px no desktop; no celular a faixa também roda.
- Fundo continua claro (branco), contrastando com o hero escuro.

---

# Rodada 3 (27/11/2026)

Branch `rodada-3`. Onde esta seção contradiz as anteriores, vale esta. 💡 marca os itens com liberdade criativa.

## R-1 Header 💡
- **A (escolhida):** os seis itens continuam visíveis a partir de 1024 px, com fonte e respiros menores abaixo de 1280 px e sem o ícone de "Suporte" nessa faixa. Medido em 1024, 1152, 1280, 1440 e 1920: nada encosta nem quebra linha.
- B: juntar "Parceiros" e "Sobre" em um menu "Mais". Esconde justamente o item novo.
- C: menu hambúrguer até 1279 px. Esconde tudo em muitos notebooks.
- "Home" e "App" rolam com suavidade quando já se está na home (sem suavidade com movimento reduzido) e levam o foco à seção.
- "Fale com a Eletrix" leva o contexto da página (na IT-41, já abre em síndico + IT-41). Na home e nas páginas institucionais abre sem escolha, para a pessoa decidir.
- Menu do celular: "Baixe o App" e "Suporte" lado a lado, acima do botão principal.
- Menu Soluções entre 1024 e 1279 px: três colunas, sem a foto em destaque ("IT-41" quebrava no meio).

## R-2 Suporte em popup
- `<dialog>` nativo (`showModal`): resto da página inerte, Esc, foco devolvido. Folha de baixo para cima no celular.
- Qualquer link para `/suporte/` abre o popup; a página continua como alternativa sem JavaScript.
- 0800 em primeiro, em marinho; WhatsApp em verde claro, com o horário em destaque.

## R-3 Contato 💡
- **A (escolhida):** fundo marinho com a foto do Aqwa bem apagada, três canais compactos e o formulário em cartão claro. No desktop, canais à esquerda e formulário à direita.
- B: faixa escura em cima e formulário "subindo" sobre uma seção clara. Empurra o formulário para baixo no celular.
- C: tela dividida com foto grande. Boa no desktop, inútil no celular.
- Perfil virou um seletor de três posições; "Endereço" é obrigatório; "Condomínio" é opcional para o morador.
- Nas outras páginas: cartões das seções brancas ganharam azul claro (`--card: #f2f9fe`), para não haver caixa branca sobre branco.
- Endereço e CNPJ ficam na linha final do rodapé (o endereço saiu da coluna "Fale com a gente").

## R-4 LED do hero 💡
- **A (escolhida):** contornos traçados à mão em curvas de Bézier sobre a foto original (`src/data/hero-led.json`), conferidos com `scripts/qa/led-overlay.mjs`. A luz segue uma história: cabo → plugue → tampa e porta de recarga → capô e para-lama → orelhão → carregador → tomada → segundo orelhão → prédio.
- B: detecção automática de bordas (sharp/potrace). Descartada: centenas de fragmentos serrilhados, sem como coreografar.
- C: um traço único ligando todos os objetos. Os saltos entre objetos pareceriam falha.
- D: canvas. Descartado pelo pedido de leveza.
- **Enquadramento:** o recorte antigo no desktop cortava o orelhão e o carro. Agora o desktop mostra a foto inteira à direita do texto, com uma cópia desfocada ao fundo; no celular, foto em cima e texto logo abaixo. Foto e SVG usam a mesma moldura calculada em CSS, então a luz fica sobre as bordas em qualquer largura.
- **Desempenho:** a primeira versão, só em CSS, mantinha 60 animações ligadas e ocupava cerca de dois terços de um processador simulado 4x mais lento. A versão final (`LedRunner.tsx`) mexe só no trecho aceso, a 32 quadros por segundo, começa depois do carregamento, para fora da tela ou com a aba escondida e não roda com movimento reduzido. Na mesma simulação: cerca de um quinto com aceleração gráfica, de um terço à metade sem ela.
- No celular o halo largo foi desligado.

## R-5 e R-6 Hero e números
- Os três caminhos do hero vão para `/contato/` (empreendimento; morador + vaga; síndico + IT-41).
- Números novos em `src/config/site.ts`. Parados, os algarismos voltam ao espaçamento proporcional (o "+11" parecia "+1 1").

## R-7 Parceiros
- Um tom só, gerado a partir do canal alfa, com receita por logo para não perder recortes: BBZ (letras vazadas), Jaime, GarageInn e Intercity (desenhos claros dentro de formas coloridas), Elias Victor Nigri (só nos círculos) e shpaisman (símbolo em dois tons).
- Tamanho por área óptica corrigida pela densidade de tinta, com ajuste fino por marca. Mesmo intervalo entre todos.
- Ordem fixa em `src/data/partners.ts`, alternando largos e compactos e espalhando os grandes nomes.

## R-8 Fotos dos perfis
- As três em 4:3, recortadas no pipeline com o carregador no centro e leve ajuste de luz. Botões: "Pedir visita técnica", "Falar com um especialista", "Quero oferecer recarga".

## R-9 Hub
- Seis diferenciais; o do app é destacado em branco e leva à seção seguinte. Botão "Quero o Eletrix Hub"; abaixo, um link para a página do Hub (mantém o caminho para o conteúdo detalhado).
- "Dashboard" e "Aplicativo individualizado" também entraram em `/eletrix-hub/`, para home e página não se contradizerem (a rodada 2 tinha removido o dashboard de lá).

## R-10 App logo depois do Hub 💡
- **A (escolhida):** o iPhone avança da seção do app sobre a seção do Hub, e o item "Aplicativo individualizado" tem a chamada "Veja o app".
- B: as duas seções no mesmo fundo, com uma frase-ponte. Menos memorável e perde o ritmo de cor.
- C: celular fixo acompanhando a rolagem. Mais complexo e cansativo no celular.
- A barra de status da captura foi limpa (horário e bateria de quem fez a captura).

## R-11 Página de parceiros 💡
- **A (escolhida):** fundo marinho, logos brancos em cartões, três faixas (64, 76 e 70 s por volta), a do meio no sentido contrário; pausa no mouse e no foco; com movimento reduzido, grade 7 x 4.
- B: fundo claro com logos cinza. Repetiria a faixa da home.

## R-12 WhatsApp 💡
- Balão: **"Como podemos ajudar?"** (escolhida); "Fale com a gente" (repete o rodapé); "Posso ajudar?" (soa como uma pessoa só).
- Entra após 4 s; no celular recolhe sozinho após 9 s; some quando ficaria sobre botão, formulário, pergunta recolhida ou texto do rodapé. Descartei deixá-lo sempre visível com espaço reservado no fim das páginas.

## R-13 Fechamento dos síndicos 💡
- **A (escolhida):** bloco marinho que encerra as quatro etapas, na mesma grade, com a frase, o botão e o link para o caminho completo.
- B: faixa azul de ponta a ponta: já existe a da troca de operador logo abaixo.
- C: um quinto nó na linha do tempo: confundiria a sequência.

## R-14 Onde a Eletrix opera 💡

Composição **A (escolhida)**

```
+----------------------------------------------------+
| Onde a                      ::: mapa :::           |
| Eletrix opera.            :: oo    oo  ::          |
| +300 estações...            : oo oo oo :  +------+ |
| (Norte)(Nordeste)(...)        :ooo:       | G.SP | |
| | legenda                      :o:        +------+ |
|----------------------------------------------------|
| Alguns endereços da rede              <   ||   >   |
##|########|########|########|########|########|######  (borda a borda)
| ==--------  01 / 15                                |
+----------------------------------------------------+
```

Composição B

```
+----------------------------------------------------+
|          +300 estações em 11 estados               |
|  SP 14  |          :::: mapa grande ::::           |
|  PR 6   |          ::::::::::::::::::::            |
|  ...    |          ::::::::::::::::::::            |
|----------------------------------------------------|
#### carrossel ####
```

B foi descartada: o mapa é alto (900 x 1353) e em largura total passaria de uma tela, com vazios dos lados; e a lista por estado exporia a diferença entre os dados (10) e o número oficial (11). Por isso a lista é por região, que confere: há pontos nas cinco.

- **Mapa:** divisas municipais nos 10 estados; pins em gota, três por endereço novo; Grande São Paulo com a capital realçada; na área do detalhe o mapa geral mostra menos pins. Duas versões do SVG: com movimento reduzido a página escolhe a parada.
- **Carrossel:** 15 prédios (os 11 pedidos, depois Thera, Pinheiros One, Arquipeo e Faria Lima Financial Center). Cartões quadrados, o atual alinhado à margem do texto. Além de pausar no mouse, foco, aba escondida e fora da tela, ganhou um **botão de pausa** (WCAG 2.2.2). "Berrini 500" passou a "B500". Quantum e CBOP são imagens de projeto, ditas no texto alternativo.

## R-15 Depoimentos 💡
- **A (escolhida):** um depoimento principal com foto da operação e dois menores em cartões claros, cada um com o trecho que resume o resultado marcado.
- B: carrossel de um por vez: esconde dois terços da prova.
- C: depoimento com número ao lado: não há números reais por cliente.

## R-16 e R-17
- Um único componente de cartão de matéria na home e em `/imprensa/`.
- Fechamento da home em dois painéis de mesma altura. No esquerdo, três passos curtos (o que acontece depois), canais e contatos.

## R-18
- A variável de repositório `SITE_ENV=production` liga o modo de lançamento sem editar código; sem ela, o deploy continua como teste.
- Acrescentados: `CNAME`, `_redirects`, redirecionamento das âncoras do site antigo, `favicon.ico`, suporte na página 404, política de privacidade com os campos atuais.
- Corrigido o envio ao GA4 e ao Meta Pixel (como estava, o GA4 não registraria nada quando fosse ligado).

## Outras
- Movimento reduzido: agora inclui a faixa da home (ver pendências).
- Ícone de WhatsApp: o glifo oficial no site todo.
- Desempenho: foto do hero em 640 px no celular; o carrossel monta as cópias do laço depois de carregar; os logos das faixas carregam depois da página.
