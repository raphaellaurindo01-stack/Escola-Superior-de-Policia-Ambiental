# Banco provisório da Plataforma ESPA

A camada de dados foi desenhada para ser substituível. Nesta fase, o Worker aceita um binding `DB` compatível com Cloudflare D1. Isso não transforma o D1 em banco institucional da PMESP; ele é apenas opção provisória de desenvolvimento/operação até definição da DTIC.

## Ativação
1. Criar um banco D1 na conta responsável, preferencialmente sem cobrança automática.
2. Substituir `REPLACE_WITH_D1_DATABASE_ID` em `wrangler.jsonc` pelo identificador criado.
3. Aplicar `schema.sql` ao banco.
4. Publicar o Worker e configurar a URL HTTPS em `docs/config.js` (`ESPA_API_ENDPOINT` e, se for o mesmo Worker, `ESPA_AI_ENDPOINT`).
5. Antes de uso real restrito, alterar `AUTH_MODE` de `disabled` para `oidc` e configurar o provedor de identidade. Não usar o modo disabled em produção com dados pessoais.

## Dados e LGPD
- O repositório não deve conter inscrições reais, CPF, telefone, e-mail, tokens ou credenciais.
- `candidate_ref` deve ser um identificador mínimo/pseudonimizado quando possível; campos pessoais adicionais só devem ser criados após finalidade, base legal, acesso e retenção definidos institucionalmente.
- O histórico registra identificador do ator, ação, tipo e alvo; não deve copiar conteúdo sensível para o log.
- Ocorrências ambientais não são armazenadas neste banco por padrão.

## Migração futura PMESP
As rotas públicas/administrativas permanecem estáveis. Na migração, substituir a implementação de persistência em `platform-api.mjs`/adaptador por banco institucional, preservando a interface do frontend. Autenticação e IA também permanecem adaptadores independentes.
