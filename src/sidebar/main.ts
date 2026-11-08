import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import './styles.css';
type HostResult={ok:boolean;text?:string;message?:string};
declare const google: {script:{run:{withSuccessHandler(fn:(r:HostResult)=>void):{withFailureHandler(fn:()=>void):{capturePassage():void}}};host:{close():void}}};
const app=document.querySelector<HTMLElement>('#app')!;
const sample='During our group discussion, I stayed quiet because I thought everyone else understood the reading. Later, someone asked the same question I had. I learned that participation matters.';
const lenses=[['clarity','Find the thread','Clarity and connections'],['depth','Go a layer deeper','Meaning behind the moment'],['voice','Keep it me','Voice and intention'],['custom','My own focus','Bring your own question']];
let stage='start',passage='',focus='depth',custom='',context='',key='',sampleMode=false,version=0,error='',busy=false;
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
function button(label:string,action:string,primary=false){return `<button data-action="${action}" class="${primary?'primary':''}">${label}</button>`;}
function render(){
 app.innerHTML=`<header><span class="brand">yourIntelligent</span><button class="quiet" data-action="finish">Finish</button></header><div role="status" aria-live="polite">${busy?'Capturing selection…':''}</div>${error?`<p class="error" role="alert">${escape(error)}</p>`:''}`;
 let html='';
 if(stage==='start')html=`<p class="meta">LOCAL PREVIEW · ${key?'KEY SET':'NO KEY SET'}</p><h1>Start with<br>your words.</h1><p>Select plain text in Docs — capture it here to preview before anything is sent.</p>${button('Use selected passage','capture',true)}<p class="meta">Local preview only. No full-document capture.</p>${button('Try sample','sample')}${button('Key & privacy','key')}`;
 if(stage==='preview')html=`<p class="meta">${sampleMode?'SAMPLE · ':''}PASSAGE ${version} / NOT SENT</p><div class="passage">${escape(passage)}</div>${button('Change passage','capture')}<fieldset><legend>Choose a focus</legend>${lenses.map(([id,title,desc])=>`<label class="lens"><input type="radio" name="focus" value="${id}" ${focus===id?'checked':''}>${title}<small>${desc}</small></label>`).join('')}</fieldset><label class="field" for="custom">My own focus (optional)</label><textarea id="custom" maxlength="500">${escape(custom)}</textarea><details><summary>Add course context — optional</summary><textarea id="context" aria-label="Course context" maxlength="2000">${escape(context)}</textarea></details>${sampleMode?'<p class="notice">Prepared sample feedback. No AI request or API key is used.</p>':'<p class="notice">Live Gemini requests are not connected in this build. Your passage stays in this session.</p>'}${button(sampleMode?'Read sample feedback':'Ask Gemini','read',true)}${button('Key & privacy','key')}`;
 if(stage==='feedback'){
 const feedback=focus==='clarity'?['The final lesson is broader than the incident you describe.','How does this moment connect to the lesson you name?']:focus==='voice'?['“I stayed quiet” gives a direct account of your choice.','What do you want a reader to understand about that choice?']:['You describe someone voicing the question you had kept to yourself.','What changed in how you understood the room?'];
 html=`<p class="meta">PREPARED SAMPLE / PASSAGE ${version}</p><h1>${feedback[1]}</h1><p>${feedback[0]}</p>${button('Write in Docs','write',true)}${button('Change focus','preview')}${button('Skip question','write')}${button('That’s not what I meant','redirect')}<p class="meta">This example does not follow live edits.</p>`;
 }
 if(stage==='write')html=`<p class="meta">${sampleMode?'SAMPLE WALKTHROUGH':'WRITE IN DOCS'}</p><h1>Make it yours.</h1><p>Revise in your document, then select your revised passage and refresh.</p>${sampleMode?`<label class="field" for="revision">Practice passage (local sample only)</label><textarea id="revision">${escape(passage)}</textarea>`:''}${button('Refresh selected passage','refresh',true)}<p>Refresh updates the local preview. It does not send to Gemini.</p>${button('Change focus','preview')}`;
 if(stage==='redirect')html=`<h1>What should I notice?</h1><label class="field" for="direction">Your direction</label><textarea id="direction" maxlength="500">${escape(custom)}</textarea>${button('Use my focus','direction',true)}${button('Back to feedback','feedback')}`;
 if(stage==='key')html=`<h1>Revise with AI.<br>Keep it yours.</h1><label class="field" for="key">Your Gemini API key</label><input id="key" type="password" autocomplete="off" spellcheck="false" value="${escape(key)}">${button('Show / hide key','show')}<p>Held only in this sidebar session. Live requests are not connected yet.</p><p>When live requests are enabled, selected text and added context go to Gemini. Charges and data handling depend on your account. Unpaid services may use content for improvement and human review. Avoid sensitive or personal information.</p><a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener">Gemini service terms</a>${button('Use key for this session','saveKey',true)}${button('Forget key','forget')}${button('Back to passage','back')}`;
 if(stage==='finish')html=`<h1>Leave it here.</h1><p>Closing clears the app’s session key and working context. Provider-held data is separate.</p>${button('Close sidebar','close',true)}${button('Another passage','start')}${button('Forget key','forget')}`;
 app.insertAdjacentHTML('beforeend',html);
 if(stage==='preview'&&!sampleMode)app.querySelector<HTMLButtonElement>('[data-action=read]')!.disabled=true;
 app.querySelectorAll<HTMLButtonElement>('button').forEach(b=>b.addEventListener('click',()=>void act(b.dataset.action!)));
 app.querySelectorAll<HTMLInputElement>('[name=focus]').forEach(r=>r.onchange=()=>{focus=r.value;});
 app.querySelector<HTMLTextAreaElement>('#custom')?.addEventListener('input',e=>custom=(e.target as HTMLTextAreaElement).value);
 app.querySelector<HTMLTextAreaElement>('#context')?.addEventListener('input',e=>context=(e.target as HTMLTextAreaElement).value);
}
async function capture(){if(busy)return; if(typeof google==='undefined'){error='Open this build in Google Docs to capture text, or try the local sample.';render();return;}
 busy=true;render();const generation=version;
 google.script.run.withSuccessHandler(r=>{busy=false;if(version!==generation)return;if(r.ok&&r.text){passage=r.text;sampleMode=false;version++;stage='preview';error='';}else error=r.message||'Select plain text and try again.';render();}).withFailureHandler(()=>{busy=false;if(version!==generation)return;error='Capture did not finish. Keep writing and try again.';render();}).capturePassage();}
