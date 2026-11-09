// @vitest-environment jsdom
import {it,expect,vi} from 'vitest';
it('walks the prepared sample without a provider or key',async()=>{
 document.body.innerHTML='<main id="app"></main>';
 await import('./main');
 const click=(name:string)=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent===name)!;expect(b).toBeTruthy();b.click();};
 click('Try sample');expect(document.body.textContent).toContain('NOT SENT');
 click('Read sample feedback');expect(document.body.textContent).toContain('PREPARED SAMPLE');
 click('Write in Docs');expect(document.querySelector('#revision')).toBeTruthy();
 click('Refresh selected passage');expect(document.body.textContent).toContain('PASSAGE 2');
 click('Finish');click('Close sidebar');expect(document.body.textContent).toContain('NO KEY SET');
});

it('maps host authorization failure without exposing raw errors',async()=>{
 vi.resetModules();document.body.innerHTML='<main id="app"></main>';
 vi.stubGlobal('google',{script:{run:{withSuccessHandler:()=>({withFailureHandler:(fail:(e:{message:string})=>void)=>({capturePassage:()=>fail({message:'Authorization required; private diagnostic details'})})})}}});
 await import('./main');
 [...document.querySelectorAll('button')].find(b=>b.textContent==='Use selected passage')!.click();
 expect(document.body.textContent).toContain('Google authorization is required');
 expect(document.body.textContent).not.toContain('private diagnostic details');
 vi.unstubAllGlobals();
});

it('drops live feedback after the student ends the session',async()=>{
 vi.resetModules();document.body.innerHTML='<main id="app"></main>';
 let success:(r:any)=>void=()=>{};let pending:(r:any)=>void=()=>{};let sent:any;
 const runner:any={withSuccessHandler:(fn:any)=>{success=fn;return runner;},withFailureHandler:()=>runner,capturePassage:()=>success({ok:true,text:'I mistook silence for agreement.'}),requestRevision:(r:any)=>{sent=r;pending=success;}};
 vi.stubGlobal('google',{script:{run:runner,host:{close:()=>{}}}});
 await import('./main');
 const click=(name:string)=>[...document.querySelectorAll('button')].find(b=>b.textContent===name)!.click();
 click('Use selected passage');click('Ask Gemini');
 const field=document.querySelector<HTMLInputElement>('#key')!;field.value='fixture-key-not-real';
 click('Use key for this session');click('Ask Gemini');
 expect(sent.passage).toBe('I mistook silence for agreement.');expect(sent.previousPassage).toBeUndefined();
 expect([...document.querySelectorAll('button')].find(b=>b.textContent==='Ask Gemini')!.disabled).toBe(true);
 click('Finish');pending({ok:true,id:sent.id,feedback:{observation:'late observation',question:'late question',evidenceQuote:null}});
 expect(document.body.textContent).toContain('Leave it here.');expect(document.body.textContent).not.toContain('late question');
 vi.unstubAllGlobals();
});

it('requires a new explicit send after refresh and sends only the refreshed passage',async()=>{
 vi.resetModules();document.body.innerHTML='<main id="app"></main>';
 let success:(r:any)=>void=()=>{};let selected='Original passage.';const requests:any[]=[];
 const runner:any={withSuccessHandler:(fn:any)=>{success=fn;return runner;},withFailureHandler:()=>runner,capturePassage:()=>success({ok:true,text:selected}),requestRevision:(r:any)=>{requests.push(r);success({ok:true,id:r.id,feedback:{observation:'A reading.',question:'What matters here?',evidenceQuote:null}});}};
 vi.stubGlobal('google',{script:{run:runner}});
 await import('./main');
 const click=(name:string)=>[...document.querySelectorAll('button')].find(b=>b.textContent===name)!.click();
 click('Use selected passage');click('Ask Gemini');document.querySelector<HTMLInputElement>('#key')!.value='fixture-key-not-real';click('Use key for this session');click('Ask Gemini');
 click('Write in Docs');selected='Refreshed passage.';click('Refresh selected passage');
 expect(requests).toHaveLength(1);expect(document.body.textContent).toContain('Refreshed passage.');
 click('Ask Gemini');expect(requests).toHaveLength(2);
 expect(requests[1].passage).toBe('Refreshed passage.');expect(JSON.stringify(requests[1])).not.toContain('Original passage.');
 vi.unstubAllGlobals();
});
