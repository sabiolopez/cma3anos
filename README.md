# Esperança — CMA Brasil • 3 anos

Landing page estática: HTML, CSS, JavaScript e assets locais. Sem dependências de runtime ou framework.

## Desenvolvimento

`python3 -m http.server 8080 --directory primeira-visao`

## Build

Node.js 22 ou superior: `npm run build`. A saída é gerada em `dist/`, sempre a partir de `primeira-visao/`. Não editar a saída gerada.

## Vercel

Importar `sabiolopez/cma3anos`. Root Directory: raiz do repositório. Framework: Other. `vercel.json` configura o build e a saída. Nenhuma variável de ambiente é necessária para a apresentação estática atual.

## Arquitetura e pendências

- HTML, estilos e interações estão em `primeira-visao/index.html`. Adequado ao tamanho atual; a cascata CSS acumulada pode ser consolidada numa próxima manutenção.
- Formulários usam localStorage: não enviam e-mail nem registram participações para a organização. Para isso, adicionar API server-side e serviço de e-mail/armazenamento; segredos somente em variáveis de ambiente do servidor.
- O lettering Esperança usa SignPainter/Brush Script do sistema: substituir por arte vetorial aprovada para garantir aparência idêntica em todos os aparelhos. Rubik já é servida localmente.
- Preços e grade de tamanhos precisam de confirmação.
- A contagem termina à meia-noite de 13/12/2026 no fuso de São Paulo; ajustar para o horário oficial quando definido.
- Compartilhar o endereço da Vercel não restringe acesso: configurar proteção de acesso se necessário.

O build valida a sintaxe JavaScript e publica apenas arquivos do site; o prompt dos mockups é excluído.
