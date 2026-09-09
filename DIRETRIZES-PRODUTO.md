# Diretrizes consolidadas — Escola Superior de Polícia Ambiental

## Identidade e experiência
- Produto: **Escola Superior de Polícia Ambiental (ESPA)**.
- Não utilizar o nome, marca ou referência direta a “Apoio ao Patrulheiro Ambiental”.
- Preservar a disposição, organização, navegação, lógica de telas e funcionalidades úteis do aplicativo de referência, adaptadas à identidade ESPA.
- Priorizar experiência de aplicativo/PWA e manter o usuário dentro da interface sempre que tecnicamente possível.
- Solução sem custo de hospedagem, compatível com GitHub Pages.

## Biblioteca jurídica
- Priorizar links para **fontes oficiais vigentes**, e não cópias estáticas no Drive.
- Exibir a norma em leitor/painel interno quando a fonte permitir incorporação.
- Quando a fonte oficial impedir incorporação, manter a experiência interna e oferecer abertura da fonte oficial como contingência.
- Manter `DOCUMENTOS-PENDENTES.md` como relação objetiva de normas/documentos não localizados, para posterior fornecimento do PDF e incorporação à biblioteca.
- Registrar fonte, esfera, tipo normativo, vigência/observações e data de conferência quando aplicável.

## Assistente Ambiental
- Não será mero link para NotebookLM.
- Deve funcionar como recurso nativo do aplicativo.
- Base de consulta: biblioteca própria + fontes oficiais externas previamente confiáveis/mapeadas.
- Toda resposta jurídica/operacional deve apresentar fundamentação e fontes utilizadas.
- Não inventar norma, artigo, fato, competência ou procedimento.
- Quando houver incerteza, conflito normativo ou informação insuficiente, sinalizar expressamente e solicitar/verificar o dado faltante.

## Assistente de ocorrência
- Entrada por texto ou voz; voz é transcrita para texto antes do processamento e pode ser conferida/editada pelo usuário.
- A partir da descrição do cenário, produzir em texto:
  1. síntese objetiva do fato informado;
  2. perguntas/dados que ainda precisam ser confirmados;
  3. roteiro de verificação no local;
  4. possíveis enquadramentos administrativos e penais, sem conclusão prematura;
  5. providências possíveis/pertinentes condicionadas aos fatos confirmados;
  6. base normativa e fontes oficiais.
- A ferramenta é apoio à decisão e não deve preencher lacunas factuais por inferência.

## Ferramenta Corta-Fogo / CFA
- Converter a planilha de pontuação **Corta-Fogo**, da CFA, em ferramenta interativa.
- O usuário seleciona/marca os critérios e o aplicativo calcula a pontuação e apresenta o resultado.
- Regras, pesos, limites e conclusões devem reproduzir fielmente o documento oficial.
- Se o material disponível não trouxer todas as regras, solicitar o PDF ao responsável antes de programar a lógica definitiva.

## Gerador de resenha policial
- O usuário poderá digitar ou ditar informações soltas.
- Um modelo institucional fornecido pelo responsável será a referência estrutural obrigatória.
- O sistema organiza os dados no padrão do modelo sem inventar fatos.
- Campos essenciais ausentes devem ser sinalizados ou perguntados antes da versão final.
- Permitir revisão e cópia do texto produzido.

## Arquitetura inicial
- PWA estática no front-end para interface, biblioteca, ferramentas, cache e recursos locais.
- Recursos que dependam de modelo de linguagem e pesquisa dinâmica não devem expor chave/API no JavaScript público do GitHub Pages; a integração produtiva deverá usar endpoint seguro ou serviço autorizado.
- A interface deve funcionar de forma útil mesmo quando o motor de IA estiver indisponível, mantendo biblioteca, pesquisa, checklists e ferramentas locais.

## Critérios de segurança e qualidade
- Fontes jurídicas: preferência por Planalto, ALESP, Diário Oficial, órgãos ambientais federais/estaduais e demais portais oficiais competentes.
- Não transformar hipótese em enquadramento definitivo.
- Evidenciar data/fonte da consulta quando relevante.
- Dados de ocorrência real não devem ser persistidos no repositório público.
