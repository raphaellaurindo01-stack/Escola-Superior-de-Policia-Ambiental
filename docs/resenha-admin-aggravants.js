// Agravantes/majoração administrativa — Resolução SIMA nº 05/2021, arts. 6º e 7º.
const RESENHA_ADMIN_AGGRAVANTS=[
  'Não houve agravante/majoração',
  'Reincidência — mesma infração ambiental: multa em triplo (art. 6º, I; art. 7º, I)',
  'Reincidência — infração ambiental distinta: multa em dobro (art. 6º, II; art. 7º, I)',
  'Obtenção de vantagem pecuniária — multa em dobro (art. 7º, II, a)',
  'Atingiu unidade de conservação ou área sujeita a regime especial de uso — multa em dobro (art. 7º, II, b)',
  'Período de defeso à fauna — multa em dobro (art. 7º, II, c)',
  'Interior de espaço territorial especialmente protegido — multa em dobro (art. 7º, II, d)',
  'Emprego de métodos cruéis para abate ou captura de animais — multa em dobro (art. 7º, II, e)',
  'Infração cometida mediante fraude — multa em dobro (art. 7º, II, f)',
  'Atingiu espécie ameaçada — multa em dobro (art. 7º, II, g)',
  'Infração facilitada por funcionário público — multa em dobro (art. 7º, II, h)',
  'Infração cometida à noite — multa em dobro (art. 7º, II, i)',
  'Infração cometida em domingo ou feriado — multa em dobro (art. 7º, II, j)'
];
function adminAggravantBlock(n){return `<h5>Agravante / majoração administrativa</h5>${reportSelect(`repAuthor${n}AdminAggravant`,'Agravante/majoração aplicada',RESENHA_ADMIN_AGGRAVANTS)}${reportField(`repAuthor${n}PreviousAia`,'AIA anterior (preencher em caso de reincidência)')}<p class="small">Nos termos do art. 7º, § 3º, da Resolução SIMA nº 05/2021, a multa é majorada uma única vez; havendo mais de uma agravante, deve prevalecer a majoração mais gravosa. As hipóteses do art. 7º, II, só majoram quando não integrarem o próprio tipo administrativo.</p>`}
const authorBlockBeforeAggravant=authorBlock;
authorBlock=function(n){return authorBlockBeforeAggravant(n).replace('<h4>Enquadramento penal</h4>',adminAggravantBlock(n)+'<h4>Enquadramento penal</h4>')};
const collectReportAuthorsBeforeAggravant=collectReportAuthors;
collectReportAuthors=function(){const authors=collectReportAuthorsBeforeAggravant();const els=[...document.querySelectorAll('.report-author')];return authors.map((a,i)=>{const n=els[i]?.dataset?.author;return {...a,adminAggravant:n?rv(`repAuthor${n}AdminAggravant`):'',previousAia:n?rv(`repAuthor${n}PreviousAia`):''}})};
const authorTextBeforeAggravant=authorText;
authorText=function(a){let text=authorTextBeforeAggravant(a);if(a.adminAggravant&&a.adminAggravant!=='Não houve agravante/majoração')text+='\nMajoração administrativa — '+a.adminAggravant+(a.previousAia?`; AIA anterior: ${a.previousAia}`:'')+'.';return text};
