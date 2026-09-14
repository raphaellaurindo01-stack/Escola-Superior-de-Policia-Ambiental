// Guia de instalação da PWA: Android e iOS.
function renderInstallGuide(){
  currentView='install';
  const androidPrompt=typeof deferredPrompt!=='undefined'&&deferredPrompt;
  content.innerHTML=`<h2 class="section-title">📲 Instalar aplicativo</h2>
  <section class="tool"><h3>Android</h3><p>Abra este site no <strong>Google Chrome</strong>. Toque no menu ⋮ e escolha <strong>Instalar aplicativo</strong> ou <strong>Adicionar à tela inicial</strong>.</p>${androidPrompt?'<button id="installNow">Instalar agora</button>':'<p class="small">Quando o botão “Instalar” aparecer no cabeçalho, você também poderá usá-lo diretamente.</p>'}</section>
  <section class="tool"><h3>iPhone e iPad</h3><p>Abra este site no <strong>Safari</strong>. Toque em <strong>Compartilhar</strong> (ícone ⎋), role a lista e selecione <strong>Adicionar à Tela de Início</strong>. Confirme em <strong>Adicionar</strong>.</p></section>
  <section class="tool"><h3>Depois de instalar</h3><p>O ícone “Escola Ambiental” ficará na tela inicial e abrirá em tela própria, como aplicativo. Na primeira abertura, mantenha a internet ligada para concluir o carregamento e o cache.</p></section>`;
  const button=document.getElementById('installNow');
  if(button)button.onclick=async()=>{await deferredPrompt.prompt();deferredPrompt=null;button.hidden=true;const headerButton=document.getElementById('installBtn');if(headerButton)headerButton.hidden=true;};
}
const navigateBeforeInstallGuide=navigate;
navigate=function(view){if(view==='install'){renderInstallGuide();return;}return navigateBeforeInstallGuide(view);};