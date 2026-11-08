// @vitest-environment jsdom
import {it,expect} from 'vitest';
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
