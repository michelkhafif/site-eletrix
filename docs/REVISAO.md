# Revisão — rodada 2

## Verificado
- **Números e preços** (varredura automática do texto de todas as páginas construídas): +250 estações, +20 cidades, +10 estados, +5 mil clientes; R$ 2.799, R$ 4.699, R$ 1.799, R$ 449, R$ 6.292 e R$ 500 mil aparecem sempre iguais; garantia sempre de 2 anos. Os valores R$ 2.694, R$ 3.598 e R$ 8.091 vêm só da calculadora (derivados dos preços públicos).
- **Termos proibidos:** nenhuma ocorrência de RFID, reserva, recarga rápida/DC, plataforma white label, concorrentes, "jornada", "insights", "colaboração", "marco importante", "revolucionando", "sinergia", "de ponta". Valores de tarifa do Hub não são publicados.
- **Responsividade:** 38 páginas × 7 larguras (360, 390, 768, 1024, 1280, 1440, 1920), sem rolagem horizontal; sem erros de console nem recursos 4xx. Achado: em 1024 px o botão do cabeçalho estourava a tela; corrigido escondendo App e Suporte abaixo de `xl` (continuam no menu móvel e no rodapé).
- **Links:** verificador `npm run links:check` sem links quebrados, com e sem basePath.
- **Formulário e calculadora:** envio simulado (validação, honeypot, sucesso) e cálculo IT-41 testados.
- **Lighthouse (mobile, local):** home e páginas internas entre 95 e 100 em desempenho, 97–100 em acessibilidade, 100 em boas práticas.

## Corrigido nesta rodada
- Faixa de parceiros parada: keyframe inexistente (ver `docs/PLANO-V2.md`).
- Movimento reduzido: grade estática com todos os logos.
- Tamanho visual dos logos padronizado; logos vetoriais oficiais para Kinea, Safra, Hersil, Vitacon, Inteli e Intercity; Bresco em PNG maior.
- Nova página `/parceiros/`.
- Hero da home com o carregador em destaque.
- Fundos claros em cinza suave, cards brancos com sombra, FAQ em card, passos com selo numérico, hero interno com grade de pontos.
- Link "ghost" legível em seções escuras.
