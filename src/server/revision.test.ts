import {afterEach,it,expect,vi} from 'vitest';
import {requestRevision_} from './revision';
afterEach(()=>vi.unstubAllGlobals());
function host(){
 let stored='';
 const fetch=vi.fn(()=>({getResponseCode:()=>200,getContentText:()=>JSON.stringify({status:'completed',steps:[{type:'model_output',content:[{type:'text',text:JSON.stringify({observation:'You name an assumption.',question:'What challenged it?',evidenceQuote:null})}]}]})}));
 const release=vi.fn();
 vi.stubGlobal('LockService',{getUserLock:()=>({tryLock:()=>true,releaseLock:release})});
 vi.stubGlobal('PropertiesService',{getUserProperties:()=>({getProperty:()=>stored,setProperty:(_name:string,value:string)=>{stored=value;}})});
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
it('rejects URLs, old requests and extra prior-draft fields before provider access',()=>{
 const h=host(),r=request();
 expect(requestRevision_(r,'https://api.aionlabs.ai/v1')).toMatchObject({ok:false,code:'KEY_REQUIRED'});
 expect(requestRevision_({...r,createdAt:Date.now()-600000},'fixture-key-not-real')).toMatchObject({ok:false,code:'INVALID_REQUEST'});
 expect(requestRevision_({...r,previousPassage:'old text'},'fixture-key-not-real')).toMatchObject({ok:false,code:'INVALID_REQUEST'});
 expect(h.fetch).not.toHaveBeenCalled();
});
