import {afterEach,it,expect,vi} from 'vitest';
import {requestRevision_} from './revision';
afterEach(()=>vi.unstubAllGlobals());
function host(seed:Record<string,number>={},locked=true,paused=false){
 let stored=JSON.stringify(seed);
 const fetch=vi.fn(()=>({getResponseCode:()=>200,getContentText:()=>JSON.stringify({status:'completed',steps:[{type:'model_output',content:[{type:'text',text:JSON.stringify({observation:'You name an assumption.',question:'What challenged it?',evidenceQuote:null})}]}]})}));
 const release=vi.fn();
 vi.stubGlobal('LockService',{getUserLock:()=>({tryLock:()=>locked,releaseLock:release})});
 vi.stubGlobal('PropertiesService',{getScriptProperties:()=>({getProperty:()=>paused?'true':null}),getUserProperties:()=>({getProperty:()=>stored,setProperty:(_name:string,value:string)=>{stored=value;}})});
 vi.stubGlobal('UrlFetchApp',{fetch});
 return {fetch,release,stored:()=>stored};
}
const request=()=>({id:'fixture-request-00001',createdAt:Date.now(),passage:'I mistook silence for agreement.',focus:'depth',context:'',customFocus:''});
it('claims a request once and stores only nonce/timestamp metadata',()=>{
 const h=host(),r=request();
 expect(requestRevision_(r,'fixture-key-not-real').ok).toBe(true);
 expect(requestRevision_(r,'fixture-key-not-real')).toMatchObject({ok:false,code:'REQUEST_ALREADY_USED'});
 expect(h.fetch).toHaveBeenCalledTimes(1);
 expect(JSON.parse(h.stored())).toEqual({[r.id]:expect.any(Number)});
 expect(h.stored()).not.toContain(r.passage);
 expect(h.stored()).not.toContain('fixture-key-not-real');
 expect(h.release).toHaveBeenCalledTimes(2);
});

it('prunes expired nonces before enforcing the bounded ledger',()=>{
 const now=Date.now();const seed=Object.fromEntries(Array.from({length:32},(_,i)=>['old-request-'+i,now-600001]));
 const h=host(seed),r=request();
 expect(requestRevision_(r,'fixture-key-not-real').ok).toBe(true);
 expect(Object.keys(JSON.parse(h.stored()))).toEqual([r.id]);
 expect(h.fetch).toHaveBeenCalledTimes(1);
});
it('rejects capacity and lock contention without a provider call',()=>{
 const seed=Object.fromEntries(Array.from({length:32},(_,i)=>['active-request-'+i,Date.now()]));
 const full=host(seed);
 expect(requestRevision_(request(),'fixture-key-not-real')).toMatchObject({ok:false,code:'PROVIDER_LIMIT'});
 expect(full.fetch).not.toHaveBeenCalled();expect(full.release).toHaveBeenCalledTimes(1);
 const locked=host({},false);
 expect(requestRevision_(request(),'fixture-key-not-real')).toMatchObject({ok:false,code:'REQUEST_IN_PROGRESS'});
 expect(locked.fetch).not.toHaveBeenCalled();expect(locked.release).not.toHaveBeenCalled();
});
it('does not retry an uncertain provider outcome, including a repeated request ID',()=>{
 const h=host(),r=request();h.fetch.mockImplementation(()=>{throw new Error('private transport diagnostic');});
 expect(requestRevision_(r,'fixture-key-not-real')).toMatchObject({ok:false,code:'UNKNOWN_OUTCOME'});
 expect(requestRevision_(r,'fixture-key-not-real')).toMatchObject({ok:false,code:'REQUEST_ALREADY_USED'});
 expect(h.fetch).toHaveBeenCalledTimes(1);
});
it('rejects URLs, old requests and extra prior-draft fields before provider access',()=>{
 const h=host(),r=request();
 expect(requestRevision_(r,'https://api.aionlabs.ai/v1')).toMatchObject({ok:false,code:'KEY_REQUIRED'});
 expect(requestRevision_({...r,createdAt:Date.now()-600000},'fixture-key-not-real')).toMatchObject({ok:false,code:'INVALID_REQUEST'});
 expect(requestRevision_({...r,previousPassage:'old text'},'fixture-key-not-real')).toMatchObject({ok:false,code:'INVALID_REQUEST'});
 expect(requestRevision_({...r,id:1234567890123456},'fixture-key-not-real')).toMatchObject({ok:false,code:'INVALID_REQUEST'});
 expect(h.fetch).not.toHaveBeenCalled();
});
it('allows an operator pause without provider access or nonce creation',()=>{
 const h=host({},true,true);
 expect(requestRevision_(request(),'fixture-key-not-real')).toMatchObject({ok:false,code:'SERVICE_PAUSED'});
 expect(h.fetch).not.toHaveBeenCalled();expect(JSON.parse(h.stored())).toEqual({});
});
