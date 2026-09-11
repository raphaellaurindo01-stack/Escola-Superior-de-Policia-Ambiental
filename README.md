# Escola Superior de Polícia Ambiental

PWA de consulta e apoio operacional, preservando a interface, os nove módulos originais, 45 conteúdos, favoritos, checklists, ferramentas, BOPAmb e formulário de nexo causal. A atualização acrescenta o módulo REURB com seis conteúdos e matriz de responsabilidade técnica com doze objetos. Não há autenticação nem armazenamento central de ocorrências.

## Entregue nesta atualização

- **REURB e Intervenções Ambientais:** procedimento, CRF, registro, APP/UC/mananciais, marco da legitimação fundiária, Cidade Legal, passivos, responsável técnico versus autoridade administrativa e fontes oficiais internas ao leitor.
- **Validar Responsável Técnico:** identificação do objeto, profissional, conselho, registro, responsabilidade, atribuição, escopo e evidência documental. Quatro estados com rótulo e cor. Verde depende das confirmações documentais inseridas pelo usuário; não é autenticação automática no conselho. Vermelho exige incompatibilidade acompanhada de evidência. A matriz não é lista fechada.
- **Assistente de Ocorrência:** texto e voz revisável, organização local, perguntas adicionais de autorização municipal/REURB, roteiro, lacunas, normas para pesquisa e providências condicionadas. A saída local é um roteiro determinístico, não uma resposta de IA.
- **Consulta Ambiental:** busca local também encontra siglas como APP, ART e CRF; resultados têm fontes acessíveis no leitor. Código de serviço de IA externo incluído em `worker/`, ainda não implantado.
- **Resenha:** preserva fatos para revisão e identifica falta de modelo institucional, sem produzir falso padrão oficial.
- **Pendências:** relação consultável no aplicativo e documentação abaixo.
- **Offline:** todos os scripts da interface integram o cache versionado. Fontes externas e IA continuam dependendo de internet.

## Pendências reais

1. Ativar o Worker na conta Cloudflare do responsável e configurar sua URL. Sem isso, a IA generativa não funciona. O código do serviço está incluído e seus fluxos foram testados com provedor simulado, sem chamada a modelo real.
2. Fornecer planilha Corta-Fogo/CFA completa, com regras, pesos e limites. O formulário existente permanece sem pontuação automática.
3. Fornecer modelo institucional de resenha para incorporar seu formato exato.
4. Confirmar andamento, decisão, ata e publicação da ADI 5.771. O aviso de não confirmação evita afirmar tese vigente. Não há monitoramento judicial automático.
5. Completar normas específicas de fauna/CFT/CFTA e os documentos em `DOCUMENTOS-PENDENTES.md`. A matriz não substitui a certidão individual de atribuição.

## Hospedagem e custo

O front-end é estático e permanece compatível com GitHub Pages em `/docs` ou Cloudflare Pages (diretório de publicação `docs`, sem compilação). Publicação no GitHub Pages: Settings → Pages → main → /docs. Esta atualização é entregue em branch de revisão; não altera automaticamente a versão pública até a integração à branch de publicação.

A IA foi preparada para Workers AI no plano gratuito, sujeito à franquia. Não houve contratação, ativação ou integração com serviço pago. O esgotamento da cota ou a indisponibilidade mantém o roteiro local. Ver `worker/README.md` para limites, segurança e ativação.

## Usar e verificar localmente

```sh
node scripts/serve.cjs
node scripts/check.cjs
node tests/integration.cjs
node tests/worker.mjs
```

O servidor usa o caminho `/Escola-Superior-de-Policia-Ambiental/`. Não abrir `index.html` pelo protocolo `file:`. Não foram realizados testes de navegador, de reconhecimento de voz real ou de provedor de IA real nesta atualização.

## Fontes e privacidade

O leitor incorpora a fonte oficial quando permitido; se o órgão bloquear o iframe, oferece abertura oficial. Não há proxy de terceiros. Dados de formulários permanecem na tela, sem gravação local ou remota. Favoritos e checklists mantêm armazenamento no navegador, como antes. O reconhecimento de voz pode usar serviço do navegador. Somente o botão explícito de envio à IA, disponível após configuração, envia o relato revisado ao serviço externo.

O Worker consulta o corpus versionado e recupera trechos de URLs oficiais cadastradas. Não é pesquisa irrestrita na web. Citações são verificadas contra os textos recuperados; adequação jurídica ainda exige revisão. Não incluir dados pessoais reais, credenciais ou modelos preenchidos no repositório público.

## Manutenção

Conteúdo: `docs/data/content.json`. Interface: `docs/app.js`, `assistants.js`, `technical.js`, `router-patch.js`. Leitor: `docs/reader.js`. Endpoint público sem segredo: `docs/config.js`. Cache: `docs/sw.js` — alterar versão após mudanças. Fechar todas as abas e reabrir para ativar a atualização.
