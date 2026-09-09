const ESPA_AI_ENDPOINT = window.ESPA_AI_ENDPOINT || '';

function assistantShell({title,lead,id,placeholder,action}){
  return `<h2 class="section-title">${title}</h2><section class="tool assistant-tool"><p>${lead}</p><p class="small">Você pode digitar ou usar o microfone. A transcrição fica no campo para conferência antes do envio.</p><label for="${id}">Informações</label><textarea id="${id}" rows="8" placeholder="${placeholder}"></textarea><div class="assistant-actions"><button type="button" onclick="startDictation('${id}')">🎙️ Falar</button><button type="button" onclick="stopDictation()">⏹ Parar</button><button type="button" onclick="${action}">Continuar</button></div><div id="${id}Status" class="small" role="status"></div><div id="${id}Out" class="output assistant-output"></div></section>`;
}

function renderAssistant(){
  currentView='assistant';
  content.innerHTML=assistantShell({title:'🧭 Assistente de Ocorrência Ambiental',lead:'Descreva somente o que foi observado ou informado. O assistente deve separar fatos, dados faltantes, verificações, hipóteses de enquadramento e providências.',id:'occInput',placeholder:'Ex.: fiscalização em imóvel rural; foi observada supressão de vegetação próxima a curso d’água...',action:'submitAssistant(\'occurrence\',\'occInput\')'});
}

function renderEnvironmentalAI(){
  currentView='environmental-ai';
  content.innerHTML=assistantShell({title:'💡 Consulta Ambiental',lead:'Faça uma pergunta sobre legislação, normas ou procedimentos ambientais. A resposta deverá priorizar a biblioteca ESPA e fontes oficiais vigentes, com fundamentação.',id:'aiInput',placeholder:'Ex.: qual é a base legal para intervenção em APP em situação de defesa civil?',action:'submitAssistant(\'legal\',\'aiInput\')'});
}

function renderResenha(){
  currentView='resenha';
  content.innerHTML=assistantShell({title:'🗒️ Gerador de Resenha Policial',lead:'Informe os fatos de forma livre. A versão final será estruturada conforme o modelo institucional que será incorporado ao projeto, sem criação de informações ausentes.',id:'reportInput',placeholder:'Ex.: equipe em patrulhamento ambiental pelo município..., local..., fato constatado..., providências...',action:'submitAssistant(\'report\',\'reportInput\')'});
}

let activeRecognition=null;
function startDictation(targetId){
  const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  const field=document.getElementById(targetId), statusEl=document.getElementById(targetId+'Status');
  if(!Recognition){statusEl.textContent='Este navegador não oferece reconhecimento de voz. Digite as informações normalmente.';return}
  stopDictation();
  const recognition=new Recognition();activeRecognition=recognition;
  recognition.lang='pt-BR';recognition.continuous=true;recognition.interimResults=true;
  const original=field.value.trim();let finalText='';
  recognition.onstart=()=>statusEl.textContent='🎙️ Ouvindo… confira a transcrição antes de enviar.';
  recognition.onresult=e=>{let interim='';for(let i=e.resultIndex;i<e.results.length;i++){const t=e.results[i][0].transcript;if(e.results[i].isFinal)finalText+=t+' ';else interim+=t}field.value=[original,finalText.trim(),interim.trim()].filter(Boolean).join(original?' ':'')};
  recognition.onerror=e=>statusEl.textContent='Não foi possível transcrever: '+e.error+'. Você pode continuar digitando.';
  recognition.onend=()=>{if(activeRecognition===recognition)activeRecognition=null;statusEl.textContent='Transcrição encerrada. Revise o texto antes de continuar.'};
  recognition.start();
}
function stopDictation(){if(activeRecognition){try{activeRecognition.stop()}catch{}activeRecognition=null}}

function localEvidence(query){
  const normalize=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const terms=normalize(query).split(/\s+/).filter(x=>x.length>3);
  return allItems().map(item=>{const hay=normalize([item.title,item.summary,(item.tags||[]).join(' '),(item.legal||[]).join(' ')].join(' '));const score=terms.reduce((n,t)=>n+(hay.includes(t)?1:0),0);return {item,score}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,6).map(x=>x.item);
}

async function submitAssistant(mode,inputId){
  stopDictation();
  const field=document.getElementById(inputId), out=document.getElementById(inputId+'Out'), statusEl=document.getElementById(inputId+'Status');
  const text=field.value.trim();if(!text){statusEl.textContent='Informe ou dite os dados antes de continuar.';return}
  const evidence=localEvidence(text);
  if(!ESPA_AI_ENDPOINT){
    const refs=evidence.length?evidence.map(i=>`<li><strong>${esc(i.title)}</strong> — ${esc(i.summary||'')}</li>`).join(''):'<li>Nenhum item suficientemente relacionado foi localizado na biblioteca interna.</li>';
    out.innerHTML=`<strong>Consulta preparada.</strong><p>O núcleo local encontrou estas referências para conferência:</p><ul>${refs}</ul><p class="warn">O motor de IA seguro ainda não está conectado. Nenhum enquadramento ou conclusão foi inventado. Quando o endpoint seguro estiver configurado, este mesmo fluxo enviará a pergunta e as referências selecionadas para análise fundamentada.</p>`;
    statusEl.textContent='Pesquisa local concluída.';return;
  }
  statusEl.textContent='Consultando o motor seguro…';out.textContent='';
  try{
    const response=await fetch(ESPA_AI_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode,text,evidence:evidence.map(i=>({title:i.title,summary:i.summary,legal:i.legal||[],documents:i.documents||[]}))})});
    if(!response.ok)throw Error('HTTP '+response.status);
    const result=await response.json();out.textContent=result.answer||'O serviço não retornou resposta.';statusEl.textContent='Consulta concluída. Confira as fontes apresentadas antes da adoção de providências.';
  }catch(e){statusEl.textContent='Motor indisponível. A consulta não foi concluída.';out.innerHTML='<p class="warn">Não foi possível consultar o serviço seguro. Utilize a biblioteca interna e as fontes oficiais enquanto o serviço estiver indisponível.</p>'}
}
