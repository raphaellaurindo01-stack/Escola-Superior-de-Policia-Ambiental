import {authenticate,authorize} from './auth.mjs';
const json=(body,status=200,headers={})=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers}});
const body=async r=>{const t=await r.text();if(t.length>30000)throw Error('too-large');return JSON.parse(t||'{}')};
const id=()=>crypto.randomUUID();
async function audit(db,user,action,type,target){await db.prepare('INSERT INTO audit_log(at,actor_subject,action,target_type,target_id) VALUES(?,?,?,?,?)').bind(new Date().toISOString(),user.subject,action,type,target).run()}
export async function platformApi(request,env,cors){
 if(!env.DB)return json({error:'Banco de dados não configurado'},503,cors);
 const url=new URL(request.url),p=url.pathname,user=await authenticate(request,env).catch(()=>null);
 if(p==='/api/courses'&&request.method==='GET'){
  const year=Number(url.searchParams.get('year'))||new Date().getFullYear();const rows=await env.DB.prepare("SELECT id,year,title,audience,location,start_date AS startDate,end_date AS endDate,enrollment_start AS enrollmentStart,enrollment_end AS enrollmentEnd,seats,requirements,details,status,enrollment_url AS enrollmentUrl,enrollment_open AS enrollmentOpen,updated_at AS updatedAt FROM courses WHERE year=? AND status IN ('published','cancelled') ORDER BY start_date").bind(year).all();return json({courses:rows.results||[]},200,cors);
 }
 if(!user)return json({error:'Autenticação necessária'},401,cors);
 const isManager=authorize(user,['gerente','admin']);
 if(p==='/api/courses/manage'&&request.method==='GET'&&isManager){const rows=await env.DB.prepare('SELECT * FROM courses ORDER BY year DESC,start_date').all();return json({courses:rows.results||[]},200,cors)}
 if(p==='/api/courses'&&request.method==='POST'&&isManager){const x=await body(request),cid=String(x.id||id()),now=new Date().toISOString();if(!x.title||!Number(x.year))return json({error:'Título e ano são obrigatórios'},400,cors);await env.DB.prepare('INSERT OR REPLACE INTO courses(id,year,title,audience,location,start_date,end_date,enrollment_start,enrollment_end,seats,requirements,details,status,enrollment_url,enrollment_open,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(cid,Number(x.year),String(x.title),String(x.audience||''),String(x.location||''),String(x.startDate||''),String(x.endDate||''),String(x.enrollmentStart||''),String(x.enrollmentEnd||''),x.seats?Number(x.seats):null,String(x.requirements||''),String(x.details||''),String(x.status||'draft'),String(x.enrollmentUrl||''),x.enrollmentOpen?1:0,now).run();await audit(env.DB,user,'course.saved','course',cid);return json({ok:true,id:cid},200,cors)}
 if(p==='/api/enrollments'&&request.method==='GET'&&isManager){const rows=await env.DB.prepare('SELECT * FROM enrollments ORDER BY created_at DESC').all();return json({enrollments:rows.results||[]},200,cors)}
 if(p==='/api/enrollments/status'&&request.method==='POST'&&isManager){const x=await body(request),allowed=['received','under-review','approved','not-approved','cancelled'];if(!x.id||!allowed.includes(x.status))return json({error:'Situação inválida'},400,cors);await env.DB.prepare('UPDATE enrollments SET status=?,updated_at=? WHERE id=?').bind(x.status,new Date().toISOString(),x.id).run();await audit(env.DB,user,'enrollment.status','enrollment',x.id);return json({ok:true},200,cors)}
 if(p==='/api/audit'&&request.method==='GET'&&isManager){const rows=await env.DB.prepare('SELECT * FROM audit_log ORDER BY id DESC LIMIT 200').all();return json({events:rows.results||[]},200,cors)}
 return json({error:'Não encontrado ou sem permissão'},404,cors);
}
