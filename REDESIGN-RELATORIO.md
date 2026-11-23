# Redesign v2: relatório

Branch `redesign-v2`. Sem merge na principal e sem publicação no GitHub Pages. Decisões em `REDESIGN-DECISOES.md`, pendências em `REDESIGN-PENDENCIAS.md`, ideias em `REDESIGN-IDEIAS.md`.

## 1. Correções do Michel (C-1 a C-16)

| Item | Estado | Onde |
|---|---|---|
| C-1 Hero: foto real escurecida, LED azul, H1 curto, 2 botões lado a lado, link do síndico, números em escadinha | Feito | `src/components/sections/home.tsx`, `Counter.tsx`, `globals.css` |
| C-2 Parceiros: faixa clara, logos maiores, só rolagem, sem pausa e sem "ver todos" | Feito | `LogoStrip` em `home.tsx`, `LogoMarquee.tsx` |
| C-3 Menu mobile travando | Feito (causa: `backdrop-filter` do header prendia o painel fixo) | `Header.tsx` |
| C-4 "Qual é o seu caso?": ilustração, botões coloridos, sem numeração | Feito | `HomeSections.tsx`, `CaseIllustrations.tsx` |
| C-5 Mega menu sólido, sem White label | Feito | `Header.tsx`, `Footer.tsx` |
| C-6 Etapas do síndico, sem preço de IT-41 | Feito | `HomeSections.tsx` (Journey); preço removido do site todo |
| C-7 Estações: 6 fotos de SP + mapa novo, páginas antigas removidas | Feito | `HomeSections.tsx` (Stations), `scripts/build-map.mjs`, `public/mapa/` |
| C-8 Seção "Do Sul ao Nordeste" | Removida | — |
| C-9 "Por que a Eletrix" mais vivo | Feito | `HomeSections.tsx` (Why) |
| C-10 App sem nota, iPhone limpo, links corretos | Feito | `PhoneMockup.tsx`, `site.ts` |
| C-11 Rosto do Michel | Feito (inclui o retrato dentro do recorte do Estadão) | `sobre/page.tsx`, imagens |
| C-12 Dúvidas frequentes na home | Feito | `HomeDuvidas` |
| C-13 Rodapé enxuto | Feito | `Footer.tsx` |
| C-14 Hub para corporativo, sem seguro e dashboard | Feito | `eletrix-hub/page.tsx`, FAQs |
| C-15 Header | Feito | `Header.tsx`, `WhatsAppFloat.tsx` |
| C-16 Páginas internas | Parcial: padrões globais aplicados a todas e conferidas visualmente 13 páginas (ver seção 6). Textos longos das páginas de serviço não foram reescritos | componentes compartilhados |

### Checklist de aceite (Anexo B)
- Hero com foto real escurecida + LED + H1 curto, sem "AAA" e sem parágrafo: **sim**.
- Botões do hero lado a lado no celular: **sim** (360 a 430 px; abaixo de 380 px o texto diminui).
- Link "Síndico ou gestor" leva ao produto: **sim, `/condominios/`** (decisão registrada).
- Números em escadinha e estáticos com reduced motion: **sim** (testado).
- Seção abaixo do hero em cor diferente: **sim** (branca; os logos em cinza).
- Parceiros sem pausa e sem "ver todos": **sim**.
- Menu mobile abre, rola e fecha: **sim** (testado em 390, 360 e paisagem).
- "Qual é o seu caso?" com visual: **sim**.
- Menos branco, botões com cor: **sim**.
- Mega menu sólido sem White label: **sim**.
- Processo do síndico sem preço da IT-41 em lugar nenhum: **sim** (varredura automática no HTML gerado).
- Estações com 6 fotos + mapa com divisas azuis e pins brilhando, estático: **sim**.
- Todos os pontos no mapa ou pendência: **parcial**. Entram os 104 pontos do CSV (94 + 10 a instalar), em 6 estados. Os demais estados e as listas extras estão em pendências.
- `/empreendimentos/` e `/estacoes/` removidas, com redirecionamento: **sim**.
- "Estações" no menu rola até a seção: **sim** (da home e de outra página).
- "Do Sul ao Nordeste" removida: **sim**.
- "Por que a Eletrix" vivo: **sim**.
- App sem nota, mockup limpo, links corretos: **sim**.
- Rosto do Michel removido: **sim**.
- Rodapé enxuto com "Central de dúvidas": **sim**.
- Hub corporativo sem seguro e dashboard: **sim**.
- "Guias" fora do menu, dúvidas frequentes na home: **sim**.

