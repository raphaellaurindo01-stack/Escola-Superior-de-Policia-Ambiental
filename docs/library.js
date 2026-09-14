const ESPA_LIBRARY=[
 {topic:'Guias e manuais',icon:'📚',items:[
  ['Manual IBAMA','library/manuais/MANUAL_IBAMA.pdf','Material técnico para consulta e apoio operacional.'],
  ['Manual da Fauna Silvestre Brasileira','library/manuais/Manual Fauna silvestre brasileira_compressed.pdf','Material técnico de fauna para consulta e apoio operacional.']
 ]},
 {topic:'Anexos do GPO',icon:'📎',items:[
  ['Anexo 01 – Notificação AIA e AA','library/gpo-anexos/Anexo 01 - NOTIFICAÇÃO AIA e AA - Alterado Res. SIMA 052021 GPO FEV21.pdf','Notificação de autuação e atendimento ambiental.'],
  ['Anexo 02 – Bloqueio/desbloqueio de pátio madeireiro','library/gpo-anexos/Anexo 02 - SOLICITAÇÃO DE BLOQUEIO_DESBLOQUEIO DE PÁTIO MADEIREIRO_GPO FEV21.pdf','Formulário de bloqueio e desbloqueio de pátio.'],
  ['Anexo 03 – PM-O-51 Termo de destinação','library/gpo-anexos/Anexo 03 - PM-O-51 TERMO DE DESTINAÇÃO DE MATERIAIS, ANIMAIS E OU PRODUTOS APREENDIDOS_GPO FEV21.pdf','Termo de destinação de animais, materiais e produtos apreendidos.'],
  ['Anexo 04 – Relatório de Serviço Operacional','library/gpo-anexos/Anexo 04 - RELATORIO DE SERVIÇO OPERACIONAL - GPO FEV21.pdf','Modelo de relatório operacional.'],
  ['Anexo 05 – Termo de Apreensão','library/gpo-anexos/Anexo 05 - TERMO DE APREENSÃO _ GPO_FEV21.pdf','Modelo institucional para bens apreendidos.'],
  ['Anexo 06 – Fiscalização de Madeireiras','library/gpo-anexos/Anexo 06 - GPO FEV21 - PLANILHA PARA FISCALIZAÇÃO DE MADEIREIRAS GPO FEV21.pdf','Planilha de apoio à fiscalização de madeireiras.'],
  ['Anexo 07 – Bloqueio/desbloqueio de criador de passeriformes','library/gpo-anexos/Anexo 07 - SOLICITAÇÃO DE BLOQUEIO_DESBLOQUEIO DE CRIADOR AMADOR_COMERCIAL DE PASSERIFORMES_GPO FEV21.pdf','Formulário SISPASS.'],
  ['Anexo 08 – Tabela 01: Mata Atlântica','library/gpo-anexos/Anexo 08 - TABELA 01 - CARACTERÍSTICAS DA VEGETAÇÃO - BIOMA MATA ATLÂNTICA_GPO FEV21.pdf','Critérios de características da vegetação.'],
  ['Anexo 08A – Tabela 02: Mata Atlântica','library/gpo-anexos/Anexo 08A - TABELA 02 - CARACTERÍSTICAS DA VEGETAÇÃO - BIOMA MATA ATLÂNTICA_GPO FEV21.pdf','Instrumento de vistoria e consolidação.']
 ]},
 {topic:'Operações – SP Sem Fogo',icon:'🔥',items:[
  ['Portaria CFA nº 16/2017','library/gpo-anexos/1. Portaria CFA - 16, de 1º-9-2017 - critérios de nexo causal (VER A PORTARIA Nº 01 DE 2024).pdf','Critérios de nexo causal; consultar em conjunto com a alteração de 2024.'],
  ['Portaria nº 01/2024 – alteração da CFA 16/2017','library/gpo-anexos/2. PORTARIA Nº 01, DE 20 DE JUNHO DE 2024 (ALTERA A CFA-16 DE 2017) (1).pdf','Altera a Portaria CFA nº 16/2017; usar em conjunto com a norma original.']
 ]}
];
function renderLibrary(filter=''){currentView='library';const q=normalizeESPA(filter),groups=ESPA_LIBRARY.map(g=>({...g,items:g.items.filter(x=>!q||normalizeESPA(x.join(' ')).includes(q))})).filter(g=>g.items.length);content.innerHTML=`<h2 class="section-title">📚 Biblioteca ESPA</h2><p>Acervo organizado por assunto. O GPO completo não está disponibilizado nesta biblioteca; somente materiais expressamente liberados para consulta.</p><label for="librarySearch">Pesquisar na biblioteca</label><input id="librarySearch" type="search" placeholder="fauna, apreensão, madeireira, incêndio…" value="${esc(filter)}">${groups.map(g=>`<h2 class="section-title">${g.icon} ${esc(g.topic)}</h2>${g.items.map(i=>`<article class="result"><h3>${esc(i[0])}</h3><p>${esc(i[2])}</p><button class="action" onclick="openLibraryDocument('${i[1].replace(/'/g,"\\'")}','${i[0].replace(/'/g,"\\'")}')">Abrir documento</button></article>`).join('')}`).join('')||'<p>Nenhum documento encontrado.</p>'}`;document.querySelector('#librarySearch').oninput=x=>renderLibrary(x.target.value)}
function openLibraryDocument(url,title){window.open(encodeURI(url),'_blank','noopener')}
