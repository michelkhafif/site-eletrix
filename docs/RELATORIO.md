# Relatório final — Novo site da Eletrix

## O que foi construído
Site estático com 33 páginas indexáveis, mais 404 e 3 rotas legadas: home, Eletrix Hub, Eletrix Rent, empresas, condomínios, instalação na vaga, carregadores, laudo de demanda, infraestrutura seca, controle de demanda, adequação IT-41 (com calculadora), troca de operador, white label, empreendimentos, mapa de estações (MapLibre), app, suporte, 5 guias, 4 páginas de cidade, sobre, imprensa, contato, perguntas frequentes e páginas legais.

## Principais decisões
- **Mensagem-mãe** "Qualidade de serviço à altura de um AAA" no hero; números discretos; logos em faixa monocromática pausável.
- **Navegação** com mega-menu pelos três perfis do catálogo e a sequência Medir → Preparar → Controlar → Regularizar.
- **Design**: navy/preto + azul #10B7FF, alternando seções escuras e claras; Manrope + Inter self-hosted; botão primário com texto escuro (contraste). Animações só de entrada, contador e parallax leve, desligadas com `prefers-reduced-motion`; conteúdo visível sem JavaScript.
- **Clareza**: cada solução segue o-que-é → como funciona → preço/modelo → FAQ → próximo passo. Preços só os públicos do briefing; nada de tarifa ou mensalidade.
- **Performance**: Lighthouse mobile local 95–100 em desempenho, 97–100 em acessibilidade, 100 em boas práticas. O SEO só pontua em domínio real (canonical); todos os itens individuais passam.
- **Privacidade**: mapa só com locais "Sim", sem endereço; nenhum dado de proposta; `_materiais/` e `CLAUDE.md` fora do Git.

## Como rodar
```bash
npm install
npm run dev
npm run build && npm start   # simula o site estático
```
Scripts: `npm run images` (imagens e logos), `npm run data` (CSV → estações), `npm run og` (imagens OG), `npm run seo:check`, `npm run links:check`.

## Como publicar (teste)
Push na `main` dispara `.github/workflows/deploy.yml` (basePath `/site-eletrix`, noindex). Ative uma vez: **Settings → Pages → Source: GitHub Actions**. URL: https://michelkhafif.github.io/site-eletrix/

## Migrar para eletrix.mobi
Build com `NEXT_PUBLIC_SITE_ENV=production` e `NEXT_PUBLIC_BASE_PATH` vazio (ou ajuste as variáveis do workflow). Isso libera indexação, gera sitemap.xml, robots.txt e canonical em eletrix.mobi. Depois: configurar 301 para as 3 rotas legadas, preencher GA4/Pixel se desejado e confirmar o domínio no Search Console.

## Pendências
Lista completa em `docs/PENDENCIAS.md` (e-mail do FormSubmit, links das lojas, LinkedIn, links do Estadão, depoimentos reais, revisão jurídica, vetores dos logos).

## Próximos passos recomendados
1. Ativar Pages e o FormSubmit; testar um envio real.
2. Revisão jurídica das políticas e dos guias.
3. Trocar depoimentos provisórios.
4. Pedir logo vetorial da Eletrix com o símbolo do plug e vetores dos parceiros.
5. Medir com Search Console e GA4 após o lançamento.

## Rodada 2
Faixa de parceiros corrigida (rolagem contínua com os 39 logos, grade estática em movimento reduzido, página `/parceiros/`), novo hero com o carregador em destaque, fundos claros em cinza com cards brancos e sombra, revisão completa (`docs/REVISAO.md`) e plano em `docs/PLANO-V2.md`.
