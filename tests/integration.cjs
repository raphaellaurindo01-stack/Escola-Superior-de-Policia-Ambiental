const {readFileSync}=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const data=JSON.parse(readFileSync('docs/data/content.json'));
const nodes=new Map();function node(s){if(!nodes.has(s))nodes.set(s,{value:'',textContent:'',innerHTML:'',isConnected:true,querySelectorAll:()=>[],insertAdjacentHTML(_,s){this.innerHTML=s+this.innerHTML}});return nodes.get(s)}
const ctx=vm.createContext({URL,console,setTimeout,clearTimeout,AbortController,document:{querySelector:node,getElementById:id=>node('#'+id),querySelectorAll:()=>[]},window:{addEventListener(){}},navigator:{},localStorage:{getItem:()=>null}});
for(const file of ['app.js','assistants.js','technical.js','router-patch.js'])vm.runInContext(readFileSync('docs/'+file,'utf8').replace(/^boot\(\);$/m,''),ctx);
const run=s=>vm.runInContext(s,ctx);run('DATA='+JSON.stringify(data));
run("navigate('reurb')");assert.match(node('#content').innerHTML,/CRF/);assert.match(node('#content').innerHTML,/Validar Responsável/);
run("navigate('technical')");assert.match(node('#matrixOut').innerHTML,/Inventário florestal/);
run("renderMatrix('georreferenciamento')");assert.match(node('#matrixOut').innerHTML,/Topografia/);assert.doesNotMatch(node('#matrixOut').innerHTML,/Inventário florestal/);
const valid={object:'Inventário',name:'Teste fictício',profession:'Outra profissão',council:'Conselho',registration:'123',responsibility:'Documento 1',proof:'Certidão específica fictícia',register:'yes',attribution:'yes',scope:'yes'};
function verdict(v){return run('technicalVerdict('+JSON.stringify(v)+').color')}
assert.equal(verdict({}),'gray');assert.equal(verdict({...valid,proof:''}),'yellow');assert.equal(verdict(valid),'green');assert.equal(verdict({...valid,attribution:'no'}),'red');assert.equal(verdict({...valid,scope:'no',proof:''}),'yellow');assert.equal(verdict({...valid,registration:' '}),'gray');
for(const q of ['APP','CRF','ART','inventário florestal','Reurb'])assert.ok(run('localEvidence('+JSON.stringify(q)+').length')>0,q);
run("navigate('assistant')");node('#occInput').value='Apresentou autorização da Prefeitura para Reurb junto a córrego.';
(async()=>{await run("submitAssistant('occurrence','occInput')");for(const term of ['Município','Número e data','CRF','CONDICIONADAS'])assert.ok(node('#occInputOut').innerHTML.includes(term),term);
run("navigate('resenha')");node('#reportInput').value='<script>texto</script>';await run("submitAssistant('report','reportInput')");assert.match(node('#reportInputOut').textContent,/NÃO É RESENHA INSTITUCIONAL/);
const sw=readFileSync('docs/sw.js','utf8'),html=readFileSync('docs/index.html','utf8');for(const [,asset] of html.matchAll(/<script src="([^"]+)"/g))assert.ok(sw.includes("'"+asset+"'"),asset+' ausente no cache');
console.log('OK: REURB, matriz, quatro estados documentais, busca de siglas, ocorrência, resenha pendente e cache dos scripts.');})().catch(e=>{console.error(e);process.exitCode=1});
