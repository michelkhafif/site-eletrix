# Redesign v2: pendências (dependem do Michel)

1. **Foto do hero.** Só existe uma foto real com carro plugado (`eletrix_carregador_totem_orelhao.jpg`, 960 × 1280 em retrato). No desktop ela é recortada em paisagem e ampliada. Se houver uma foto em paisagem, 2400 px ou mais, de carro carregando numa estação Eletrix, o hero melhora bastante.
2. **Pontos do mapa.** O CSV traz 104 pontos públicos (94 operando + 10 a instalar), em **6 estados e 21 cidades** (SP, PR, RJ, SC, RS, BA). Os números oficiais do site são "+20 cidades, +10 estados". Faltam as coordenadas dos demais estados (e a confirmação de quais podem aparecer). Para incluir: preencher o CSV (coluna "Mostrar no mapa do site" = Sim ou Depois) e rodar `npm run data`. Para mostrar um novo estado com divisas municipais, incluir o código dele em `MUNI_UFS` em `scripts/build-map.mjs`.
3. **Pontos "a instalar".** Os 10 que estão marcados "Depois" no CSV já aparecem no mapa. Se houver mais pontos a instalar, enviar a lista (nome, cidade, UF e endereço ou coordenada).
4. **Vagas privativas e pins provisórios** (linhas "Não" do CSV) continuam fora do mapa, por privacidade. Se algum deles deve aparecer, avisar.
5. **Depoimentos.** Continuam provisórios (`placeholder: true` em `src/data/content.ts`, flag `showPlaceholderTestimonials` em `src/config/site.ts`). Trocar por reais antes do lançamento.
6. **Links da imprensa.** Continuam sem URL original (o card da home leva à página de imprensa).
7. **Retrato desfocado na matéria do Estadão.** O recorte da matéria tinha o rosto do Michel no cabeçalho; foi desfocado na imagem do site. Se quiserem a página inteira original de volta (com o rosto), é só retirar o arquivo `_sem-rosto` em `scripts/optimize-images.mjs`.
8. **Estrutura de Guias em grupos.** A Parte 1 do prompt descreve "Home → /guias (5 grupos) → grupo → artigo". Hoje `/guias/` lista direto os 5 artigos. Confirmar se querem a camada de grupos (exige novas URLs).
9. **LinkedIn.** URL oficial ainda em branco em `src/config/site.ts` (o ícone só aparece quando preenchido).
10. **Redirecionamentos 301.** No domínio definitivo, as rotas antigas (`/empreendimentos/`, `/estacoes/`, `/estacao-de-recarga-veiculos-eletricos/`, `/carregador-veicular-predios-corporativos/`, `/eletroposto-tarifado/`) devem virar 301. No GitHub Pages só é possível o meta refresh.
11. **Ativar o FormSubmit** (primeiro envio do formulário gera um e-mail de confirmação para admin@eletrix5.com.br).
12. **Cidades.** A página de Campinas ainda descreve o caso de galpão logístico (Bresco Viracopos). Confirmar se mantém.
13. **Domínio do teste.** `site.ts` aponta o ambiente de teste para `michelkhafif.github.io/site-eletrix`. O README já foi atualizado na rodada anterior; conferir se o repositório publicado é esse.
