// @vitest-environment jsdom
import {it,expect,vi} from 'vitest';
it('walks the prepared sample without a provider or key',async()=>{
 document.body.innerHTML='<main id="app"></main>';
 await import('./main');
 const click=(name:string)=>{const b=[...document.querySelectorAll('button')].find(b=>(b.querySelector('span')?.textContent??b.textContent)===name)!;expect(b).toBeTruthy();b.click();};
 click('Try sample');expect(document.body.textContent).toContain('Not sent');
 click('Read sample feedback');expect(document.body.textContent).toContain('Prepared sample');
 click('Write in Docs');expect(document.querySelector('#revision')).toBeTruthy();
 click('Refresh selected passage');expect(document.body.textContent).toContain('Passage 2');
 click('Finish');click('Close sidebar');expect(document.body.textContent).toContain('no key set');
});

it('does not let a delayed capture replace key entry or erase unsaved input',async()=>{
 vi.resetModules();document.body.innerHTML='<main id="app"></main>';
 let pending:(r:any)=>void=()=>{};
 const runner:any={withSuccessHandler:(fn:any)=>{pending=fn;return runner;},withFailureHandler:()=>runner,capturePassage:()=>{}};
 vi.stubGlobal('google',{script:{run:runner}});
 await import('./main');
 const click=(name:string)=>[...document.querySelectorAll('button')].find(b=>(b.querySelector('span')?.textContent??b.textContent)===name)!.click();
 click('Use selected passage');click('Key & privacy');
 const input=document.querySelector<HTMLInputElement>('#key')!;input.value='unsaved-fixture-key';input.focus();
 pending({ok:true,text:'Late selection.'});
 expect(document.querySelector('#key')).toBe(input);expect(input.value).toBe('unsaved-fixture-key');
 expect(document.activeElement).toBe(input);expect(document.body.textContent).not.toContain('Late selection.');
 vi.unstubAllGlobals();
});

it('keeps writing focus when a pending reading becomes available',async()=>{
 vi.resetModules();document.body.innerHTML='<main id="app"></main>';
 let success:(r:any)=>void=()=>{};let pending:(r:any)=>void=()=>{};let sent:any;
 const runner:any={withSuccessHandler:(fn:any)=>{success=fn;return runner;},withFailureHandler:()=>runner,capturePassage:()=>success({ok:true,text:'A synthetic reflection.'}),requestRevision:(r:any)=>{sent=r;pending=success;}};
 vi.stubGlobal('google',{script:{run:runner}});
 await import('./main');
 const click=(action:string)=>document.querySelector<HTMLButtonElement>(`[data-action=${action}]`)!.click();
 click('capture');click('read');document.querySelector<HTMLInputElement>('#key')!.value='fixture-key-not-real';click('saveKey');click('read');
 click('write');const heading=document.querySelector('h1')!;heading.focus();
 pending({ok:true,id:sent.id,feedback:{observation:'A grounded observation.',question:'What mattered to you?',evidenceQuote:null}});
 expect(document.querySelector('[data-state=write]')).toBeTruthy();expect(document.activeElement).toBe(heading);
 expect(document.querySelector('[data-action=feedback]')).toBeTruthy();
 click('feedback');expect(document.querySelector('h1')!.textContent).toBe('What mattered to you?');
 vi.unstubAllGlobals();
});

it('drops an old reading after refreshing while it is pending',async()=>{
 vi.resetModules();document.body.innerHTML='<main id="app"></main>';
 let success:(r:any)=>void=()=>{};let pending:(r:any)=>void=()=>{};let sent:any;let selected='First captured passage.';
 const runner:any={withSuccessHandler:(fn:any)=>{success=fn;return runner;},withFailureHandler:()=>runner,capturePassage:()=>success({ok:true,text:selected}),requestRevision:(r:any)=>{sent=r;pending=success;}};
 vi.stubGlobal('google',{script:{run:runner}});
 await import('./main');
 const click=(action:string)=>document.querySelector<HTMLButtonElement>(`[data-action=${action}]`)!.click();
 click('capture');click('read');document.querySelector<HTMLInputElement>('#key')!.value='fixture-key-not-real';click('saveKey');click('read');click('write');
 selected='Only the refreshed passage.';click('refresh');
 pending({ok:true,id:sent.id,feedback:{observation:'Old observation.',question:'Old question?',evidenceQuote:null}});
 expect(document.querySelector('.passage')!.textContent).toBe(selected);expect(document.body.textContent).not.toContain('Old question?');
 expect(document.querySelector<HTMLButtonElement>('[data-action=read]')!.disabled).toBe(false);
 vi.unstubAllGlobals();
});

