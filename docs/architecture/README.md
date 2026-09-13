# ESPA Platform v3 — Fundação

Esta pasta introduz a fundação incremental da futura plataforma sem substituir a interface existente.

## Princípios

- negar acesso por padrão;
- autenticação e autorização são etapas diferentes;
- conteúdo interno destinado a policiais previamente autorizados;
- Central de Cursos pode possuir acesso público controlado para civis e integrantes de outras instituições;
- nenhuma senha Google é recebida ou armazenada pela ESPA;
- nenhum segredo/API key no frontend ou GitHub;
- dados de ocorrência não são persistidos por padrão;
- integrações externas devem ser substituíveis por adaptadores;
- nenhuma cobrança automática de IA;
- dados pessoais reais não devem ser usados em desenvolvimento/testes.

## Arquivos

- `platform-config.js`: configuração pública e pontos de adaptação.
- `access-control.js`: perfis e autorização deny-by-default.
- `privacy.js`: salvaguardas LGPD e minimização.
- `courses.js`: domínio inicial da CCE e fluxo de inscrições.

## Próximos adaptadores

1. `auth/`: OIDC/Google no ambiente provisório e futuro provedor institucional.
2. `data/`: persistência provisória substituível por banco institucional.
3. `ai/`: orquestrador Workers AI -> Gemini -> Groq, somente camadas gratuitas, com fallback local.
4. `courses/`: Google Forms provisório e futuro formulário institucional.

Esses módulos ainda não são carregados pela interface principal. Isso é intencional: primeiro estabelecemos contratos e testes; depois integramos gradualmente à UI aprovada, evitando regressões.
