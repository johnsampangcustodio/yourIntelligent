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
