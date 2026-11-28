# Rodada 3: relatório

Branch `rodada-3`, enviada ao GitHub. **Sem merge na `main` e sem publicação.** Passo a passo do lançamento em `GO-LIVE.md`.

## Antes de publicar
1. Depoimentos continuam **provisórios**.
2. O link do card do **orelhão** é o endereço enviado, que fala de Fórmula E. Quase certamente está errado.
3. O site diz **+11 estados**; os dados do mapa têm **10** (e 36 cidades).
4. **FormSubmit** precisa ser ativado com um envio real.
5. A faixa de logos da home agora **fica parada** para quem liga "reduzir movimento" (na rodada 2 você tinha pedido o contrário).

## Itens

| Item | Estado | Onde |
|---|---|---|
| R-1 Header: Home, App, Parceiros, Baixe o App; fim da página `/app/` | Feito | `Header.tsx`, `app/page.tsx` |
| R-2 Suporte em popup | Feito | `components/support/` |
| R-3 Contato curto, escuro, com pré-seleção | Feito | `contato/page.tsx`, `ContactForm.tsx`, `data/services.ts` |
| R-4 LED nos contornos da foto | Feito | `HeroScene.tsx`, `LedRunner.tsx`, `data/hero-led.json` |
| R-5 Botões e link do hero | Feito | `home.tsx` |
| R-6 Números, 0800 e horários | Feito | `config/site.ts`, textos, schema |
| R-7 28 parceiros | Feito; alguns logos são pequenos na origem | `partners.ts`, `optimize-images.mjs` |
| R-8 Fotos em "Qual é o seu caso?" | Feito | `HomeSections.tsx` |
| R-9 Eletrix Hub | Feito (também na página do Hub) | `HomeSections.tsx`, `eletrix-hub/` |
| R-10 App depois do Hub | Feito | `HomeSections.tsx` |
| R-11 Página de parceiros | Feito | `parceiros/page.tsx`, `LogoMarquee.tsx` |
| R-12 Botão do WhatsApp com balão | Feito | `WhatsAppFloat.tsx` |
| R-13 Fechamento dos síndicos | Feito | `HomeSections.tsx` |
| R-14 Carrossel e mapa | Parcial: 10 estados nos dados (não 11); 4 pontos com posição aproximada; foto sem nome não usada; 3 fotos em baixa resolução | `ProjectCarousel.tsx`, `scripts/geocode.mjs`, `build-stations.mjs`, `build-map.mjs` |
| R-15 Depoimentos | Feito (conteúdo provisório) | `HomeSections.tsx` |
| R-16 Notícias | Parcial: link do orelhão a confirmar; matérias não abertas | `PressCard.tsx`, `content.ts` |
| R-17 Fechamento da home e formulário único | Feito; envio real não testado | `FinalContact.tsx`, `ContactForm.tsx` |
| R-18 Pronto para ir ao ar | Feito; os passos externos são seus | `GO-LIVE.md`, `deploy.yml`, `postbuild.mjs` |

## Decisões criativas (alternativas em `REDESIGN-DECISOES.md`)
- **LED:** segmento curto que segue cabo, plugue, carro, orelhões, carregador e prédio. No desktop a foto passou a aparecer inteira, à direita do texto.
- **App:** o iPhone sai da seção do Hub para a do app.
- **Parceiros:** fundo marinho, três faixas em cartões.
- **Mapa e prédios:** mapa com selos das cinco regiões em cima, carrossel de borda a borda embaixo, com botão de pausa.
- **Depoimentos:** um principal com foto e dois menores, com o resultado destacado.
- **Contato:** fundo escuro, três canais compactos e formulário já na primeira tela.
- **WhatsApp:** "Como podemos ajudar?", e o botão sai da frente de botões e formulários.

## Lighthouse (12.8.2, build de produção servido localmente, mediana de 5 execuções)

| Página | Perfil | Desempenho | Acessibilidade | Boas práticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Home | celular | 91 (86 a 95) | 100 | 100 | 100 | 3,11 s | 0 | 152 ms |
| Home | desktop | 100 | 100 | 100 | 100 | 0,69 s | 0 | 2 ms |
| Contato | celular | 92 (91 a 94) | 100 | 100 | 100 | 2,98 s | 0 | 152 ms |
| Contato | desktop | 100 | 100 | 100 | 100 | 0,65 s | 0 | 0 ms |

- **Metas não atingidas no celular:** desempenho 95 e LCP de 2,5 s. Outra bateria de 5 execuções deu home 95 (LCP 2,76 s): a medida varia com a máquina. A maior parte do tempo é espera de desenho (CSS e JavaScript do Next).
- As medidas foram feitas antes de dois ajustes finais pequenos (botão de retomar do carrossel e um ponto a mais no mapa).

## O que foi testado
- `images`, `data`, `build`, `links:check`, `seo:check`, `typecheck` e `lint`: sem erros.
- `scripts/qa/rodada3.mjs`: **142 verificações, 0 falhas** (header, menu do celular, popup, pré-seleções, formulário, contato em 360×640 / 390×844 / 430×932, 28 logos, notícias, redirecionamentos, movimento reduzido, teclado na home, 31 páginas em cinco larguras, console).
- Carrossel e botão do WhatsApp: scripts próprios, todos os itens ok.
- LED: prova de alinhamento em 390, 768, 1440 e 1920 px (`led-alinhamento-*.jpg`) e quadros da sequência (`hero-quadros-*.jpg`).
- Mapa: recortes de Altamira, Jataí, Santa Maria, Blumenau, Campo Grande e Montes Claros (`mapa-conferencia.jpg`).
- Build de produção para `https://eletrix.mobi` (`golive.mjs`) e build de teste com `/site-eletrix`.
- Capturas em 360, 390, 768, 1024, 1280, 1440 e 1920 px em `qa/rodada-3/`. Menu do celular só existe até 1023 px; acima disso a captura é do menu Soluções.

## O que não deu para validar
- Aparelhos reais (iPhone e Android), Safari, Firefox e leitor de tela. Tudo foi no Edge, com emulação.
- Envio real ao FormSubmit (resposta simulada).
- Destinos externos: Coderbox, WhatsApp e Estadão foram interceptados; o link foi conferido, a página não foi aberta. O domínio do Estadão está bloqueado para a ferramenta de leitura.
- Redirecionamento do "Baixe o App" para a loja certa em cada celular.
- DNS e HTTPS (só dependem do lançamento).