it('reveals custom focus without rebuilding the context field and returns via preview',async()=>{
 vi.resetModules();document.body.innerHTML='<main id="app"></main>';vi.unstubAllGlobals();
 await import('./main');
 document.querySelector<HTMLButtonElement>('[data-action=sample]')!.click();
 const context=document.querySelector<HTMLTextAreaElement>('#context')!;context.value='A course reflection.';context.dispatchEvent(new Event('input'));
 document.querySelector<HTMLInputElement>('[value=custom]')!.click();
 expect(document.querySelector('#context')).toBe(context);expect(document.querySelector<HTMLElement>('#custom-field')!.hidden).toBe(false);
 expect(document.activeElement?.id).toBe('custom');
 const custom=document.querySelector<HTMLTextAreaElement>('#custom')!;custom.value='Notice uncertainty.';custom.dispatchEvent(new Event('input'));
 document.querySelector<HTMLButtonElement>('[data-action=key]')!.click();document.querySelector<HTMLButtonElement>('[data-action=back]')!.click();
 expect(document.querySelector<HTMLTextAreaElement>('#custom')!.value).toBe('Notice uncertainty.');
 expect(document.querySelector<HTMLTextAreaElement>('#context')!.value).toBe('A course reflection.');
});

it('clears previous passage context when starting another passage and focuses validation errors',async()=>{
 vi.resetModules();document.body.innerHTML='<main id="app"></main>';vi.unstubAllGlobals();
 await import('./main');
 const click=(name:string)=>[...document.querySelectorAll('button')].find(b=>(b.querySelector('span')?.textContent??b.textContent)===name)!.click();
 click('Try sample');
 const context=document.querySelector<HTMLTextAreaElement>('#context')!;context.value='Old course context';context.dispatchEvent(new Event('input'));
 const custom=document.querySelector<HTMLTextAreaElement>('#custom')!;custom.value='Old direction';custom.dispatchEvent(new Event('input'));
 click('Finish');click('Another passage');click('Try sample');
 expect(document.querySelector<HTMLTextAreaElement>('#context')!.value).toBe('');
 expect(document.querySelector<HTMLTextAreaElement>('#custom')!.value).toBe('');
 click('Key & privacy');document.querySelector<HTMLInputElement>('#key')!.value='https://api.example.invalid';click('Use key for this session');
 expect(document.activeElement?.getAttribute('role')).toBe('alert');
 expect(document.querySelector<HTMLInputElement>('#key')!.type).toBe('password');
});

it('maps host authorization failure without exposing raw errors',async()=>{
 vi.resetModules();document.body.innerHTML='<main id="app"></main>';
 vi.stubGlobal('google',{script:{run:{withSuccessHandler:()=>({withFailureHandler:(fail:(e:{message:string})=>void)=>({capturePassage:()=>fail({message:'Authorization required; private diagnostic details'})})})}}});
 await import('./main');
 [...document.querySelectorAll('button')].find(b=>b.querySelector('span')?.textContent==='Use selected passage')!.click();
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
 const click=(name:string)=>[...document.querySelectorAll('button')].find(b=>(b.querySelector('span')?.textContent??b.textContent)===name)!.click();
 click('Use selected passage');click('Ask Gemini');
 const field=document.querySelector<HTMLInputElement>('#key')!;field.value='fixture-key-not-real';
 click('Use key for this session');click('Ask Gemini');
 expect(sent.passage).toBe('I mistook silence for agreement.');expect(sent.previousPassage).toBeUndefined();
 expect(document.querySelector('[data-state=pending]')).toBeTruthy();
 expect(document.querySelector('[data-action=read]')).toBeNull();
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
 const click=(name:string)=>[...document.querySelectorAll('button')].find(b=>(b.querySelector('span')?.textContent??b.textContent)===name)!.click();
 click('Use selected passage');click('Ask Gemini');document.querySelector<HTMLInputElement>('#key')!.value='fixture-key-not-real';click('Use key for this session');click('Ask Gemini');
 click('Write in Docs');selected='Refreshed passage.';click('Refresh selected passage');
 expect(requests).toHaveLength(1);expect(document.body.textContent).toContain('Refreshed passage.');
 click('Ask Gemini again');expect(requests).toHaveLength(2);
 expect(requests[1].passage).toBe('Refreshed passage.');expect(JSON.stringify(requests[1])).not.toContain('Original passage.');
 vi.unstubAllGlobals();
});
