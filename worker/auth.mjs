const ROLES=new Set(['policial','gerente','admin']);

function bearer(request){const h=request.headers.get('Authorization')||'';return h.startsWith('Bearer ')?h.slice(7).trim():''}

export async function authenticate(request,env){
 // AUTH_MODE=disabled mantém compatibilidade durante desenvolvimento.
 // Produção restrita deverá usar oidc ou futuro adaptador institucional.
 const mode=env.AUTH_MODE||'disabled';
 if(mode==='disabled') return {subject:'development',role:'admin',approved:true,development:true};
 if(mode!=='oidc') throw Error('auth-mode-unsupported');
 const token=bearer(request);if(!token) throw Error('missing-token');
 if(!env.AUTH_INTROSPECTION_URL) throw Error('auth-unconfigured');
 const r=await fetch(env.AUTH_INTROSPECTION_URL,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${env.AUTH_INTROSPECTION_SECRET||''}`},body:JSON.stringify({token}),signal:AbortSignal.timeout(7000)});
 if(!r.ok) throw Error('invalid-token');
 const identity=await r.json();
 const role=ROLES.has(identity.role)?identity.role:null;
 if(!identity.sub||!role||identity.approved!==true||identity.suspended===true) throw Error('access-denied');
 return {subject:String(identity.sub),role,approved:true};
}

export function authorize(identity,roles=['policial','gerente','admin']){
 return !!identity?.approved&&roles.includes(identity.role);
}
