// Extensões de navegação da versão ESPA. Mantidas separadas para facilitar revisão da V2 original.
const baseNavigate=navigate;
navigate=function(v){
  stopDictation();
  if(v==='reurb')return renderReurb();
  if(v==='technical')return renderTechnical();
  if(v==='pending')return renderPending();
  if(v==='assistant')return renderAssistant();
  if(v==='environmental-ai')return renderEnvironmentalAI();
  if(v==='resenha')return renderResenha();
  return baseNavigate(v);
};

renderHome=function(){
 currentView='home';
 content.innerHTML=`<h2 class="section-title">Escola Superior de Polícia Ambiental</h2>
 <div class="quick reference-nav"><button onclick="renderModule('legislacao')">📚 Legislação Ambiental</button><button onclick="renderModule('fauna')">🐾 Fauna</button><button onclick="renderModule('flora')">🌳 Flora</button><button onclick="renderReference('operacoes')">🚒 Operações</button><button onclick="renderEnvironmentalAI()">💡 Consulta Ambiental</button><button onclick="renderReference('anexos')">📎 Anexos</button></div>
 <h2 class="section-title">Assistência de campo</h2><div class="grid">
 <article class="card" role="button" tabindex="0" onclick="renderAssistant()"><div class="icon">🧭</div><h3>Assistente de Ocorrência</h3><p>Descreva o cenário por texto ou voz e organize a análise sem preencher lacunas factuais.</p></article>
 <article class="card" role="button" tabindex="0" onclick="renderEnvironmentalAI()"><div class="icon">💡</div><h3>Consulta Ambiental</h3><p>Consulte a biblioteca ESPA e, após integração segura, fontes oficiais externas.</p></article>
 <article class="card" role="button" tabindex="0" onclick="renderResenha()"><div class="icon">🗒️</div><h3>Resenha Policial</h3><p>Transforme informações soltas no padrão institucional após incorporação do modelo oficial.</p></article></div>
 <h2 class="section-title">Áreas de consulta</h2><div class="grid">${DATA.modules.map(m=>`<article class="card" role="button" tabindex="0" onclick="renderModule('${m.id}')"><div class="icon">${m.icon}</div><h3>${esc(m.title)}</h3><p>${esc(m.description)}</p></article>`).join('')}</div>
 <section class="tool"><button onclick="renderReurb()">REURB e Intervenções Ambientais</button><button onclick="renderTechnical()">Validar Responsável Técnico</button><button onclick="renderPending()">Documentos pendentes</button></section><h2 class="section-title">Ferramentas</h2><div class="grid">
 <article class="card" role="button" tabindex="0" onclick="renderChecklists()"><div class="icon">✅</div><h3>Checklists</h3><p>Vistoria geral e conferência de documentos.</p></article>
 <article class="card" role="button" tabindex="0" onclick="renderTools()"><div class="icon">🧮</div><h3>Ferramentas</h3><p>APP, área, coordenadas e cálculos rápidos.</p></article>
 <article class="card" role="button" tabindex="0" onclick="renderBopamb()"><div class="icon">📝</div><h3>Gerador BOPAmb</h3><p>Monte um texto-base com os principais dados da ocorrência.</p></article></div>
 <p class="small">⚠️ Ferramenta de apoio. Confirme legislação, competência, normas institucionais e elementos do caso concreto antes da adoção de medida administrativa ou policial.</p>`;
};

const originalRenderModule=renderModule;
renderModule=function(id){if(id==='reurb')return renderReurb();return originalRenderModule(id)};
