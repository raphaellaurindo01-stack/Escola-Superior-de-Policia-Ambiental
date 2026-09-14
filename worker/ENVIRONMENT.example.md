# Configuração de ambiente — exemplo

Não coloque valores reais neste arquivo nem em commits.

## Obrigatórias

- `ALLOWED_ORIGINS`: origens autorizadas, separadas por vírgula.
- `AUTH_MODE`: `disabled` apenas em desenvolvimento; `oidc` quando o acesso restrito estiver ativado.
- binding `RATE_LIMITER`.

## IA gratuita

A ordem automática é Workers AI -> Gemini -> Groq. Nenhum fallback pago é implementado.

- binding `AI`: Cloudflare Workers AI.
- secret `GEMINI_API_KEY`: opcional.
- var `GEMINI_MODEL`: opcional.
- secret `GROQ_API_KEY`: opcional.
- var `GROQ_MODEL`: opcional.

Se todos estiverem indisponíveis ou sem cota, o endpoint devolve indisponibilidade e a interface deve manter o roteiro local.

## Autenticação

Para `AUTH_MODE=oidc`:

- `AUTH_INTROSPECTION_URL`: endpoint do adaptador de identidade autorizado.
- secret `AUTH_INTROSPECTION_SECRET`: credencial server-side do adaptador, se exigida.

A aplicação nunca recebe nem armazena a senha Google. O contrato espera uma identidade já validada com `sub`, `role`, `approved` e `suspended`.

Antes de produção, substituir o modo `disabled`. O modo de desenvolvimento não constitui controle de acesso.
