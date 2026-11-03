# Proposta de paleta — CMA Brasil

Paleta aprovada e aplicada ao site em 3 de novembro de 2026. Tema centralizado em `primeira-visao/assets/palette.css`.

Direção: azul #337A98 como primária, preto como base de contraste e identidade, fundos claros para leitura. Substituir verde e amarelo da interface por azul e neutros. Preservar arquivos originais das marcas; qualquer versão alternativa deve ser produzida separadamente.

## Cores por função

| Função | Light | Dark |
| --- | --- | --- |
| Fundo de seção | #FCFBF7 | #0B0D0E |
| Superfície de apoio | #EAF2F5 | #161A1C |
| Texto principal | #161A1C | #FCFBF7 |
| Texto secundário | #56636A | #B9C5CA |
| Links no fundo principal | #337A98 | #83BDD4 |
| Links na superfície de apoio | #28627B | #83BDD4 |
| Botão primário | #337A98 / texto #FFFFFF | #337A98 / texto #FFFFFF |
| Hover de botão | #28627B / texto #FFFFFF | #28627B / texto #FFFFFF |
| Borda de campo | #64757E | #64757E |
| Foco de teclado | #28627B | #83BDD4 |

Foco com contorno de 3px e afastamento de 3px, mantendo a cor em contato com a superfície adequada. Links sublinhados; estados e mensagens também identificados por texto ou ícone. Divisórias decorativas podem ser sutis, mas não devem substituir bordas necessárias para identificar campos.

## Contraste

Valores calculados pela luminância relativa sRGB da WCAG; pares e limites em `paleta-contrastes.json`. Aprovação comparada com valores sem arredondamento.

- Texto comum: mínimo 4,5:1; priorizar 7:1 ou mais no corpo principal quando possível.
- Texto grande: mínimo 3:1; 24px regular ou aproximadamente 18,67px em negrito.
- Elementos gráficos e informações visuais necessárias para identificar controles: mínimo 3:1 contra cores adjacentes.
- Branco sobre primária: 4,80:1. Manter texto do botão branco, sem opacidade.
- Primária sobre fundo claro: 4,63:1. Passa para texto comum, com pouca margem; evitar pesos muito finos e transparência.
- Primária sobre preto #0B0D0E: 4,06:1. Não usar em texto pequeno; usar #83BDD4, com 9,46:1.
- Primária sobre apoio #EAF2F5: 4,23:1. Usar #28627B para links nesse apoio, com 5,93:1.
- Branco sobre azul claro #83BDD4: não recomendado; usar texto #0B0D0E.

Estes cálculos validam pares sólidos, não certificam a página inteira. A implementação deve conferir estados, sobreposições, imagens, fontes e tamanho real em desktop e mobile.

## Distribuição sugerida no site

- Hero: clara; logo preto/azul e arte lateral original; contagem preta e informações secundárias cinza. Mantém leitura dos desenhos e da marca sem inversão.
- Navegação e mensagem de celebração: pretas; texto claro e links azul claro.
- Programação: clara; horários e texto pretos, detalhes azuis.
- Presença e contribuição: pretas; botão azul primário e cartão Pix claro, QR preto sobre branco.
- Local e história: claros; fundos opacos na área de leitura, evitando texto diretamente sobre arte ou fotografia.
- Lembranças: preta; detalhes azul claro.
- Rodapé: claro para o logo preto existente.

Usar faixas escuras contínuas onde fizer sentido. Preto predomina nos títulos e números das áreas claras, além das seções escuras; azul concentra marca, ações e destaques. Não usar grandes superfícies verdes ou amarelas.

Nos fundos pretos, usar uma versão clara aprovada das marcas ou uma área clara de proteção. Não inverter o SVG inteiro por CSS, pois isso alteraria também o azul da marca. A marca institucional atual é verde; se a intenção for uma identidade estritamente azul/preto, preparar uma versão monocromática aprovada.

## Referências

- WCAG 2.2 — contraste de texto: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- WCAG 2.2 — contraste de elementos gráficos e controles: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
