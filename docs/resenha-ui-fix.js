// Correção robusta da renderização da Natureza da ocorrência no DOM real do navegador.
// Evita depender da serialização exata de espaços em tags <input> feita por innerHTML.
const renderResenhaBeforeNatureFix=renderResenha;
renderResenha=function(){
  renderResenhaBeforeNatureFix();
  const current=document.getElementById('repNature');
  if(!current||String(current.tagName||'').toUpperCase()==='SELECT')return;
  const html=content.innerHTML.replace(/<label for="repNature">Natureza da ocorrência<\/label><input id="repNature" type="text"\s*\/?>(?:<\/input>)?/i,natureSelect());
  content.innerHTML=html;
};
