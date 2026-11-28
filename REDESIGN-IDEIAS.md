# Redesign v2: ideias (não implementadas na versão principal)

Cada uma passou pelo filtro: melhora o entendimento ou a conversão? Combina com uma empresa grande e séria? Não é enfeite?

1. **Central de dúvidas em grupos** (esforço médio). Hoje `/guias/` lista 5 artigos. Quando houver mais artigos, agrupar por perfil (morador, síndico, empresa) com uma página por grupo, como a estrutura de SEO aprovada descreve. Aumenta a profundidade de cliques para SEO e facilita a busca.
2. **Estação mais próxima no mapa** (esforço médio). Um botão "perto de mim" que centraliza o recorte do mapa estático na cidade escolhida, sem JavaScript pesado (troca de `viewBox` por cidade). O mapa ficaria útil para o motorista, não só para o gestor.
3. **Pulso de energia no cabo, no hero** (esforço baixo, risco médio). Linha fina acompanhando o cabo na foto com um pulso viajando. Depende de uma foto em paisagem em que a posição do cabo seja estável nos recortes; ver pendência da foto do hero.
4. **Microinteração no botão primário** (esforço baixo). No hover, o brilho do LED percorre o botão uma vez. Só entra se o hero e os botões continuarem sóbrios; deixei de fora para respeitar "anime menos".
5. **Simulador de ganho do empreendimento no Hub** (esforço alto). Sem publicar tarifas, um estimador de potencial de bônus por número de vagas exigiria dados que não temos. Fica como ideia para quando houver números oficiais.
6. **Prova de operação** (esforço médio). Uma faixa com a frase "Nenhuma estação desinstalada por falta de suporte" e a linha do tempo desde 2021, só com fatos já aprovados.
7. **Página única de "Para quem é"** com os três perfis como entrada em tela cheia no celular. Hoje o "Qual é o seu caso?" já cumpre o papel na home; só vale se os testes mostrarem que a home não basta.

---

# Rodada 3: ideias que ficaram de fora

1. **LED em outras fotos** (esforço médio). A mesma técnica de contorno na página do Hub, com a foto dos orelhões. Fica de fora para o hero continuar sendo o único momento de movimento.
2. **Filtro por região no mapa** (esforço médio). Os selos "Norte, Nordeste…" viram botões que realçam a região (versões do SVG trocadas por CSS). Hoje são só informativos.
3. **Carrossel com o tipo de local** (esforço baixo). Um selo "Corporativo", "Shopping", "Hotel" no cartão, quando houver fotos de outros perfis. Os dados já têm o campo.
4. **Fotos dos shoppings Argoplan** no carrossel (esforço baixo, depende de fotos): mostraria o alcance fora de São Paulo.
5. **Etapa 1 do síndico em uma linha** (esforço baixo). Entre 1024 e 1180 px, "Laudo de demanda de energia" quebra com o ícone solto. Não mexi porque o pedido foi não tocar na parte de cima da seção.
6. **Depoimento com vídeo curto** de um síndico, quando houver depoimentos reais (esforço médio).
7. **"O que acontece depois"** na confirmação do formulário, com prazo de resposta, se a equipe quiser assumir um prazo.
8. **CSS crítico embutido.** Testado nesta rodada (`experimental.inlineCss` do Next): aumentou o HTML e piorou o LCP medido, então ficou de fora.
9. **Horário do WhatsApp de suporte no próprio botão** do popup: fora das 8h às 20h, destacar o 0800 automaticamente.
