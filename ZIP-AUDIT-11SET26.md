# Auditoria funcional do pacote ESPA 11/09/2026

O ZIP foi usado apenas como fonte de comparação; ele não deve substituir a branch atual nem ser enviado como pacote de atualização.

## Recursos identificados no ZIP que devem ser preservados
- Biblioteca ESPA organizada por tópicos: GPO, anexos 01–08A, manuais de fauna/tráfico, Portarias CFA 16/2017 e CFB 01/2024 e modelo institucional de resenha.
- Biblioteca pesquisável e acessível pela navegação principal.
- Assistente de voz com indicação visual durante gravação e transcrição revisável/deduplicada.
- Resenha baseada no modelo institucional, individualizando Autor 1/Autor 2 e respectivos AIAs e mantendo providências administrativas e penais.
- Responsável técnico com análise documental e sem alegar validação automática do conselho.
- REURB integrado às áreas de consulta.
- Offline incluindo módulos estáticos da biblioteca/interface.

## Recursos do ZIP já superados pela branch atual
- Arquitetura sem autenticação: substituída por contrato de autenticação/autorização e papéis Policial/Gerente/Admin.
- IA limitada a Workers AI: substituída por fallback gratuito Cloudflare → Gemini → Groq, sem fallback pago.
- Ausência de banco/CCE: branch atual possui API provisória, esquema de banco, CCE, inscrições e auditoria.
- Área de documentos pendentes na navegação: não deve voltar como item principal; pendências permanecem documentais/curatoriais.

## Regra de integração
Novas ideias do pacote devem ser portadas seletivamente para a arquitetura atual. Não restaurar arquivos antigos por cima de versões mais novas e não desfazer controles de acesso, portabilidade, LGPD ou a Central de Cursos e Estágios.
