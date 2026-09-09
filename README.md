# Escola Superior de Polícia Ambiental

Aplicação web estática baseada no **Aplicativo V2 fornecido pelo autor**, com apoio ao patrulheiro ambiental. Esta revisão substitui a primeira implementação genérica e conserva os 9 módulos, 45 conteúdos, checklists, ferramentas, gerador BOPAmb e formulário parcial de nexo causal da V2.

## Usar

Abra o site e selecione uma área ou pesquise um termo. Marque conteúdos como favoritos. O botão **Ler documento** abre a fonte oficial em um painel dentro da interface; quando há uma única referência identificada sem ressalvas, o próprio título abre o leitor.

Sites oficiais podem bloquear a exibição em outros sites ou exigir download do PDF. O painel mantém a opção **Abrir no site oficial**. Não são usados serviços de terceiros para contornar essas restrições.

Favoritos e marcações dos checklists ficam neste navegador. Os dados preenchidos em BOPAmb e nexo causal não são enviados nem salvos: copie o resultado antes de mudar de tela. Não há login, servidor, banco de dados ou integração de IA.

## Documentos

Dos 30 títulos recuperados da referência, 14 têm fontes oficiais vinculadas; dois destes precisam de confirmação do ano da IN IBAMA 10. Os demais aguardam arquivos. Veja [fontes e observações](FONTES-OFICIAIS.md) e [documentos a enviar ou confirmar](DOCUMENTOS-PENDENTES.md).

Os títulos abreviados originais foram preservados. A consulta às fontes não equivale a uma revisão jurídica integral: alguns textos possuem alterações posteriores, indicadas quando identificadas. A SEMIL 27/2025 trata de período de 2025; o leitor também oferece a página oficial da operação de 2026.

O formulário de nexo causal continua parcial, sem pontuação automática ou recomendação de autuação. O menu IA Ambiental identifica a ausência de integração na V2 e dá acesso aos geradores existentes. O vídeo e a identidade visual oficial não vieram no pacote; não se afirma reprodução visual exata do aplicativo de referência. O [README original](README-ORIGINAL-V2.md) foi preservado como histórico.

## Publicar gratuitamente no GitHub Pages

1. Neste repositório, abra **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**.
3. Selecione **main** e a pasta **/docs** e salve.
4. Aguarde o GitHub concluir a publicação. O endereço previsto é https://raphaellaurindo01-stack.github.io/Escola-Superior-de-Policia-Ambiental/.

O projeto não precisa de compilação nem de serviço pago. Publicações futuras usam os arquivos de `docs/`. Alternativamente, publique essa pasta em qualquer hospedagem estática com HTTPS.

## Executar no computador

Com Node.js instalado, na pasta do projeto execute:

```sh
node scripts/serve.cjs
```

Abra http://localhost:4173/Escola-Superior-de-Policia-Ambiental/. Não abra `index.html` diretamente: o carregamento dos dados e o acesso offline precisam de um servidor HTTP.

Para verificar a estrutura e as principais funções:

```sh
node scripts/check.cjs
```

## Acesso offline e atualização

Depois do primeiro acesso completo, o navegador guarda a interface e o conteúdo interno. Documentos hospedados nos órgãos oficiais precisam de internet e não são copiados para o cache do aplicativo. A disponibilidade da instalação depende do navegador; o pacote original não forneceu ícones próprios de instalação.

Após uma atualização, feche todas as abas do aplicativo e abra novamente. Ao editar arquivos futuramente, altere a versão do cache em `docs/sw.js` para atualizar o conteúdo offline.

## Editar o conteúdo

- `docs/data/content.json`: módulos, roteiros, referências e endereços oficiais.
- `docs/app.js`: navegação e ferramentas.
- `docs/reader.js`: leitor interno de documentos.
- `docs/styles.css`: aparência da V2 e ajustes do leitor.
- `docs/sw.js`: cache offline somente dos arquivos internos.

Acrescente fontes em `documents` com título e URL HTTPS oficial. Atualize também os registros de fontes e pendências. Não inclua dados de ocorrências reais ou credenciais nos arquivos públicos.
