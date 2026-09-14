# Segurança da Plataforma ESPA

Este documento é requisito do produto, não sugestão. Princípios: negar por padrão, menor privilégio, frontend não é fronteira de segurança, mudanças pequenas/reversíveis, nenhum segredo no cliente/Git e nenhuma redução de segurança para fazer funcionalidade funcionar.

## Camadas obrigatórias
1. Rate limit: login/cadastro/recuperação no provedor de identidade e APIs sensíveis; limites por identidade/IP, com bloqueio crescente onde o provedor suportar.
2. Bot protection: Turnstile/CAPTCHA equivalente nos formulários públicos e autenticação exposta, validado no backend.
3. Criptografia em repouso: exigir do banco/storage selecionado e documentar antes de dados reais.
4. Hardening: firewall/WAF, portas mínimas, SSH somente por chave quando houver servidor administrável. Em serverless, aplicar controles equivalentes do provedor.
5. HTTPS obrigatório, HSTS no domínio de produção e sem mixed content.
6. MFA/2FA obrigatório para administradores e contas de infraestrutura; integrar ao IdP.
7. Backup automático e teste periódico de restauração antes de operação crítica.
8. Auditoria: registrar ator, data, ação e alvo no backend; nunca conteúdo sensível desnecessário no log.
9. Segredos: somente secret store/variáveis server-side; service_role, tokens e chaves nunca no browser/repositório.
10. Aplicação/dados: autenticação e autorização server-side, allowlist de campos, queries parametrizadas, validação de input/sessão, CORS estrito, CSP/security headers, uploads restritos, dependências monitoradas, separação dev/staging/prod e migrações versionadas.

## LGPD e dados operacionais
Minimização, finalidade, necessidade, segregação e retenção. Dados de cursos ficam separados da IA. Relatos operacionais não são persistidos por padrão. Serviços externos recebem somente o mínimo necessário. Dados pessoais reais não entram em fixtures, GitHub ou localStorage.

## Gates de produção
Não liberar dados pessoais/restritos enquanto AUTH_MODE=disabled, D1/DB não estiver provisionado com controles confirmados, MFA administrativo não estiver no IdP, bot protection dos pontos públicos não estiver ativo, backup/restauração não estiver testado e headers/CORS/HTTPS não estiverem validados no domínio final.

## Itens de infraestrutura que código sozinho não resolve
Criptografia física do provedor, firewall da conta, MFA do IdP/GitHub/Cloudflare, backup/restauração, DNS/HSTS e políticas de acesso precisam ser configurados na infraestrutura e comprovados antes da produção.