async function act(a:string){error='';
 if(a==='capture'){await capture();return;}
 if(a==='sample'){sampleMode=true;passage=sample;version++;stage='preview';}
 else if(a==='read'){if(!sampleMode)return;stage='feedback';}
 else if(a==='refresh'){if(sampleMode){passage=app.querySelector<HTMLTextAreaElement>('#revision')!.value;version++;stage='preview';}else {await capture();return;}}
 else if(a==='direction'){custom=app.querySelector<HTMLTextAreaElement>('#direction')!.value;focus='custom';stage='preview';}
 else if(a==='saveKey'){key=app.querySelector<HTMLInputElement>('#key')!.value;stage=passage?'preview':'start';}
 else if(a==='show'){const input=app.querySelector<HTMLInputElement>('#key')!;input.type=input.type==='password'?'text':'password';return;}
 else if(a==='forget'){key='';stage='key';}
 else if(a==='back')stage=passage?'preview':'start';
 else if(a==='close'){key='';passage='';custom='';context='';version++;if(typeof google!=='undefined'){google.script.host.close();return;}stage='start';}
 else {stage=a; if(a==='finish'||a==='start')version++;}
 render();app.querySelector<HTMLElement>('h1')?.setAttribute('tabindex','-1');app.querySelector<HTMLElement>('h1')?.focus();
}
render();
