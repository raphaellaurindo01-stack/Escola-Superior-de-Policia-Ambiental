const ESPA_AI_ENDPOINT = window.ESPA_AI_ENDPOINT || '';
const normalizeESPA=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const DOCUMENT_QUESTIONS=['Município e órgão emissor','Número e data da autorização','Objeto e intervenção autorizados','Área, perímetro e coordenadas','Vegetação/indivíduos abrangidos','Condicionantes','Prazo de validade','Estudo ou laudo de suporte','Responsável técnico','Profissão, conselho e registro','ART/RRT/TRT ou equivalente','Correspondência do escopo','APP, UC, manancial ou outra proteção','Competência do órgão para o ato específico','Correspondência entre campo e documento'];
function assistantShell({title,lead,id,placeholder,mode}){
 return `<h2 class="section-title">${title}</h2><section class="tool assistant-tool"><p>${lead}</p><p class="small">A voz será transcrita para conferência. O reconhecimento pode usar o serviço do navegador. Não inclua dados pessoais desnecessários.</p><label for="${id}">Informações</label><textarea id="${id}" rows="8" maxlength="12000" placeholder="${placeholder}"></textarea><div class="assistant-actions"><button type="button" onclick="startDictation('${id}')">🎙️ Falar</button><button type="button" onclick="stopDictation()">Parar</button><button type="button" onclick="submitAssistant('${mode}','${id}',false)">Organizar localmente</button>${ESPA_AI_ENDPOINT?`<button type="button" onclick="submitAssistant('${mode}','${id}',true)">Enviar texto revisado à IA</button>`:'<p class="small">IA externa ainda não ativada. A organização local e as referências estão disponíveis.</p>'}</div><div id="${id}Status" class="small" role="status"></div><div id="${id}Out" class="output assistant-output"></div><button onclick="copyOutput('${id}Out')">Copiar resultado</button></section>`;
}
function renderAssistant(){currentView='assistant';content.innerHTML=assistantShell({title:'🧭 Assistente de Ocorrência Ambiental',lead:'Separe fatos, lacunas, verificações, hipóteses e providências. Nenhum campo ausente será preenchido por suposição.',id:'occInput',placeholder:'Descreva o que foi observado, o que foi relatado e os documentos apresentados.',mode:'occurrence'})}
function renderEnvironmentalAI(){currentView='environmental-ai';content.innerHTML=assistantShell({title:'💡 Consulta Ambiental',lead:'Pesquise os roteiros da biblioteca e suas fontes. A consulta por IA, quando ativada, também verifica textos em fontes oficiais.',id:'aiInput',placeholder:'Ex.: quem pode assinar inventário florestal?',mode:'legal'})}
function renderResenha(){currentView='resenha';content.innerHTML=assistantShell({title:'🗒️ Resenha Policial',lead:'O modelo institucional ainda precisa ser fornecido. Você pode preparar os fatos; o aplicativo não apresenta um modelo inventado como resenha oficial.',id:'reportInput',placeholder:'Digite ou dite os fatos para revisão.',mode:'report'})}
let activeRecognition=null;
function startDictation(targetId){
 const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition,field=document.getElementById(targetId),s=document.getElementById(targetId+'Status');
 if(!Recognition){s.textContent='Reconhecimento de voz indisponível. Continue digitando.';return}
 stopDictation();const r=new Recognition();activeRecognition=r;r.lang='pt-BR';r.continuous=true;r.interimResults=true;
 const original=field.value.trim();let finalText='';
 r.onstart=()=>s.textContent='Ouvindo… revise antes de enviar.';
 r.onresult=e=>{if(!field.isConnected){stopDictation();return}if(activeRecognition!==r)return;let interim='';for(let i=e.resultIndex;i<e.results.length;i++){const t=e.results[i][0].transcript;if(e.results[i].isFinal)finalText+=t+' ';else interim+=t}field.value=[original,finalText.trim(),interim.trim()].filter(Boolean).join(' ')};
 let failed=false;r.onerror=()=>{failed=true;s.textContent='Não foi possível transcrever. Confira a permissão do microfone ou digite.'};
 r.onend=()=>{if(activeRecognition===r)activeRecognition=null;if(!failed)s.textContent='Transcrição encerrada. Revise o texto.'};
 try{r.start()}catch{activeRecognition=null;s.textContent='Microfone indisponível. Continue digitando.'}
}
function stopDictation(){if(activeRecognition){const r=activeRecognition;activeRecognition=null;try{r.stop()}catch{}}}
function localEvidence(query){
 const stop=new Set(['para','como','qual','quais','pode','esse','essa','pela','pelo','sobre','uma','que','com']);
 const terms=normalizeESPA(query).split(/[^a-z0-9]+/).filter(x=>x.length>=3&&!stop.has(x));
 return allItems().map(item=>{const hay=normalizeESPA([item.title,item.summary,...item.tags||[],...item.legal||[]].join(' '));return {item,score:terms.reduce((n,t)=>n+(hay.includes(t)?1:0),0)}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,6).map(x=>x.item);
}
function occurrencePlan(text,evidence){
 const q=normalizeESPA(text),document=/autoriz|prefeitura|licenca|reurb|laudo|art\b|rrt\b|trt\b|inventario|prad|cidade legal/.test(q),reurb=/reurb|cidade legal|regulariza|crf\b/.test(q);
 const questions=['Local, município, data e extensão da intervenção?','Quais fatos foram observados diretamente e quais foram apenas relatados?','Há registro de área, espécies, medidas, fotos e cronologia?'];
 if(document)questions.push(...DOCUMENT_QUESTIONS.map(x=>x+'?'));
 if(reurb)questions.push('Há CRF, projeto aprovado e registro?','Qual modalidade e instrumento de titulação?','Quando o núcleo se formou e quais provas existem?','A intervenção é antiga ou nova? Está dentro do perímetro e do objeto aprovado?','O estudo ambiental trata APP, risco e mananciais?');
 return ['RELATO FORNECIDO (não verificado)',text,'','ELEMENTOS A CONFIRMAR',...questions.map(x=>'• '+x),'','ROTEIRO DE VERIFICAÇÃO',...([...new Set(evidence.flatMap(i=>i.steps||[]))].slice(0,12).length?[...new Set(evidence.flatMap(i=>i.steps||[]))].slice(0,12):['Delimitar o fato, conferir documentos e consultar o roteiro específico na biblioteca.']).map(x=>'• '+x),'','HIPÓTESES DE ENQUADRAMENTO','Os temas e normas abaixo orientam a pesquisa. A busca local não estabelece tipificação administrativa ou penal; dependem dos fatos confirmados e do dispositivo aplicável.','','PROVIDÊNCIAS CONDICIONADAS','Registrar elementos objetivos, conferir autenticidade e alcance documental com o emissor e consultar o órgão competente. Não presumir regularidade, infração ou habilitação pelo título.'].join('\n');
}
function evidenceHtml(items){return '<h3>Referências para conferência</h3>'+(items.length?items.map(i=>`<section><strong>${esc(i.title)}</strong><p>${esc(i.summary)}</p><p>${esc((i.legal||[]).join('; '))}</p>${(i.documents||[]).map(sourceButton).join('')}</section>`).join(''):'<p>Nenhuma correspondência encontrada. Especifique o tema; nenhuma fonte foi inventada.</p>')}
let assistantAbort=null;
async function submitAssistant(mode,id,remote=false){
 stopDictation();if(assistantAbort)assistantAbort.abort();
 const out=document.getElementById(id+'Out'),s=document.getElementById(id+'Status'),text=document.getElementById(id).value.trim();
 if(!text){s.textContent='Informe os dados antes de continuar.';return}
 const evidence=localEvidence(text);
 if(mode==='report'){out.textContent='FATOS PARA REVISÃO — NÃO É RESENHA INSTITUCIONAL\n\n'+text+'\n\nPENDÊNCIA: fornecer o modelo institucional. Confira data, horário, município, local, fato, equipe e providências antes da versão final.';s.textContent='Texto preservado sem criação de fatos.';return}
 const local=mode==='occurrence'?occurrencePlan(text,evidence):'PESQUISA LOCAL NA BIBLIOTECA\nPergunta: '+text+'\n\nResultados por correspondência de termos; não é resposta gerada por IA nem confirmação de vigência.';
 out.innerHTML='<div>'+esc(local)+'</div>'+evidenceHtml(evidence);s.textContent='Organização local concluída.';
 if(!remote||!ESPA_AI_ENDPOINT)return;
 let url;try{url=new URL(ESPA_AI_ENDPOINT);if(url.protocol!=='https:'||url.username||url.password)throw Error()}catch{s.textContent='Serviço não configurado corretamente. Resultado local preservado.';return}
 const controller=new AbortController();assistantAbort=controller;const timer=setTimeout(()=>controller.abort(),45000);s.textContent='Consultando IA e fontes oficiais…';
 try{
  const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode,text}),signal:controller.signal,credentials:'omit'});
  if(!response.ok)throw Error();const r=await response.json();
  if(typeof r.answer!=='string'||!Array.isArray(r.sources)||!r.sources.length)throw Error();
  if(!out.isConnected||assistantAbort!==controller)return;
  out.innerHTML='<div>'+esc(r.answer)+'</div><h3>Fontes recuperadas pelo serviço</h3>'+r.sources.filter(d=>safeSource(d.url)).map(d=>sourceButton(d)+`<p class="small">${esc(d.status||'')} · ${esc(d.retrievedAt||'Sem data de recuperação')}</p>`).join('');s.textContent='Resposta de apoio. Confira as fontes e os elementos do caso.';
 }catch{if(out.isConnected&&assistantAbort===controller)s.textContent='IA indisponível ou resposta sem fontes. Organização local preservada.'}finally{clearTimeout(timer);if(assistantAbort===controller)assistantAbort=null}
}
