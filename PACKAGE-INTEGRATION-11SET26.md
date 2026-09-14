# Integração do pacote ESPA_Atualizacao_Completa_11SET26

O pacote de 11/09/2026 foi revisado contra a plataforma ESPA V3 atual. Ele é fonte de funcionalidades e acervo, não base para sobrescrever a arquitetura atual.

## Incorporado nesta rodada
- Assistente de Ocorrência: estado visual vermelho/pulsante do microfone.
- Transcrição: deduplicação dos resultados finais e preservação do texto já revisado.
- Resenha Policial: removida a pendência de modelo; fluxo passa a reconhecer o modelo institucional fornecido, individualizando Autor 1, Autor 2 e seguintes, AIA, fundamento/valor, medidas administrativas, Atendimento Ambiental e providências penais efetivamente adotadas, sem inventar fatos.
- Biblioteca: catálogo já contém GPO, anexos 01 a 08A, manuais de fauna/tráfico, Portarias CFA 16/2017 e CFB 01/2024 e modelo institucional de resenha.
- Cache PWA atualizado para propagar as alterações.

## Acervo binário localizado no pacote
Os PDFs estão presentes no pacote original em `docs/library/`: GPO-FEV24; Anexos 01, 02, 03, 04, 05, 06, 07, 08 e 08A; Manual da Fauna Silvestre Brasileira; Manual de Combate ao Tráfico de Animais Silvestres/CNMP 2024; Portarias CFA 16/2017 e CFB 01/2024; Modelo Institucional de Resenha Policial.

A integração GitHub disponível nesta sessão aceita criação/alteração de arquivos UTF-8, não upload binário arbitrário. Portanto, os PDFs não devem ser marcados como publicados até que sejam enviados por uma via binária compatível. O catálogo deve permanecer rastreável a esta pendência para evitar falsa indicação de disponibilidade.

## Mantido da plataforma atual
Arquitetura de segurança, controle de acesso, CCE, adapters de dados/IA, política de privacidade e demais componentes posteriores ao pacote não foram substituídos/regredidos.

## Próximas verificações
1. Upload físico dos PDFs e teste de todos os links da Biblioteca.
2. Integração do front-end CCE com o adapter de API real, mantendo fallback de desenvolvimento claramente identificado.
3. Gating de rotas efetivamente conectado ao roteador.
4. Auditoria do Worker/IA e validação de citações/fontes oficiais.
5. Corta-Fogo: somente automatizar pesos/regras após fonte oficial completa e validada.
