const CF_MODEL='@cf/meta/llama-3.3-70b-instruct-fp8-fast';

function messages(system,payload){return [{role:'system',content:system},{role:'user',content:JSON.stringify(payload)}]}

async function cloudflare(env,system,payload){
 if(!env.AI) throw Error('cloudflare-unconfigured');
 const r=await env.AI.run(CF_MODEL,{messages:messages(system,payload),temperature:0.1,max_tokens:2200});
 return {provider:'cloudflare-workers-ai',text:String(r?.response||'')};
}

async function gemini(env,system,payload){
 if(!env.GEMINI_API_KEY) throw Error('gemini-unconfigured');
 const model=env.GEMINI_MODEL||'gemini-2.5-flash';
 const url=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`;
 const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:[{role:'user',parts:[{text:JSON.stringify(payload)}]}],generationConfig:{temperature:0.1,maxOutputTokens:2200}}),signal:AbortSignal.timeout(20000)});
 if(!r.ok) throw Error('gemini-unavailable');
 const data=await r.json();
 const text=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('')||'';
 if(!text) throw Error('gemini-empty');
 return {provider:'gemini',text};
}

async function groq(env,system,payload){
 if(!env.GROQ_API_KEY) throw Error('groq-unconfigured');
 const model=env.GROQ_MODEL||'llama-3.3-70b-versatile';
 const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${env.GROQ_API_KEY}`},body:JSON.stringify({model,messages:messages(system,payload),temperature:0.1,max_tokens:2200}),signal:AbortSignal.timeout(20000)});
 if(!r.ok) throw Error('groq-unavailable');
 const data=await r.json();
 const text=data?.choices?.[0]?.message?.content||'';
 if(!text) throw Error('groq-empty');
 return {provider:'groq',text:String(text)};
}

const PROVIDERS=[cloudflare,gemini,groq];
export async function runFreeAI(env,system,payload){
 const failures=[];
 for(const provider of PROVIDERS){
  try{return await provider(env,system,payload)}catch(e){failures.push(String(e?.message||e))}
 }
 const error=new Error('all-free-providers-unavailable');
 error.failures=failures;
 throw error;
}
