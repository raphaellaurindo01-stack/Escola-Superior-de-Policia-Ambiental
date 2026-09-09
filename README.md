# Escola Superior de Polícia Ambiental

Primeira versão de uma aplicação web estática e PWA de estudo e apoio à organização pessoal do patrulheiro ambiental. Projeto educacional independente, sem vínculo institucional declarado, certificação ou emissão de documentos oficiais.

## O que funciona

- Quatro guias introdutórios: fauna, vegetação, água e resíduos, qualidade do registro.
- Busca de conteúdo sem depender de internet.
- Quatro trilhas com leitura, exercício e progresso salvo no navegador.
- Checklist pessoal com marcações persistentes e reinício com confirmação.
- Caderno com salvamento automático local, exportação em `.txt` e exclusão com confirmação.
- Biblioteca de links oficiais e interface adaptada a celulares.
- Acesso offline aos recursos internos após o primeiro carregamento completo; instalação como PWA nos navegadores compatíveis.

Não há contas, servidor, analytics, cookies de rastreamento, banco de dados ou serviços pagos. O armazenamento usa `localStorage` no navegador. Não inserir dados pessoais, sigilosos ou de ocorrências reais. Não há sincronização ou backup remoto; exporte suas notas. A hospedagem pode manter seus próprios registros de acesso.

## Publicação gratuita com GitHub Pages

O repositório é público e o conteúdo publicável está exclusivamente em `docs/`. Não há etapa de compilação.

1. Abra **Settings → Pages** neste repositório.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha **main** e a pasta **/docs**; clique em **Save**.
4. Aguarde o GitHub concluir a publicação e use o endereço exibido nessa tela.

Endereço esperado após a ativação (não significa que já esteja publicado):
https://raphaellaurindo01-stack.github.io/Escola-Superior-de-Policia-Ambiental/

O GitHub Pages está disponível gratuitamente para repositórios públicos no GitHub Free. Consulte as [instruções oficiais](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Essa configuração se aplica somente a este repositório.

## Usar e instalar

Abra a página publicada. Navegue pelas seções do menu. Em Trilhas de estudo, leia o guia e acerte o exercício para concluir a trilha. No caderno, digite suas notas e use **Exportar notas (.txt)** para guardar uma cópia.

Aguarde **Conteúdo disponível offline** antes de desconectar. Essa mensagem confirma que os recursos internos foram armazenados; os links de legislação precisam de internet. Se o navegador remover dados do site, acesse online novamente. No Chrome/Edge compatível, use **Instalar aplicativo** quando oferecido; no Safari móvel, **Compartilhar → Adicionar à Tela de Início**. HTTPS ou localhost é necessário para o service worker. A interface pode abrir por arquivo, mas essa forma não oferece offline/PWA.

## Executar localmente

Com Node.js 18 ou superior, sem instalar dependências:

```sh
node scripts/serve.cjs
```

Abra http://localhost:4173/Escola-Superior-de-Policia-Ambiental/ . Encerre com Ctrl+C. O servidor local serve apenas `docs/` e simula o caminho do GitHub Pages.

## Estrutura e manutenção

```text
docs/index.html           Estrutura da aplicação
docs/styles.css           Layout responsivo
docs/app.js               Conteúdo, navegação e ferramentas locais
docs/sw.js                Cache offline versionado
docs/manifest.webmanifest Instalação da PWA
docs/icon*                Ícones próprios com monograma EA
scripts/serve.cjs         Servidor local sem dependências
scripts/check.cjs         Verificação automatizada
```

Edite os guias e exercícios em `guides`, as fontes em `sources` e o checklist em `checks`, dentro de `docs/app.js`. Mantenha os IDs estáveis para preservar o progresso. Revise conteúdo com profissionais habilitados antes de ampliar seu uso institucional. Não há cálculo de multas, classificação jurídica automática ou protocolo operacional oficial.

Ao alterar qualquer arquivo público, incremente `CACHE` em `docs/sw.js` (ex.: `espa-v1.0.1`). O aplicativo usa uma versão coerente em cache e prepara a nova em segundo plano. Feche todas as abas/janelas do aplicativo e abra novamente para ativar a atualização; não é necessário apagar as notas. Não renomeie o prefixo `espa:v1:` sem planejar migração do armazenamento.

## Verificação

```sh
node scripts/check.cjs
```

Verifica sintaxe, recursos offline, caminhos da PWA, arquivos de ícones, conteúdo dos exercícios e isolamento do cache. Para homologar no dispositivo, confira busca com e sem acentos, conclusão e recarga das trilhas, persistência do checklist, exportação de notas, recusa à confirmação de exclusão e reabertura offline após o carregamento completo. Teste instalação e atualização no navegador de destino. As verificações automatizadas não substituem esse teste de navegador.

## Fontes

- [Lei nº 9.605/1998](https://www.planalto.gov.br/ccivil_03/leis/l9605.htm)
- [Decreto nº 6.514/2008](https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/decreto/d6514.htm)
- [Lei nº 12.651/2012](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12651.htm)

Referências selecionadas em 09/09/2026. A aplicação aponta para textos oficiais online, sem copiar ou congelar seus dispositivos. Confira alterações e normas estaduais e locais. Os guias são exercícios gerais de observação e organização, não orientação jurídica. O contexto recuperado da conversa anterior continha o conceito e o nome do projeto, mas não continha arquivos ou currículo anterior; esta versão foi construída a partir desse conceito.