## 2. Principais melhorias de UX
- O visitante entende em 3 segundos: "rede de recarga para carros elétricos, do prédio à sua vaga" e dois botões diretos.
- Menos texto na home: 15 seções viraram 13, cada uma com título curto, uma frase e uma ação.
- Estações virou uma seção só (fotos + mapa), em vez de duas páginas com lista.
- O síndico vê o processo em 4 passos, com ligação visual entre eles.
- Cada página de serviço termina em "Dúvidas sobre…", com 4 a 5 guias.
- O menu mobile funciona.

## 3. Refinamentos visuais
- Ritmo de cor entre seções: branco, azul-céu, marinho, e uma faixa de azul pleno.
- Botões: primário azul, secundário marinho cheio, sobre escuro com preenchimento azul. Alvos de 48 px mínimos, estados de hover, foco e pressionado.
- Tipografia mantida (Manrope + Inter) com títulos menores e sem rótulos em caixa alta.
- Raios e sombras com hierarquia: cartões do "caso" são 3xl com sombra de cartão; o resto usa raios menores.
- Ilustrações próprias, mapa próprio, mockup próprio.

## 4. Estética de IA removida
Rótulos em caixa alta espaçada; numeração 01–07 em conteúdo que não é sequência; fade-e-sobe em todas as seções; setas em todos os botões e em "Ver mais"; colagem de fotos com cartão "Recarregando" no hero; palavra "AAA" fora do Hub; grade de seis cartões iguais com ícone em "Por que"; cinza no lugar de cor nas seções; hover animado em cada cartão da home.

## 5. Sistema de design
Tokens em `tailwind.config.ts` e `globals.css`: cores (`ink`, `brand`, tons de seção `dark`, `ink`, `light`, `paper`, `brand`), escala tipográfica (`display`, `h1`, `h2`, `h3`, `lead`), raios, sombras. Componentes: `Button` (5 variantes, 3 tamanhos), `Section`/`SectionHeader`, `Band`, `PageHero`, `Steps`, `FeatureGrid`, `CheckList`, `RelatedLinks`, `FaqList`, `PhoneMockup`, `CaseIllustrations`, `Counter`, `DuvidasSobre`.

## 6. Acessibilidade e responsividade
- **Larguras verificadas:** home em 360, 390, 768, 1024 e 1440 px (screenshots); hero também em 320, 430 e 1920. Demais páginas em 390 e 1440. Estouro horizontal checado automaticamente em 320, 360, 390 e 768 nas 32 páginas do sitemap: corrigi o do Hub, do Contato e do botão "Ver o caminho completo".
- **Teclado:** 60 tabs pela home, 0 elementos sem outline visível; mega menu abre com Enter e fecha com Esc; menu mobile prende o foco e devolve ao botão.
- **Movimento reduzido:** LED parado, marquee segue rodando (pedido do Michel), números finais diretos, rolagem suave desligada.
- **Contraste:** o azul de texto sobre fundo claro escureceu para `#066A9B` (o Lighthouse apontou 4,4:1 sobre o azul-céu).
- Lighthouse de acessibilidade: 100 na home; o Hub tinha 97 (contraste e nomes dos botões das lojas), corrigidos depois e **não medidos novamente**.
- **Não foi feito:** teste com leitor de tela real, e teste em iPhone/Android físicos. Os alvos de toque e os safe areas foram verificados só por emulação.

