// Ajustes finais do gerador de resenha: renderização robusta, cabeçalho institucional, BOPAmb e geração resiliente.
const RESENHA_BATTALIONS=['1º Batalhão de Polícia Ambiental','2º Batalhão de Polícia Ambiental','3º Batalhão de Polícia Ambiental','4º Batalhão de Polícia Ambiental','5º Batalhão de Polícia Ambiental'];
const RESENHA_COMPANIES=['1ª Companhia de Polícia Ambiental','2ª Companhia de Polícia Ambiental','3ª Companhia de Polícia Ambiental','4ª Companhia de Polícia Ambiental','5ª Companhia de Polícia Ambiental'];
const RESENHA_PLATOONS=['Sede da Companhia','1º Pelotão de Polícia Ambiental','2º Pelotão de Polícia Ambiental','3º Pelotão de Polícia Ambiental','4º Pelotão de Polícia Ambiental'];

function institutionalReportSelect(id,label,options){
  return `<label for="${id}">${label}</label><select id="${id}"><option value="">Selecione</option>${options.map(value=>`<option value="${value}">${value}</option>`).join('')}</select>`;
}
function resenhaInstitutionalFields(){
  return `<h3>Unidade responsável</h3><p class="small">Selecione a unidade que elaborou a resenha conforme o cabeçalho do modelo institucional.</p>${institutionalReportSelect('repBattalion','Batalhão',RESENHA_BATTALIONS)}${institutionalReportSelect('repCompany','Companhia',RESENHA_COMPANIES)}${institutionalReportSelect('repPlatoon','Pelotão',RESENHA_PLATOONS)}`;
}

const renderResenhaBeforeUiFix=renderResenha;
renderResenha=function(){
  renderResenhaBeforeUiFix();
  let html=content.innerHTML;
  const current=document.getElementById('repNature');
  if(!current||String(current.tagName||'').toUpperCase()!=='SELECT'){
    html=html.replace(/<label for="repNature">Natureza da ocorrência<\/label><input id="repNature" type="text"\s*\/?>(?:<\/input>)?/i,natureSelect());
  }
  if(!/id="repBattalion"/i.test(html)){
    html=html.replace(/(<label for="repNature">Natureza da ocorrência<\/label>)/i,`${resenhaInstitutionalFields()}<h3>Dados da ocorrência</h3>$1`);
  }
  if(!/id="repBOPAmb"/i.test(html)){
    html=html.replace(/(<label for="repNature">Natureza da ocorrência<\/label>)/i,`${reportField('repBOPAmb','Nº do BOPAmb')}$1`);
  }
  content.innerHTML=html;
};

function whatsappAuthorLabel(author,index){
  const identification=String(author.name||'').trim().toUpperCase();
  if(identification.startsWith('AD'))return `Autor Direto ${index+1}`;
  if(identification.startsWith('AI'))return `Autor Indireto ${index+1}`;
  return `Autor ${index+1}`;
}
function whatsappAiaText(aia){
  const lines=[`*${aia.label}${aia.number?` nº ${aia.number}`:''}*`];
  if(aia.adminNorm||aia.adminArticle){
    lines.push('','*Enquadramento administrativo:*');
    if(aia.adminNorm)lines.push(`*Norma:* ${aia.adminNorm};`);
    if(aia.adminArticle)lines.push('',`*Fundamento:* ${aia.adminArticle}.`);
  }
  const penalty=[aia.penalties?.length&&aia.penalties.join(', '),aia.value&&`valor ${formatMoney(aia.value)}`].filter(Boolean).join('; ');
  if(penalty)lines.push('',`*Penalidade:* ${penalty}.`);
  if(aia.adminAggravant&&aia.adminAggravant!=='Não houve agravante/majoração'){
    lines.push('',`*Majoração administrativa:* ${aia.adminAggravant}${aia.previousAia?`; AIA anterior: ${aia.previousAia}`:''}.`);
  }
  if(aia.penalNorm||aia.penalArticle){
    lines.push('','*Enquadramento penal:*');
    if(aia.penalNorm)lines.push(`*Norma:* ${aia.penalNorm};`);
    if(aia.penalArticle)lines.push('',`*Fundamento:* ${aia.penalArticle}.`);
  }
  return lines.join('\n');
}
function whatsappAuthorText(author,index){
  const lines=[`*${whatsappAuthorLabel(author,index)}*`];
  for(const aia of author.aias||[])lines.push('',whatsappAiaText(aia));
  return lines.join('\n');
}

generateResenha=function(){
  const out=document.getElementById('reportOut'),status=document.getElementById('reportStatus');
  try{
    const nature=typeof resolvedReportNature==='function'?resolvedReportNature():rv('repNature');
    const required=[['repBattalion','batalhão'],['repCompany','companhia'],['repPlatoon','pelotão'],['repDate','data'],['repTime','hora'],['repCity','município'],['repPlace','local'],['repFacts','constatação']];
    const missing=required.filter(([id])=>!rv(id)).map(([,name])=>name);
    if(!nature)missing.unshift('natureza');
    if(missing.length){
      if(status)status.textContent='Preencha os campos essenciais: '+missing.join(', ')+'.';
      if(out)out.textContent='';
      return;
    }
    const authors=collectReportAuthors();
    const parts=['*Comando de Policiamento Ambiental*',rv('repBattalion'),rv('repCompany'),rv('repPlatoon'),''];
    const bop=rv('repBOPAmb');
    if(bop)parts.push(`*BOPAmb nº:* ${bop}`,'');
    parts.push(`*Data:* ${formatReportDate(rv('repDate'))} | Hora: ${rv('repTime')} h`,'',`*Município:* ${rv('repCity')} | Local: ${rv('repPlace')}`,'',rv('repFacts'));
    if(authors.length)parts.push('','*AUTORIA E AUTUAÇÕES*',...authors.flatMap((author,index)=>['',whatsappAuthorText(author,index)]));
    if(rv('repAdmin'))parts.push('','*DEMAIS MEDIDAS ADMINISTRATIVAS*','',rv('repAdmin'));
    const aa=[];
    if(rv('repAADate'))aa.push(`*Data:* ${formatReportDate(rv('repAADate'))}`);
    if(rv('repAATime'))aa.push('',`*Hora:* ${rv('repAATime')} h`);
    if(rv('repAAForward'))aa.push('',`*Encaminhamento:* ${rv('repAAForward')}`);
    if(aa.length)parts.push('','*ATENDIMENTO AMBIENTAL*','',...aa);
    if(rv('repExtra'))parts.push('','*OUTRAS INFORMAÇÕES*','',rv('repExtra'));
    parts.push('','Rascunho gerado para revisão. Conferir unidade, números, artigos, valores, identificação dos envolvidos, providências e demais dados antes da utilização institucional.');
    if(out){out.hidden=false;out.textContent=parts.join('\n').replace(/\n{3,}/g,'\n\n');}
    if(status)status.textContent=authors.length?'Resenha pronta para copiar no WhatsApp, com '+authors.length+' autor(es) individualizado(s). Revise antes de utilizar.':'Resenha pronta para copiar no WhatsApp. Revise antes de utilizar.';
  }catch(error){
    console.error('Falha ao gerar resenha',error);
    if(status)status.textContent='Não foi possível gerar a resenha. Revise os campos e tente novamente.';
    if(out)out.textContent='';
  }
};

const clearResenhaBeforeUiFix=clearResenha;
clearResenha=function(){
  clearResenhaBeforeUiFix();
  ['repBOPAmb','repBattalion','repCompany','repPlatoon'].forEach(id=>{const field=document.getElementById(id);if(field)field.value=''});
};
