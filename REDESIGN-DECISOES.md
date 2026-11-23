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
