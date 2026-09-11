# Escola Superior de Polícia Ambiental — V1

Aplicação web progressiva (PWA) estática e gratuita.

## O que já funciona
- Busca geral por tema, palavra-chave e base legal
- Módulos: Flora, Fauna, Pesca, Recursos Hídricos, Poluição, Mineração, APP/Áreas Protegidas e Legislação
- Favoritos salvos no aparelho
- Checklists
- Calculadora de faixa geral de APP em curso d'água natural
- Calculadora de área
- Conversor de coordenadas DMS → decimal
- Gerador de texto-base para BOPAmb
- Cache offline por Service Worker
- Instalação como PWA quando hospedada em HTTPS

## Como testar
O Service Worker exige HTTP/HTTPS. Na pasta do projeto:
    python -m http.server 8000
Acesse http://localhost:8000

## Como publicar grátis
### GitHub Pages
1. Crie um repositório.
2. Envie todos os arquivos desta pasta para a raiz.
3. Settings > Pages > Deploy from a branch > main / root.
4. Aguarde a publicação.

### Cloudflare Pages
1. Crie um projeto Pages conectado ao repositório.
2. Framework: None.
3. Build command: vazio.
4. Output directory: /
5. Publicar.

## Como editar conteúdo
Edite `data/content.json`. A aplicação lê menus, roteiros, bases legais e links desse arquivo.

## Observação jurídica
O conteúdo é apoio à consulta e NÃO substitui legislação atualizada, normas institucionais, POPs, decisões técnicas ou conferência do enquadramento no caso concreto.


## V2 — conteúdo extraído do vídeo
Inclui Biblioteca Operacional, módulos observados no Glide e formulário de Nexo Causal/SP Sem Fogo com relatório consolidado. A pontuação AUTUAR/NÃO AUTUAR ficou propositalmente desativada até conferência da tabela oficial completa.
