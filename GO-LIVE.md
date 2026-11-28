# Lançamento do novo site em eletrix.mobi

Passo a passo para colocar no ar. Nada foi publicado: a branch `rodada-3` espera a sua aprovação.

## 0. Antes de publicar (decisões suas)

| # | O que resolver | Como |
|---|---|---|
| 1 | **Depoimentos são provisórios.** Não publique como se fossem reais. | Troque o texto em `src/data/content.ts` por depoimentos reais **ou** esconda a seção: `showPlaceholderTestimonials: false` em `src/config/site.ts`. O build de produção avisa enquanto estiverem visíveis. |
| 2 | **Link da matéria do "orelhão".** O endereço enviado fala de Fórmula E e não foi possível abri-lo para conferir. | Envie o link certo e troque em `src/data/content.ts` (`press`, item `orelhao-ponto-de-recarga`). |
| 3 | **"+11 estados".** Os dados do mapa mostram 10 estados. | Confirme o 11º estado (e envie o endereço) ou ajuste o número em `src/config/site.ts`. |
| 4 | **Ver o site antes.** | `git switch rodada-3`, `npm install`, `npm run build`, `node scripts/qa/serve.mjs 3001` e abra http://localhost:3001 |

## 1. Aprovar

Faça o merge de `rodada-3` na `main`. Isso publica o **ambiente de teste** de sempre (https://michelkhafif.github.io/site-eletrix/, com `noindex`). O domínio só muda nos passos abaixo.

## 2. Hospedagem

Recomendo continuar no **GitHub Pages**: o deploy já está pronto, é gratuito e tem HTTPS.

Alternativas, se quiser redirecionamentos 301 de verdade:
- **Cloudflare Pages ou Netlify:** comando `npm run build`, pasta `out`, variável `NEXT_PUBLIC_SITE_ENV=production`. O arquivo `public/_redirects` já traz os 301.
- **Hostinger (onde está o DNS):** rode `NEXT_PUBLIC_SITE_ENV=production npm run build` e envie o conteúdo de `out/` para `public_html`, com o `.htaccess` do passo 5.

## 3. Publicar no GitHub Pages com o domínio

Faça na ordem. Entre os passos **c** e **f** o endereço de teste pode aparecer sem estilo: é esperado.

**a. Verificar o domínio (recomendado pelo GitHub).** Seu perfil no GitHub → Settings → Pages → *Add a domain* → `eletrix.mobi`. Crie na Hostinger o registro TXT que o GitHub mostrar (`_github-pages-challenge-michelkhafif`) e clique em *Verify*. Mantenha o TXT.

**b. Conferir a fonte.** Repositório → Settings → Pages → Source: **GitHub Actions**.

**c. Ligar o modo de produção.** Repositório → Settings → Secrets and variables → Actions → aba **Variables** → *New repository variable*: nome `SITE_ENV`, valor `production`.

**d. Publicar.** Actions → *Deploy no GitHub Pages* → *Run workflow* (branch `main`). O build passa a sair sem `/site-eletrix`, indexável, com `sitemap.xml`, `robots.txt` liberado e canônicos em `https://eletrix.mobi`.

**e. Informar o domínio.** Repositório → Settings → Pages → *Custom domain*: `eletrix.mobi` → Save. Faça isto **antes** de mexer no DNS.

**f. Trocar o DNS na Hostinger** (hPanel → Domínios → eletrix.mobi → DNS).

Hoje (consulta de 27/11/2026): `@` e `www` apontam para `185.158.133.1` (site atual, Lovable).

Remova esses dois registros e crie:

| Tipo | Nome | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | michelkhafif.github.io |

> **Não mexa nos registros de e-mail do domínio:** os `MX` (`mx1.hostinger.com`, `mx2.hostinger.com`), o `TXT` de SPF (`v=spf1 include:_spf.mail.hostinger.com ~all`) e qualquer registro `_domainkey`, `_dmarc` ou `autodiscover`. Apagar um deles derruba o e-mail.

**g. HTTPS.** A propagação pode levar até 24 horas. Depois, em Settings → Pages, marque **Enforce HTTPS** (a opção pode demorar a aparecer).

**Como voltar atrás:** recoloque os registros `A` de `@` e `www` em `185.158.133.1`. Não desligue o projeto no Lovable nos primeiros dias.

## 4. Formulários (obrigatório)

O envio usa o FormSubmit para **admin@eletrix5.com.br**.

1. No site no ar, preencha o formulário de `/contato/` e envie. **A primeira tentativa mostra erro**: é o FormSubmit pedindo ativação.
2. Abra a caixa de `admin@eletrix5.com.br` (olhe o spam) e clique no link de ativação.
3. Envie de novo. Confira se o e-mail chega com: Perfil, Interesse, Nome, Telefone ou WhatsApp, E-mail, Empreendimento ou condomínio, Endereço, Mensagem, Página de origem, Consentimento LGPD.
4. Repita um envio pela home e um por `/troca-de-operador/`.

Nesta rodada o envio foi testado com a resposta **simulada**: nada saiu para o FormSubmit.

## 5. Endereços antigos

O site atual tem 4 endereços no sitemap. Todos continuam funcionando:

| Antigo | Novo |
|---|---|
| `/` | `/` |
| `/estacao-de-recarga-veiculos-eletricos` | `/empresas/` |
| `/carregador-veicular-predios-corporativos` | `/eletrix-hub/` |
| `/eletroposto-tarifado` | `/eletrix-hub/` |
| `/#solutions` | `/#solucoes` |
| `/#portfolio` | `/#estacoes` |
| `/#app` e `/#eletrix-hub` | mesmas seções |
| `/#cases` | `/#depoimentos` |
| `/#faq` | `/#duvidas` |
| `/#media` | `/imprensa/` |
| `/#partners` | `/parceiros/` |
| `/#sobre` | `/sobre/` |

Páginas que existiam no teste e saíram: `/app/` → `/#app`; `/empreendimentos/` e `/estacoes/` → `/#estacoes`.

No GitHub Pages o redirecionamento é por *meta refresh* imediato (o Google o trata como permanente). Em Apache (Hostinger), use este `.htaccess`:

```apache
ErrorDocument 404 /404.html
RewriteEngine On
RewriteRule ^estacao-de-recarga-veiculos-eletricos/?$ /empresas/ [R=301,L]
RewriteRule ^carregador-veicular-predios-corporativos/?$ /eletrix-hub/ [R=301,L]
RewriteRule ^eletroposto-tarifado/?$ /eletrix-hub/ [R=301,L]
RewriteRule ^(empreendimentos|estacoes)/?$ /#estacoes [R=301,L,NE]
RewriteRule ^app/?$ /#app [R=301,L,NE]
```

## 6. Google Search Console

1. Entre em https://search.google.com/search-console. Se `eletrix.mobi` já estiver lá (do site atual), use a propriedade. Se não, *Adicionar propriedade* → **Domínio** → `eletrix.mobi` → crie o TXT indicado na Hostinger (sem apagar o de SPF).
2. Menu **Sitemaps** → adicione `https://eletrix.mobi/sitemap.xml`.
3. **Inspeção de URL** → peça indexação de `/`, `/eletrix-hub/`, `/condominios/`, `/instalacao-carregador-residencial/`, `/adequacao-it-41/` e `/parceiros/`.
4. Uma semana depois, abra **Páginas** e **Experiência** e veja se há erros.
5. Confira se o Perfil da Empresa no Google aponta para o site e traz os telefones certos.

## 7. Medição (opcional)

1. Crie a propriedade no Google Analytics 4 (e o Pixel da Meta, se for anunciar).
2. Preencha `analytics.ga4Id` e `analytics.metaPixelId` em `src/config/site.ts`, faça commit na `main`.
3. Em produção aparece o aviso de cookies; as ferramentas só carregam depois do aceite.
4. Abra o site, aceite e confira a visita em **Tempo real**.

## 8. Checklist do dia

- [ ] `https://eletrix.mobi` e `https://www.eletrix.mobi` abrem com cadeado
- [ ] `https://eletrix.mobi/robots.txt` libera e aponta o sitemap; `/sitemap.xml` abre
- [ ] O código-fonte da home não tem `noindex`
- [ ] Os 4 endereços antigos redirecionam
- [ ] No celular: menu, popup de suporte, ligação para o 0800, WhatsApp comercial e de suporte
- [ ] **Baixe o App** abre a App Store no iPhone e a Google Play no Android
- [ ] Formulário ativado e testado (passo 4)
- [ ] "Ler a matéria" abre a matéria certa
- [ ] Uma página inexistente mostra a página 404 da Eletrix
- [ ] Ícone aparece na aba; link enviado no WhatsApp mostra a imagem
- [ ] E-mails `@eletrix.mobi` continuam chegando
- [ ] Sitemap enviado no Search Console
- [ ] PageSpeed Insights da home e do contato anotado

Fontes dos valores de DNS e da ordem dos passos: documentação do GitHub Pages sobre [domínio personalizado](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), consultada em 27/11/2026.
