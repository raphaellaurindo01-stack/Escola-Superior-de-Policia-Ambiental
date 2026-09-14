(()=>{
 const PUBLIC=new Set(['courses','access']);
 const MANAGER=new Set(['course-manager','enrollment-review','audit']);
 const session=()=>{try{return JSON.parse(localStorage.getItem('espa-v3-dev-session')||'null')}catch{return null}};
 window.ESPA_ACCESS={
  publicRoutes:PUBLIC,
  can(route){if(PUBLIC.has(route))return true;const u=session();if(!u?.approved)return false;if(MANAGER.has(route))return ['gerente','admin'].includes(u.role);return ['policial','gerente','admin'].includes(u.role)},
  guard(route){if(this.can(route))return true;if(typeof window.renderAccess==='function')window.renderAccess();return false}
 };
 // Apenas UX. Segurança real permanece no backend; localStorage nunca concede autorização server-side.
})();
