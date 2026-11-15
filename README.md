# Site Eletrix

**Site de teste:** https://michelkhafif.github.io/site-eletrix/ (noindex)

Site institucional da Eletrix (Next.js 15, exportação estática, TypeScript, Tailwind).

- Plano e decisões: `docs/PLANO.md`
- Pendências: `docs/PENDENCIAS.md`
- Relatório final, execução e publicação: `docs/RELATORIO.md`

```bash
npm install
npm run dev        # desenvolvimento
npm run build      # build estático em out/
```

## Publicar
Todo push na `main` roda `.github/workflows/deploy.yml` e publica no GitHub Pages (Settings → Pages → Source: GitHub Actions), com `basePath /site-eletrix` e noindex. Para eletrix.mobi, veja `docs/RELATORIO.md`.
