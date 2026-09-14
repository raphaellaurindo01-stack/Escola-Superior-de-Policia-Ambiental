// Complemento do gerador de resenha: restringe fundamentos à norma escolhida.
// Fonte administrativa oficial: Resolução SIMA nº 05, de 18 de janeiro de 2021 (SEMIL/SP).
// A ausência de opções cadastradas é intencional: o sistema não sugere artigo sem mapeamento validado.
const RESENHA_ADMIN_BY_NORM={
  'Resolução SIMA nº 05/2021':[
    'Art. 25 — fauna silvestre sem licença/autorização ou em desacordo',
    'Art. 25, § 3º, I — impedir procriação da fauna sem autorização',
    'Art. 25, § 3º, II — modificar, danificar ou destruir ninho, abrigo ou criadouro natural',
    'Art. 25, § 3º, III — comércio, guarda, cativeiro, depósito, uso ou transporte irregular de fauna',
    'Art. 25, § 3º, IV — deixar de manter atualizado registro de acervo faunístico/movimentação de plantel',
    'Art. 26 — introduzir espécime animal fora de sua área de distribuição natural sem licença/parecer',
    'Art. 26, § 2º, I — reintroduzir fauna silvestre sem parecer técnico e licença, quando exigível',
    'Art. 26, § 2º, II — permitir reprodução entre espécies diferentes sem autorização',
    'Art. 27 — exportar peles e couros de anfíbios e répteis em bruto sem autorização',
    'Art. 28 — praticar caça profissional no Estado de São Paulo',
    'Art. 29 — abuso, maus-tratos, ferir ou mutilar animais',
    'Art. 30 — utilizar animais em experimento/teste de cosméticos, higiene pessoal e perfumes',
    'Art. 31 — molestar intencionalmente cetáceo, pinípede ou sirênio em águas paulistas',
    'Art. 32 — comerciante deixar de apresentar declaração de estoque/valores de animais silvestres',
    'Art. 33 — explorar comercialmente imagem de animal silvestre irregular ou em maus-tratos',
    'Art. 34 — causar degradação em viveiro, açude ou estação de aquicultura de domínio público',
    'Art. 35 — pescar em período ou local no qual a pesca seja proibida',
    'Art. 35, § 1º, I — pescar espécie preservada ou espécime abaixo do tamanho permitido',
    'Art. 35, § 1º, II — pescar quantidade superior ou com aparelho, petrecho, técnica ou método não permitido',
    'Art. 35, § 1º, III — transportar, comercializar, beneficiar ou industrializar espécime de pesca proibida',
    'Art. 35, § 1º, IV — transportar, conservar, beneficiar, armazenar, descaracterizar, industrializar ou comercializar pescado sem origem/autorização',
    'Art. 35, § 1º, V — capturar, extrair, coletar, transportar, comercializar ou exportar espécime ornamental sem autorização ou em desacordo',
    'Art. 35, § 1º, VI — deixar de apresentar declaração de estoque',
    'Art. 36 — pesca com explosivos, substâncias tóxicas ou outro meio proibido',
    'Art. 37 — exercer pesca sem cadastro, autorização/licença ou sem portar documento exigido',
    'Art. 38 — importar/exportar ou introduzir espécie aquática sem autorização ou em desacordo',
    'Art. 39 — explorar campos naturais de invertebrados, algas ou recifes de coral sem autorização',
    'Art. 39, § 1º, I — utilizar, comercializar, armazenar, pescar ou transportar invertebrados, algas ou corais sem autorização',
    'Art. 39, § 1º, II — fundear embarcação ou lançar detritos sobre bancos de moluscos ou corais demarcados',
    'Art. 41 — comandante de embarcação de pesca deixar de preencher/entregar mapas obrigatórios',
    'Art. 43 — destruir/danificar vegetação em APP sem autorização ou em desacordo',
    'Art. 44 — cortar árvores em APP ou espécie especialmente protegida sem autorização',
    'Art. 45 — extrair mineral de floresta pública ou APP sem prévia autorização',
    'Art. 46 — transformar madeira de vegetação nativa em carvão sem licença ou em desacordo',
    'Art. 47 — receber/adquirir produto vegetal sem exigir licença/documento de origem',
    'Art. 47, § 1º — vender, expor, depositar, transportar, destinar ou guardar produto vegetal sem licença válida ou em desacordo',
    'Art. 48 — impedir ou dificultar regeneração natural de vegetação em área protegida',
    'Art. 49 — destruir/danificar vegetação objeto de especial preservação sem autorização',
    'Art. 50 — destruir/desmatar/danificar/explorar vegetação em Reserva Legal ou servidão ambiental sem autorização',
    'Art. 51 — executar manejo florestal sem autorização, sem requisitos técnicos ou em desacordo',
    'Art. 52 — explorar/danificar vegetação nativa fora de Reserva Legal sem aprovação ou em desacordo',
    'Art. 53 — adquirir, intermediar, transportar ou comercializar produto de área embargada',
    'Art. 54 — destruir, danificar, lesar ou maltratar árvore/planta ornamental pública ou privada alheia',
    'Art. 55 — comercializar, portar ou utilizar motosserra sem licença ou registro',
    'Art. 56 — fazer uso de fogo em área agropastoril sem autorização ou em desacordo',
    'Art. 57 — fabricar, vender, transportar ou soltar balão com potencial de provocar incêndio',
    'Art. 58 — disseminar doença, praga ou espécie capaz de causar dano ambiental',
    'Art. 61 — introduzir espécie alóctone em unidade de conservação',
    'Art. 62 — violar limitação administrativa provisória em área estudada para criação de UC',
    'Art. 63 — realizar pesquisa científica em UC sem autorização, quando exigível',
    'Art. 64 — explorar comercialmente recurso/serviço natural em UC sem autorização ou em desacordo',
    'Art. 65 — explorar comercialmente imagem de UC sem autorização ou em desacordo',
    'Art. 66 — liberar/cultivar OGM em área protegida em desacordo com plano/regulamento/CTNBio',
    'Art. 67 — atividade ou conduta em desacordo com objetivos, plano de manejo ou regulamento de UC',
    'Art. 68 — causar dano à unidade de conservação',
    'Art. 69 — penetrar em UC com instrumento próprio para caça, pesca ou exploração sem licença exigível',
    'Art. 72 — obstar ou dificultar fiscalização ambiental',
    'Art. 73 — obstar/dificultar coleta de dados para georreferenciamento fiscalizatório de imóvel rural',
    'Art. 74 — descumprir embargo de obra, atividade ou área',
    'Art. 75 — deixar de atender exigência legal/regulamentar após notificação no prazo concedido',
    'Art. 76 — deixar de apresentar relatório ou informação ambiental no prazo exigido',
    'Art. 77 — elaborar/apresentar informação, estudo, laudo ou relatório ambiental falso, enganoso ou omisso'
  ]
};
const RESENHA_PENAL_BY_NORM={
  'Lei Federal nº 9.605/1998':['Art. 29 — fauna','Art. 32 — maus-tratos à fauna','Art. 38 — vegetação em APP','Art. 39 — floresta de preservação permanente','Art. 41 — incêndio em mata ou floresta','Art. 46 — produto/subproduto florestal','Art. 48 — regeneração natural','Art. 49 — vegetação ornamental','Art. 50 — vegetação especialmente protegida','Art. 60 — atividade sem licença/autorização','Art. 66 — informação falsa/enganosa','Art. 69 — obstar/dificultar fiscalização','Art. 69-A — estudo/laudo/relatório falso ou enganoso']
};
function resenhaArticleSelect(id,label,normId,map){return `<label for="${id}">${label}</label><select id="${id}" disabled><option value="">Selecione primeiro a norma</option></select><p id="${id}Hint" class="small">O fundamento é liberado somente após a escolha da norma.</p>`}
function updateResenhaArticles(normId,articleId,map){const norm=document.getElementById(normId),article=document.getElementById(articleId),hint=document.getElementById(articleId+'Hint');if(!norm||!article)return;const options=map[norm.value]||[];article.innerHTML=options.length?'<option value="">Selecione</option>'+options.map(v=>`<option value="${v}">${v}</option>`).join(''):'<option value="">Nenhum fundamento cadastrado para esta norma</option>';article.disabled=!options.length;if(hint)hint.textContent=options.length?'Selecione apenas o fundamento correspondente à norma escolhida.':'Ainda não há fundamento validado/cadastrado para esta norma; o sistema não fará sugestão automática.'}
function resenhaNormSelect(id,label,options,articleId,mapName){return `<label for="${id}">${label}</label><select id="${id}" onchange="updateResenhaArticles('${id}','${articleId}',${mapName})"><option value="">Selecione</option>${options.map(v=>`<option value="${v}">${v}</option>`).join('')}</select>`}
authorBlock=function(n){const adminNorm=`repAuthor${n}AdminNorm`,adminArticle=`repAuthor${n}AdminArticle`,penalNorm=`repAuthor${n}PenalNorm`,penalArticle=`repAuthor${n}PenalArticle`;return `<fieldset class="report-author" data-author="${n}"><legend>Autor ${n}</legend><p class="small">AD = autor direto; AI = autor indireto. Selecione somente o que efetivamente constar da ocorrência.</p>${reportSelect(`repAuthor${n}Name`,'Identificação do autor',AUTHOR_IDS)}${reportField(`repAuthor${n}Aia`,'AIA nº')}<h4>Enquadramento administrativo</h4>${resenhaNormSelect(adminNorm,'Norma',Object.keys(RESENHA_ADMIN_BY_NORM),adminArticle,'RESENHA_ADMIN_BY_NORM')}${resenhaArticleSelect(adminArticle,'Artigo / fundamento legal',adminNorm,RESENHA_ADMIN_BY_NORM)}${penaltyChoices(n)}${reportField(`repAuthor${n}Value`,'Valor da multa (R$)','number','min="0" step="0.01" inputmode="decimal"')}<h4>Enquadramento penal</h4>${resenhaNormSelect(penalNorm,'Norma',Object.keys(RESENHA_PENAL_BY_NORM),penalArticle,'RESENHA_PENAL_BY_NORM')}${resenhaArticleSelect(penalArticle,'Artigo / fundamento legal',penalNorm,RESENHA_PENAL_BY_NORM)}${n>1?`<button type="button" onclick="removeReportAuthor(${n})">Remover Autor ${n}</button>`:''}</fieldset>`};
