# Publicação do site Esperança

O pacote `site-publicacao.zip` contém o site estático na raiz, pronto para upload em hospedagem estática com HTTPS. A pasta `dist/` contém os mesmos arquivos descompactados. Não há instalação de dependências, servidor de aplicação ou variáveis de ambiente.

Para gerar novamente após editar `primeira-visao/`:

```sh
python3 scripts/prepare_site.py
```

Configure a pasta publicada como `dist`. O documento inicial é `index.html`. Caso o provedor peça comando de build, utilize o comando acima (Python 3 e Node.js precisam estar disponíveis); também é possível enviar diretamente o ZIP sem executar build no provedor.

## Pendências para a versão completa

- Integrar confirmação de presença e interesse nas lembranças a um destino definido pela organização. Atualmente os formulários guardam nome, cidade/e-mail e escolhas apenas no navegador, sem enviar dados. A página informa isso antes do preenchimento. Não há processamento de compras.
- Confirmar valores, disponibilidade e contato para as lembranças.
- Revisar com a organização programação, datas da linha do tempo, endereço e chave Pix antes de divulgar amplamente.
- Após definir domínio, acrescentar URL canônica e imagem de compartilhamento com URL absoluta.

## Verificação realizada

Validados recursos locais, âncoras internas, IDs únicos e sintaxe JavaScript. Corrigida a opção PP do seletor de tamanho, adicionados metadados de compartilhamento e descrição, foco visível e quebra da navegação em telas intermediárias. O pacote exclui o arquivo de prompt da imagem.

A verificação não incluiu navegador real, entrega de formulários nem uma hospedagem publicada. Nenhum site foi colocado no ar nesta preparação.
