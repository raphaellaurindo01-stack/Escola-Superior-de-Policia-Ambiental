
let DATA=null, currentView='home', deferredPrompt=null;
const $=s=>document.querySelector(s), content=$('#content'), search=$('#search');
const memory={};
function stored(key,fallback){try{return Object.hasOwn(memory,key)?memory[key]:JSON.parse(localStorage.getItem(key)||'null')??fallback}catch{return memory[key]??fallback}}
function persist(key,value){memory[key]=value;try{localStorage.setItem(key,JSON.stringify(value))}catch{status('Armazenamento indisponível: alterações mantidas apenas nesta sessão.')}}
const favs=()=>{const value=stored('favs',[]);return Array.isArray(value)?value.filter(x=>typeof x==='string'):[]};
const setFavs=x=>persist('favs',x);
function status(message){$('#appStatus').textContent=message}

const esc=s=>(s??'').toString().replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
async function boot(){
 try{const response=await fetch('data/content.json');if(!response.ok)throw Error();DATA=await response.json();if(!Array.isArray(DATA.modules))throw Error()}catch{content.innerHTML='<p class="warn">Não foi possível carregar o conteúdo. Conecte-se à internet no primeiro acesso e recarregue a página.</p>';status('Conteúdo indisponível.');return}
 status('Biblioteca ESPA. Consulte as fontes e confira os documentos pendentes.');
 renderHome();
 document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>navigate(b.dataset.view));
 search.addEventListener('input',()=>renderSearch(search.value));
 search.addEventListener('focus',()=>{if(!search.value) renderSearch('')});
 if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').then(()=>navigator.serviceWorker.ready).then(()=>status('Conteúdo interno disponível offline. Fontes externas precisam de conexão.')).catch(()=>status('Acesso offline indisponível neste navegador.'));
 content.addEventListener('click',e=>{const favorite=e.target.closest('[data-favorite]');const result=e.target.closest('[data-result]');if(favorite){toggleFav(allItems()[Number(favorite.dataset.favorite)].title);return}if(result)openItem(allItems()[Number(result.dataset.result)])});
 content.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[role="button"]')){e.preventDefault();e.target.click()}});
 new MutationObserver(()=>{content.querySelectorAll('article[onclick]').forEach(el=>{el.setAttribute('role','button');el.tabIndex=0});content.querySelectorAll('label').forEach((label,index)=>{const next=label.nextElementSibling;if(next&&/^(INPUT|SELECT|TEXTAREA)$/.test(next.tagName)){next.id ||= 'field-'+index;label.htmlFor=next.id}});content.querySelectorAll('.output').forEach(el=>el.setAttribute('role','status'))}).observe(content,{childList:true,subtree:true});
}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('#installBtn').hidden=false});
$('#installBtn').onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null;$('#installBtn').hidden=true}};
function navigate(v){currentView=v;if(v==='home')renderHome();if(v==='favorites')renderFavorites();if(v==='checklists')renderChecklists();if(v==='tools')renderTools();if(v==='bopamb')renderBopamb();if(v==='nexo')renderNexo();if(v==='search'){search.focus();renderSearch(search.value)}}
function renderHome(){
 currentView='home';
 content.innerHTML=`<h2 class="section-title">Escola Superior de Polícia Ambiental</h2><div class="quick reference-nav"><button onclick="renderModule('legislacao')">📚 Legislação Ambiental</button><button onclick="renderModule('fauna')">🐾 Fauna</button><button onclick="renderModule('flora')">🌳 Flora</button><button onclick="renderReference('operacoes')">🚒 Operações</button><button onclick="renderReference('ia')">💡 IA Ambiental</button><button onclick="renderReference('anexos')">📎 Anexos</button></div><h2 class="section-title">Áreas de consulta</h2><div class="grid">${DATA.modules.map(m=>`<article class="card" role="button" tabindex="0" onclick="renderModule('${m.id}')"><div class="icon">${m.icon}</div><h3>${esc(m.title)}</h3><p>${esc(m.description)}</p></article>`).join('')}</div>
 <h2 class="section-title">Acesso rápido</h2><div class="grid">
 <article class="card" role="button" tabindex="0" onclick="renderChecklists()"><div class="icon">✅</div><h3>Checklists</h3><p>Vistoria geral e conferência de documentos.</p></article>
 <article class="card" role="button" tabindex="0" onclick="renderTools()"><div class="icon">🧮</div><h3>Ferramentas</h3><p>APP, área, coordenadas e cálculos rápidos.</p></article>
 <article class="card" role="button" tabindex="0" onclick="renderBopamb()"><div class="icon">📝</div><h3>Gerador BOPAmb</h3><p>Monte um texto-base com os principais dados da ocorrência.</p></article></div>
 <p class="small">⚠️ Ferramenta de apoio. A legislação, normas institucionais e enquadramentos devem ser conferidos antes da adoção de medida administrativa ou policial.</p>`;
}
function renderModule(id){
 currentView='module:'+id;
 const m=DATA.modules.find(x=>x.id===id);
 content.innerHTML=`<h2 class="section-title">${m.icon} ${esc(m.title)}</h2><p>${esc(m.description)}</p>`+m.items.map(i=>resultHtml(i,m)).join('');
}
function allItems(){return DATA.modules.flatMap(m=>m.items.map(i=>({...i,module:m.title,icon:m.icon})))}
function renderSearch(q){
 currentView='search';
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 q=normalize((q||'').trim());
 let items=allItems();
 if(q) items=items.filter(i=>normalize([i.title,i.summary,(i.tags||[]).join(' '),(i.legal||[]).join(' '),i.module].join(' ')).includes(q));
 content.innerHTML=`<h2 class="section-title">🔎 ${q?'Resultados':'Pesquisa geral'}</h2>${items.length?items.map(i=>resultHtml(i,{title:i.module,icon:i.icon})).join(''):'<p>Nenhum resultado encontrado.</p>'}`;
}
function key(i){return i.title}
function toggleFav(title){const f=favs();setFavs(f.includes(title)?f.filter(x=>x!==title):[...f,title]);if(currentView==='favorites')renderFavorites();else if(currentView.startsWith('module:'))renderModule(currentView.slice(7));else if(currentView.startsWith('reference:'))renderReference(currentView.slice(10));else renderSearch(search.value)}
function resultHtml(i,m){
 const index=allItems().findIndex(x=>x.title===i.title),on=favs().includes(key(i));
 return '<article class="result"><button class="star" data-favorite="'+index+'" aria-label="Favorito: '+esc(i.title)+'" aria-pressed="'+on+'">'+(on?'★':'☆')+'</button><button class="result-open" data-result="'+index+'"><span class="meta">'+esc(m.icon||'')+' '+esc(m.title||'')+'</span><strong>'+esc(i.title)+'</strong><span>'+esc(i.summary||'')+'</span></button>'+(i.tags||[]).slice(0,4).map(t=>'<span class="pill">'+esc(t)+'</span>').join('')+'</article>';
}
function openItem(i){
 if(i.documents?.length===1&&i.document_status==='localizado'&&!i.documents[0].note){openDocument(i.documents[0].url,i.documents[0].title);return}
 let html=`<div class="meta">Consulta operacional</div><h2>${esc(i.title)}</h2><p>${esc(i.summary||'')}</p>`;
 if(i.steps?.length)html+=`<h3>Roteiro sugerido</h3><ol class="steps">${i.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`;
 if(i.legal?.length)html+=`<h3>Base legal / referências</h3>${i.legal.map(x=>`<div class="pill">${esc(x)}</div>`).join('')}`;
 if(i.warning)html+=`<p class="warn">⚠️ ${esc(i.warning)}</p>`;
 if(!i.url && !i.documents?.length && (i.tags||[]).includes('referência'))html+='<p class="warn">Arquivo não incluído no pacote V2. Apenas o título foi registrado a partir da referência; documento e vigência ainda precisam ser conferidos.</p>';
 if(i.url && !i.documents?.length && /^https:\/\//.test(i.url))html+=`<p><a href="${esc(i.url)}" target="_blank" rel="noopener">Abrir fonte oficial ↗</a></p>`;
 if(i.documents?.length)html+='<h3>Documentos oficiais</h3>'+i.documents.map(d=>'<div class="source-entry"><button class="action" data-document="'+esc(d.url)+'" data-document-title="'+esc(d.title)+'">Ler documento · '+esc(d.title)+'</button>'+(d.note?'<p class="small">'+esc(d.note)+'</p>':'')+'</div>').join('');
 $('#dialogBody').innerHTML=html; $('#itemDialog').showModal();
}
function renderFavorites(){
 currentView='favorites'; const f=favs(), items=allItems().filter(i=>f.includes(i.title));
 content.innerHTML=`<h2 class="section-title">⭐ Favoritos</h2>${items.length?items.map(i=>resultHtml(i,{title:i.module,icon:i.icon})).join(''):'<p>Você ainda não marcou nenhum conteúdo como favorito.</p>'}`;
}
function renderChecklists(){
 currentView='checklists';const raw=stored('pamb:checks',{}),marks=raw&&typeof raw==='object'?raw:{};
 content.innerHTML='<h2 class="section-title">✅ Checklists</h2>'+DATA.checklists.map(c=>'<section class="tool"><h3>'+esc(c.title)+'</h3>'+c.items.map((x,n)=>'<label class="check"><input type="checkbox" data-check="'+c.id+'-'+n+'" '+(marks[c.id+'-'+n]?'checked':'')+'><span>'+esc(x)+'</span></label>').join('')+'<button data-clear="'+c.id+'">Limpar marcações</button></section>').join('');
 content.querySelectorAll('[data-check]').forEach(el=>el.onchange=()=>{marks[el.dataset.check]=el.checked;persist('pamb:checks',marks)});
 content.querySelectorAll('[data-clear]').forEach(el=>el.onclick=()=>{if(!confirm('Limpar as marcações deste checklist?'))return;Object.keys(marks).filter(k=>k.startsWith(el.dataset.clear+'-')).forEach(k=>delete marks[k]);persist('pamb:checks',marks);renderChecklists()});
}
function renderTools(){
 currentView='tools';
 content.innerHTML=`<h2 class="section-title">🧮 Ferramentas</h2>
 <section class="tool"><h3>APP – curso d'água natural</h3><p class="small">Referência geral do art. 4º da Lei 12.651/2012. Para cursos naturais perenes e intermitentes, excluídos os efêmeros. Regras urbanas e áreas consolidadas exigem análise própria. <a href="https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12651.htm" target="_blank" rel="noopener">Consultar art. 4º</a>.</p>
 <label>Largura do curso d'água (m)</label><input id="river" type="number" min="0" step="0.1"><button onclick="calcAPP()">Calcular faixa mínima</button><div id="appOut" class="output">Informe a largura.</div></section>
 <section class="tool"><h3>Área retangular</h3><label>Comprimento (m)</label><input id="len" type="number" step="0.01"><label>Largura (m)</label><input id="wid" type="number" step="0.01"><button onclick="calcArea()">Calcular</button><div id="areaOut" class="output"></div></section>
 <section class="tool"><h3>Converter coordenada DMS → decimal</h3><p class="small">Use valores positivos e escolha o hemisfério.</p>
 <label>Graus</label><input id="deg" type="number"><label>Minutos</label><input id="min" type="number"><label>Segundos</label><input id="sec" type="number" step="0.001"><label>Hemisfério</label><select id="hem"><option>N</option><option>S</option><option>E</option><option>W</option></select><button onclick="calcCoord()">Converter</button><div id="coordOut" class="output"></div></section>`;
}
function numeric(id){const raw=$(id).value.trim();return raw===''?NaN:Number(raw)}
function calcAPP(){
 const w=numeric('#river');let message;
 if(!Number.isFinite(w)||w<=0)message='Informe uma largura maior que zero.';
 else if(w===50||w===200)message='Valor no limite entre faixas descritas na norma. Confira a aplicação do art. 4º, I, com a orientação técnica competente.';
 else{const f=w<10?30:w<50?50:w<200?100:w<=600?200:500;message='Faixa geral de referência: '+f+' m em cada margem. Consulte as exceções e a incidência no caso concreto.'}
 $('#appOut').textContent=message;
}
function calcArea(){const l=numeric('#len'),w=numeric('#wid'),area=l*w;$('#areaOut').textContent=Number.isFinite(area)&&l>0&&w>0?area.toFixed(2)+' m² • '+(area/10000).toFixed(4)+' ha':'Informe comprimento e largura maiores que zero.'}
function calcCoord(){const d=numeric('#deg'),m=numeric('#min'),s=numeric('#sec'),h=$('#hem').value,max=['N','S'].includes(h)?90:180;const valid=[d,m,s].every(Number.isFinite)&&Number.isInteger(d)&&Number.isInteger(m)&&d>=0&&d<=max&&m>=0&&m<60&&s>=0&&s<60&&(d<max||(m===0&&s===0));$('#coordOut').textContent=valid?((d+m/60+s/3600)*(['S','W'].includes(h)?-1:1)).toFixed(7):'Confira graus, minutos (0–59), segundos (0–59,999) e hemisfério.'}
function renderBopamb(){
 currentView='bopamb';
 const fields=[['data','Data'],['hora','Hora'],['municipio','Município'],['local','Local'],['coordenadas','Coordenadas'],['fato','Fato constatado'],['responsavel','Responsável/autuado'],['documentos','Documentos apresentados'],['medicoes','Medições/quantificações'],['providencias','Providências adotadas']];
 content.innerHTML=`<h2 class="section-title">📝 Gerador de texto-base para BOPAmb</h2><section class="tool"><p class="small">Não substitui os campos e padrões obrigatórios do sistema institucional. Revise antes de utilizar. Os dados deste formulário não são enviados nem salvos; copie o texto antes de trocar de tela.</p>${fields.map(([id,l])=>`<label>${l}</label><textarea id="b_${id}" rows="2"></textarea>`).join('')}<button onclick="genBop()">Gerar texto-base</button><div id="bopOut" class="output"></div><button onclick="copyOutput('bopOut')">Copiar texto</button></section>`;
}
function genBop(){
 const v=id=>$('#b_'+id).value.trim();
 let t=`Na data de ${v('data')||'[DATA]'}, às ${v('hora')||'[HORA]'}, no município de ${v('municipio')||'[MUNICÍPIO]'}, a equipe realizou fiscalização ambiental em ${v('local')||'[LOCAL]'}, coordenadas ${v('coordenadas')||'[COORDENADAS]'}. `;
 t+=`Durante a vistoria, constatou-se: ${v('fato')||'[DESCREVER OBJETIVAMENTE O FATO]'}. `;
 if(v('responsavel'))t+=`Foi identificado como responsável: ${v('responsavel')}. `;
 if(v('documentos'))t+=`Quanto à documentação, foram apresentados/verificados: ${v('documentos')}. `;
 if(v('medicoes'))t+=`Foram realizadas as seguintes medições/quantificações: ${v('medicoes')}. `;
 if(v('providencias'))t+=`Diante dos fatos, foram adotadas as seguintes providências: ${v('providencias')}.`;
 $('#bopOut').textContent=t;
}
boot();

function renderNexo(){
 currentView='nexo'; const n=DATA.nexo_causal;
 content.innerHTML=`<h2 class="section-title">🔥 ${esc(n.title)}</h2><section class="tool"><p class="small">${esc(n.basis)}</p>
 <label>Batalhão</label><select id="nx_bpm"><option>Não informado</option><option>1º BPAmb</option><option>2º BPAmb</option><option>3º BPAmb</option><option>4º BPAmb</option><option>5º BPAmb</option></select>
 <label>Companhia</label><select id="nx_cia"><option>Não informado</option><option>1ª Cia</option><option>2ª Cia</option><option>3ª Cia</option><option>4ª Cia</option></select>
 <label>Propriedade / Talhão</label><input id="nx_prop" placeholder="Ex.: Fazenda X - Talhão 10"><label>Data/hora fiscalização</label><input id="nx_data" type="datetime-local"><label>Registro</label><input id="nx_reg" placeholder="Ex.: 001/26"></section>
 ${n.criteria.map((c,ci)=>`<section class="tool"><div class="meta">CRITÉRIO ${c.n}</div><h3>${esc(c.title)}</h3>${c.fields.map((f,fi)=>`<label>${esc(f[0])}</label><select data-nx="${ci}-${fi}">${f[1].map(o=>`<option>${esc(o)}</option>`).join('')}</select>`).join('')}</section>`).join('')}
 <section class="tool"><h3>Relatório consolidado</h3><p class="small">Formulário parcial recuperado da V2. Critérios XII e XIV ainda não têm descrição completa. Não calcula pontuação nem recomenda autuação. Os campos não são salvos; copie o relatório antes de sair.</p><button onclick="genNexo()">Gerar relatório</button><div id="nxout" class="output"></div><button onclick="copyOutput('nxout')">Copiar texto</button></section>`;
}
function genNexo(){
 let lines=['ESCOLA SUPERIOR DE POLÍCIA AMBIENTAL','RASCUNHO DE APOIO – NEXO CAUSAL (NÃO OFICIAL)','',`Batalhão: ${$('#nx_bpm').value}`,`Companhia: ${$('#nx_cia').value}`,`Propriedade/Talhão: ${$('#nx_prop').value||'Não informado'}`,`Data/Hora: ${$('#nx_data').value||'Não informado'}`,`Registro: ${$('#nx_reg').value||'Não informado'}`,'','CRITÉRIOS:'];
 DATA.nexo_causal.criteria.forEach((c,ci)=>{let vals=c.fields.map((f,fi)=>`${f[0]}: ${document.querySelector(`[data-nx="${ci}-${fi}"]`).value}`).join(' | ');lines.push(`Critério ${c.n} – ${c.title}: ${vals}`)});
 lines.push('','Observação: pontuação e parecer automático pendentes da parametrização oficial.');$('#nxout').textContent=lines.join('\n');
}

async function copyOutput(id){const text=$('#'+id).textContent;if(!text.trim()){status('Gere o texto antes de copiar.');return}try{await navigator.clipboard.writeText(text);status('Texto copiado.')}catch{const selection=window.getSelection(),range=document.createRange();range.selectNodeContents($('#'+id));selection.removeAllRanges();selection.addRange(range);status('Cópia automática indisponível. O texto foi selecionado para copiar manualmente.')}}
function renderReference(type){
 currentView='reference:'+type;
 if(type==='ia'){return renderEnvironmentalAI();content.innerHTML='<h2 class="section-title">💡 IA Ambiental</h2><section class="tool"><p>O menu consta na referência, mas a V2 não contém integração de inteligência artificial.</p><p>O gerador BOPAmb e o relatório de nexo causal usam os campos preenchidos por você.</p><button onclick="renderBopamb()">Abrir gerador BOPAmb</button><button onclick="renderNexo()">Abrir nexo causal</button></section>';return}
 const items=allItems().filter(i=>(i.tags||[]).includes(type==='operacoes'?'operações':'anexos'));
 content.innerHTML='<h2 class="section-title">'+(type==='operacoes'?'🚒 Operações':'📎 Anexos')+'</h2><p class="small">Relação recuperada da V2. Documentos não anexados estão pendentes de vinculação.</p>'+(type==='operacoes'?'<section class="tool"><h3>SP SEM FOGO 2026</h3><button onclick="renderNexo()">Abrir formulário de nexo causal</button></section>':'')+items.map(i=>resultHtml(i,{title:i.module,icon:i.icon})).join('');
}
