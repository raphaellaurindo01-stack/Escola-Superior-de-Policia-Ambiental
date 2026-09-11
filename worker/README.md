# IA Ambiental — integração opcional

O código está pronto para um Worker separado, mantendo o front-end estático em GitHub Pages/Cloudflare Pages. **Não foi implantado nem conectado a uma conta Cloudflare nesta entrega.** `docs/config.js` permanece sem endpoint até existir serviço publicado e testado. Não há segredo no front-end.

## Ativação

1. Na conta Cloudflare do responsável, manter o plano gratuito. Workers AI possui franquia limitada; não habilitar cobrança/upgrade para este projeto.
2. Publicar `worker/wrangler.jsonc` com Wrangler autenticado nessa conta, a partir desta pasta (`npx wrangler deploy`).
3. Confirmar os bindings `AI` e `RATE_LIMITER`, o modelo disponível e `ALLOWED_ORIGINS` (origem exata do app, sem caminho). Para Cloudflare Pages, adicionar a origem real.
4. Configurar em `docs/config.js` a URL HTTPS publicada com caminho `/api/assistant`. Atualizar a versão do cache em `docs/sw.js` e publicar o front-end.
5. Fazer consulta de homologação sem dados reais e confirmar resposta com fontes. Em falha ou cota esgotada, o app preserva a organização local.

## O que é consultado

A seleção usa o corpus interno versionado e recupera trechos de até cinco URLs oficiais nele cadastradas. Não é busca irrestrita na internet. PDFs, redirecionamentos, páginas bloqueadas ou protegidas por CAPTCHA são sinalizados como não extraídos. Há limite de bytes e tempo de leitura. HTML riscado/excluído é retirado quando marcado por `s`, `strike` ou `del`; alterações legais em outras formas de marcação ainda exigem conferência humana.

O serviço ignora fontes e evidências enviadas pelo navegador: usa seu próprio corpus. Exige origem cadastrada, limite de requisições e citações correspondentes aos trechos recuperados; falha se não consegue recuperar fontes. Isso verifica a existência das referências, **não comprova automaticamente que cada afirmação é juridicamente correta**. Não há consulta autenticada a conselhos nem confirmação automática de jurisprudência.

O endpoint é público: CORS não é autenticação. Rate limiting reduz abuso, mas não garante cota por usuário. Nenhuma conta, banco de dados, log de relato ou serviço pago é configurado pelo projeto. O provedor de IA processa o texto enviado; não enviar dados pessoais desnecessários. Manter o plano gratuito é condição operacional do custo zero; o código não consegue alterar nem auditar o faturamento da conta.

Referências técnicas consultadas em 11/09/2026:
- [Workers AI: modelo](https://developers.cloudflare.com/workers-ai/models/llama-3.3-70b-instruct-fp8-fast/)
- [Franquia e preços](https://developers.cloudflare.com/workers-ai/platform/pricing/)
- [Rate limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)
