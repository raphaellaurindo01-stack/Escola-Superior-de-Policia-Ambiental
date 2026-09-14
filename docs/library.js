const ESPA_LIBRARY=[
 {topic:'Guias e manuais',icon:'📚',items:[
  ['GPO – Guia de Procedimentos Operacionais (Fev/2024)','library/manuais/GPO-FEV24.pdf','Guia operacional institucional do CPAmb.'],
  ['Manual da Fauna Silvestre Brasileira','library/manuais/Manual-Fauna-Silvestre-Brasileira.pdf','Material técnico de fauna para consulta e apoio operacional.'],
  ['Manual de Combate ao Tráfico de Animais Silvestres – CNMP (2024)','library/manuais/Manual-Combate-Trafico-Animais-Silvestres-CNMP-2024.pdf','Material técnico-doutrinário sobre tráfico, investigação, perícia, bem-estar, destinação e valoração.']
 ]},
 {topic:'Anexos do GPO',icon:'📎',items:[
  ['Anexo 01 – Notificação AIA e AA','library/gpo-anexos/Anexo 01 - NOTIFICAÇÃO AIA e AA - Alterado Res. SIMA 052021 GPO FEV21(2).pdf','Notificação de autuação e atendimento ambiental.'],
  ['Anexo 02 – Bloqueio/desbloqueio de pátio madeireiro','library/gpo-anexos/Anexo 02 - SOLICITAÇÃO DE BLOQUEIO_DESBLOQUEIO DE PÁTIO MADEIREIRO_GPO FEV21(2).pdf','Formulário de bloqueio e desbloqueio de pátio.'],
  ['Anexo 03 – PM-O-51 Termo de destinação','library/gpo-anexos/Anexo 03 - PM-O-51 TERMO DE DESTINAÇÃO DE MATERIAIS, ANIMAIS E OU PRODUTOS APREENDIDOS_GPO FEV21.pdf','Termo de destinação de animais, materiais e produtos apreendidos.'],
  ['Anexo 04 – Relatório de Serviço Operacional','library/gpo-anexos/Anexo 04 - RELATORIO DE SERVIÇO OPERACIONAL - GPO FEV21(2).pdf','Modelo de relatório operacional.'],
  ['Anexo 05 – Termo de Apreensão','library/gpo-anexos/Anexo 05 - TERMO DE APREENSÃO _ GPO_FEV21(2).pdf','Modelo institucional para bens apreendidos.'],
  ['Anexo 06 – Fiscalização de Madeireiras','library/gpo-anexos/Anexo 06  - GPO FEV21 - PLANILHA PARA FISCALIZAÇÃO DE MADEIREIRAS GPO FEV21(1).pdf','Planilha de apoio à fiscalização de madeireiras.'],
  ['Anexo 07 – Bloqueio/desbloqueio de criador de passeriformes','library/gpo-anexos/Anexo 07 - SOLICITAÇÃO DE BLOQUEIO_DESBLOQUEIO DE CRIADOR AMADOR_COMERCIAL DE PASSERIFORMES_GPO FEV21(2).pdf','Formulário SISPASS.'],
  ['Anexo 08 – Tabela 01: Mata Atlântica','library/gpo-anexos/Anexo 08 - TABELA 01 - CARACTERÍSTICAS DA VEGETAÇÃO - BIOMA MATA ATLÂNTICA_GPO FEV21(2).pdf','Critérios de características da vegetação.'],
  ['Anexo 08A – Tabela 02: Mata Atlântica','library/gpo-anexos/Anexo 08A - TABELA 02 - CARACTERÍSTICAS DA VEGETAÇÃO - BIOMA MATA ATLÂNTICA_GPO FEV21(2).pdf','Instrumento de vistoria e consolidação.']
 ]},
 {topic:'Operações – SP Sem Fogo',icon:'🔥',items:[
  ['Portaria CFA nº 16/2017','library/operacoes/Portaria-CFA-16-2017.pdf','Critérios parametrizados para incêndios canavieiros.'],
  ['Portaria CFB nº 01/2024','library/operacoes/Portaria-CFB-01-2024.pdf','Altera a Portaria CFA nº 16/2017; usar em conjunto com a norma original.']
 ]},
 {topic:'Modelos institucionais',icon:'🗒️',items:[['Modelo institucional de Resenha Policial','library/modelos/Modelo-Institucional-Resenha-Policial.pdf','Estrutura de resenha com individualização por autor/AIA e providências administrativas e penais.']]}
];
function renderLibrary(filter=''){currentView='library';const q=normalizeESPA(filter),groups=ESPA_LIBRARY.map(g=>({...g,items:g.items.filter(x=>!q||normalizeESPA(x.join(' ')).includes(q))})).filter(g=>g.items.length);content.innerHTML=`<h2 class="section-title">📚 Biblioteca ESPA</h2><p>Acervo organizado por assunto, reunindo GPO, anexos, manuais, operações e modelos institucionais.</p><label for="librarySearch">Pesquisar na biblioteca</label><input id="librarySearch" type="search" placeholder="GPO, fauna, apreensão, madeireira, incêndio…" value="${esc(filter)}">${groups.map(g=>`<h2 class="section-title">${g.icon} ${esc(g.topic)}</h2>${g.items.map(i=>`<article class="result"><h3>${esc(i[0])}</h3><p>${esc(i[2])}</p><button class="action" onclick="openLibraryDocument('${i[1].replace(/'/g,"\\'")}','${i[0].replace(/'/g,"\\'")}')">Abrir documento</button></article>`).join('')}`).join('')||'<p>Nenhum documento encontrado.</p>'}`;document.querySelector('#librarySearch').oninput=x=>renderLibrary(x.target.value)}
function openLibraryDocument(url,title){window.open(encodeURI(url),'_blank','noopener')}
