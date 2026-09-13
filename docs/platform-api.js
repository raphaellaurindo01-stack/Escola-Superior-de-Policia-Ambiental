(()=>{
 const base=()=>String(window.ESPA_API_ENDPOINT||'').replace(/\/$/,'');
 const token=()=>sessionStorage.getItem('espa-access-token')||'';
 async function call(path,options={}){if(!base())throw Error('api-unconfigured');const headers={'Content-Type':'application/json',...(options.headers||{})};if(token())headers.Authorization='Bearer '+token();const r=await fetch(base()+path,{...options,headers});const data=await r.json().catch(()=>({}));if(!r.ok)throw Error(data.error||'api-error');return data}
 window.ESPA_DATA={
  configured:()=>!!base(),
  courses:year=>call('/api/courses?year='+encodeURIComponent(year)),
  manageCourses:()=>call('/api/courses/manage'),
  saveCourse:x=>call('/api/courses',{method:'POST',body:JSON.stringify(x)}),
  enrollments:()=>call('/api/enrollments'),
  setEnrollmentStatus:(id,status)=>call('/api/enrollments/status',{method:'POST',body:JSON.stringify({id,status})}),
  audit:()=>call('/api/audit')
 };
})();
