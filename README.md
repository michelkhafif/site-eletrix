# Site Eletrix

**Site de teste:** https://michelkhafif.github.io/site-eletrix/ (noindex)

Site institucional da Eletrix (Next.js 15, exportação estática, TypeScript, Tailwind).

- **Lançamento em eletrix.mobi:** [`GO-LIVE.md`](GO-LIVE.md)
- Última rodada: [`RODADA-3-RELATORIO.md`](RODADA-3-RELATORIO.md)
- Decisões, pendências e ideias: `REDESIGN-DECISOES.md`, `REDESIGN-PENDENCIAS.md`, `REDESIGN-IDEIAS.md`
- Histórico da primeira versão: pasta `docs/`

## Rodar

```bash
npm install
npm run dev                      # desenvolvimento
npm run build                    # build estático em out/ (ambiente de teste)
node scripts/qa/serve.mjs 3001   # serve out/ em http://localhost:3001
```

## Dados e imagens (precisam da pasta `_materiais/`, fora do Git)

```bash
npm run images   # fotos e logos otimizados
npm run data     # pontos do mapa: geocodificação (com cache), estacoes.json e SVG
npm run og       # imagens de compartilhamento e favicon.ico
```

## Conferir

```bash
npm run typecheck && npm run lint && npm run seo:check && npm run links:check
node scripts/qa/rodada3.mjs http://localhost:3001      # testes de ponta a ponta
node scripts/qa/carrossel.mjs http://localhost:3001    # carrossel de prédios
node scripts/qa/whatsapp.mjs http://localhost:3001     # botão do WhatsApp
node scripts/qa/telas.mjs http://localhost:3001        # capturas em sete larguras
node scripts/qa/golive.mjs                             # depois de um build de produção
```

## Publicar
Todo push na `main` roda `.github/workflows/deploy.yml` e publica no GitHub Pages. Sem a variável de repositório `SITE_ENV`, sai como teste (`basePath /site-eletrix`, noindex). Com `SITE_ENV=production`, sai para `https://eletrix.mobi`. Passo a passo em `GO-LIVE.md`.
