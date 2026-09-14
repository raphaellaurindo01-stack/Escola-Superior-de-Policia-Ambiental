// Complemento do gerador de resenha: restringe fundamentos à norma escolhida.
// Fontes operacionais: GPO CPAmb e legislação oficial vigente cadastrada no projeto.
// A ausência de opções cadastradas é intencional: o sistema não sugere artigo sem mapeamento validado.
const RESENHA_NATURES=['Fauna','Flora','Pesca','Poluição','Unidade de Conservação','Ordenamento Urbano e Patrimônio Cultural','Administração Ambiental','Licenciamento Ambiental','Mineração','Queimada / incêndio','Madeira / produto florestal','Outros'];
const RESENHA_ADMIN_BY_NORM={
  'Resolução SIMA nº 05/2021':[
    'Art. 25 — fauna silvestre sem licença/autorização ou em desacordo','Art. 25, § 3º, I — impedir procriação da fauna sem autorização','Art. 25, § 3º, II — modificar, danificar ou destruir ninho, abrigo ou criadouro natural','Art. 25, § 3º, III — comércio, guarda, cativeiro, depósito, uso ou transporte irregular de fauna','Art. 25, § 3º, IV — deixar de manter atualizado registro de acervo faunístico/movimentação de plantel','Art. 26 — introduzir espécime animal fora de sua área de distribuição natural sem licença/parecer','Art. 26, § 2º, I — reintroduzir fauna silvestre sem parecer técnico e licença, quando exigível','Art. 26, § 2º, II — permitir reprodução entre espécies diferentes sem autorização','Art. 27 — exportar peles e couros de anfíbios e répteis em bruto sem autorização','Art. 28 — praticar caça profissional no Estado de São Paulo','Art. 29 — abuso, maus-tratos, ferir ou mutilar animais','Art. 30 — utilizar animais em experimento/teste de cosméticos, higiene pessoal e perfumes','Art. 31 — molestar intencionalmente cetáceo, pinípede ou sirênio em águas paulistas','Art. 32 — comerciante deixar de apresentar declaração de estoque/valores de animais silvestres','Art. 33 — explorar comercialmente imagem de animal silvestre irregular ou em maus-tratos','Art. 34 — causar degradação em viveiro, açude ou estação de aquicultura de domínio público','Art. 35 — pescar em período ou local no qual a pesca seja proibida','Art. 35, § 1º, I — pescar espécie preservada ou espécime abaixo do tamanho permitido','Art. 35, § 1º, II — pescar quantidade superior ou com aparelho, petrecho, técnica ou método não permitido','Art. 35, § 1º, III — transportar, comercializar, beneficiar ou industrializar espécime de pesca proibida','Art. 35, § 1º, IV — transportar, conservar, beneficiar, armazenar, descaracterizar, industrializar ou comercializar pescado sem origem/autorização','Art. 35, § 1º, V — capturar, extrair, coletar, transportar, comercializar ou exportar espécime ornamental sem autorização ou em desacordo','Art. 35, § 1º, VI — deixar de apresentar declaração de estoque','Art. 36 — pesca com explosivos, substâncias tóxicas ou outro meio proibido','Art. 37 — exercer pesca sem cadastro, autorização/licença ou sem portar documento exigido','Art. 38 — importar/exportar ou introduzir espécie aquática sem autorização ou em desacordo','Art. 39 — explorar campos naturais de invertebrados, algas ou recifes de coral sem autorização','Art. 39, § 1º, I — utilizar, comercializar, armazenar, pescar ou transportar invertebrados, algas ou corais sem autorização','Art. 39, § 1º, II — fundear embarcação ou lançar detritos sobre bancos de moluscos ou corais demarcados','Art. 41 — comandante de embarcação de pesca deixar de preencher/entregar mapas obrigatórios','Art. 43 — destruir/danificar vegetação em APP sem autorização ou em desacordo','Art. 44 — cortar árvores em APP ou espécie especialmente protegida sem autorização','Art. 45 — extrair mineral de floresta pública ou APP sem prévia autorização','Art. 46 — transformar madeira de vegetação nativa em carvão sem licença ou em desacordo','Art. 47 — receber/adquirir produto vegetal sem exigir licença/documento de origem','Art. 47, § 1º — vender, expor, depositar, transportar, destinar ou guardar produto vegetal sem licença válida ou em desacordo','Art. 48 — impedir ou dificultar regeneração natural de vegetação em área protegida','Art. 49 — destruir/danificar vegetação objeto de especial preservação sem autorização','Art. 50 — destruir/desmatar/danificar/explorar vegetação em Reserva Legal ou servidão ambiental sem autorização','Art. 51 — executar manejo florestal sem autorização, sem requisitos técnicos ou em desacordo','Art. 52 — explorar/danificar vegetação nativa fora de Reserva Legal sem aprovação ou em desacordo','Art. 53 — adquirir, intermediar, transportar ou comercializar produto de área embargada','Art. 54 — destruir, danificar, lesar ou maltratar árvore/planta ornamental pública ou privada alheia','Art. 55 — comercializar, portar ou utilizar motosserra sem licença ou registro','Art. 56 — fazer uso de fogo em área agropastoril sem autorização ou em desacordo','Art. 57 — fabricar, vender, transportar ou soltar balão com potencial de provocar incêndio','Art. 58 — disseminar doença, praga ou espécie capaz de causar dano ambiental','Art. 61 — introduzir espécie alóctone em unidade de conservação','Art. 62 — violar limitação administrativa provisória em área estudada para criação de UC','Art. 63 — realizar pesquisa científica em UC sem autorização, quando exigível','Art. 64 — explorar comercialmente recurso/serviço natural em UC sem autorização ou em desacordo','Art. 65 — explorar comercialmente imagem de UC sem autorização ou em desacordo','Art. 66 — liberar/cultivar OGM em área protegida em desacordo com plano/regulamento/CTNBio','Art. 67 — atividade ou conduta em desacordo com objetivos, plano de manejo ou regulamento de UC','Art. 68 — causar dano à unidade de conservação','Art. 69 — penetrar em UC com instrumento próprio para caça, pesca ou exploração sem licença exigível','Art. 72 — obstar ou dificultar fiscalização ambiental','Art. 73 — obstar/dificultar coleta de dados para georreferenciamento fiscalizatório de imóvel rural','Art. 74 — descumprir embargo de obra, atividade ou área','Art. 75 — deixar de atender exigência legal/regulamentar após notificação no prazo concedido','Art. 76 — deixar de apresentar relatório ou informação ambiental no prazo exigido','Art. 77 — elaborar/apresentar informação, estudo, laudo ou relatório ambiental falso, enganoso ou omisso'
  ]
};
const RESENHA_PENAL_BY_NORM={
  'Lei Federal nº 9.605/1998':[
    'Art. 29 — matar, perseguir, caçar, apanhar ou utilizar fauna silvestre sem autorização ou em desacordo',
    'Art. 29, § 1º, I — impedir procriação da fauna sem licença/autorização',
    'Art. 29, § 1º, II — modificar, danificar ou destruir ninho, abrigo ou criadouro natural',
    'Art. 29, § 1º, III — vender, expor, exportar, adquirir, guardar, manter em cativeiro/depósito, utilizar ou transportar fauna/produtos sem origem/autorização',
    'Art. 29, § 4º, I — majorante: espécie rara ou ameaçada de extinção',
    'Art. 29, § 4º, II — majorante: período proibido à caça',
    'Art. 29, § 4º, III — majorante: durante a noite',
    'Art. 29, § 4º, IV — majorante: abuso de licença',
    'Art. 29, § 4º, V — majorante: unidade de conservação',
    'Art. 29, § 4º, VI — majorante: método/instrumento capaz de provocar destruição em massa',
    'Art. 29, § 5º — majorante: caça profissional',
    'Art. 30 — exportar peles/couros de anfíbios e répteis em bruto sem autorização',
    'Art. 31 — introduzir espécime animal no País sem parecer técnico/licença',
    'Art. 32 — abuso, maus-tratos, ferir ou mutilar animal',
    'Art. 32, § 1º — experiência dolorosa ou cruel em animal vivo quando houver recurso alternativo',
    'Art. 32, § 1º-A — cão ou gato: qualificadora/pena específica',
    'Art. 32, § 1º-B — tatuagem ou piercing em cães/gatos com fins estéticos',
    'Art. 32, § 1º-C — desastre ambiental que prejudique vida, integridade ou bem-estar animal',
    'Art. 32, § 2º — majorante se ocorrer morte do animal',
    'Art. 33 — perecimento de fauna aquática por efluentes ou carreamento de materiais',
    'Art. 33, parágrafo único, I — degradação de viveiro, açude ou estação pública de aquicultura',
    'Art. 33, parágrafo único, II — explorar invertebrados aquáticos/algas sem licença',
    'Art. 33, parágrafo único, III — fundear embarcação ou lançar detritos sobre bancos de moluscos/corais demarcados',
    'Art. 34 — pescar em período proibido ou local interditado',
    'Art. 34, parágrafo único, I — pescar espécie preservada ou abaixo do tamanho permitido',
    'Art. 34, parágrafo único, II — quantidade superior ou petrecho/técnica/método não permitido',
    'Art. 34, parágrafo único, III — transportar/comercializar/beneficiar/industrializar pescado proveniente de pesca proibida',
    'Art. 35, I — pesca com explosivo ou substância de efeito semelhante',
    'Art. 35, II — pesca com substância tóxica ou outro meio proibido',
    'Art. 38 — destruir/danificar floresta de preservação permanente ou utilizá-la em desacordo',
    'Art. 38, parágrafo único — modalidade culposa',
    'Art. 38-A — destruir/danificar vegetação primária ou secundária em estágio médio/avançado da Mata Atlântica',
    'Art. 38-A, parágrafo único — modalidade culposa',
    'Art. 39 — cortar árvores em floresta de preservação permanente sem permissão',
    'Art. 40 — causar dano direto ou indireto a unidade de conservação/área protegida indicada na lei',
    'Art. 40, § 2º — agravante por dano a espécie ameaçada em UC de Proteção Integral',
    'Art. 40, § 3º — modalidade culposa',
    'Art. 41 — provocar incêndio em floresta ou demais formas de vegetação',
    'Art. 41, parágrafo único — modalidade culposa',
    'Art. 42 — fabricar, vender, transportar ou soltar balões com potencial de provocar incêndio',
    'Art. 44 — extrair mineral de floresta pública ou APP sem autorização',
    'Art. 45 — cortar/transformar em carvão madeira de lei em desacordo',
    'Art. 46 — receber/adquirir produto vegetal para fins comerciais/industriais sem exigir licença/documento',
    'Art. 46, parágrafo único — vender, expor, depositar, transportar ou guardar produto vegetal sem licença válida',
    'Art. 48 — impedir ou dificultar regeneração natural de florestas e demais formas de vegetação',
    'Art. 49 — destruir, danificar, lesar ou maltratar plantas de ornamentação',
    'Art. 49, § 1º — modalidade culposa',
    'Art. 50 — destruir/danificar floresta ou vegetação objeto de especial preservação',
    'Art. 50-A — desmatar, explorar economicamente ou degradar floresta em terra pública/devoluta sem autorização',
    'Art. 50-A, § 2º — majorante por área superior a 1.000 ha',
    'Art. 51 — comercializar/utilizar motosserra sem licença ou registro',
    'Art. 52 — penetrar em UC com substância/instrumento próprio para caça ou exploração sem licença',
    'Art. 53, I — majorante: diminuição de águas, erosão do solo ou modificação do regime climático',
    'Art. 53, II, a — majorante: período de queda das sementes',
    'Art. 53, II, b — majorante: período de formação das vegetações',
    'Art. 53, II, c — majorante: espécie rara ou ameaçada de extinção',
    'Art. 53, II, d — majorante: época de seca ou inundação',
    'Art. 53, II, e — majorante: noite, domingo ou feriado',
    'Art. 54 — causar poluição com resultado ou risco previsto no tipo penal',
    'Art. 54, § 1º — modalidade culposa',
    'Art. 54, § 2º, I — tornar área imprópria para ocupação humana',
    'Art. 54, § 2º, II — poluição atmosférica com retirada de habitantes ou dano direto à saúde',
    'Art. 54, § 2º, III — poluição hídrica com interrupção do abastecimento público',
    'Art. 54, § 2º, IV — dificultar ou impedir uso público das praias',
    'Art. 54, § 2º, V — lançamento irregular de resíduos, detritos, óleos ou substâncias oleosas',
    'Art. 54, § 3º — deixar de adotar medida de precaução exigida diante de risco grave/irreversível',
    'Art. 55 — pesquisa, lavra ou extração mineral sem autorização/licença ou em desacordo',
    'Art. 55, parágrafo único — deixar de recuperar área pesquisada/explorada',
    'Art. 56 — produto/substância tóxica, perigosa ou nociva em desacordo com exigências legais',
    'Art. 56, § 1º, I — abandonar produto/substância ou utilizar em desacordo com normas ambientais/segurança',
    'Art. 56, § 1º, II — manejo/destinação de resíduos perigosos em desacordo com lei/regulamento',
    'Art. 56, § 2º — majorante para produto/substância nuclear ou radioativa',
    'Art. 56, § 3º — modalidade culposa',
    'Art. 58, I — majorante: dano irreversível à flora ou ao meio ambiente',
    'Art. 58, II — majorante: lesão corporal grave em outrem',
    'Art. 58, III — majorante: morte de outrem',
    'Art. 60 — construir/reformar/ampliar/instalar/fazer funcionar atividade potencialmente poluidora sem licença ou em desacordo',
    'Art. 60, parágrafo único — majorante quando sujeito a Estudo Prévio de Impacto Ambiental',
    'Art. 61 — disseminar doença, praga ou espécie capaz de causar dano ambiental/agropecuário',
    'Art. 62, I — destruir/inutilizar/deteriorar bem especialmente protegido',
    'Art. 62, II — destruir/inutilizar/deteriorar arquivo, museu, biblioteca ou instalação protegida',
    'Art. 62, parágrafo único — modalidade culposa',
    'Art. 63 — alterar aspecto/estrutura de edificação ou local especialmente protegido sem autorização',
    'Art. 64 — construir em solo não edificável protegido sem autorização ou em desacordo',
    'Art. 65 — pichar ou conspurcar edificação ou monumento urbano',
    'Art. 65, § 1º — monumento ou coisa tombada',
    'Art. 66 — funcionário público: afirmação falsa/enganosa, omissão ou sonegação em autorização/licenciamento',
    'Art. 67 — funcionário público: conceder dolosamente licença/autorização/permissão em desacordo com normas ambientais',
    'Art. 68 — deixar de cumprir obrigação de relevante interesse ambiental',
    'Art. 68, parágrafo único — modalidade culposa',
    'Art. 69 — obstar ou dificultar ação fiscalizadora do Poder Público em matéria ambiental',
    'Art. 69-A — estudo, laudo ou relatório ambiental falso/enganoso, inclusive por omissão',
    'Art. 69-A, § 1º — modalidade culposa',
    'Art. 69-A, § 2º — majorante se houver dano significativo decorrente da informação falsa/incompleta/enganosa'
  ],
  'Código Penal — Decreto-Lei nº 2.848/1940':[
    'Art. 180 — receptação; conforme o caso concreto',
    'Art. 261 — atentado contra a segurança de transporte marítimo, fluvial ou aéreo',
    'Art. 330 — desobediência',
    'Outro — informar artigo/dispositivo'
  ]
};
const RESENHA_AA_FORWARD=[
  'Atendimento Ambiental realizado — decisão registrada no procedimento administrativo',
  'Encaminhamento ao Distrito Policial do local dos fatos',
  'Encaminhamento ao Distrito Policial do local dos fatos via ofício, com cópia dos procedimentos administrativos',
  'Apresentação da ocorrência no Distrito Policial, com condução das partes e do material, quando houver',
  'Encaminhamento ao Departamento de Polícia Federal',
  'Encaminhamento ao Ministério Público Estadual',
  'Encaminhamento ao Ministério Público Federal',
  'Encaminhamento ao órgão ambiental competente',
  'Lavratura/encaminhamento para Termo de Compromisso de Recuperação Ambiental (TCRA), quando cabível',
  'Sem encaminhamento externo — prosseguimento do trâmite administrativo'
];
function resenhaArticleSelect(id,label,normId,map,isPenal=false){return `<label for="${id}">${label}</label><select id="${id}" disabled${isPenal?` onchange="togglePenalOther('${id}')"`:''}><option value="">Selecione primeiro a norma</option></select><p id="${id}Hint" class="small">O fundamento é liberado somente após a escolha da norma.</p>`}
function togglePenalOther(articleId){const select=document.getElementById(articleId),wrap=document.getElementById(articleId+'OtherWrap');if(!select||!wrap)return;wrap.hidden=!String(select.value||'').startsWith('Outro');if(wrap.hidden){const input=document.getElementById(articleId+'Other');if(input)input.value=''}}
function updateResenhaArticles(normId,articleId,map){const norm=document.getElementById(normId),article=document.getElementById(articleId),hint=document.getElementById(articleId+'Hint');if(!norm||!article)return;const options=map[norm.value]||[];article.innerHTML=options.length?'<option value="">Selecione</option>'+options.map(v=>`<option value="${v}">${v}</option>`).join(''):'<option value="">Nenhum fundamento cadastrado para esta norma</option>';article.disabled=!options.length;if(hint)hint.textContent=options.length?'Selecione apenas o fundamento correspondente à norma escolhida.':'Ainda não há fundamento validado/cadastrado para esta norma; o sistema não fará sugestão automática.';togglePenalOther(articleId)}
function resenhaNormSelect(id,label,options,articleId,mapName){return `<label for="${id}">${label}</label><select id="${id}" onchange="updateResenhaArticles('${id}','${articleId}',${mapName})"><option value="">Selecione</option>${options.map(v=>`<option value="${v}">${v}</option>`).join('')}</select>`}
function aaForwardSelect(){return `<label for="repAAForward">Forma de encaminhamento</label><select id="repAAForward"><option value="">Selecione</option>${RESENHA_AA_FORWARD.map(v=>`<option value="${v}">${v}</option>`).join('')}</select><p class="small">Selecione somente a providência efetivamente adotada. As opções não substituem a conferência do GPO e da norma aplicável ao caso.</p>`}
function natureSelect(){return `<label for="repNature">Natureza da ocorrência</label><select id="repNature"><option value="">Selecione</option>${RESENHA_NATURES.map(v=>`<option value="${v}">${v}</option>`).join('')}</select>`}
authorBlock=function(n){const adminNorm=`repAuthor${n}AdminNorm`,adminArticle=`repAuthor${n}AdminArticle`,penalNorm=`repAuthor${n}PenalNorm`,penalArticle=`repAuthor${n}PenalArticle`;return `<fieldset class="report-author" data-author="${n}"><legend>Autor ${n}</legend><p class="small">AD = autor direto; AI = autor indireto. Selecione somente o que efetivamente constar da ocorrência.</p>${reportSelect(`repAuthor${n}Name`,'Identificação do autor',AUTHOR_IDS)}${reportField(`repAuthor${n}Aia`,'AIA nº')}<h4>Enquadramento administrativo</h4>${resenhaNormSelect(adminNorm,'Norma',Object.keys(RESENHA_ADMIN_BY_NORM),adminArticle,'RESENHA_ADMIN_BY_NORM')}${resenhaArticleSelect(adminArticle,'Artigo / fundamento legal',adminNorm,RESENHA_ADMIN_BY_NORM)}${penaltyChoices(n)}${reportField(`repAuthor${n}Value`,'Valor da multa (R$)','number','min="0" step="0.01" inputmode="decimal"')}<h4>Enquadramento penal</h4>${resenhaNormSelect(penalNorm,'Norma',Object.keys(RESENHA_PENAL_BY_NORM),penalArticle,'RESENHA_PENAL_BY_NORM')}${resenhaArticleSelect(penalArticle,'Artigo / fundamento legal',penalNorm,RESENHA_PENAL_BY_NORM,true)}<div id="${penalArticle}OtherWrap" hidden><label for="${penalArticle}Other">Outro artigo/dispositivo do Código Penal</label><input id="${penalArticle}Other" type="text" maxlength="300" placeholder="Ex.: Art. 163, parágrafo único, II"></div>${n>1?`<button type="button" onclick="removeReportAuthor(${n})">Remover Autor ${n}</button>`:''}</fieldset>`};
const collectReportAuthorsBase=collectReportAuthors;
collectReportAuthors=function(){return [...document.querySelectorAll('.report-author')].map((el,index)=>{const n=el.dataset.author,selected=rv(`repAuthor${n}PenalArticle`),custom=rv(`repAuthor${n}PenalArticleOther`),penalArticle=selected.startsWith('Outro')?(custom?`Outro — ${custom}`:'Outro'):selected;return {label:`Autor ${index+1}`,name:rv(`repAuthor${n}Name`),aia:rv(`repAuthor${n}Aia`),adminNorm:rv(`repAuthor${n}AdminNorm`),adminArticle:rv(`repAuthor${n}AdminArticle`),penalNorm:rv(`repAuthor${n}PenalNorm`),penalArticle,penalties:selectedPenalties(n),value:rv(`repAuthor${n}Value`)}}).filter(a=>a.name||a.aia||a.adminNorm||a.adminArticle||a.penalNorm||a.penalArticle||a.penalties.length||a.value)};
const renderResenhaBase=renderResenha;
renderResenha=function(){renderResenhaBase();let html=content.innerHTML;html=html.replace('<label for="repNature">Natureza da ocorrência</label><input id="repNature" type="text" >',natureSelect());html=html.replace('<label for="repAAForward">Forma de encaminhamento</label><textarea id="repAAForward" rows="2" maxlength="2000" placeholder="Informe como ocorreu ou ocorrerá o encaminhamento."></textarea>',aaForwardSelect());content.innerHTML=html};
