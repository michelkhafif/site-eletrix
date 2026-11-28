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

---

# Rodada 3: pendências (27/11/2026)

## Bloqueiam o lançamento
1. **Depoimentos provisórios** (`placeholder: true` em `src/data/content.ts`). Trocar por reais ou desligar `showPlaceholderTestimonials`. As fotos ao lado são da operação e não identificam o local de nenhum depoimento: se os reais vierem com o nome do prédio, usar a foto dele.
2. **Link do card "O orelhão que virou ponto de recarga".** Foi usado o endereço enviado (instrução de reserva do prompt), mas ele fala de **Fórmula E / recuperação de energia nas frenagens** e quase certamente não é a matéria do orelhão. O WebFetch não abre o domínio `mobilidade.estadao.com.br` e a busca na web não encontrou a matéria. Enviar o link certo. O link do card "prédios" também não pôde ser aberto para conferência (o endereço corresponde ao título).
3. **FormSubmit** ainda precisa ser ativado (primeiro envio real para admin@eletrix5.com.br). Ver `GO-LIVE.md`.

## Números e mapa
4. **Estados: o site diz +11, os dados têm 10** (SP, PR, RJ, SC, RS, BA, MS, MG, PA, GO). Falta o 11º (PE ou outro). Números do site mantidos como pedido.
5. **Cidades: os dados têm 36**, acima do "+22" do site. Não é erro (+22 continua verdadeiro), mas vale decidir se o número deve subir. Por estado: SP 14, PR 6, MG 4, SC 3, RS 2, MS 2, GO 2, RJ 1, BA 1, PA 1.
6. **Pontos com posição aproximada** (o OpenStreetMap não tem o número; usada a rua): Citadel (SP), CASA / Cen. Adm. Sto. Amaro (SP), Shopping Serra Dourada (Altamira), Pátio Central Shopping (Patos de Minas). Se puder, enviar latitude e longitude.
7. **Pontos novos unidos a um do CSV antigo** (regra de ~150 m ou mesmo local), que por isso não têm pin próprio. Confirmar se algum é um prédio diferente: JK Square → JK 360 (132 m); JF 100 → Link School Of Business (139 m); JF 913 → Ed. JHA (120 m); Washington Commercial Building → Ed. Denver (32 m). Os demais unidos são o mesmo lugar: Clube de Campo, Biosquare, TOTVS, JK Tower, Eco Sapucaí, Plaza I, Gabriel, Denver, Padrão Park Bom Retiro e Golden Light. Resultado: 135 locais no mapa (31 novos).
8. **JK Square:** a coordenada do quarteirão pedido foi calculada (`scripts/geocode.mjs`), mas não aparece no mapa por causa da união acima.
9. **Sueste Plaza** estava como "Não mostrar" no CSV antigo e veio na lista nova: entrou no mapa.
10. Os pontos "Depois" do CSV antigo seguem no mapa com opacidade um pouco menor, mesmo os que vieram na lista nova (Biosquare, ECO Sapucaí, Gabriel, Clube de Campo). Marcar "Sim" no CSV se já operam.

## Fotos
11. **Prédio sem nome:** a foto `99_A-CONFIRMAR_predio-fachada-vermelha_SP.jpg` não foi usada. Enviar o nome para entrar no carrossel.
12. **Fotos do carrossel em baixa resolução** (ficam macias em telas de alta densidade): BFL1355 (415 px de largura, a mais crítica), CBOP (680 px), B500 (683 px). Ideal: 1200 px ou mais.
13. **Foto do hero** continua em 960 x 1280. Uma versão maior da mesma cena melhora o desktop; se for outra foto, os contornos do LED (`src/data/hero-led.json`) precisam ser refeitos.
14. **Pinheiros Corporate:** o recorte do cartão mostra a fachada e corta as pontas do letreiro da foto original.

## Parceiros
15. Logos pequenos na origem, que ficariam melhores em vetor: Atrio, Link, Pátria, WEG, GarageInn, Elias Victor Nigri, Jaime e BBZ.
16. **Safra:** usado o logotipo sem o brasão, como na referência nova. **Vitacon e Intercity:** usados os arquivos novos (os oficiais antigos eram outra versão ou só funcionavam em fundo escuro).

## Textos a confirmar
17. **Aplicativo individualizado** e **Dashboard de gerenciamento** (Hub): confirmar se valem para todo contrato. O dashboard está como "mediante solicitação". Os dois voltaram também à página `/eletrix-hub/`.
18. **Faixa de logos da home com "reduzir movimento":** na rodada anterior você pediu que ela rolasse sempre; este prompt pede que nada se mexa sozinho nesse modo. Segui o prompt atual: com a opção ligada no aparelho, a faixa fica parada e pode ser arrastada. Para voltar ao comportamento anterior, apague a regra `.marquee-track { animation: none; }` (e as vizinhas) em `src/app/globals.css`.
19. **LinkedIn:** URL oficial ainda em branco em `src/config/site.ts`.
20. `CLAUDE.md` (briefing) ainda traz os números antigos e o suporte só por WhatsApp. Atualizar para que uma próxima rodada não volte atrás.

## Itens das rodadas anteriores
Resolvidos nesta rodada: estados faltantes no mapa (parcial, ver item 4) e links da imprensa (ver item 2). Continuam: redirecionamentos 301 no domínio definitivo (ver `GO-LIVE.md`) e a camada de grupos em `/guias/`.