## 7. Validação realmente executada
- Build estático sem warnings; `tsc` e `next lint` sem erros; `links:check` (39 páginas) e `seo:check` (32 páginas) ok.
- `scripts/qa/flows.mjs` (20 verificações): reduced-motion, contagem, redirecionamentos (com noindex), links das lojas, WhatsApp só com os dois números, link Estações, varredura do HTML gerado por preço da IT-41 / nota das lojas / foto do CEO / seguro e dashboard / White label no menu e rodapé / links para páginas removidas, "AAA" fora da home, H1 único, teclado, mega menu por teclado e erros do formulário.
- `scripts/qa/menu.mjs`: menu mobile em 390 × 844, 360 × 640 e 844 × 390, e mega menu.
- **Lighthouse (mobile, throttling simulado, contra servidor local com gzip):**
  - Home: desempenho 91, acessibilidade 100, boas práticas 100, SEO 69; LCP 3,3 s; CLS 0; TBT 70 ms.
  - Eletrix Hub: desempenho 94, acessibilidade 97, boas práticas 100, SEO 69; LCP 2,9 s; CLS 0,009.
  - **SEO 69 é esperado:** o ambiente de teste tem `noindex` por regra do briefing; em produção o item "bloqueada para indexação" some.
  - **A meta de LCP ≤ 2,5 s não foi atingida na home** (3,3 s em laboratório, com CPU 4× mais lenta). Imagem do hero já tem `fetchpriority="high"`, e usa o menor tamanho no celular. A causa dominante é atraso de renderização por trabalho do navegador, não rede. Próximo passo: foto do hero em paisagem e menor (pendência 1) e medir no domínio real.
  - **Não medi o "antes":** o build anterior foi sobrescrito antes da primeira medição, então não há comparação numérica.
- `qa/antes/` tem os screenshots da home e de 3 páginas do estado anterior (390 e 1440). `qa/depois/` tem os novos.

## 8. Referências consultadas
Acessadas: **nenhuma na internet.** Usei o texto integral da Skill Frontend Design incluído no Anexo A do prompt (princípios de tipografia, plano em duas passadas, anti-padrões de IA e restraint) e os métodos descritos na Parte 4.4 (CRITIQUE, DISTILL, POLISH, QUIETER, TYPESET, LAYOUT, HARDEN) aplicados manualmente. Não consultei Impeccable, Vercel Web Design Guidelines, UI UX Pro Max, Unslop, Emil Kowalski, NN/g, web.dev, Mobbin, Refero nem WCAG 22 online, e não usei o Playwright MCP (usei Playwright como biblioteca, com o Edge do sistema). Só a API de malhas do IBGE foi acessada (para o mapa).

## 9. Limitações
- LCP da home acima da meta (seção 7).
- Hero com foto de baixa resolução ampliada no desktop (pendência 1).
- Mapa cobre 6 estados e 21 cidades, enquanto os números oficiais falam em +20 cidades e +10 estados (pendência 2).
- Páginas de serviço continuam com bastante texto (reduzi rótulos, numeração e preço, mas não reescrevi os textos). O resumo da norma na página da IT-41 foi recolhido em um bloco expansível.
- A comparação visual "antes e depois" cobre só a home e três páginas.
- Nenhum teste em dispositivo físico nem com leitor de tela.
- O formulário foi testado só até a validação (não enviei dados ao FormSubmit).

## 10. Como ver
```bash
npm install
npm run dev                    # http://localhost:3000
npm run build                  # gera out/
node scripts/qa/serve.mjs 3001 # serve out/ em http://localhost:3001 (com gzip)
node scripts/qa/flows.mjs      # verificações funcionais
node scripts/qa/shots.mjs qa/depois http://localhost:3001 "/,/eletrix-hub/"
npm run data                   # CSV -> estacoes.json e mapa SVG (precisa de _materiais/)
```
Para simular o GitHub Pages: `npm run build:pages` e `node scripts/qa/serve.mjs 3002 /site-eletrix`.

Screenshots finais em `qa/depois/`: `home-{360,390,768,1024,1440}.png`, `hero-{320,430,768,1024,1920}.png`, `menu-mobile-*.png`, `mega-menu-1440.png` e as demais páginas em 390 e 1440.
