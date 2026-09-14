// Ajustes finais do gerador de resenha: renderização robusta, BOPAmb e geração resiliente.
const renderResenhaBeforeUiFix=renderResenha;
renderResenha=function(){
  renderResenhaBeforeUiFix();
  let html=content.innerHTML;
  const current=document.getElementById('repNature');
  if(!current||String(current.tagName||'').toUpperCase()!=='SELECT'){
    html=html.replace(/<label for="repNature">Natureza da ocorrência<\/label><input id="repNature" type="text"\s*\/?>(?:<\/input>)?/i,natureSelect());
  }
  if(!/id="repBOPAmb"/i.test(html)){
    html=html.replace(/(<label for="repNature">Natureza da ocorrência<\/label>)/i,`${reportField('repBOPAmb','Nº do BOPAmb')}$1`);
  }
  content.innerHTML=html;
};

generateResenha=function(){
  const out=document.getElementById('reportOut'),status=document.getElementById('reportStatus');
  try{
    const nature=typeof resolvedReportNature==='function'?resolvedReportNature():rv('repNature');
    const required=[['repDate','data'],['repTime','hora'],['repCity','município'],['repPlace','local'],['repFacts','constatação']];
    const missing=required.filter(([id])=>!rv(id)).map(([,name])=>name);
    if(!nature)missing.unshift('natureza');
    if(missing.length){
      if(status)status.textContent='Preencha os campos essenciais: '+missing.join(', ')+'.';
      if(out)out.textContent='';
      return;
    }
    const authors=collectReportAuthors();
    const parts=[`RESENHA POLICIAL — ${nature.toUpperCase()}`];
    const bop=rv('repBOPAmb');
    if(bop)parts.push(`BOPAmb nº: ${bop}`);
    parts.push(`Data: ${formatReportDate(rv('repDate'))} | Hora: ${rv('repTime')} h`,`Município: ${rv('repCity')} | Local: ${rv('repPlace')}`,'',rv('repFacts'));
    if(authors.length)parts.push('','AUTORIA E AUTUAÇÕES',...authors.flatMap(a=>[authorText(a),'']));
    if(rv('repAdmin'))parts.push('MEDIDAS ADMINISTRATIVAS',rv('repAdmin'),'');
    const aa=[rv('repAADate')&&`Data: ${formatReportDate(rv('repAADate'))}`,rv('repAATime')&&`Hora: ${rv('repAATime')} h`,rv('repAAForward')&&`Encaminhamento: ${rv('repAAForward')}`].filter(Boolean);
    if(aa.length)parts.push('ATENDIMENTO AMBIENTAL',aa.join('\n'),'');
    if(rv('repExtra'))parts.push('OUTRAS INFORMAÇÕES',rv('repExtra'),'');
    parts.push('Rascunho gerado para revisão. Conferir números, artigos, valores, identificação dos envolvidos, providências e demais dados antes da utilização institucional.');
    if(out){out.hidden=false;out.textContent=parts.join('\n').replace(/\n{3,}/g,'\n\n');}
    if(status)status.textContent=authors.length?'Ocorrência gerada com '+authors.length+' autor(es) individualizado(s). Revise antes de utilizar.':'Ocorrência gerada. Revise antes de utilizar.';
  }catch(error){
    console.error('Falha ao gerar resenha',error);
    if(status)status.textContent='Não foi possível gerar a ocorrência. Revise os campos e tente novamente.';
    if(out)out.textContent='';
  }
};

const clearResenhaBeforeUiFix=clearResenha;
clearResenha=function(){
  clearResenhaBeforeUiFix();
  const bop=document.getElementById('repBOPAmb');
  if(bop)bop.value='';
};
