# PLANO V2 — segunda rodada

## 1. Faixa de parceiros: diagnóstico
- **Causa da rolagem parada:** a animação usava `@keyframes marquee`, que só existia no `tailwind.config.ts` e o Tailwind só emite keyframes de utilitários usados. Como a classe `animate-marquee` nunca foi usada, o keyframe não foi gerado e a faixa ficava estática (mostrando só os primeiros logos). Corrigido definindo o keyframe no CSS global.
- **Movimento reduzido:** antes a faixa virava lista rolável horizontal (logos escondidos). Agora, com `prefers-reduced-motion`, a faixa dá lugar a uma **grade estática com todos os 39 logos**.
- **Qualidade:** logos oficiais em vetor baixados dos sites das empresas para Kinea, Safra, Hersil, Vitacon, Inteli e Intercity; Bresco em PNG maior. Os demais seguem com o recorte da apresentação (pendência registrada).
- **Padronização:** tamanho por "área visual" igual para todos, com limites de largura e altura; células de largura fixa para espaçamento uniforme; versão monocromática única.
- **Nova grade completa** de parceiros em `/parceiros/`, com destaque para os nomes de maior peso.

## 2. Hero da home: alternativas
| | Ideia | Prós | Contras |
|---|---|---|---|
| A | Foto full-bleed do totem orelhão com carro carregando | Impacto imediato, produto óbvio | Perde a escala de empreendimento AAA |
| B | Composição: totem (foto real) em destaque + cartão de status de recarga + foto de garagem + prédio ao fundo | Mostra produto, uso e escala; elementos de interface reforçam "recarga" | Mais complexa no mobile |
| C | Mapa da rede animado | Comunica rede | Não mostra o equipamento |

**Escolha: B**, com adaptação para mobile: a foto do totem vira o plano de fundo do topo e o texto vem sobre ela; cartão de status e prédio entram em seguida. Texto: eyebrow "Recarga de carros elétricos para prédios, hotéis e condomínios"; H1 mantém "Qualidade de serviço à altura de um AAA."; o subtítulo cita explicitamente estações de recarga para veículos elétricos. O cartão de status é ilustrativo e usa só fatos do briefing (Tipo 2, 7,4 kW).

## 3. Diagnóstico do design atual
- Áreas claras em branco puro: sem profundidade, cards pouco destacados.
- Cards com sombra quase nula; pouca diferença entre blocos de conteúdo e fundo.
- Cabeçalhos de página escuros corretos, mas planos.
- Numeração e rótulos de seção discretos demais para páginas longas.

## 4. O que muda
- **Fundos claros** em dois cinzas frios (`#F5F7FA` e `#ECF0F5`), com **cards brancos**, borda sutil e sombra consistente (`shadow-card`). Branco puro só em cards, tabelas e formulários.
- **Cards**: raio único, sombra em duas camadas, hover com leve elevação e borda azul.
- **Page hero**: grade de pontos sutil, brilho azul e filete em gradiente na base.
- **Passos**: número em selo, linha conectora no desktop.
- **Títulos de seção**: eyebrow com filete e contagem de seção nas páginas longas.
- Acessibilidade e performance preservadas (AA, LCP < 2,5 s).
